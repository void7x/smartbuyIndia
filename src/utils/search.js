/**
 * ---------------------------------------------------------------------------
 * Client-side search
 * ---------------------------------------------------------------------------
 * Zero dependencies, no external service. A single index is built once from
 * the data layer and searched with a small weighted scoring function — fast
 * enough to run on every keystroke on a low-end Android phone.
 *
 * Indexed fields: product names, categories, buying guides, comparison titles,
 * subcategories and tags.
 */

import { products } from '../data/products.js';
import { categories, liveCategories } from '../data/categories.js';
import { buyingGuides } from '../data/buyingGuides.js';
import { comparisons } from '../data/comparisons.js';

/** Field weights — higher means a match there is more relevant. */
const WEIGHTS = {
  title: 8,
  tag: 4,
  subcategory: 3,
  category: 3,
  description: 2,
  body: 1,
};

const norm = (value) =>
  String(value || '')
    .toLowerCase()
    .trim();

/** Add common Indian search phrasings so "best X" and "X price" both match. */
const EXPANDERS = ['best', 'top', 'buy', 'online', 'price', 'india', 'new', 'deal', 'deals'];

function buildIndex() {
  const entries = [];

  liveCategories.forEach((category) => {
    entries.push({
      type: 'category',
      id: category.id,
      title: category.name,
      slug: category.slug,
      category,
      href: `/category/${category.slug}`,
      subtitle: category.tagline,
      haystack: norm(
        [
          category.name,
          category.tagline,
          category.description,
          ...(category.subcategories || []).map((s) => s.name),
          ...(category.popularSearches || []),
        ].join(' '),
      ),
      titleTokens: norm(category.name).split(/\s+/),
      tags: (category.subcategories || []).map((s) => s.name),
    });
  });

  products.forEach((product) => {
    const category = categories.find((c) => c.slug === product.categorySlug);
    entries.push({
      type: 'product',
      id: product.id,
      title: product.name,
      slug: product.slug,
      product,
      href: `/product/${product.slug}`,
      subtitle: product.shortDescription,
      meta: category?.name,
      haystack: norm(
        [
          product.name,
          product.shortDescription,
          product.editorialSummary,
          category?.name,
          ...(product.tags || []),
          ...(product.badges || []),
          ...(product.keyFeatures || []).map((f) => `${f.label} ${f.value}`),
        ].join(' '),
      ),
      titleTokens: norm(product.name).split(/\s+/),
      tags: product.tags || [],
      categorySlug: product.categorySlug,
    });
  });

  buyingGuides.forEach((guide) => {
    const category = categories.find((c) => c.slug === guide.categorySlug);
    entries.push({
      type: 'guide',
      id: guide.id,
      title: guide.title,
      slug: guide.slug,
      guide,
      href: `/guide/${guide.slug}`,
      subtitle: guide.intro?.[0],
      meta: category ? `Buying guide · ${category.name}` : 'Buying guide',
      haystack: norm(
        [
          guide.title,
          guide.heroTitle,
          guide.metaDescription,
          ...(guide.intro || []),
          ...(guide.whatToLookFor || []).map((w) => `${w.title} ${w.body}`),
          ...(guide.keySpecs || []).map((s) => `${s.name} ${s.why}`),
          ...(guide.thingsToAvoid || []),
          ...(guide.faqs || []).map((f) => `${f.question} ${f.answer}`),
          category?.name,
        ].join(' '),
      ),
      titleTokens: norm(guide.title).split(/\s+/),
      tags: ['buying guide', category?.name].filter(Boolean),
      categorySlug: guide.categorySlug,
    });
  });

  comparisons.forEach((comparison) => {
    const category = categories.find((c) => c.slug === comparison.categorySlug);
    entries.push({
      type: 'comparison',
      id: comparison.id,
      title: comparison.title,
      slug: comparison.slug,
      comparison,
      href: `/compare/${comparison.slug}`,
      subtitle: comparison.intro,
      meta: category ? `Comparison · ${category.name}` : 'Comparison',
      haystack: norm(
        [
          comparison.title,
          comparison.intro,
          ...(comparison.rows || []).map((r) => `${r.label} ${(r.values || []).map((v) => v.value).join(' ')}`),
          category?.name,
        ].join(' '),
      ),
      titleTokens: norm(comparison.title).split(/\s+/),
      tags: ['comparison', category?.name].filter(Boolean),
      categorySlug: comparison.categorySlug,
    });
  });

  return entries;
}

let cachedIndex = null;
export function getSearchIndex() {
  if (!cachedIndex) cachedIndex = buildIndex();
  return cachedIndex;
}

/**
 * Each index entry keeps a reference to its full record (`entry.product`,
 * `entry.guide`, `entry.category`, `entry.comparison`) so result components can
 * render a real card without a second lookup.
 */

/** Highlight-friendly: which query tokens matched the title. */
function scoreEntry(entry, tokens, rawQuery) {
  const title = norm(entry.title);
  let score = 0;

  if (title === rawQuery) score += WEIGHTS.title * 4;
  if (title.startsWith(rawQuery)) score += WEIGHTS.title * 2;
  if (title.includes(rawQuery)) score += WEIGHTS.title;

  tokens.forEach((token) => {
    if (!token) return;
    if (title.includes(token)) score += WEIGHTS.title;
    if ((entry.titleTokens || []).some((t) => t.startsWith(token))) score += WEIGHTS.tag;
    if ((entry.tags || []).some((t) => norm(t).includes(token))) score += WEIGHTS.tag;
    if (norm(entry.meta).includes(token)) score += WEIGHTS.category;
    if (norm(entry.subtitle).includes(token)) score += WEIGHTS.description;
    if (entry.haystack.includes(token)) score += WEIGHTS.body;
  });

  return score;
}

/**
 * @param {string} query
 * @param {object} [options]
 * @param {number} [options.limit=24]
 * @param {string} [options.type] restrict to 'product' | 'guide' | 'category' | 'comparison'
 * @returns {{ all: object[], grouped: object, total: number, query: string }}
 */
export function search(query, options = {}) {
  const { limit = 24, type = null } = options;
  const raw = norm(query);

  if (!raw) {
    return { all: [], grouped: groupResults([]), total: 0, query: query || '' };
  }

  const tokens = raw.split(/\s+/).filter(Boolean);
  // Allow "best air fryer" to still match "air fryer" content.
  const meaningful = tokens.filter((t) => !EXPANDERS.includes(t) && t.length > 1);
  const searchTokens = meaningful.length ? meaningful : tokens;

  const scored = getSearchIndex()
    .filter((entry) => (type ? entry.type === type : true))
    .map((entry) => ({ entry, score: scoreEntry(entry, searchTokens, raw) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  const all = scored.slice(0, limit).map((r) => ({ ...r.entry, score: r.score }));
  return { all, grouped: groupResults(all), total: scored.length, query };
}

export function groupResults(results) {
  const grouped = { category: [], product: [], guide: [], comparison: [] };
  results.forEach((r) => {
    if (grouped[r.type]) grouped[r.type].push(r);
  });
  return grouped;
}

export const RESULT_TYPE_LABELS = {
  category: 'Categories',
  product: 'Products',
  guide: 'Buying guides',
  comparison: 'Comparisons',
};

/** Popular / suggested searches shown before the user types anything. */
export const suggestedSearches = [
  'air fryer',
  'wireless earbuds',
  'electric kettle',
  'study lamp',
  'resistance bands',
  'laptop stand',
];
