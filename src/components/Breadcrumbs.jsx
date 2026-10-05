import { Link } from 'react-router-dom';
import { ChevronRight } from './Icons.jsx';

/**
 * <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Current' }]} />
 * Renders semantic <nav aria-label="Breadcrumb"> + <ol>. The last item is
 * always plain text with aria-current="page".
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`}>
              {last || !item.path ? (
                <span aria-current={last ? 'page' : undefined}>{item.name}</span>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
              {!last && (
                <ChevronRight className="breadcrumbs__sep" width={13} height={13} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
