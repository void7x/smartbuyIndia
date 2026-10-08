import {
  RETAILER,
  TRACKING_IDS,
  DEFAULT_CAMPAIGN,
  PLACEHOLDER_AFFILIATE_URL,
  AMAZON_ASSOCIATE_ID,
} from '../config/affiliate.js';

/**
 * ---------------------------------------------------------------------------
 * Affiliate link helper — the ONLY place in the app that builds retailer URLs.
 * ---------------------------------------------------------------------------
 * Usage:
 *   generateAffiliateUrl(product)                       // default campaign
 *   generateAffiliateUrl(product, { placement: 'hero' })
 *   generateAffiliateUrl(product, { campaign: 'instagram' })
 */

/** Resolve a campaign key to a tracking id, always falling back safely. */
export function getTrackingId(campaign = DEFAULT_CAMPAIGN) {
  return TRACKING_IDS[campaign] || TRACKING_IDS[DEFAULT_CAMPAIGN] || AMAZON_ASSOCIATE_ID;
}

/** True when the URL is not a real, live retailer link yet. */
export function isPlaceholderAffiliateUrl(url) {
  if (!url || typeof url !== 'string') return true;
  const trimmed = url.trim();
  return (
    trimmed === '' ||
    trimmed === PLACEHOLDER_AFFILIATE_URL ||
    trimmed.startsWith('#') ||
    /^https?:\/\/(www\.)?example\./i.test(trimmed)
  );
}

/** Build a safe `amazon.in/dp/<ASIN>` URL from an ASIN. */
export function buildAsinUrl(asin, tag) {
  const clean = String(asin || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
  if (clean.length < 8) return null;
  const url = new URL(`/dp/${clean}`, RETAILER.domain);
  url.searchParams.set('tag', tag);
  return url.toString();
}

/** Build a retailer search URL — used when we only know a product name. */
export function buildSearchUrl(query, tag) {
  const url = new URL('/s', RETAILER.domain);
  url.searchParams.set('k', query);
  url.searchParams.set('tag', tag);
  return url.toString();
}

/**
 * Attach the correct tracking parameters to an already-supplied retailer URL.
 * Existing `tag=` values are replaced so the site always reports to us.
 */
export function tagExistingUrl(rawUrl, tag, subId) {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set('tag', tag);
    if (subId) url.searchParams.set('subid', subId);
    // Amazon uses `linkCode=ll1` style params on some legacy links; strip any
    // stale affiliate params that would conflict with ours.
    ['subtag', 'psc', 'ascsubtag'].forEach((p) => {
      if (url.searchParams.get(p) === '') url.searchParams.delete(p);
    });
    return url.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * @param {object} product  A record from src/data/products.js
 * @param {object} [options]
 * @param {string} [options.campaign]   Key of TRACKING_IDS (default: 'website')
 * @param {string} [options.placement]  Where the click happened — used for the
 *                                      optional subid and for analytics.
 * @returns {string} A tagged retailer URL, or the inert placeholder.
 */
export function generateAffiliateUrl(product, options = {}) {
  if (!product) return PLACEHOLDER_AFFILIATE_URL;

  // Production safeguard: research records only become clickable after the
  // Amazon listing has been manually verified. Demo/staging records stay inert.
  if (!product.affiliateVerified) return PLACEHOLDER_AFFILIATE_URL;

  const campaign = options.campaign || DEFAULT_CAMPAIGN;
  const tag = getTrackingId(campaign);
  const subId = RETAILER.subId || null;

  // 1. An explicit ASIN always wins — it produces a canonical /dp/ link.
  if (product.asin) {
    const url = buildAsinUrl(product.asin, tag);
    if (url) return subId ? tagExistingUrl(url, tag, subId) : url;
  }

  // 2. A manually verified retailer URL supplied by the content author.
  if (product.amazonUrl && !isPlaceholderAffiliateUrl(product.amazonUrl)) {
    return tagExistingUrl(product.amazonUrl, tag, subId);
  }

  // 3. Demo data: no real link yet. Return the inert placeholder so nothing
  //    accidentally sends a visitor somewhere misleading.
  return PLACEHOLDER_AFFILIATE_URL;
}

/** Convenience: is this product still missing a live retailer link? */
export function hasLiveAffiliateUrl(product, options) {
  return !isPlaceholderAffiliateUrl(generateAffiliateUrl(product, options));
}

/** Retailer display name used in neutral button copy. */
export const RETAILER_LABEL = RETAILER.localeLabel;
