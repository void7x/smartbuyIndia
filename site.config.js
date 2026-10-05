/**
 * ============================================================================
 * DEPLOYMENT CONFIGURATION — the single source of truth for paths
 * ============================================================================
 * Plain Node module (no Vite-only syntax) so it can be imported by:
 *   • vite.config.js            -> sets `base` for asset URLs
 *   • plugins/sitemap-plugin.js -> builds absolute <loc> URLs
 *   • src/config/site.js        -> builds canonical / Open Graph URLs at runtime
 *
 * Change the values here ONCE when you deploy or attach a domain.
 */

/**
 * Base path the app is served from.
 *
 *   GitHub Pages project site -> '/smartbuyindia/'   (trailing slash required)
 *   GitHub Pages user site    -> '/'                 (https://<user>.github.io/)
 *   Custom domain at root     -> '/'
 */
export const SITE_BASE = '/smartbuyindia/';

/**
 * Public origin, WITHOUT a trailing slash. Leave as '' until a domain exists —
 * canonical tags then fall back to root-relative URLs, and the generated
 * robots.txt keeps its Sitemap line commented out.
 *
 *   GitHub Pages -> 'https://<your-github-username>.github.io/smartbuyindia'
 *   Custom domain-> 'https://www.smartbuyindia.in'
 */
export const SITE_URL = '';

/**
 * 'hash'    -> URLs like /#/product/example-air-fryer
 *              Works on GitHub Pages with zero extra configuration and never
 *              404s on a hard refresh or a shared deep link. Default.
 * 'browser' -> clean URLs like /product/example-air-fryer
 *              Needs a real domain plus a server fallback (see README).
 */
export const ROUTER_MODE = 'hash';
