/**
 * ============================================================================
 * DEPLOYMENT CONFIGURATION — the single source of truth for public paths
 * ============================================================================
 * Plain Node module (no Vite-only syntax) so it can be imported by:
 *   • vite.config.js            -> sets Vite's asset base
 *   • plugins/sitemap-plugin.js -> builds sitemap URLs
 *   • src/config/site.js        -> builds canonical / Open Graph URLs
 *
 * Production hosting target: Render Static Site at the domain root.
 * GitHub Pages remains a backup/archive deployment path on main, but this
 * development branch is intentionally configured for clean browser URLs.
 */

/**
 * Base path the app is served from.
 *
 *   Render/custom domain at root -> '/'
 *
 * Keep this at '/' for SmartBuyIndia's production URL structure:
 *   /product/...
 *   /category/...
 *   /guide/...
 */
export const SITE_BASE = '/';

/**
 * Public origin, WITHOUT a trailing slash.
 * Leave as '' during development; set the final production origin before
 * launch so canonical, Open Graph and sitemap URLs become absolute.
 *
 *   Render temporary URL -> 'https://smartbuyindia.onrender.com'
 *   Custom domain       -> 'https://www.smartbuyindia.in'
 */
export const SITE_URL = '';

/**
 * Use normal browser URLs for React Router.
 *
 * Render Static Site needs a rewrite rule from /* to /index.html so direct
 * visits to nested routes are handled by React Router.
 */
export const ROUTER_MODE = 'browser';
