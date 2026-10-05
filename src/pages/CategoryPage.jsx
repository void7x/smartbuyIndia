import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { getCategoryBySlug, liveCategories } from '../data/categories.js';
import { getProductsByCategory } from '../data/products.js';
import { getGuidesByCategory } from '../data/buyingGuides.js';
import { getComparisonsByCategory } from '../data/comparisons.js';
import { trackCategoryView, trackFilterChange } from '../utils/analytics.js';
import { breadcrumbSchema, itemListSchema } from '../utils/seo.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ProductCard from '../components/ProductCard.jsx';
import GuideCard from '../components/GuideCard.jsx';
import ComparisonCard from '../components/ComparisonCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import DisclosureNotice from '../components/DisclosureNotice.jsx';
import EmptyState from '../components/EmptyState.jsx';
import NotFound from './NotFound.jsx';
import { ArrowRight, SparkleIcon } from '../components/Icons.jsx';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'recent', label: 'Recently updated' },
  { value: 'az', label: 'Name (A–Z)' },
];

/** /category/:slug — data-driven category landing page. */
export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSubs = (searchParams.get('sub') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const [activeSubs, setActiveSubs] = useState(initialSubs);
  const [sort, setSort] = useState('featured');

  const allProducts = useMemo(() => (category ? getProductsByCategory(category.slug) : []), [category]);
  const guides = useMemo(() => (category ? getGuidesByCategory(category.slug) : []), [category]);
  const categoryComparisons = useMemo(
    () => (category ? getComparisonsByCategory(category.slug) : []),
    [category],
  );

  useEffect(() => {
    setActiveSubs(
      (searchParams.get('sub') || '').split(',').map((s) => s.trim()).filter(Boolean),
    );
  }, [searchParams]);

  useEffect(() => {
    if (category) trackCategoryView(category);
  }, [category]);

  const subcategories = useMemo(() => {
    if (!category) return [];
    return (category.subcategories || []).map((sub) => ({
      ...sub,
      count: allProducts.filter((p) => p.subcategorySlug === sub.slug).length,
    }));
  }, [category, allProducts]);

  const visibleProducts = useMemo(() => {
    let list = activeSubs.length
      ? allProducts.filter((p) => activeSubs.includes(p.subcategorySlug))
      : allProducts;

    if (sort === 'az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'recent') {
      list = [...list].sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
    } else {
      list = [...list].sort((a, b) => (b.badges?.length || 0) - (a.badges?.length || 0));
    }
    return list;
  }, [allProducts, activeSubs, sort]);

  useSeo({
    title: category ? `${category.name} — products, guides & comparisons` : 'Category not found',
    description: category
      ? `${category.name} on SmartBuyIndia: ${category.tagline} Browse ${allProducts.length} product entries, ${guides.length} buying guides and ${categoryComparisons.length} comparisons written for Indian shoppers.`
      : 'That category does not exist on SmartBuyIndia.',
    path: category ? `/category/${category.slug}` : '/404',
    noIndex: !category,
    schema: category
      ? [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Categories', path: '/categories' },
            { name: category.name, path: `/category/${category.slug}` },
          ]),
          itemListSchema(
            `${category.name} products on SmartBuyIndia`,
            visibleProducts.map((p) => ({ name: p.name, path: `/product/${p.slug}` })),
            category.tagline,
          ),
        ]
      : null,
  });

  if (!category || category.comingSoon) {
    if (category?.comingSoon) {
      return (
        <div className="container section">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Categories', path: '/categories' },
              { name: category.name },
            ]}
          />
          <EmptyState
            icon={<SparkleIcon width={46} height={46} />}
            title={`${category.name} is not live yet`}
            headingLevel="h1"
          >
            <p>{category.description}</p>
            <p style={{ marginTop: '12px' }}>
              We publish a category only once there is real research behind it, rather than filling
              it with placeholder links.
            </p>
          </EmptyState>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: '24px' }}>
            <Link to="/categories" className="btn">
              Browse live categories
            </Link>
            <Link to="/contact" className="btn btn--outline">
              Request this category
            </Link>
          </div>
        </div>
      );
    }
    return <NotFound />;
  }

  const toggleSub = (subSlug) => {
    const next = activeSubs.includes(subSlug)
      ? activeSubs.filter((s) => s !== subSlug)
      : [...activeSubs, subSlug];
    setActiveSubs(next);
    trackFilterChange(category.slug, { subcategories: next, sort });
    if (next.length) {
      setSearchParams({ sub: next.join(',') }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const clearFilters = () => {
    setActiveSubs([]);
    setSearchParams({}, { replace: true });
    trackFilterChange(category.slug, { subcategories: [], sort });
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Categories', path: '/categories' },
              { name: category.name },
            ]}
          />
          <p className="eyebrow">{category.tagline}</p>
          <h1>{category.name}</h1>
          <p className="lede">{category.description}</p>

          {category.popularSearches?.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <p className="text-xs text-muted" style={{ marginBottom: '8px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Popular in this category
              </p>
              <ul className="chip-row">
                {category.popularSearches.map((term) => (
                  <li key={term}>
                    <Link
                      to={`/search?q=${encodeURIComponent(term)}`}
                      className="chip"
                      style={{ textDecoration: 'none' }}
                    >
                      {term}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="container section">
        {/* ------------------------------------------------------- Products */}
        <section aria-labelledby="cat-products">
          <div className="section-head">
            <div className="section-head__text">
              <h2 id="cat-products">
                {activeSubs.length ? 'Filtered products' : 'Featured products'}
              </h2>
              <p>
                Product information below is original editorial copy. We do not publish ratings,
                review counts or prices we have not verified ourselves.
              </p>
            </div>
          </div>

          {subcategories.length > 0 && (
            <FilterBar
              controlIdPrefix={`cat-${category.slug}`}
              subcategories={subcategories}
              active={activeSubs}
              onToggle={toggleSub}
              onClear={clearFilters}
              sort={sort}
              sortOptions={SORT_OPTIONS}
              onSortChange={(value) => {
                setSort(value);
                trackFilterChange(category.slug, { subcategories: activeSubs, sort: value });
              }}
              resultCount={visibleProducts.length}
            />
          )}

          {visibleProducts.length ? (
            <div className="grid grid-3">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  placement={`category:${category.slug}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products in this selection yet"
              icon={<SparkleIcon width={46} height={46} />}
            >
              <p>
                We are still writing up products for this subcategory. The buying guides below cover
                what to look for in the meantime.
              </p>
            </EmptyState>
          )}
        </section>

        <div style={{ marginTop: '32px' }}>
          <DisclosureNotice compact />
        </div>

        {/* ------------------------------------------------- Buying guides */}
        {guides.length > 0 && (
          <section className="section--tight" aria-labelledby="cat-guides">
            <div className="section-head">
              <div className="section-head__text">
                <h2 id="cat-guides">Latest buying guides</h2>
                <p>Long-form editorial for this category, from first principles to final shortlist.</p>
              </div>
              <Link to="/buying-guides" className="link-arrow">
                All guides <ArrowRight width={14} height={14} />
              </Link>
            </div>
            <div className="grid grid-3">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* --------------------------------------------------- Comparisons */}
        {categoryComparisons.length > 0 && (
          <section className="section--tight" aria-labelledby="cat-compare">
            <div className="section-head">
              <div className="section-head__text">
                <h2 id="cat-compare">Popular comparisons</h2>
                <p>
                  Options placed side by side on the criteria that decide the purchase — with a
                  reason next to every label.
                </p>
              </div>
              <Link to="/compare" className="link-arrow">
                All comparisons <ArrowRight width={14} height={14} />
              </Link>
            </div>
            <div className="grid grid-2">
              {categoryComparisons.map((comparison) => (
                <ComparisonCard key={comparison.id} comparison={comparison} />
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------------ Related categories */}
        <nav className="section--tight" aria-labelledby="cat-related">
          <h2 id="cat-related" style={{ fontSize: 'var(--fs-xl)', marginBottom: '16px' }}>
            Other categories
          </h2>
          <ul className="chip-row">
            {liveCategories.filter((c) => c.slug !== category.slug).map((other) => (
              <li key={other.slug}>
                <Link to={`/category/${other.slug}`} className="chip chip--brand" style={{ textDecoration: 'none' }}>
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
