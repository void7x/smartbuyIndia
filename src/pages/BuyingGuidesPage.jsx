import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { buyingGuides } from '../data/buyingGuides.js';
import { liveCategories, getCategoryBySlug } from '../data/categories.js';
import { breadcrumbSchema, itemListSchema } from '../utils/seo.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import GuideCard from '../components/GuideCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { trackFilterChange } from '../utils/analytics.js';
import { BookIcon } from '../components/Icons.jsx';

const SORT_OPTIONS = [
  { value: 'recent', label: 'Recently updated' },
  { value: 'az', label: 'Title (A–Z)' },
  { value: 'length', label: 'Longest read' },
];

/** /buying-guides — index of every guide, filterable by category. */
export default function BuyingGuidesPage() {
  const [activeCats, setActiveCats] = useState([]);
  const [sort, setSort] = useState('recent');

  const categoryChips = useMemo(
    () =>
      liveCategories.map((category) => ({
        slug: category.slug,
        name: category.name,
        count: buyingGuides.filter((g) => g.categorySlug === category.slug).length,
      })),
    [],
  );

  const visible = useMemo(() => {
    let list = activeCats.length
      ? buyingGuides.filter((g) => activeCats.includes(g.categorySlug))
      : buyingGuides;

    if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'length')
      list = [...list].sort((a, b) => (b.readingTimeMinutes || 0) - (a.readingTimeMinutes || 0));
    else
      list = [...list].sort((a, b) =>
        String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')),
      );
    return list;
  }, [activeCats, sort]);

  useSeo({
    title: 'Buying guides for Indian shoppers',
    description:
      'Original buying guides for air fryers, wireless earbuds, electric kettles, home workout equipment and desk setups — written around how products are actually used in Indian homes.',
    path: '/buying-guides',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Buying guides', path: '/buying-guides' },
      ]),
      itemListSchema(
        'SmartBuyIndia buying guides',
        buyingGuides.map((g) => ({ name: g.title, path: `/guide/${g.slug}` })),
      ),
    ],
  });

  const toggle = (catSlug) => {
    const next = activeCats.includes(catSlug)
      ? activeCats.filter((c) => c !== catSlug)
      : [...activeCats, catSlug];
    setActiveCats(next);
    trackFilterChange('buying-guides', { categories: next, sort });
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Buying guides' }]} />
          <p className="eyebrow">Editorial</p>
          <h1>Buying guides</h1>
          <p className="lede">
            Every guide works through the same shape: what to look for, the specifications that
            matter, a shortlist with reasons, what to avoid, and the questions people actually ask.
            None of them are rankings, award lists or test reports.
          </p>
        </div>
      </div>

      <div className="container section">
        <FilterBar
          controlIdPrefix="guides"
          subcategories={categoryChips}
          active={activeCats}
          onToggle={toggle}
          onClear={() => setActiveCats([])}
          sort={sort}
          sortOptions={SORT_OPTIONS}
          onSortChange={setSort}
          resultCount={visible.length}
        />

        {visible.length ? (
          <div className="grid grid-3">
            {visible.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookIcon width={46} height={46} />}
            title="No guides in this selection yet"
          >
            <p>
              We are still researching this category. Clear the filter to see everything currently
              published.
            </p>
          </EmptyState>
        )}

        <section className="section--tight" aria-labelledby="guide-categories">
          <h2 id="guide-categories" style={{ fontSize: 'var(--fs-xl)', marginBottom: '16px' }}>
            Guides by category
          </h2>
          <div className="grid grid-2">
            {liveCategories.map((category) => {
              const guides = buyingGuides.filter((g) => g.categorySlug === category.slug);
              return (
                <div className="panel" key={category.slug}>
                  <p className="panel__title">{category.name}</p>
                  {guides.length ? (
                    <ul className="footer__list" style={{ gap: '10px' }}>
                      {guides.map((guide) => (
                        <li key={guide.slug}>
                          <Link className="link-arrow" to={`/guide/${guide.slug}`}>
                            {guide.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted">
                      No guide published in this category yet.
                    </p>
                  )}
                  <p className="inline-note" style={{ marginTop: '12px' }}>
                    {getCategoryBySlug(category.slug)?.tagline}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="callout callout--info" style={{ marginTop: '32px' }}>
          <span className="callout__title">A note on how we write these</span>
          Guides are original editorial work based on published product specifications, common buyer
          questions and general category knowledge. We do not claim to have tested the products, we do
          not publish ratings, and we avoid medical, safety or performance claims that we cannot
          substantiate. Where a guide links to a retailer, it is an affiliate link — see our{' '}
          <Link to="/disclosure">disclosure</Link>.
        </div>
      </div>
    </>
  );
}
