import { FilterIcon } from './Icons.jsx';

/**
 * Accessible filter bar for category pages.
 *
 * - Subcategory filters are toggle buttons with `aria-pressed` (multi-select).
 * - Sorting is a real <select> with a visible <label>.
 * - Touch targets are ≥40px so they work comfortably on a phone.
 */
export default function FilterBar({
  subcategories = [],
  active = [],
  onToggle,
  sort,
  sortOptions = [],
  onSortChange,
  resultCount,
  onClear,
  controlIdPrefix = 'filter',
}) {
  const sortId = `${controlIdPrefix}-sort`;

  return (
    <div className="filter-bar">
      <p className="filter-bar__label">
        <FilterIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
        Filter
      </p>

      <ul className="filter-chips">
        {subcategories.map((sub) => {
          const pressed = active.includes(sub.slug);
          return (
            <li key={sub.slug}>
              <button
                type="button"
                className="filter-chip"
                aria-pressed={pressed}
                onClick={() => onToggle?.(sub.slug)}
              >
                {sub.name}
                {typeof sub.count === 'number' && (
                  <span className="filter-chip__count">{sub.count}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {active.length > 0 && (
        <button type="button" className="btn btn--ghost btn--sm" onClick={onClear}>
          Clear {active.length} filter{active.length === 1 ? '' : 's'}
        </button>
      )}

      {sortOptions.length > 0 && (
        <div className="filter-bar__select">
          <label className="field__label text-xs" htmlFor={sortId}>
            Sort by
          </label>
          <select id={sortId} className="select" value={sort} onChange={(e) => onSortChange?.(e.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {typeof resultCount === 'number' && (
        <p className="sr-only" role="status" aria-live="polite">
          {resultCount} result{resultCount === 1 ? '' : 's'} shown
        </p>
      )}
    </div>
  );
}
