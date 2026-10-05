/**
 * ============================================================================
 * DEALS  —  ⚠ DEMO DATA LAYER (deliberately empty of fake discounts)
 * ============================================================================
 *
 * IMPORTANT RULES FOR THIS FILE
 * -----------------------------
 * 1. NEVER invent a discount. `salePrice`, `originalPrice` and
 *    `discountPercentage` must come from a price you personally checked on
 *    Amazon.in, with `lastChecked` set to that date.
 * 2. The UI only renders a discount badge when `hasVerifiedPricing(deal)` is
 *    true — i.e. both prices exist, the sale price is lower, and `lastChecked`
 *    is present. Otherwise it shows an honest "no verified price" state.
 * 3. Prices on a retailer's site change constantly. Anything older than a few
 *    days should be treated as stale: `STALE_AFTER_DAYS` controls the warning.
 * 4. Never use fake scarcity ("only 2 left"), countdown timers you cannot
 *    substantiate, or "lowest ever" claims without evidence.
 *
 * HOW TO ADD A REAL DEAL
 *   {
 *     productSlug: 'real-product-slug',     // must exist in products.js
 *     dealType: 'price-drop' | 'coupon' | 'festive-sale' | 'lightning-deal',
 *     originalPrice: 4999,                  // what you saw as the list price
 *     salePrice: 3999,                      // what you saw as the live price
 *     lastChecked: '2026-10-02',            // the date YOU checked
 *     verifiedBy: 'Your name',
 *     note: 'Seen during the festive sale window on Amazon.in.',
 *     terms: 'Coupon applied at checkout; subject to availability.',
 *   }
 *
 * `discountPercentage` is computed automatically — do not hard-code it.
 * ============================================================================
 */

import { getProductBySlug } from './products.js';
import { computeDiscount } from '../utils/format.js';

/** After this many days a price is flagged as possibly stale. */
export const STALE_AFTER_DAYS = 3;

/** Sections shown on /deals, in display order. */
export const dealSections = [
  {
    id: 'featured',
    title: 'Featured deals',
    slug: 'featured',
    description:
      'Hand-checked offers across all categories. Every entry below is verified by a person on the date shown — we do not publish estimated or automated discounts.',
    categorySlug: null,
  },
  {
    id: 'electronics',
    title: 'Electronics deals',
    slug: 'electronics',
    description: 'Audio, charging and computer accessories with a verified price change.',
    categorySlug: 'electronics-gadgets',
  },
  {
    id: 'home',
    title: 'Home & Kitchen deals',
    slug: 'home',
    description: 'Kitchen appliances and home essentials with a verified price change.',
    categorySlug: 'home-kitchen',
  },
  {
    id: 'beauty',
    title: 'Beauty & Grooming deals',
    slug: 'beauty',
    description: 'Grooming appliances and personal-care tools with a verified price change.',
    categorySlug: 'beauty-grooming',
  },
  {
    id: 'fitness',
    title: 'Fitness deals',
    slug: 'fitness',
    description: 'Home training equipment with a verified price change.',
    categorySlug: 'fitness',
  },
];

/**
 * DEMO RECORDS — these exist to exercise the layout and to demonstrate what an
 * unverified entry looks like. Note that prices are `null`: the page therefore
 * shows the honest empty state instead of a made-up discount.
 */
export const deals = [
  {
    id: 'deal-demo-01',
    productSlug: 'example-wireless-earbuds',
    sectionId: 'electronics',
    dealType: 'price-drop',
    title: 'Example earbud price drop (demo placeholder)',
    originalPrice: null,
    salePrice: null,
    lastChecked: null,
    verifiedBy: null,
    note: 'Demo record. No discount is published because no price has been verified.',
    terms: null,
    couponCode: null,
    expiresOn: null,
    isDemo: true,
    status: 'draft',
  },
  {
    id: 'deal-demo-02',
    productSlug: 'example-electric-kettle',
    sectionId: 'home',
    dealType: 'festive-sale',
    title: 'Example festive-season kettle offer (demo placeholder)',
    originalPrice: null,
    salePrice: null,
    lastChecked: null,
    verifiedBy: null,
    note: 'Demo record showing how a seasonal entry is structured before a real price is checked.',
    terms: null,
    couponCode: null,
    expiresOn: null,
    isDemo: true,
    status: 'draft',
  },
];

/* -------------------------------------------------------------------------- */
/* Derived helpers                                                            */
/* -------------------------------------------------------------------------- */

/** Only publish discount figures when a human verified both prices and a date. */
export function hasVerifiedPricing(deal) {
  if (!deal) return false;
  const original = Number(deal.originalPrice);
  const sale = Number(deal.salePrice);
  return (
    Boolean(deal.lastChecked) &&
    Number.isFinite(original) &&
    Number.isFinite(sale) &&
    original > 0 &&
    sale > 0 &&
    sale < original
  );
}

/** Is the verification older than STALE_AFTER_DAYS? */
export function isStaleDeal(deal) {
  if (!deal?.lastChecked) return false;
  const checked = new Date(deal.lastChecked);
  if (Number.isNaN(checked.getTime())) return false;
  const ageDays = (Date.now() - checked.getTime()) / 86400000;
  return ageDays > STALE_AFTER_DAYS;
}

export function isExpiredDeal(deal) {
  if (!deal?.expiresOn) return false;
  const expiry = new Date(deal.expiresOn);
  if (Number.isNaN(expiry.getTime())) return false;
  return expiry.getTime() < Date.now();
}

/** A deal enriched with its product record and computed discount. */
export function enrichDeal(deal) {
  const product = getProductBySlug(deal.productSlug);
  return {
    ...deal,
    product,
    discountPercentage: hasVerifiedPricing(deal)
      ? computeDiscount(deal.originalPrice, deal.salePrice)
      : null,
    verified: hasVerifiedPricing(deal),
    stale: isStaleDeal(deal),
    expired: isExpiredDeal(deal),
  };
}

/** Deals ready to be shown publicly: verified, not expired. */
export const liveDeals = () =>
  deals.filter((d) => d.status !== 'archived' && !isExpiredDeal(d)).map(enrichDeal);

/** Deals grouped for the /deals page. */
export function dealsBySection() {
  const all = liveDeals();
  return dealSections.map((section) => ({
    ...section,
    deals: section.id === 'featured' ? all : all.filter((d) => d.sectionId === section.id),
  }));
}

export const DEAL_TYPE_LABELS = {
  'price-drop': 'Price drop',
  coupon: 'Coupon',
  'festive-sale': 'Festive sale',
  'lightning-deal': 'Limited-time deal',
};
