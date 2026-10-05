import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { search, RESULT_TYPE_LABELS, suggestedSearches } from '../utils/search.js';
import { trackSearch } from '../utils/analytics.js';
import { CloseIcon, SearchIcon, ArrowRight } from './Icons.jsx';

const GROUP_ORDER = ['product', 'guide', 'category', 'comparison'];
const MAX_PER_GROUP = 5;

/**
 * Instant client-side search.
 * - Opens with a button, the `/` keyboard shortcut, or Cmd/Ctrl+K
 * - Arrow keys + Enter navigate, Escape closes, focus is trapped and restored
 * - Results are grouped by type so a shopper can see categories, products and
 *   guides at once on a small screen
 */
export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocus = useRef(null);
  const navigate = useNavigate();
  const labelId = useId();
  const trackedFor = useRef('');

  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    document.body.style.overflow = 'hidden';

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key === 'Tab' && panelRef.current) {
        // Simple focus trap
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocus.current?.focus?.();
    };
  }, [open, onClose]);

  const results = useMemo(() => search(query, { limit: 30 }), [query]);

  const flat = useMemo(() => {
    const list = [];
    GROUP_ORDER.forEach((type) => {
      (results.grouped[type] || []).slice(0, MAX_PER_GROUP).forEach((item) => list.push(item));
    });
    return list;
  }, [results]);

  useEffect(() => setActiveIndex(0), [query]);

  // Debounced analytics — we log the intent, never anything identifying.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2 || q === trackedFor.current) return undefined;
    const handle = window.setTimeout(() => {
      trackedFor.current = q;
      trackSearch(q, results.total);
    }, 600);
    return () => window.clearTimeout(handle);
  }, [query, results.total]);

  const go = useCallback(
    (item) => {
      if (!item) return;
      onClose();
      navigate(item.href);
    },
    [navigate, onClose],
  );

  if (!open) return null;

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (flat[activeIndex]) {
        go(flat[activeIndex]);
      } else if (query.trim()) {
        onClose();
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const highlight = (text) => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return text;
    const tokens = q.split(/\s+/).filter((t) => t.length > 1);
    if (!tokens.length) return text;
    const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    // 'i' only — a global regex has stateful .test() and would mis-highlight.
    const pattern = new RegExp(`(${escaped.join('|')})`, 'i');
    return String(text)
      .split(pattern)
      .map((part, i) =>
        pattern.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
      );
  };

  let renderedIndex = -1;

  return (
    <div className="search-overlay" onClick={onClose} role="presentation">
      <div
        className="search-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-panel__head">
          <SearchIcon />
          <label className="sr-only" htmlFor="site-search-input" id={labelId}>
            Search products, categories and buying guides
          </label>
          <input
            id="site-search-input"
            className="search-panel__input"
            type="search"
            inputMode="search"
            autoComplete="off"
            placeholder="Search air fryers, earbuds, buying guides…"
            value={query}
            ref={inputRef}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-describedby="search-help"
            role="combobox"
            aria-expanded={flat.length > 0}
            aria-controls="search-results"
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">
            <CloseIcon />
          </button>
        </div>

        <div className="search-panel__body" id="search-results" role="listbox" aria-label="Search results">
          {!query.trim() && (
            <div className="search-group">
              <p className="search-group__title">Popular searches</p>
              <div className="suggestion-chips">
                {suggestedSearches.map((term) => (
                  <button type="button" key={term} onClick={() => setQuery(term)}>
                    {term}
                  </button>
                ))}
              </div>
              <p className="inline-note" style={{ marginTop: '16px' }} id="search-help">
                Search runs entirely in your browser. Nothing you type is sent to a server.
              </p>
            </div>
          )}

          {query.trim() && flat.length === 0 && (
            <div className="search-group">
              <p className="text-sm text-muted">
                No matches for “{query.trim()}”. Try a broader term such as “kettle”, “earbuds” or
                “air fryer”.
              </p>
              <div className="btn-row" style={{ marginTop: '14px' }}>
                <button type="button" className="btn btn--outline btn--sm" onClick={() => setQuery('')}>
                  Clear search
                </button>
              </div>
            </div>
          )}

          {GROUP_ORDER.map((type) => {
            const items = (results.grouped[type] || []).slice(0, MAX_PER_GROUP);
            if (!items.length) return null;
            return (
              <div className="search-group" key={type}>
                <p className="search-group__title">{RESULT_TYPE_LABELS[type]}</p>
                {items.map((item) => {
                  renderedIndex += 1;
                  const isActive = renderedIndex === activeIndex;
                  return (
                    <button
                      type="button"
                      className="search-result"
                      key={`${item.type}-${item.id}`}
                      data-active={isActive}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => go(item)}
                      onMouseEnter={() => setActiveIndex(flat.indexOf(item))}
                    >
                      {item.meta && <span className="search-result__meta">{item.meta}</span>}
                      <span className="search-result__title">{highlight(item.title)}</span>
                      {item.subtitle && (
                        <span className="search-result__sub">{item.subtitle}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {query.trim() && flat.length > 0 && (
          <div className="search-panel__foot">
            <span className="kbd-hint">
              <kbd>↑</kbd>
              <kbd>↓</kbd> to navigate · <kbd>Enter</kbd> to open · <kbd>Esc</kbd> to close
            </span>
            <button
              type="button"
              className="link-arrow"
              onClick={() => {
                onClose();
                navigate(`/search?q=${encodeURIComponent(query.trim())}`);
              }}
            >
              See all {results.total} result{results.total === 1 ? '' : 's'} <ArrowRight width={14} height={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
