import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { search, RESULT_TYPE_LABELS, suggestedSearches } from '../utils/search.js';
import { trackSearch } from '../utils/analytics.js';
import { liveCategories } from '../data/categories.js';
import { breadcrumbSchema } from '../utils/seo.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ProductCard from '../components/ProductCard.jsx';
import GuideCard from '../components/GuideCard.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ComparisonCard from '../components/ComparisonCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { SearchIcon, ArrowRight } from '../components/Icons.jsx';

/**
 * /search?q=…  — full-page results view.
 * The header overlay handles quick lookups; this page handles the same query
 * with grouping, a shareable URL and enough context to keep browsing.
 */
export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [draft, setDraft] = useState(query);
  const tracked = useMemo(() => ({ current: '' }), []);

  useEffect(() => setDraft(query), [query]);

  const results = useMemo(() => search(query, { limit: 60 }), [query]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2 || q === tracked.current) return;
    tracked.current = q;
    trackSearch(q, results.total);
  }, [query, results.total, tracked]);

  useSeo({
    title: query.trim() ? `Search results for “${query.trim()}”` : 'Search',
    description: query.trim()
      ? `Products, categories, buying guides and comparisons on SmartBuyIndia matching “${query.trim()}”.`
      : 'Search SmartBuyIndia for products, categories, buying guides and comparisons.',
    path: query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search',
    noIndex: true, // Search result pages should not compete with the real content pages.
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Search', path: '/search' },
      ]),
    ],
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const value = draft.trim();
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  const grouped = results.grouped;
  const hasResults = results.all.length > 0;

  return (
    <>
      <div className="page-header">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Search' }]} />
          <h1>Search SmartBuyIndia</h1>

          <form onSubmit={onSubmit} role="search" style={{ marginTop: '20px' }}>
            <label className="sr-only" htmlFor="search-page-input">
              Search products, categories and buying guides
            </label>
            <div className="hero__search" style={{ background: '#fff', marginBottom: '12px' }}>
              <input
                id="search-page-input"
                type="search"
                value={draft}
                placeholder="Try “air fryer”, “earbuds for commute”, “study lamp”"
                onChange={(event) => setDraft(event.target.value)}
                autoComplete="off"
                style={{ color: 'var(--ink-900)' }}
              />
              <button type="submit" className="btn">
                <SearchIcon width={18} height={18} />
                <span>Search</span>
              </button>
            </div>
          </form>

          <div className="suggestion-chips">
            {suggestedSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setDraft(term);
                  setSearchParams({ q: term }, { replace: true });
                }}
              >
                {term}
              </button>
            ))}
          </div>

          <p className="inline-note" style={{ marginTop: '14px' }}>
            Search runs entirely in your browser — your query is never sent to a server. We log the
            search term in aggregate only, to understand what people are looking for.
          </p>
        </div>
      </div>

      <div className="container section">
        {!query.trim() && (
          <>
            <p className="lede" style={{ marginBottom: '28px' }}>
              Type a product type, a category or a phrase such as “best electric kettle for office”.
              Or start from a category below.
            </p>
            <div className="grid grid-3">
              {liveCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </>
        )}

        {query.trim() && !hasResults && (
          <EmptyState
            icon={<SearchIcon width={46} height={46} />}
            title={`No results for “${query.trim()}”`}
          >
            <p>
              Try a shorter or broader term — “kettle” rather than “1.8 litre stainless steel kettle
              with temperature control”. You can also browse by category, or tell us what you were
              hoping to find.
            </p>
          </EmptyState>
        )}

        {query.trim() && !hasResults && (
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <Link to="/categories" className="btn btn--outline">
              Browse categories
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Suggest a topic
            </Link>
          </div>
        )}

        {query.trim() && hasResults && (
          <>
            <p className="results-meta" role="status" aria-live="polite">
              {results.total} result{results.total === 1 ? '' : 's'} for “{query.trim()}”
            </p>

            {grouped.category.length > 0 && (
              <SearchGroup title={RESULT_TYPE_LABELS.category} count={grouped.category.length}>
                <div className="grid grid-3">
                  {grouped.category.slice(0, 6).map((item) => (
                    <CategoryCard key={item.id} category={item.category} />
                  ))}
                </div>
              </SearchGroup>
            )}

            {grouped.product.length > 0 && (
              <SearchGroup title={RESULT_TYPE_LABELS.product} count={grouped.product.length}>
                <div className="grid grid-3">
                  {grouped.product.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item.product}
                      placement="search-results"
                      showFeatures={false}
                    />
                  ))}
                </div>
              </SearchGroup>
            )}

            {grouped.guide.length > 0 && (
              <SearchGroup title={RESULT_TYPE_LABELS.guide} count={grouped.guide.length}>
                <div className="grid grid-3">
                  {grouped.guide.map((item) => (
                    <GuideCard key={item.id} guide={item.guide} />
                  ))}
                </div>
              </SearchGroup>
            )}

            {grouped.comparison.length > 0 && (
              <SearchGroup title={RESULT_TYPE_LABELS.comparison} count={grouped.comparison.length}>
                <div className="grid grid-2">
                  {grouped.comparison.map((item) => (
                    <ComparisonCard key={item.id} comparison={item.comparison} />
                  ))}
                </div>
              </SearchGroup>
            )}

            <div className="callout callout--plain" style={{ marginTop: '32px' }}>
              <span className="callout__title">Not what you were looking for?</span>
              Our catalogue is deliberately small in this first release — we publish a category only
              once the research is done.{' '}
              <Link to="/contact" className="link-arrow" style={{ display: 'inline-flex' }}>
                Tell us what to cover next <ArrowRight width={13} height={13} />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function SearchGroup({ title, count, children }) {
  return (
    <section className="section--tight" aria-labelledby={`sg-${title.replace(/\s+/g, '-')}`}>
      <div className="section-head" style={{ marginBottom: '16px' }}>
        <div className="section-head__text">
          <h2 id={`sg-${title.replace(/\s+/g, '-')}`} style={{ fontSize: 'var(--fs-xl)' }}>
            {title} <span className="text-muted text-sm">({count})</span>
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}
