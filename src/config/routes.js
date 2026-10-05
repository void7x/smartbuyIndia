/**
 * ============================================================================
 * ROUTE TABLE
 * ============================================================================
 * One list of every route in the app. The <Routes> tree, the sitemap generator
 * and internal links all derive from the data layer + this file, so adding a
 * page type means adding it here once.
 */

export const ROUTES = {
  home: '/',
  categories: '/categories',
  category: '/category/:slug',
  product: '/product/:slug',
  compare: '/compare/:slug',
  compareIndex: '/compare',
  buyingGuides: '/buying-guides',
  guide: '/guide/:slug',
  deals: '/deals',
  search: '/search',
  about: '/about',
  contact: '/contact',
  disclosure: '/disclosure',
  privacy: '/privacy',
  terms: '/terms',
  notFound: '*',
};

/** Path builders — keep links consistent and refactor-safe. */
export const paths = {
  category: (slug) => `/category/${slug}`,
  product: (slug) => `/product/${slug}`,
  guide: (slug) => `/guide/${slug}`,
  compare: (slug) => `/compare/${slug}`,
  search: (query) => (query ? `/search?q=${encodeURIComponent(query)}` : '/search'),
};
