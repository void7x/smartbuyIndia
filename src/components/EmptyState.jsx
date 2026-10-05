import { Link } from 'react-router-dom';
import { SearchIcon } from './Icons.jsx';

/**
 * Honest empty state. Used whenever a list would otherwise be blank — e.g. the
 * deals page before any price has been verified. Never fake content to fill it.
 */
export default function EmptyState({
  icon,
  title = 'Nothing here yet',
  children,
  actions = [],
  headingLevel: Heading = 'h3',
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        {icon || <SearchIcon width={46} height={46} />}
      </div>
      <Heading>{title}</Heading>
      {children && <div style={{ marginTop: '8px' }}>{children}</div>}
      {actions.length > 0 && (
        <div className="btn-row">
          {actions.map((action) =>
            action.to ? (
              <Link key={action.label} to={action.to} className="btn btn--outline">
                {action.label}
              </Link>
            ) : (
              <button
                key={action.label}
                type="button"
                className="btn btn--outline"
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
