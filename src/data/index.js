/**
 * ============================================================================
 * DATA LAYER INDEX
 * ============================================================================
 * Every page, component, the search index and the sitemap build script import
 * from here. Nothing in `src/components` or `src/pages` contains hard-coded
 * product or category lists.
 *
 * Swapping demo content for production content = editing the files in this
 * folder (and flipping CONTENT_MODE in src/config/content.js). No component
 * changes required.
 */

export {
  categories,
  liveCategories,
  categoriesSorted,
  getCategoryBySlug,
  getCategoryName,
} from './categories.js';

export {
  products,
  featuredProducts,
  productsByRecency,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getProductsBySubcategory,
  resolveProducts,
} from './products.js';

export {
  buyingGuides,
  featuredGuides,
  guidesByRecency,
  getGuideBySlug,
  getGuidesByCategory,
} from './buyingGuides.js';

export {
  comparisons,
  getComparisonBySlug,
  getComparisonsByCategory,
  getComparisonsForProduct,
} from './comparisons.js';

export {
  deals,
  dealSections,
  dealsBySection,
  liveDeals,
  enrichDeal,
  hasVerifiedPricing,
  isStaleDeal,
  isExpiredDeal,
  STALE_AFTER_DAYS,
  DEAL_TYPE_LABELS,
} from './deals.js';

/* -------------------------------------------------------------------------- */
/* Cross-entity helpers used by several pages                                  */
/* -------------------------------------------------------------------------- */

import { products } from './products.js';
import { buyingGuides } from './buyingGuides.js';
import { comparisons } from './comparisons.js';
import { categories } from './categories.js';

/** Related products for a product page: same subcategory first, then category. */
export function getRelatedProducts(product, limit = 3) {
  if (!product) return [];
  const sameSub = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.categorySlug === product.categorySlug &&
      p.subcategorySlug === product.subcategorySlug,
  );
  const sameCategory = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.categorySlug === product.categorySlug &&
      p.subcategorySlug !== product.subcategorySlug,
  );
  return [...sameSub, ...sameCategory].slice(0, limit);
}

/** Guides that mention a product, plus guides in the same category. */
export function getRelatedGuides(product, limit = 3) {
  if (!product) return [];
  const direct = buyingGuides.filter((g) =>
    (g.productSlugs || []).includes(product.slug),
  );
  const byCategory = buyingGuides.filter(
    (g) => g.categorySlug === product.categorySlug && !direct.includes(g),
  );
  return [...direct, ...byCategory].slice(0, limit);
}

/** Comparisons that include a given product. */
export function getRelatedComparisons(product, limit = 2) {
  if (!product) return [];
  return comparisons
    .filter((c) => (c.productSlugs || []).includes(product.slug))
    .slice(0, limit);
}

/** Counts used on category pages and the about page. */
export function getStats() {
  return {
    categories: categories.filter((c) => !c.comingSoon).length,
    products: products.length,
    guides: buyingGuides.length,
    comparisons: comparisons.length,
  };
}
