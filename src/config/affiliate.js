/**
 * ============================================================================
 * AMAZON AFFILIATE CONFIGURATION
 * ============================================================================
 * Everything about outbound retailer links lives here. No component ever
 * builds an Amazon URL by hand — they all call `generateAffiliateUrl()`.
 *
 * NOTE: An Amazon Associates tracking ID is a public identifier, not a secret.
 * It is safe (and normal) for it to appear in the client bundle.
 */

/** Your Amazon Associates tracking ID. */
export const AMAZON_ASSOCIATE_ID = 'smartbuyi080f-21';

/**
 * Per-campaign tracking IDs.
 * Amazon allows up to 100 tracking IDs per account — use one per property or
 * campaign so you can see exactly where a click came from in your reports.
 *
 * Add more keys as needed, e.g.:
 *   instagram: 'smartbuyi080f-21',
 *   youtube:   'smartbuyi080f-21',
 *
 * Only register IDs that actually exist in your Associates account.
 */
export const TRACKING_IDS = {
  default: AMAZON_ASSOCIATE_ID,
  website: AMAZON_ASSOCIATE_ID,
};

/** Retailer settings. */
export const RETAILER = {
  name: 'Amazon',
  /** Storefront locale. Used in "View on Amazon.in" style labels. */
  localeLabel: 'Amazon.in',
  domain: 'https://www.amazon.in',
  /** Sub-affiliate id (optional, `&subid=`). Leave null unless you use it. */
  subId: null,
};

/** Default campaign used when a placement does not specify one. */
export const DEFAULT_CAMPAIGN = 'website';

/**
 * Fallback URL used while a product has no real Amazon link yet.
 * It is deliberately inert (a search page) and is flagged by
 * `isPlaceholderAffiliateUrl()` so the UI can show a "demo" badge.
 */
export const PLACEHOLDER_AFFILIATE_URL = '#';

/** Button copy. Kept neutral — we never imply an Amazon partnership. */
export const CTA_LABELS = {
  primary: 'View on Amazon.in',
  secondary: 'Check availability on Amazon.in',
  compact: 'See on Amazon.in',
  compare: 'View on Amazon.in',
};
