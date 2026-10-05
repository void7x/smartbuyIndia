/**
 * ---------------------------------------------------------------------------
 * Analytics-ready event layer
 * ---------------------------------------------------------------------------
 * Version 1 ships with NO analytics vendor. Every interesting user action is
 * funnelled through the functions below so that connecting Google Analytics 4,
 * Plausible or Umami later is a one-file change (see `transport`).
 *
 * Privacy: we only ever log non-personal, aggregated-safe values — product ids,
 * category slugs, placement names and search terms. No PII, no user ids, no
 * device fingerprinting, no cross-site tracking.
 */

import { IS_DEMO_CONTENT } from '../config/content.js';

/**
 * Plug your provider in here later, e.g.:
 *
 *   window.dataLayer?.push({ event: 'affiliate_click', ...payload });
 *
 * Set to a function to enable real reporting; leave null to keep the console
 * fallback used during development.
 */
let transport = null;

export function setAnalyticsTransport(fn) {
  transport = typeof fn === 'function' ? fn : null;
}

const emit = (name, payload = {}) => {
  const event = { event: name, ts: Date.now(), ...payload };

  if (transport) {
    try {
      transport(event);
    } catch (err) {
      // Analytics must never break the UI.
      console.warn('[analytics] transport error', err);
    }
    return;
  }

  if (IS_DEMO_CONTENT && typeof console !== 'undefined' && console.debug) {
    console.debug('[analytics]', name, payload);
  }
};

/* -- page views ------------------------------------------------------------ */

export const trackPageView = (path, meta = {}) => emit('page_view', { path, ...meta });
export const trackProductView = (product) =>
  emit('product_view', {
    productId: product?.id,
    slug: product?.slug,
    category: product?.category,
  });
export const trackCategoryView = (category) =>
  emit('category_view', { categorySlug: category?.slug, category: category?.name });
export const trackGuideView = (guide) =>
  emit('buying_guide_view', { guideId: guide?.id, slug: guide?.slug });
export const trackComparisonView = (comparison) =>
  emit('comparison_view', {
    comparisonSlug: comparison?.slug,
    productIds: comparison?.productIds || [],
  });
export const trackDealPageView = () => emit('deals_page_view');

/* -- interactions ---------------------------------------------------------- */

/**
 * Fired when a visitor clicks any outbound retailer CTA.
 * @param {string} productId
 * @param {string} category   Category name or slug
 * @param {string} placement  e.g. 'product-hero', 'compare-table', 'guide-inline'
 */
export function trackAffiliateClick(productId, category, placement) {
  emit('affiliate_click', { productId, category, placement });
}

export const trackSearch = (query, resultCount) =>
  emit('search', { query: String(query || '').slice(0, 120), resultCount });
export const trackInternalClick = (label, target) => emit('internal_click', { label, target });
export const trackFilterChange = (categorySlug, filters) =>
  emit('filter_change', { categorySlug, filters });
export const trackNewsletterSubmit = (source) => emit('newsletter_submit', { source });
export const trackContactSubmit = () => emit('contact_form_submit');
export const trackNotFound = (path) => emit('not_found', { path });
