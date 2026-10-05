import { Link } from 'react-router-dom';
import { getCategoryName } from '../data/categories.js';
import { SwapIcon, ArrowRight } from './Icons.jsx';
import { getProductBySlug } from '../data/products.js';
import { formatDate, cx } from '../utils/format.js';

/** Compact card for a comparison page. */
export default function ComparisonCard({ comparison, className }) {
  if (!comparison) return null;

  const items = (comparison.productSlugs || [])
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <article className={cx('card card--relative', className)}>
      <div className="card__body">
        <p className="card__meta">
          <SwapIcon
            width={13}
            height={13}
            style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }}
          />
          Comparison · {getCategoryName(comparison.categorySlug)}
        </p>

        <h3 className="card__title">
          <Link to={`/compare/${comparison.slug}`}>{comparison.title}</Link>
        </h3>

        <p className="card__text">{comparison.intro}</p>

        <ul className="chip-row" style={{ marginTop: '4px' }}>
          {items.slice(0, 3).map((item) => (
            <li key={item.slug}>
              <span className="chip chip--brand">{item.name.replace(/^Example /, '')}</span>
            </li>
          ))}
          <li>
            <span className="chip">{(comparison.rows || []).length} criteria compared</span>
          </li>
        </ul>

        <div className="card__footer">
          <Link to={`/compare/${comparison.slug}`} className="link-arrow">
            Open comparison <ArrowRight width={14} height={14} />
          </Link>
          {comparison.updatedAt && (
            <span className="text-xs text-muted">Updated {formatDate(comparison.updatedAt)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
