import { Link, useNavigate } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { SITE_TAGLINE, SITE_DESCRIPTION } from '../config/site.js';
import { AMAZON_ASSOCIATE_ID } from '../config/affiliate.js';
import { categories } from '../data/categories.js';
import { featuredProducts } from '../data/products.js';
import { guidesByRecency } from '../data/buyingGuides.js';
import { comparisons } from '../data/comparisons.js';
import { getStats } from '../data/index.js';
import { websiteSchema, itemListSchema } from '../utils/seo.js';

import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import GuideCard from '../components/GuideCard.jsx';
import ComparisonCard from '../components/ComparisonCard.jsx';
import DisclosureNotice from '../components/DisclosureNotice.jsx';
import { ArrowRight, ShieldIcon, ScaleIcon, BookIcon, SearchIcon } from '../components/Icons.jsx';

export default function HomePage() {
  const stats = getStats();
  const featuredCategories = categories.filter((c) => c.featured);
  const homepageProducts = (featuredProducts.length ? featuredProducts : []).slice(0, 6);
  const homepageGuides = guidesByRecency.slice(0, 3);
  const homepageComparisons = comparisons.slice(0, 2);

  useSeo({
    title: null, // -> "SmartBuyIndia — Smart choices. Better buys."
    description: SITE_DESCRIPTION,
    path: '/',
    schema: [
      websiteSchema(),
      itemListSchema('Product categories on SmartBuyIndia', categories
        .filter((c) => !c.comingSoon)
        .map((c) => ({ name: c.name, path: `/category/${c.slug}` }))),
    ],
  });

  const navigate = useNavigate();
  const onSubmitSearch = (event) => {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get('q') || '').trim();
    if (value) navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero__inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--accent-500)' }}>
              Independent product research for India
            </p>
            <h1 id="hero-heading">Find smarter products for everyday life in India.</h1>
            <p className="hero__lede">
              Compare products, explore buying guides, and discover useful picks before you buy.
              Every shortlist explains its reasoning — then links out to Amazon.in so you can
              complete the purchase yourself.
            </p>

            <div className="btn-row">
              <Link to="/categories" className="btn btn--accent btn--lg">
                Explore products <ArrowRight width={16} height={16} />
              </Link>
              <Link to="/buying-guides" className="btn btn--outline btn--lg">
                View buying guides
              </Link>
            </div>

            <ul className="hero__trust">
              <li>
                <BookIcon />
                <span>
                  <strong>Original editorial, not copied listings.</strong> Guides are written around
                  how products are actually used in Indian homes, kitchens and commutes.
                </span>
              </li>
              <li>
                <ScaleIcon />
                <span>
                  <strong>Reasoning you can check.</strong> Every recommendation names the situation
                  it suits — no unexplained rankings, no invented ratings.
                </span>
              </li>
              <li>
                <ShieldIcon />
                <span>
                  <strong>Clear affiliate disclosure.</strong> We may earn a commission on qualifying
                  purchases. It never costs you more and never buys placement.
                </span>
              </li>
            </ul>
          </div>

          <div className="hero__panel">
            <p className="hero__panel-title">Start with a search</p>
            <form className="hero__search" onSubmit={onSubmitSearch} role="search">
              <label className="sr-only" htmlFor="hero-search">
                Search products, categories and buying guides
              </label>
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder="Try “air fryer for small kitchen”"
                autoComplete="off"
              />
              <button type="submit" className="btn btn--accent" aria-label="Search">
                <SearchIcon width={18} height={18} />
              </button>
            </form>

            <ul className="hero__stats">
              <li>
                <b>{stats.categories}</b>
                <span>Categories</span>
              </li>
              <li>
                <b>{stats.products}</b>
                <span>Products</span>
              </li>
              <li>
                <b>{stats.guides}</b>
                <span>Guides</span>
              </li>
            </ul>

            <p className="text-xs" style={{ color: '#b6ccc5', marginTop: '16px', lineHeight: 1.55 }}>
              We are a discovery and research website — we do not sell, ship or handle payments.
              Purchases are completed on the retailer&rsquo;s own site.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Featured categories */}
      <section className="section" aria-labelledby="categories-heading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Browse by category</p>
              <h2 id="categories-heading">What are you shopping for?</h2>
              <p>
                The live categories each have their own product shortlists, subcategories and buying guides.
              </p>
            </div>
            <Link to="/categories" className="link-arrow">
              All categories <ArrowRight width={14} height={14} />
            </Link>
          </div>

          <div className="grid grid-3">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Featured buying guides */}
      <section className="section section--alt" aria-labelledby="guides-heading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Buying guides</p>
              <h2 id="guides-heading">Research that answers the awkward questions</h2>
              <p>
                Each guide works through what to look for, the specifications that matter, what to
                avoid, and the most common questions Indian buyers ask.
              </p>
            </div>
            <Link to="/buying-guides" className="link-arrow">
              All buying guides <ArrowRight width={14} height={14} />
            </Link>
          </div>

          <div className="grid grid-3">
            {homepageGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          <p className="inline-note" style={{ marginTop: '20px', maxWidth: '86ch' }}>
            Guides are demonstration content in this build. They are structured as editorial pages —
            they are not live market rankings, award lists or test results, and they do not claim any
            current position for a product.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- Featured products */}
      <section className="section" aria-labelledby="products-heading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Product shortlists</p>
              <h2 id="products-heading">Products worth reading about</h2>
              <p>
                Each entry includes an editorial summary, who it suits, who should look elsewhere,
                and the practical things to check before you order.
              </p>
            </div>
            <Link to="/categories" className="link-arrow">
              Browse all products <ArrowRight width={14} height={14} />
            </Link>
          </div>

          <div className="grid grid-3">
            {homepageProducts.map((product) => (
              <ProductCard key={product.id} product={product} placement="home-featured" />
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <DisclosureNotice compact />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Comparisons */}
      {homepageComparisons.length > 0 && (
        <section className="section section--alt" aria-labelledby="compare-heading">
          <div className="container">
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Side by side</p>
                <h2 id="compare-heading">Comparisons, not rankings</h2>
                <p>
                  Our comparison tables label each option with the situation it fits — budget,
                  household size, commute type — and always show the reasoning next to the label.
                </p>
              </div>
              <Link to="/compare" className="link-arrow">
                All comparisons <ArrowRight width={14} height={14} />
              </Link>
            </div>

            <div className="grid grid-2">
              {homepageComparisons.map((comparison) => (
                <ComparisonCard key={comparison.id} comparison={comparison} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- How it works */}
      <section className="section" aria-labelledby="how-heading">
        <div className="container container--narrow">
          <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="section-head__text">
              <p className="eyebrow" style={{ justifyContent: 'center' }}>
                How SmartBuyIndia works
              </p>
              <h2 id="how-heading">Three steps, no pressure</h2>
            </div>
          </div>

          <ol className="grid grid-3" style={{ listStyle: 'none', padding: 0, counterReset: 'step' }}>
            {[
              {
                title: 'Research the category',
                body: 'Read a buying guide to understand what actually matters — capacity, socket rating, battery runtime, floor protection — before you look at any specific product.',
              },
              {
                title: 'Compare the shortlist',
                body: 'Use a comparison table to see how the options differ on the criteria that matter to your household, with a stated reason for each label.',
              },
              {
                title: 'Buy on Amazon.in',
                body: 'Click through to the retailer to check the live price and availability, and complete the purchase there. We never take payment or handle delivery.',
              },
            ].map((step) => (
              <li key={step.title} className="panel" style={{ counterIncrement: 'step' }}>
                <p className="card__meta">Step</p>
                <h3 style={{ fontSize: 'var(--fs-lg)', marginBottom: '8px' }}>{step.title}</h3>
                <p className="card__text">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="callout callout--info" style={{ marginTop: '32px' }}>
            <span className="callout__title">About our links</span>
            SmartBuyIndia is an independent research website. We are not Amazon, we do not sell
            anything, and we do not claim that Amazon endorses our recommendations. We participate
            in the Amazon Associates programme, so some links carry our tracking ID (
            <code>{AMAZON_ASSOCIATE_ID}</code>) and we may earn a qualifying commission — at no
            additional cost to you. <Link to="/disclosure">Full disclosure</Link>.
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Footer CTA */}
      <section className="section section--tight" aria-labelledby="cta-heading">
        <div className="container">
          <div className="panel panel--tinted" style={{ textAlign: 'center', padding: '40px 24px' }}>
            <h2 id="cta-heading" style={{ marginBottom: '8px' }}>
              {SITE_TAGLINE}
            </h2>
            <p className="text-muted" style={{ maxWidth: '60ch', marginInline: 'auto', marginBottom: '24px' }}>
              Start with the category you are shopping in, or search for the specific product type
              you have in mind.
            </p>
            <div className="btn-row" style={{ justifyContent: 'center' }}>
              <Link to="/categories" className="btn">
                Explore products
              </Link>
              <Link to="/buying-guides" className="btn btn--outline">
                Read a buying guide
              </Link>
              <Link to="/deals" className="btn btn--ghost">
                See verified deals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
