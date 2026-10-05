/**
 * Small formatting + content helpers shared across the app.
 */
import { LOCALE, CURRENCY } from '../config/site.js';

/**
 * Format a price for Indian shoppers (₹12,999).
 * Returns null when the value is missing so callers can render an honest
 * "price not published" state instead of inventing a number.
 */
export function formatPrice(value) {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  try {
    return new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: CURRENCY,
      maximumFractionDigits: num % 1 === 0 ? 0 : 2,
    }).format(num);
  } catch {
    return `₹${num.toLocaleString(LOCALE)}`;
  }
}

/** "₹4,999 (approx., last checked 12 Mar 2026)" — only when data exists. */
export function formatApproxPrice(value) {
  const formatted = formatPrice(value);
  return formatted ? `${formatted} (approx.)` : null;
}

export function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(LOCALE, { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Honest discount maths — only used when BOTH prices are supplied. */
export function computeDiscount(originalPrice, salePrice) {
  const original = Number(originalPrice);
  const sale = Number(salePrice);
  if (!original || !sale || sale >= original) return null;
  return Math.round(((original - sale) / original) * 100);
}

/** Reading-time estimate for guide bodies (~200 wpm). */
export function readingTime(text = '') {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  if (!words) return null;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** Strip markdown-ish emphasis so meta descriptions stay clean. */
export function plainText(value = '') {
  return String(value)
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Truncate to a sensible meta-description length. */
export function truncate(value = '', max = 158) {
  const text = plainText(value);
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** Deterministic pseudo-random hue from a string (used by placeholder art). */
export function hashHue(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) hash = (hash * 31 + str.charCodeAt(i)) % 360;
  return hash;
}

export const cx = (...classes) => classes.filter(Boolean).join(' ');
