import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { getProductBySlug, getRelatedProducts, getRelatedGuides, getRelatedComparisons } from '../data/index.js';
import { getCategoryBySlug } from '../data/categories.js';
import { trackProductView } from '../utils/analytics.js';
import { breadcrumbSchema, itemListSchema } from '../utils/seo.js';
import { formatPrice, formatDate, truncate } from '../utils/format.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ProductImage from '../components/ProductImage.jsx';
import AmazonButton from '../components/AmazonButton.jsx';
import MobileCtaBar from '../components/MobileCtaBar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import GuideCard from '../components/GuideCard.jsx';
import ComparisonCard from '../components/ComparisonCard.jsx';
import DisclosureNotice, { RetailerNote } from '../components/DisclosureNotice.jsx';
import NotFound from './NotFound.jsx';
import {
  CheckIcon,
  AlertIcon,
  InfoIcon,
  ShieldIcon,
  ArrowRight,
  TagIcon,
  ClockIcon,
} from '../components/Icons.jsx';

/**
 * /product/:slug
 *
 * Labels are chosen deliberately: "Editorial summary", "Product information",
 * "Things to consider". The page never claims a hands-on test, never shows a
 * rating or review count, and never invents a specification.
 */
export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const category = product ? getCategoryBySlug(product.categorySlug) : null;

  useEffect(() => {
    if (product) trackProductView(product);
  }, [product]);

  const relatedProducts = product ? getRelatedProducts(product, 3) : [];
  const relatedGuides = product ? getRelatedGuides(product, 3) : [];
  const relatedComparisons = product ? getRelatedComparisons(product, 2) : [];

  useSeo({
    title: product
      ? `${product.name} — ${category?.name || 'product'} information for Indian buyers`
      : 'Product not found',
    description: product
      ? truncate(`${product.shortDescription} ${product.editorialSummary}`, 158)
      : 'That product does not exist on SmartBuyIndia.',
    path: product ? `/product/${product.slug}` : '/404',
    type: product ? 'article' : 'website',
    noIndex: !product,
    schema: product
      ? [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Categories', path: '/categories' },
            ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
            { name: product.name, path: `/product/${product.slug}` },
          ]),
          relatedProducts.length
            ? itemListSchema(
                `Products related to ${product.name}`,
                relatedProducts.map((p) => ({ name: p.name, path: `/product/${p.slug}` })),
              )
            : null,
        ].filter(Boolean)
      : null,
  });

  if (!product) return <NotFound />;

  const price = formatPrice(product.price);
  const subcategory = category?.subcategories?.find((s) => s.slug === product.subcategorySlug);

  return (
    <>
      <div className="container section--tight" style={{ paddingTop: '28px' }}>
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Categories', path: '/categories' },
            ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
            ...(subcategory
              ? [{ name: subcategory.name, path: `/category/${category.slug}?sub=${subcategory.slug}` }]
              : []),
            { name: product.name },
          ]}
        />

        {/* ---------------------------------------------------------- Hero */}
        <div className="product-hero">
          <div>
            <div className="chip-row" style={{ marginBottom: '14px' }}>
              <Link to={`/category/${product.categorySlug}`} className="chip chip--brand" style={{ textDecoration: 'none' }}>
                {category?.name}
              </Link>
              {subcategory && (
                <Link
                  to={`/category/${product.categorySlug}?sub=${subcategory.slug}`}
                  className="chip"
                  style={{ textDecoration: 'none' }}
                >
                  {subcategory.name}
                </Link>
              )}
              {product.badges?.map((badge) => (
                <span className="badge" key={badge}>
                  {badge}
                </span>
              ))}
              {product.isDemo && <span className="badge badge--demo">Demo entry</span>}
              {product.updatedAt && (
                <span className="chip">
                  <ClockIcon width={12} height={12} /> Updated {formatDate(product.updatedAt)}
                </span>
              )}
            </div>

            <h1 style={{ marginBottom: '14px' }}>{product.name}</h1>

            <p className="lede" style={{ marginBottom: '20px' }}>
              {product.shortDescription}
            </p>

            <div className="product-hero__media" style={{ maxWidth: '560px' }}>
              <ProductImage product={product} eager />
              <p className="product-hero__media-caption">{product.imageAlt}</p>
            </div>
          </div>

          {/* ------------------------------------------------------ Buy box */}
          <aside className="buy-box" aria-labelledby="buy-box-title">
            <p className="buy-box__title" id="buy-box-title">
              Price &amp; availability
            </p>

            {price ? (
              <>
                <p className="buy-box__price">{price}</p>
                <p className="inline-note">
                  Approximate price
                  {product.priceVerifiedOn
                    ? `, last checked by us on ${formatDate(product.priceVerifiedOn)}`
                    : ''}
                  . Prices on the retailer&rsquo;s website change frequently — always confirm the live
                  price before ordering.
                </p>
              </>
            ) : (
              <>
                <p className="buy-box__price" style={{ fontSize: 'var(--fs-lg)' }}>
                  Price not published
                </p>
                <p className="inline-note">
                  We only show a price when a person on our team has checked it on Amazon.in and
                  recorded the date. Rather than publish a number we cannot stand behind, we leave it
                  out — use the button below to see the live price.
                </p>
              </>
            )}

            {product.priceNote && (
              <p className="inline-note" style={{ color: 'var(--ink-500)' }}>
                {product.priceNote}
              </p>
            )}

            <AmazonButton product={product} placement="product-buy-box" variant="accent" size="lg" block />
            <AmazonButton product={product} placement="product-buy-box-secondary" variant="secondary" size="sm" block label="Check availability on Amazon.in" />

            <dl className="buy-box__rows">
              <div className="buy-box__row">
                <dt>Retailer</dt>
                <dd>Amazon.in</dd>
              </div>
              <div className="buy-box__row">
                <dt>Sold &amp; shipped by</dt>
                <dd>The retailer (not SmartBuyIndia)</dd>
              </div>
              <div className="buy-box__row">
                <dt>Category</dt>
                <dd>
                  <Link to={`/category/${product.categorySlug}`}>{category?.name}</Link>
                </dd>
              </div>
            </dl>

            <DisclosureNotice compact />
          </aside>
        </div>

        {/* ---------------------------------------------- Editorial summary */}
        <section className="section--tight" aria-labelledby="summary-heading">
          <div className="content-block">
            <h2 id="summary-heading" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <InfoIcon width={22} height={22} style={{ color: 'var(--brand-600)' }} />
              Editorial summary
            </h2>
            <div className="prose">
              <p>{product.editorialSummary}</p>
            </div>
            {product.isDemo && (
              <div className="callout callout--warn" style={{ marginTop: '20px' }}>
                <span className="callout__title">Demonstration entry</span>
                This product record exists to show how a product page is structured. It is not a
                review, we have not handled or tested the item, and no specification here should be
                treated as a verified fact about a real product.
              </div>
            )}
          </div>
        </section>

        {/* ------------------------------------------ Product information */}
        <section className="section--tight" aria-labelledby="features-heading">
          <div className="content-block">
            <h2 id="features-heading">Product information</h2>
            <p className="text-muted" style={{ marginBottom: '20px', maxWidth: '70ch' }}>
              Key characteristics for this class of product. Values are stated as typical for the
              segment rather than as a tested measurement.
            </p>

            <ul className="spec-list">
              {(product.keyFeatures || []).map((feature) => (
                <li key={feature.label}>
                  <span className="spec-label">{feature.label}</span>
                  <span className="spec-value">{feature.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------- Who it is / isn't for */}
        <section className="section--tight" aria-labelledby="audience-heading">
          <h2 id="audience-heading" style={{ marginBottom: '16px' }}>
            Is it right for you?
          </h2>
          <div className="two-col">
            <div className="panel">
              <p className="panel__title">
                <CheckIcon style={{ color: 'var(--success)' }} />
                Who this product is for
              </p>
              <ul className="check-list check-list--pros">
                {(product.whoItsFor || []).map((item) => (
                  <li key={item}>
                    <CheckIcon aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <p className="panel__title">
                <AlertIcon style={{ color: 'var(--danger)' }} />
                Who may want another option
              </p>
              <ul className="check-list check-list--cons">
                {(product.whoMightSkip || []).map((item) => (
                  <li key={item}>
                    <AlertIcon aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- Pros and cons */}
        <section className="section--tight" aria-labelledby="proscons-heading">
          <h2 id="proscons-heading" style={{ marginBottom: '16px' }}>
            Strengths and limitations
          </h2>
          <div className="two-col">
            <div className="panel panel--pros">
              <p className="panel__title">
                <CheckIcon />
                Pros
              </p>
              <ul className="check-list check-list--pros">
                {(product.pros || []).map((item) => (
                  <li key={item}>
                    <CheckIcon aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel panel--cons">
              <p className="panel__title">
                <AlertIcon />
                Cons
              </p>
              <ul className="check-list check-list--cons">
                {(product.cons || []).map((item) => (
                  <li key={item}>
                    <AlertIcon aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="inline-note" style={{ marginTop: '12px' }}>
            These are general characteristics of this product class, written from published
            specifications and common buyer considerations — not from a hands-on test by our team.
          </p>
        </section>

        {/* ----------------------------------------- Things to consider */}
        {product.considerations?.length > 0 && (
          <section className="section--tight" aria-labelledby="consider-heading">
            <div className="content-block">
              <h2 id="consider-heading" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <ShieldIcon width={22} height={22} style={{ color: 'var(--brand-600)' }} />
                Important things to consider before you buy
              </h2>
              <ul className="check-list check-list--neutral" style={{ maxWidth: '78ch' }}>
                {product.considerations.map((item) => (
                  <li key={item}>
                    <InfoIcon aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ------------------------------------------ Why we selected it */}
        {product.whyWePickedIt && (
          <section className="section--tight" aria-labelledby="why-heading">
            <div className="callout">
              <span className="callout__title">Why this is in our shortlist</span>
              <p style={{ maxWidth: '78ch' }}>{product.whyWePickedIt}</p>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------- Tags */}
        {product.tags?.length > 0 && (
          <section className="section--tight" aria-labelledby="tags-heading">
            <h2 id="tags-heading" style={{ fontSize: 'var(--fs-base)', marginBottom: '12px' }}>
              <TagIcon width={16} height={16} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
              Related topics
            </h2>
            <ul className="chip-row">
              {product.tags.map((tag) => (
                <li key={tag}>
                  <Link to={`/search?q=${encodeURIComponent(tag)}`} className="chip" style={{ textDecoration: 'none' }}>
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------------------------------------------- Comparisons */}
        {relatedComparisons.length > 0 && (
          <section className="section--tight" aria-labelledby="rel-compare">
            <div className="section-head">
              <div className="section-head__text">
                <h2 id="rel-compare">See it compared</h2>
                <p>How this option differs from the alternatives in the same category.</p>
              </div>
            </div>
            <div className="grid grid-2">
              {relatedComparisons.map((comparison) => (
                <ComparisonCard key={comparison.id} comparison={comparison} />
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------- Related products */}
        {relatedProducts.length > 0 && (
          <section className="section--tight" aria-labelledby="rel-products">
            <div className="section-head">
              <div className="section-head__text">
                <h2 id="rel-products">Related products</h2>
                <p>Other entries in {category?.name} worth reading before you decide.</p>
              </div>
              <Link to={`/category/${product.categorySlug}`} className="link-arrow">
                All {category?.name} <ArrowRight width={14} height={14} />
              </Link>
            </div>
            <div className="grid grid-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} placement="product-related" showFeatures={false} />
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------- Related guides */}
        {relatedGuides.length > 0 && (
          <section className="section--tight" aria-labelledby="rel-guides">
            <div className="section-head">
              <div className="section-head__text">
                <h2 id="rel-guides">Related buying guides</h2>
                <p>Background research that explains what to look for in this category.</p>
              </div>
            </div>
            <div className="grid grid-3">
              {relatedGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} showMeta={false} />
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------------- Disclosure */}
        <section className="section--tight" aria-labelledby="product-disclosure">
          <DisclosureNotice id="product-disclosure" />
          <RetailerNote className="inline-note" />
        </section>
      </div>

      <MobileCtaBar product={product} />
    </>
  );
}
