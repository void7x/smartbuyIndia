import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { trackNotFound } from '../utils/analytics.js';
import { liveCategories } from '../data/categories.js';
import { guidesByRecency } from '../data/buyingGuides.js';
import { SearchIcon, ArrowRight } from '../components/Icons.jsx';

export default function NotFound() {
  const location = useLocation();
  useEffect(() => {
    trackNotFound(location.pathname + location.search);
  }, [location.pathname, location.search]);

  useSeo({
    title: 'Page not found',
    description: 'That page does not exist on SmartBuyIndia. Browse categories, buying guides and product comparisons instead.',
    path: '/404',
    noIndex: true,
  });

  return (
    <div className="container section--lg">
      <div className="empty-state" style={{ padding: '64px 24px' }}>
        <div className="empty-state__icon" aria-hidden="true">
          <SearchIcon width={46} height={46} />
        </div>
        <p className="eyebrow">Error 404</p>
        <h1 style={{ fontSize: 'var(--fs-2xl)', marginBottom: '8px' }}>We couldn&rsquo;t find that page</h1>
        <p>
          The link may be old, or the page may have moved. Everything on SmartBuyIndia is reachable
          from the categories and buying-guide indexes below.
        </p>

        <div className="btn-row">
          <Link to="/" className="btn">
            Go to the homepage
          </Link>
          <Link to="/categories" className="btn btn--outline">
            Browse categories
          </Link>
        </div>
      </div>

      <section className="section--tight" aria-labelledby="nf-cats">
        <h2 id="nf-cats" style={{ fontSize: 'var(--fs-xl)', marginBottom: '16px' }}>
          Categories
        </h2>
        <ul className="chip-row">
          {liveCategories.map((category) => (
            <li key={category.slug}>
              <Link className="chip chip--brand" to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section--tight" aria-labelledby="nf-guides">
        <h2 id="nf-guides" style={{ fontSize: 'var(--fs-xl)', marginBottom: '16px' }}>
          Buying guides
        </h2>
        <ul className="footer__list" style={{ gap: '12px' }}>
          {guidesByRecency.slice(0, 5).map((guide) => (
            <li key={guide.slug}>
              <Link className="link-arrow" to={`/guide/${guide.slug}`}>
                {guide.title} <ArrowRight width={14} height={14} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
