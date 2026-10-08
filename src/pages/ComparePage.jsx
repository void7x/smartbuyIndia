import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import {
  comparisons,
  getComparisonBySlug,
  resolveProducts,
} from '../data/index.js';
import { getCategoryBySlug } from '../data/categories.js';
import { getGuideBySlug } from '../data/buyingGuides.js';
import { trackComparisonView } from '../utils/analytics.js';
import { breadcrumbSchema, itemListSchema, faqSchema } from '../utils/seo.js';
import { truncate, formatDate } from '../utils/format.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ComparisonTable from '../components/ComparisonTable.jsx';
import ComparisonCard from '../components/ComparisonCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import FAQSection from '../components/FAQSection.jsx';
import DisclosureNotice from '../components/DisclosureNotice.jsx';
import NotFound from './NotFound.jsx';
import { ArrowRight, SwapIcon, InfoIcon, ClockIcon } from '../components/Icons.jsx';

/**
 * Two routes, one component:
 *   /compare          -> index of every comparison
 *   /compare/:slug    -> a single data-driven comparison
 */
export default function ComparePage() {
  const { slug } = useParams();
  if (!slug) return <ComparisonIndex />;
  return <SingleComparison slug={slug} />;
}

/* -------------------------------------------------------------------------- */

function ComparisonIndex() {
  useSeo({
    title: 'Product comparisons',
    description:
      'Side-by-side product comparisons for Indian shoppers. Each table compares options on the criteria that decide the purchase, with a stated reason for every label — no invented rankings.',
    path: '/compare',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Comparisons', path: '/compare' },
      ]),
      itemListSchema(
        'SmartBuyIndia product comparisons',
        comparisons.map((c) => ({ name: c.title, path: `/compare/${c.slug}` })),
      ),
    ],
  });

  const grouped = useMemo(() => {
    const map = new Map();
    comparisons.forEach((comparison) => {
      const category = getCategoryBySlug(comparison.categorySlug);
      const key = category?.name || 'Other';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(comparison);
    });
    return [...map.entries()];
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Comparisons' }]} />
          <h1>Product comparisons</h1>
          <p className="lede">
            Our comparison tables put options side by side on the criteria that actually decide a
            purchase — capacity, socket rating, runtime, floor impact — and label each one with the
            situation it suits. We do not declare a single winner, because the right answer depends on
            your household.
          </p>
        </div>
      </div>

      <div className="container section">
        {grouped.map(([categoryName, items]) => (
          <section key={categoryName} className="section--tight" aria-labelledby={`cmp-${categoryName}`}>
            <h2 id={`cmp-${categoryName}`} style={{ fontSize: 'var(--fs-xl)', marginBottom: '16px' }}>
              {categoryName}
            </h2>
            <div className="grid grid-2">
              {items.map((comparison) => (
                <ComparisonCard key={comparison.id} comparison={comparison} />
              ))}
            </div>
          </section>
        ))}

        <div className="callout callout--plain" style={{ marginTop: '32px' }}>
          <span className="callout__title">
            <InfoIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            How to read a comparison table
          </span>
          Rows are criteria, not ranks. A label such as “Best for small kitchens” describes a
          situation — it is always shown together with the reason behind it, so you can decide whether
          that situation is yours. Prices appear only where a person on our team has verified one, with
          the date it was checked.
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function SingleComparison({ slug }) {
  const comparison = getComparisonBySlug(slug);
  const category = comparison ? getCategoryBySlug(comparison.categorySlug) : null;
  const items = comparison ? resolveProducts(comparison.productSlugs) : [];
  const guide = comparison?.guideSlug ? getGuideBySlug(comparison.guideSlug) : null;

  useEffect(() => {
    if (comparison) trackComparisonView(comparison);
  }, [comparison]);

  useSeo({
    title: comparison ? comparison.title : 'Comparison not found',
    description: comparison
      ? truncate(comparison.metaDescription || comparison.intro, 158)
      : 'That comparison does not exist on SmartBuyIndia.',
    path: comparison ? `/compare/${comparison.slug}` : '/404',
    type: comparison ? 'article' : 'website',
    noIndex: !comparison,
    schema: comparison
      ? [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Comparisons', path: '/compare' },
            ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
            { name: comparison.title, path: `/compare/${comparison.slug}` },
          ]),
          itemListSchema(
            comparison.title,
            items.map((p) => ({ name: p.name, path: `/product/${p.slug}` })),
            'Options compared in this table. Labels describe the situation each option suits; there is no overall ranking.',
          ),
          comparison.faqs?.length ? faqSchema(comparison.faqs) : null,
        ].filter(Boolean)
      : null,
  });

  if (!comparison) return <NotFound />;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Comparisons', path: '/compare' },
              ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
              { name: comparison.title },
            ]}
          />
          <p className="eyebrow">
            <SwapIcon width={13} height={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            Comparison{category ? ` · ${category.name}` : ''}
          </p>
          <h1>{comparison.heroTitle || comparison.title}</h1>
          <p className="lede">{comparison.intro}</p>

          <ul className="chip-row" style={{ marginTop: '16px' }}>
            <li>
              <span className="chip">{items.length} options compared</span>
            </li>
            <li>
              <span className="chip">{comparison.rows.length} criteria</span>
            </li>
            {comparison.updatedAt && (
              <li>
                <span className="chip">
                  <ClockIcon width={12} height={12} /> Updated {formatDate(comparison.updatedAt)}
                </span>
              </li>
            )}
            {comparison.isDemo && (
              <li>
                <span className="badge badge--demo">Demo content</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container section">
        {comparison.isDemo && (
          <div className="callout callout--warn" style={{ marginBottom: '24px' }}>
            <span className="callout__title">Demonstration comparison</span>
            This table exists to show how comparisons are structured. The entries are placeholders, no
            product was tested by us, and no price is published because none has been verified.
          </div>
        )}

        <section className="comparison-quick" aria-labelledby="quick-compare-heading">
          <div className="comparison-quick__head">
            <div>
              <p className="eyebrow">Choose by fit</p>
              <h2 id="quick-compare-heading">Which one sounds like you?</h2>
            </div>
            <p>These labels are use-case verdicts, not popularity rankings.</p>
          </div>
          <div className="comparison-quick__grid">
            {items.map((item) => {
              const verdict = comparison.verdicts?.[item.slug];
              return (
                <Link key={item.slug} to={`/product/${item.slug}`} className="comparison-quick__card">
                  <span className="comparison-quick__product">{item.name}</span>
                  <strong>{verdict?.label || 'Depends on your routine'}</strong>
                  <span>{verdict?.why || 'Read the product details for the trade-offs.'}</span>
                  <ArrowRight width={15} height={15} />
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="table-heading">
          <h2 id="table-heading" style={{ marginBottom: '12px' }}>
            Side-by-side
          </h2>
          <ComparisonTable comparison={comparison} placement="compare-page" />
        </section>

        {comparison.editorialConclusion && (
          <section className="section--tight" aria-labelledby="conclusion-heading">
            <div className="content-block">
              <h2 id="conclusion-heading">{comparison.editorialConclusion.heading || 'How to decide'}</h2>
              <div className="prose">
                {comparison.editorialConclusion.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section--tight" aria-labelledby="cmp-products">
          <h2 id="cmp-products" style={{ fontSize: 'var(--fs-xl)', marginBottom: '16px' }}>
            The options in this comparison
          </h2>
          <div className="grid grid-3">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} placement="compare-page-product" showFeatures={false} />
            ))}
          </div>
        </section>

        {comparison.faqs?.length > 0 && (
          <section className="section--tight">
            <FAQSection items={comparison.faqs} title="Questions about this comparison" />
          </section>
        )}

        {guide && (
          <section className="section--tight" aria-labelledby="cmp-guide">
            <div className="panel panel--tinted">
              <p className="panel__title">Go deeper</p>
              <h2 id="cmp-guide" style={{ fontSize: 'var(--fs-xl)', marginBottom: '8px' }}>
                {guide.title}
              </h2>
              <p className="text-muted" style={{ maxWidth: '70ch', marginBottom: '16px' }}>
                {guide.metaDescription}
              </p>
              <Link to={`/guide/${guide.slug}`} className="btn">
                Read the full buying guide <ArrowRight width={15} height={15} />
              </Link>
            </div>
          </section>
        )}

        {category && (
          <section className="section--tight" aria-labelledby="cmp-other">
            <h2 id="cmp-other" style={{ fontSize: 'var(--fs-xl)', marginBottom: '16px' }}>
              More comparisons
            </h2>
            <div className="grid grid-2">
              {comparisons
                .filter((c) => c.slug !== comparison.slug)
                .slice(0, 2)
                .map((c) => (
                  <ComparisonCard key={c.id} comparison={c} />
                ))}
            </div>
          </section>
        )}

        <section className="section--tight">
          <DisclosureNotice />
        </section>
      </div>
    </>
  );
}
