import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { trackNotFound } from '../utils/analytics.js';
import { liveCategories } from '../data/categories.js';
import { guidesByRecency } from '../data/buyingGuides.js';
import { SearchIcon, ArrowRight, BrandMark, CompassIcon, BookIcon } from '../components/Icons.jsx';

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
      <div className="not-found-hero">
        <div className="not-found-hero__visual" aria-hidden="true">
          <BrandMark size={58} />
          <span>404</span>
        </div>
        <div className="not-found-hero__copy">
          <p className="eyebrow">Wrong turn</p>
          <h1>Looks like this page isn't in our catalogue.</h1>
          <p>
            The link may be old, the page may have moved, or you may have taken an adventurous route
            through the URL. Your shopping journey doesn't have to stop here.
          </p>
          <div className="btn-row">
            <Link to="/" className="btn btn--accent">
              Back to SmartBuyIndia <ArrowRight width={15} height={15} />
            </Link>
            <Link to="/categories" className="btn btn--outline">
              Browse categories
            </Link>
          </div>
        </div>
      </div>

      <div className="empty-state" style={{ padding: '30px 24px' }}>
        <div className="empty-state__icon" aria-hidden="true">
          <CompassIcon width={38} height={38} />
        </div>
        <p className="card__meta">Still useful from here</p>
        <p className="text-muted">
          Try a category or a buying guide while we get the missing page sorted.
        </p>
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
