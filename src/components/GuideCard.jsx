import { Link } from 'react-router-dom';
import { getCategoryName } from '../data/categories.js';
import { ClockIcon, ArrowRight, BookIcon } from './Icons.jsx';
import { formatDate } from '../utils/format.js';
import { cx } from '../utils/format.js';

/**
 * Buying-guide card. Guides are editorial content pages — the card never
 * implies a ranking, a test result or a current market position.
 */
export default function GuideCard({ guide, showMeta = true, className }) {
  if (!guide) return null;

  return (
    <article className={cx('card card--relative', className)}>
      <div className="card__body">
        {showMeta && (
          <p className="card__meta">
            <BookIcon
              width={13}
              height={13}
              style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }}
            />
            Buying guide · {getCategoryName(guide.categorySlug)}
          </p>
        )}

        <h3 className="card__title">
          <Link to={`/guide/${guide.slug}`}>{guide.title}</Link>
        </h3>

        <p className="card__text">{guide.metaDescription}</p>

        <ul className="chip-row" style={{ marginTop: '4px' }}>
          {guide.readingTimeMinutes && (
            <li>
              <span className="chip">
                <ClockIcon width={12} height={12} /> {guide.readingTimeMinutes} min read
              </span>
            </li>
          )}
          <li>
            <span className="chip">
              {(guide.whatToLookFor || []).length} buying criteria
            </span>
          </li>
          {guide.isDemo && (
            <li>
              <span className="badge badge--demo">Demo guide</span>
            </li>
          )}
        </ul>

        <div className="card__footer">
          <Link to={`/guide/${guide.slug}`} className="link-arrow">
            Read the guide <ArrowRight width={14} height={14} />
          </Link>
          {guide.updatedAt && (
            <span className="text-xs text-muted">Updated {formatDate(guide.updatedAt)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
