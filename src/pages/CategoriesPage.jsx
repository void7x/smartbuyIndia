import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { categories, liveCategories } from '../data/categories.js';
import { products } from '../data/products.js';
import { buyingGuides } from '../data/buyingGuides.js';
import { comparisons } from '../data/comparisons.js';
import CategoryCard from '../components/CategoryCard.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { breadcrumbSchema, itemListSchema } from '../utils/seo.js';
import { GridIcon, ArrowRight } from '../components/Icons.jsx';

/** /categories — index of every category, with counts and subcategory links. */
export default function CategoriesPage() {
  useSeo({
    title: 'All product categories',
    description:
      'Browse SmartBuyIndia by category: Home & Kitchen, Beauty & Grooming, Electronics & Gadgets, Fitness and Office & Study — each with product shortlists, buying guides and comparisons.',
    path: '/categories',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Categories', path: '/categories' },
      ]),
      itemListSchema(
        'SmartBuyIndia product categories',
        liveCategories.map((c) => ({ name: c.name, path: `/category/${c.slug}` })),
      ),
    ],
  });

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Categories' }]} />
          <h1>Product categories</h1>
          <p className="lede">
            {liveCategories.length} categories are live in this release, covering{' '}
            {products.length} product entries, {buyingGuides.length} buying guides and{' '}
            {comparisons.length} side-by-side comparisons. New categories are added as soon as the
            research behind them is finished — not before.
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="grid grid-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <section className="section--tight" aria-labelledby="all-subcats">
          <h2 id="all-subcats" style={{ fontSize: 'var(--fs-xl)', marginBottom: '16px' }}>
            Browse by subcategory
          </h2>
          {liveCategories.map((category) => (
            <div key={category.slug} style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: 'var(--fs-base)', marginBottom: '10px' }}>
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </h3>
              {category.subcategories.length ? (
                <ul className="chip-row">
                  {category.subcategories.map((sub) => {
                    const count = products.filter(
                      (p) => p.categorySlug === category.slug && p.subcategorySlug === sub.slug,
                    ).length;
                    return (
                      <li key={sub.slug}>
                        <Link
                          className="chip chip--brand"
                          to={`/category/${category.slug}?sub=${sub.slug}`}
                          style={{ textDecoration: 'none' }}
                        >
                          {sub.name}
                          <span className="filter-chip__count">{count}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-muted">Subcategories coming soon.</p>
              )}
            </div>
          ))}
        </section>

        <div className="callout callout--plain">
          <span className="callout__title">
            <GridIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            Can&rsquo;t find what you need?
          </span>
          Use the search at the top of any page — it covers product names, categories, subcategories,
          tags and the full text of every buying guide.{' '}
          <Link to="/contact" className="link-arrow" style={{ display: 'inline-flex' }}>
            Tell us what to cover next <ArrowRight width={13} height={13} />
          </Link>
        </div>
      </div>
    </>
  );
}
