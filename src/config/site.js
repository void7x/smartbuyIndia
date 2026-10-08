/**
 * ============================================================================
 * SITE CONFIGURATION  —  brand, identity and defaults
 * ============================================================================
 * Deployment paths (base path, public origin, router mode) live in
 * `/site.config.js` at the project root so that vite.config.js, the sitemap
 * generator and the app all read exactly the same values.
 */

import {
  SITE_BASE as CONFIGURED_BASE,
  SITE_URL as CONFIGURED_URL,
  ROUTER_MODE as CONFIGURED_ROUTER,
} from '../../site.config.js';

/** Brand name shown in the wordmark, titles and schema.org markup. */
export const SITE_NAME = 'SmartBuyIndia';

/** Tagline. Change it here and it updates everywhere (header, footer, meta). */
export const SITE_TAGLINE = 'Smart choices. Better buys.';

/** One-line description used for meta tags and the Organization schema. */
export const SITE_DESCRIPTION =
  'SmartBuyIndia helps Indian shoppers research products with original buying guides, honest comparisons and product shortlists — then sends you to Amazon.in to buy.';

/**
 * Public origin of the deployed site, without a trailing slash.
 * Empty string until a domain exists — canonical tags then fall back to
 * root-relative URLs and the sitemap omits the host.
 */
export const SITE_URL = CONFIGURED_URL || '';

/**
 * Base path the app is served from. In the browser Vite replaces
 * `import.meta.env.BASE_URL`; when this module is imported by Node (sitemap
 * generation) the configured value is used instead.
 */
export const SITE_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ||
  CONFIGURED_BASE ||
  '/';

/** 'hash' (default, GitHub Pages safe) or 'browser' (clean URLs). */
export const ROUTER_MODE = CONFIGURED_ROUTER || 'hash';

/** Contact / legal placeholders — replace before launch. */
export const CONTACT_EMAIL = 'hello@smartbuyindia.example';
export const LEGAL_ENTITY = 'SmartBuyIndia';
export const LEGAL_CITY = 'Mumbai, Maharashtra, India';

/** Locale + currency used by every formatter in the app. */
export const LOCALE = 'en-IN';
export const CURRENCY = 'INR';

/** Exact disclosure wording required by the Amazon Associates Operating Agreement. */
export const AMAZON_ASSOCIATE_DISCLOSURE = 'As an Amazon Associate I earn from qualifying purchases.';

/** Launch year, used in the footer copyright. */
export const LAUNCH_YEAR = 2026;

/**
 * Social links. Set `url` to a real profile to enable an item; leaving it null
 * shows a "coming soon" state instead of a dead link.
 */
export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', url: null, handle: '@smartbuyindia' },
  { id: 'youtube', label: 'YouTube', url: null, handle: 'SmartBuyIndia' },
  { id: 'x', label: 'X', url: null, handle: '@smartbuyindia' },
];

/** Default Open Graph / Twitter share image (relative to `public/`). */
export const DEFAULT_SHARE_IMAGE = '/images/og/og-default.png';
