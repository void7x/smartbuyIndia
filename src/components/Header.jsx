import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE_NAME, SITE_TAGLINE } from '../config/site.js';
import { IS_DEMO_CONTENT } from '../config/content.js';
import { liveCategories } from '../data/categories.js';
import { products, buyingGuides } from '../data/index.js';
import { BrandMark, MenuIcon, CloseIcon, SearchIcon, ChevronRight } from './Icons.jsx';
import SearchOverlay from './SearchOverlay.jsx';
import { trackInternalClick } from '../utils/analytics.js';

/** Primary navigation. Add a route here and it appears on desktop + mobile. */
export const NAV_LINKS = [
  { label: 'Categories', to: '/categories' },
  { label: 'Buying Guides', to: '/buying-guides' },
  { label: 'Deals', to: '/deals' },
  { label: 'About', to: '/about' },
];

function isActive(prefix, pathname) {
  if (prefix === '/') return pathname === '/';
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Close overlays whenever the route changes.
  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Global keyboard shortcuts: "/" or Cmd/Ctrl+K opens search.
  useEffect(() => {
    const onKey = (event) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (typing) return;
      if (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const isDemo = IS_DEMO_CONTENT;

  return (
    <>
      {isDemo && (
        <div className="demo-ribbon">
          <div className="container">
            <strong>Staging build.</strong> Some catalogue entries are still demo content; researched
            drafts are visible here for review and are not indexed for search.
          </div>
        </div>
      )}

      <header className="site-header">
        <div className="container site-header__inner">
          <Link
            to="/"
            className="brand"
            aria-label={`${SITE_NAME} — home`}
            onClick={() => trackInternalClick('logo', '/')}
          >
            <BrandMark className="brand__mark" />
            <span className="brand__text">
              <span className="brand__name">
                Smart<em>Buy</em>India
              </span>
              <span className="brand__tagline">{SITE_TAGLINE}</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                aria-current={isActive(link.to, location.pathname) ? 'page' : undefined}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <span className="header__spacer" />

          <div className="header__actions">
            <button
              type="button"
              className="icon-btn search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Search SmartBuyIndia"
              aria-haspopup="dialog"
            >
              <SearchIcon />
              <span className="search-trigger__label">Search</span>
              <kbd aria-hidden="true">/</kbd>
            </button>

            <button
              type="button"
              className="icon-btn menu-toggle"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {drawerOpen && (
        <div className="drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="drawer__head">
            <Link to="/" className="brand" aria-label={`${SITE_NAME} — home`}>
              <BrandMark className="brand__mark" size={30} />
              <span className="brand__text">
                <span className="brand__name">
                  Smart<em>Buy</em>India
                </span>
                <span className="brand__tagline">{SITE_TAGLINE}</span>
              </span>
            </Link>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="drawer__body">
            <div className="drawer__section">
              <button
                type="button"
                className="btn btn--outline btn--block btn--lg"
                onClick={() => {
                  setDrawerOpen(false);
                  setSearchOpen(true);
                }}
              >
                <SearchIcon width={18} height={18} /> Search products &amp; guides
              </button>
            </div>

            <nav className="drawer__section" aria-label="Main">
              <p className="drawer__label">Browse</p>
              <ul className="drawer__links">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>
                      {link.label}
                      <ChevronRight width={16} height={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="drawer__section" aria-label="Categories">
              <p className="drawer__label">Categories</p>
              <ul className="drawer__links">
                {liveCategories.map((category) => {
                  const count = products.filter((p) => p.categorySlug === category.slug).length;
                  return (
                    <li key={category.slug}>
                      <Link to={`/category/${category.slug}`}>
                        {category.name}
                        <span className="count">{count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <nav className="drawer__section" aria-label="Latest buying guides">
              <p className="drawer__label">Latest buying guides</p>
              <ul className="drawer__links">
                {buyingGuides.slice(0, 4).map((guide) => (
                  <li key={guide.slug}>
                    <Link to={`/guide/${guide.slug}`}>{guide.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="drawer__section">
              <p className="drawer__label">Company &amp; legal</p>
              <ul className="drawer__links">
                <li>
                  <Link to="/about">About SmartBuyIndia</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/disclosure">Affiliate disclosure</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of use</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
