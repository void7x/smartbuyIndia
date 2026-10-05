import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { getGuideBySlug, guidesByRecency, getProductBySlug } from '../data/index.js';
import { getCategoryBySlug } from '../data/categories.js';
import { trackGuideView } from '../utils/analytics.js';
import { breadcrumbSchema, articleSchema, faqSchema, itemListSchema } from '../utils/seo.js';
import { truncate } from '../utils/format.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import GuideRenderer from '../components/GuideRenderer.jsx';
import GuideCard from '../components/GuideCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import DisclosureNotice from '../components/DisclosureNotice.jsx';
import NotFound from './NotFound.jsx';
import { ArrowRight, BookIcon } from '../components/Icons.jsx';

/** /guide/:slug — one buying-guide data object rendered as a full page. */
export default function GuidePage() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);
  const category = guide ? getCategoryBySlug(guide.categorySlug) : null;

  useEffect(() => {
    if (guide) trackGuideView(guide);
  }, [guide]);

  const guideProducts = (guide?.productSlugs || [])
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  const moreGuides = guide
    ? guidesByRecency.filter((g) => g.slug !== guide.slug).slice(0, 3)
    : [];

  useSeo({
    title: guide ? guide.title : 'Buying guide not found',
    description: guide
      ? truncate(guide.metaDescription || guide.intro?.[0] || '', 158)
      : 'That buying guide does not exist on SmartBuyIndia.',
    path: guide ? `/guide/${guide.slug}` : '/404',
    type: guide ? 'article' : 'website',
    noIndex: !guide,
    schema: guide
      ? [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Buying guides', path: '/buying-guides' },
            ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
            { name: guide.title, path: `/guide/${guide.slug}` },
          ]),
          articleSchema({
            headline: guide.title,
            description: truncate(guide.metaDescription || '', 300),
            path: `/guide/${guide.slug}`,
            dateModified: guide.updatedAt,
            author: guide.author,
          }),
          guide.faqs?.length ? faqSchema(guide.faqs) : null,
          guideProducts.length
            ? itemListSchema(
                `Products covered in ${guide.title}`,
                guideProducts.map((p) => ({ name: p.name, path: `/product/${p.slug}` })),
                'Products mentioned in this buying guide. Entries are labelled with the situation they suit; the list is not a ranking.',
              )
            : null,
        ].filter(Boolean)
      : null,
  });

  if (!guide) return <NotFound />;

  return (
    <>
      <article>
        <div className="page-header">
          <div className="container container--narrow">
            <Breadcrumbs
              items={[
                { name: 'Home', path: '/' },
                { name: 'Buying guides', path: '/buying-guides' },
                ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
                { name: guide.title },
              ]}
            />
            <p className="eyebrow">
              <BookIcon width={13} height={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
              Buying guide{category ? ` · ${category.name}` : ''}
            </p>
            <h1>{guide.heroTitle || guide.title}</h1>
            <p className="lede">{guide.metaDescription}</p>
          </div>
        </div>

        <div className="container section">
          <div className="container container--narrow" style={{ padding: 0 }}>
            <GuideRenderer guide={guide} placementPrefix="guide" />

            {/* Every product mentioned, collected at the end for a quick pass */}
            {guideProducts.length > 0 && (
              <section className="section--tight" aria-labelledby="guide-all-products">
                <h2 id="guide-all-products" style={{ marginBottom: '16px' }}>
                  All products mentioned in this guide
                </h2>
                <div className="grid grid-3">
                  {guideProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      placement={`guide-footer:${guide.slug}`}
                      showFeatures={false}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="section--tight">
              <DisclosureNotice />
            </section>
          </div>
        </div>
      </article>

      {moreGuides.length > 0 && (
        <section className="section section--alt" aria-labelledby="more-guides">
          <div className="container">
            <div className="section-head">
              <div className="section-head__text">
                <h2 id="more-guides">Continue your research</h2>
                <p>Other buying guides shoppers read alongside this one.</p>
              </div>
              <Link to="/buying-guides" className="link-arrow">
                All buying guides <ArrowRight width={14} height={14} />
              </Link>
            </div>
            <div className="grid grid-3">
              {moreGuides.map((item) => (
                <GuideCard key={item.id} guide={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
