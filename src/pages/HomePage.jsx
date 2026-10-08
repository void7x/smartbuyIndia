import { Link, useNavigate } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { SITE_TAGLINE, SITE_DESCRIPTION } from '../config/site.js';
import { AMAZON_ASSOCIATE_ID } from '../config/affiliate.js';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import { guidesByRecency } from '../data/buyingGuides.js';
import { comparisons } from '../data/comparisons.js';
import { getStats } from '../data/index.js';
import { websiteSchema, itemListSchema } from '../utils/seo.js';

import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import GuideCard from '../components/GuideCard.jsx';
import ComparisonCard from '../components/ComparisonCard.jsx';
import DisclosureNotice from '../components/DisclosureNotice.jsx';
import { ArrowRight, ShieldIcon, ScaleIcon, BookIcon, SearchIcon, TagIcon, SparkleIcon, CheckIcon } from '../components/Icons.jsx';
import DecisionProductCard from '../components/DecisionProductCard.jsx';

export default function HomePage() {
  const stats = getStats();
  const featuredCategories = categories.filter((c) => c.featured);
  const homepageProducts = products.filter((product) => !product.isDemo).slice(0, 6);
  const homepageGuides = guidesByRecency.filter((guide) => !guide.isDemo).slice(0, 3);
  const homepageComparisons = comparisons.filter((comparison) => !comparison.isDemo).slice(0, 2);
  const decisionProducts = homepageProducts.slice(0, 3);
  const decisionLabels = {
    'philips-bt1232-18': 'Simple short-beard setup',
    'xiaomi-beard-trimmer-2c': 'Wide length control',
    'vega-smartone-s3': 'Extra controls',
  };
  const shopByNeed = [
    { title: 'Keep it short', text: 'Simple grooming tools for a clean, repeatable routine.', to: '/search?q=short+beard', icon: CheckIcon },
    { title: 'Need more range', text: 'Products for people who change styles or use cases often.', to: '/search?q=wide+length+range', icon: ScaleIcon },
    { title: 'Buy for a desk', text: 'Useful gear for study, WFH and compact setups.', to: '/category/office-study', icon: TagIcon },
    { title: 'Upgrade the kitchen', text: 'Everyday appliances picked around real Indian use.', to: '/category/home-kitchen', icon: SparkleIcon },
  ];

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
      <section className="hero hero--home" aria-labelledby="hero-heading">
        <div className="container hero__inner">
          <div className="hero__copy">
            <div className="hero__kicker">
              <span className="hero__kicker-dot" />
              Smart shopping, without the noise.
            </div>
            <h1 id="hero-heading">
              Stop scrolling.
              <span>Start choosing.</span>
            </h1>
            <p className="hero__lede">
              SmartBuyIndia helps you figure out what actually matters, compare the options, and
              reach the right product on Amazon.in — without the endless “Top 10” nonsense.
            </p>

            <form className="hero__search hero__search--main" onSubmit={onSubmitSearch} role="search">
              <label className="sr-only" htmlFor="hero-search">
                Search products, categories and buying guides
              </label>
              <SearchIcon className="hero__search-icon" width={20} height={20} />
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder="What are you shopping for?"
                autoComplete="off"
              />
              <button type="submit" className="btn btn--accent" aria-label="Search">
                Search <ArrowRight width={16} height={16} />
              </button>
            </form>

            <div className="hero__quick">
              <span>Try:</span>
              <Link to="/guide/how-to-choose-beard-trimmer-india">beard trimmer</Link>
              <Link to="/category/beauty-grooming">hair care</Link>
              <Link to="/category/home-kitchen">kitchen</Link>
              <Link to="/category/office-study">study setup</Link>
            </div>

            <div className="hero__actions">
              <Link to="/categories" className="btn btn--outline btn--lg">
                Explore categories <ArrowRight width={16} height={16} />
              </Link>
              <Link to="/compare" className="btn btn--ghost btn--lg hero__ghost-btn">
                Compare products
              </Link>
            </div>
          </div>

          <div className="hero__decision-card">
            <div className="hero__decision-top">
              <span className="badge badge--accent">SmartBuy method</span>
              <span className="hero__decision-live"><span /> research-first</span>
            </div>
            <p className="hero__decision-title">A better way to buy</p>
            <div className="hero__decision-step">
              <span>01</span>
              <div><strong>Know what matters</strong><small>Specs translated into real use.</small></div>
            </div>
            <div className="hero__decision-line" />
            <div className="hero__decision-step">
              <span>02</span>
              <div><strong>Compare the trade-offs</strong><small>No fake “best overall” awards.</small></div>
            </div>
            <div className="hero__decision-line" />
            <div className="hero__decision-step">
              <span>03</span>
              <div><strong>Make your call</strong><small>Then check today's price yourself.</small></div>
            </div>
            <div className="hero__decision-footer">
              <span><ShieldIcon width={15} height={15} /> Independent & transparent</span>
              <span><TagIcon width={15} height={15} /> Amazon.in links</span>
            </div>
          </div>
        </div>

        <div className="hero__orb hero__orb--one" aria-hidden="true" />
        <div className="hero__orb hero__orb--two" aria-hidden="true" />
      </section>

      <section className="home-proof-bar" aria-label="SmartBuyIndia approach">
        <div className="container home-proof-bar__inner">
          <div><strong>Research first.</strong><span>Not copied marketplace filler.</span></div>
          <div><strong>Use-case verdicts.</strong><span>Choose what fits you.</span></div>
          <div><strong>Transparent links.</strong><span>Buy on the retailer's site.</span></div>
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

      {/* ---------------------------------------------------------- Shop by need */}
      <section className="section home-needs" aria-labelledby="needs-heading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Start with the problem</p>
              <h2 id="needs-heading">What are you actually trying to solve?</h2>
              <p>Most people don't think in product taxonomies. Pick the situation closest to yours.</p>
            </div>
          </div>

          <div className="home-needs__grid">
            {shopByNeed.map(({ title, text, to, icon: Icon }) => (
              <Link key={title} to={to} className="home-need-card">
                <span className="home-need-card__icon"><Icon width={20} height={20} /></span>
                <span className="home-need-card__title">{title}</span>
                <span className="home-need-card__text">{text}</span>
                <span className="home-need-card__arrow"><ArrowRight width={15} height={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Decision spotlight */}
      {decisionProducts.length > 0 && (
        <section className="section section--alt home-decision" aria-labelledby="decision-heading">
          <div className="container">
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Decision spotlight</p>
                <h2 id="decision-heading">A shortlist, not a popularity contest.</h2>
                <p>Three researched options, each suited to a different buyer. Start with the reason — not the hype.</p>
              </div>
              <Link to="/compare" className="link-arrow">See all comparisons <ArrowRight width={14} height={14} /></Link>
            </div>

            <div className="home-decision__grid">
              {decisionProducts.map((product) => (
                <DecisionProductCard
                  key={product.id}
                  product={product}
                  label={decisionLabels[product.slug] || product.name}
                  why={product.editorialSummary}
                  watchOuts={product.whoMightSkip?.slice(0, 1)}
                  placement="home-decision"
                />
              ))}
            </div>
          </div>
        </section>
      )}

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
            Research drafts are shown on this staging build for review. Production pages will only
            contain content that has passed our verification and publication checklist.
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
      <section className="section home-method" aria-labelledby="how-heading">
        <div className="container">
          <div className="home-method__head">
            <div>
              <p className="eyebrow">The SmartBuy method</p>
              <h2 id="how-heading">See it. Understand it. Compare it. Decide.</h2>
            </div>
            <p>We are building a shopping tool around the decision — not around the ad slot.</p>
          </div>

          <ol className="home-method__steps">
            {[
              ['01', 'See', 'Start with what you actually need.'],
              ['02', 'Understand', 'Turn spec-sheet jargon into useful context.'],
              ['03', 'Compare', 'See the trade-offs side by side.'],
              ['04', 'Decide', 'Pick the option that fits your routine.'],
            ].map(([number, title, body]) => (
              <li key={number}>
                <span className="home-method__number">{number}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </li>
            ))}
          </ol>

          <div className="home-method__trust">
            <span><CheckIcon width={16} height={16} /> No invented ratings</span>
            <span><CheckIcon width={16} height={16} /> No fake “tested by us” claims</span>
            <span><CheckIcon width={16} height={16} /> Clear affiliate disclosure</span>
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
