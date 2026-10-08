import { Link } from 'react-router-dom';
import { CategoryIcon, ArrowRight } from './Icons.jsx';
import { products } from '../data/products.js';
import { cx } from '../utils/format.js';

/** Category tile for the homepage grid and /categories. */
export default function CategoryCard({ category, showCount = true, className }) {
  if (!category) return null;

  const count = products.filter((p) => p.categorySlug === category.slug).length;
  const coming = Boolean(category.comingSoon);

  const inner = (
    <>
      <div className="category-card__top">
        <span className="category-card__icon" style={{ color: category.accent }}>
          <CategoryIcon name={category.icon} />
        </span>
        <div>
          <h3 className="card__title" style={{ fontSize: 'var(--fs-md)' }}>
            {category.name}
          </h3>
          {showCount && !coming && (
            <p className="text-xs text-muted" style={{ marginTop: 2 }}>
              {count} {count === 1 ? 'product' : 'products'}
              {(category.subcategories || []).length > 0 &&
                ` · ${category.subcategories.length} subcategories`}
            </p>
          )}
          {coming && (
            <p className="text-xs text-muted" style={{ marginTop: 2 }}>
              Not live yet
            </p>
          )}
        </div>
      </div>

      <p className="card__text" style={{ marginTop: '12px' }}>
        {category.tagline}
      </p>

      {!coming && (category.subcategories || []).length > 0 && (
        <ul className="chip-row" style={{ marginTop: '12px' }}>
          {category.subcategories.slice(0, 4).map((sub) => (
            <li key={sub.slug}>
              <span className="chip">{sub.name}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="card__footer">
        {coming ? (
          <span className="badge badge--muted">Coming soon</span>
        ) : (
          <span className="link-arrow">
            Explore {category.name} <ArrowRight width={14} height={14} />
          </span>
        )}
      </div>
    </>
  );

  if (coming) {
    return (
      <div className={cx('card card--link category-card--coming', className)} style={{ '--category-accent': category.accent }} aria-disabled="true">
        <div className="card__body">{inner}</div>
      </div>
    );
  }

  return (
    <Link
      to={`/category/${category.slug}`}
      className={cx('card card--link category-card--home', className)} style={{ '--category-accent': category.accent }}
      aria-label={`${category.name} — browse products and guides`}
    >
      <div className="card__body">{inner}</div>
    </Link>
  );
}
