import { Link, useNavigate } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { SITE_DESCRIPTION, SITE_TAGLINE } from '../config/site.js';
import { categories } from '../data/categories.js';
import { products, featuredProducts } from '../data/products.js';
import { guidesByRecency } from '../data/buyingGuides.js';
import { comparisons } from '../data/comparisons.js';
import { getStats } from '../data/index.js';
import { websiteSchema, itemListSchema } from '../utils/seo.js';

import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import GuideCard from '../components/GuideCard.jsx';
import ComparisonCard from '../components/ComparisonCard.jsx';
import DisclosureNotice from '../components/DisclosureNotice.jsx';
import {
  ArrowRight,
  BookIcon,
  CheckIcon,
  ScaleIcon,
  SearchIcon,
  ShieldIcon,
  SparkleIcon,
  SwapIcon,
} from '../components/Icons.jsx';

export default function HomePage() {
  const stats = getStats();
  const featuredCategories = categories.filter((category) => category.featured && !category.comingSoon).slice(0, 5);
  const homepageProducts = (featuredProducts.length ? featuredProducts : products).slice(0, 4);
  const homepageGuides = guidesByRecency.slice(0, 3);
  const homepageComparisons = comparisons.slice(0, 2);
  const leadGuide = homepageGuides[0];
  const leadComparison = homepageComparisons[0];
  const leadCategory = featuredCategories[0];

  useSeo({
    title: null,
    description: SITE_DESCRIPTION,
    path: '/',
    schema: [
      websiteSchema(),
      itemListSchema(
        'Product categories on SmartBuyIndia',
        categories
          .filter((category) => !category.comingSoon)
          .map((category) => ({ name: category.name, path: '/category/' + category.slug })),
      ),
    ],
  });

  const navigate = useNavigate();
  const onSubmitSearch = (event) => {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get('q') || '').trim();
    if (value) navigate('/search?q=' + encodeURIComponent(value));
  };

  return (
    <>
      <section className="sb-hero" aria-labelledby="hero-heading">
        <div className="sb-hero__texture" aria-hidden="true" />
        <div className="container sb-hero__inner">
          <div className="sb-hero__copy">
            <div className="sb-hero__eyebrow">
              <span className="sb-hero__eyebrow-mark" aria-hidden="true" />
              Smart choices. Better buys.
            </div>
            <div className="sb-hero__meta">
              <span>Independent product research</span>
              <span>For Indian shoppers</span>
            </div>
            <h1 id="hero-heading">
              Make your next buy <em>make sense.</em>
            </h1>
            <p className="sb-hero__lede">
              Cut through the noise with practical buying guides, thoughtful comparisons, and
              product shortlists that explain the trade-offs before you head to the retailer.
            </p>

            <form className="sb-search" onSubmit={onSubmitSearch} role="search">
              <label className="sr-only" htmlFor="sb-home-search">
                Search products, categories, comparisons and buying guides
              </label>
              <SearchIcon className="sb-search__icon" width={20} height={20} aria-hidden="true" />
              <input
                id="sb-home-search"
                name="q"
                type="search"
                placeholder="What are you trying to find?"
                autoComplete="off"
              />
              <button className="btn btn--accent sb-search__button" type="submit">
                Search <ArrowRight width={16} height={16} />
              </button>
            </form>

            {featuredCategories.length > 0 && (
              <div className="sb-hero__quicklinks" aria-label="Popular categories">
                <span>Explore</span>
                {featuredCategories.slice(0, 4).map((category) => (
                  <Link key={category.slug} to={'/category/' + category.slug}>
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="sb-hero__actions">
              <Link to="/categories" className="btn btn--accent btn--lg">
                Browse categories <ArrowRight width={16} height={16} />
              </Link>
              <Link to="/buying-guides" className="sb-hero__text-link">
                Read buying guides <ArrowRight width={14} height={14} />
              </Link>
            </div>

            <p className="sb-hero__trust">
              <ShieldIcon width={16} height={16} aria-hidden="true" />
              Independent research. Transparent affiliate links. Purchases happen on Amazon.in.
            </p>
          </div>

          <aside className="sb-hero__visual" aria-label="Explore the SmartBuyIndia research library">
            <div className="sb-visual-orbit sb-visual-orbit--one" aria-hidden="true" />
            <div className="sb-visual-orbit sb-visual-orbit--two" aria-hidden="true" />
            <div className="sb-visual-card sb-visual-card--main">
              <div className="sb-visual-card__topline">
                <span className="sb-mini-label"><SparkleIcon width={13} height={13} /> THE RESEARCH DESK</span>
                <span className="sb-visual-card__index">SBI / 01</span>
              </div>
              <p className="sb-visual-card__statement">A good choice starts with a better question.</p>
              <div className="sb-visual-card__rule" />
              <div className="sb-visual-card__steps">
                <div><span>01</span><strong>Understand your needs</strong><CheckIcon width={16} height={16} /></div>
                <div><span>02</span><strong>Compare the trade-offs</strong><CheckIcon width={16} height={16} /></div>
                <div><span>03</span><strong>Check retailer details</strong><ArrowRight width={16} height={16} /></div>
              </div>
              {leadGuide && (
                <Link to={'/guide/' + leadGuide.slug} className="sb-visual-card__guide">
                  <span className="sb-visual-card__guide-kicker">
                    {leadGuide.isDemo ? 'SAMPLE BUYING GUIDE' : 'FEATURED BUYING GUIDE'}
                  </span>
                  <span className="sb-visual-card__guide-title">{leadGuide.title}</span>
                  <span className="sb-visual-card__guide-link">Explore the guide <ArrowRight width={14} height={14} /></span>
                </Link>
              )}
            </div>
            <div className="sb-visual-sticker sb-visual-sticker--amber" aria-hidden="true">
              THINK<br />BEFORE<br />YOU BUY<span>↗</span>
            </div>
            <div className="sb-visual-sticker sb-visual-sticker--coral" aria-hidden="true">LESS HYPE.<br />MORE CONTEXT.</div>
            <div className="sb-visual-caption">RESEARCH · COMPARE · DECIDE</div>
          </aside>
        </div>
      </section>

      <section className="sb-principles" aria-label="How SmartBuyIndia helps">
        <div className="container sb-principles__grid">
          <article>
            <span className="sb-principles__number">01</span>
            <div><h2>Use-case first</h2><p>Understand what fits your needs before comparing products.</p></div>
          </article>
          <article>
            <span className="sb-principles__number">02</span>
            <div><h2>Clear trade-offs</h2><p>Compare practical criteria instead of relying on a single ranking.</p></div>
          </article>
          <article>
            <span className="sb-principles__number">03</span>
            <div><h2>Useful context</h2><p>Consider space, routine, maintenance, and everyday use in India.</p></div>
          </article>
          <article>
            <span className="sb-principles__number">04</span>
            <div><h2>Open disclosure</h2><p>Understand how retailer links and affiliate commissions work.</p></div>
          </article>
        </div>
      </section>

      <section className="section sb-section" aria-labelledby="research-heading">
        <div className="container">
          <div className="sb-section-head">
            <div>
              <p className="sb-kicker"><span /> Your research desk</p>
              <h2 id="research-heading">Start with the question.<br /><em>Find your answer.</em></h2>
              <p>Guides, comparisons, and category research in one considered place.</p>
            </div>
            <Link to="/buying-guides" className="sb-section-link">Explore the library <ArrowRight width={15} height={15} /></Link>
          </div>

          <div className="sb-bento">
            {leadGuide && (
              <article className="sb-bento-card sb-bento-card--lead">
                <div className="sb-bento-card__label"><BookIcon width={15} height={15} /> BUYING GUIDE {leadGuide.isDemo ? '· SAMPLE CONTENT' : ''}</div>
                <div className="sb-bento-card__lead-content">
                  <div>
                    <p className="sb-bento-card__index">A MORE INFORMED START</p>
                    <h3>{leadGuide.title}</h3>
                    <p>{leadGuide.metaDescription}</p>
                  </div>
                  <Link to={'/guide/' + leadGuide.slug} className="sb-round-link" aria-label={'Read ' + leadGuide.title}>
                    <ArrowRight width={21} height={21} />
                  </Link>
                </div>
                <div className="sb-bento-card__lead-footer">
                  <span>{leadGuide.readingTimeMinutes ? leadGuide.readingTimeMinutes + ' min read' : 'Practical guide'}</span>
                  <span>{(leadGuide.whatToLookFor || []).length} decision criteria</span>
                </div>
                <div className="sb-bento-card__decor" aria-hidden="true">01</div>
              </article>
            )}

            {leadComparison && (
              <article className="sb-bento-card sb-bento-card--compare">
                <div className="sb-bento-card__label"><SwapIcon width={15} height={15} /> SIDE-BY-SIDE COMPARISON</div>
                <h3>{leadComparison.title}</h3>
                <p>{leadComparison.intro}</p>
                <div className="sb-compare-lines" aria-hidden="true"><span /><span /><span /></div>
                <Link to={'/compare/' + leadComparison.slug} className="sb-inline-action">
                  Explore the comparison <ArrowRight width={15} height={15} />
                </Link>
                {leadComparison.isDemo && <span className="sb-content-note">Sample comparison</span>}
              </article>
            )}

            {leadCategory && (
              <article className="sb-bento-card sb-bento-card--category" style={{ '--sb-category-accent': leadCategory.accent }}>
                <span className="sb-bento-card__label">CATEGORY SPOTLIGHT</span>
                <span className="sb-category-glyph" aria-hidden="true">{leadCategory.name.slice(0, 1)}</span>
                <h3>{leadCategory.name}</h3>
                <p>{leadCategory.tagline}</p>
                <Link to={'/category/' + leadCategory.slug} className="sb-inline-action">
                  Explore the category <ArrowRight width={15} height={15} />
                </Link>
              </article>
            )}

            <article className="sb-bento-card sb-bento-card--method">
              <div className="sb-bento-card__label"><ScaleIcon width={15} height={15} /> THE SMARTBUY APPROACH</div>
              <h3>Less noise.<br /><span>More useful context.</span></h3>
              <div className="sb-method-list">
                <Link to="/categories"><span>01</span><strong>Explore a category</strong><ArrowRight width={15} height={15} /></Link>
                <Link to="/buying-guides"><span>02</span><strong>Learn what matters</strong><ArrowRight width={15} height={15} /></Link>
                <Link to="/compare"><span>03</span><strong>Compare options</strong><ArrowRight width={15} height={15} /></Link>
              </div>
              <div className="sb-bento-card__method-decoration" aria-hidden="true">SBI</div>
            </article>
          </div>
        </div>
      </section>

      <section className="sb-campaign" aria-labelledby="campaign-heading">
        <div className="container sb-campaign__inner">
          <div className="sb-campaign__intro">
            <p className="sb-campaign__kicker">A NOTE FOR THE CURIOUS SHOPPER</p>
            <h2 id="campaign-heading">Don't buy the noise.<br /><em>Buy what fits your life.</em></h2>
            <p>Product pages can be crowded with specifications and opinions. Start with your actual needs, learn the trade-offs, and check the retailer's current details before deciding.</p>
            <Link to="/buying-guides" className="btn sb-campaign__button">
              Build your shortlist <ArrowRight width={16} height={16} />
            </Link>
          </div>
          <div className="sb-campaign__tiles">
            <Link to="/categories" className="sb-campaign-tile sb-campaign-tile--coral">
              <span>01 / DISCOVER</span><strong>Start with<br />your needs.</strong><ArrowRight width={20} height={20} />
            </Link>
            <Link to="/compare" className="sb-campaign-tile sb-campaign-tile--cobalt">
              <span>02 / COMPARE</span><strong>See the<br />trade-offs.</strong><ArrowRight width={20} height={20} />
            </Link>
            <Link to="/deals" className="sb-campaign-tile sb-campaign-tile--lime">
              <span>03 / CHECK</span><strong>Review the<br />retailer details.</strong><ArrowRight width={20} height={20} />
            </Link>
          </div>
          <div className="sb-campaign__scribble" aria-hidden="true">CHOOSE<br />WITH<br />CONTEXT ↗</div>
        </div>
      </section>

      <section className="section sb-section" aria-labelledby="categories-heading">
        <div className="container">
          <div className="sb-section-head sb-section-head--compact">
            <div>
              <p className="sb-kicker"><span /> Browse by interest</p>
              <h2 id="categories-heading">Find your <em>starting point.</em></h2>
              <p>Choose an area to explore the options and decisions that matter to you.</p>
            </div>
            <Link to="/categories" className="sb-section-link">All categories <ArrowRight width={15} height={15} /></Link>
          </div>
          <div className="sb-category-grid">
            {featuredCategories.slice(0, 4).map((category, index) => (
              <CategoryCard key={category.id} category={category} className={'sb-category-card sb-category-card--' + (index + 1)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section sb-section sb-section--tint" aria-labelledby="products-heading">
        <div className="container">
          <div className="sb-section-head">
            <div>
              <p className="sb-kicker"><span /> Product profiles</p>
              <h2 id="products-heading">A shortlist is a <em>starting point.</em></h2>
              <p>Explore individual product profiles, the features worth checking, and the practical trade-offs to consider.</p>
            </div>
            <Link to="/categories" className="sb-section-link">Explore products <ArrowRight width={15} height={15} /></Link>
          </div>
          <div className="sb-product-grid">
            {homepageProducts.map((product) => (
              <ProductCard key={product.id} product={product} placement="home-featured" className="sb-product-card" />
            ))}
          </div>
          <DisclosureNotice compact className="sb-disclosure" />
        </div>
      </section>

      <section className="section sb-section" aria-labelledby="guides-heading">
        <div className="container">
          <div className="sb-section-head sb-section-head--compact">
            <div>
              <p className="sb-kicker"><span /> Read before you choose</p>
              <h2 id="guides-heading">Good questions make <em>better guides.</em></h2>
              <p>Plain-language guidance for evaluating the choices in front of you.</p>
            </div>
            <Link to="/buying-guides" className="sb-section-link">All buying guides <ArrowRight width={15} height={15} /></Link>
          </div>
          <div className="sb-guide-grid">
            {homepageGuides.map((guide, index) => (
              <GuideCard key={guide.id} guide={guide} className={'sb-guide-card sb-guide-card--' + (index + 1)} />
            ))}
          </div>
        </div>
      </section>

      {homepageComparisons.length > 0 && (
        <section className="section sb-section sb-section--tint" aria-labelledby="comparisons-heading">
          <div className="container">
            <div className="sb-section-head sb-section-head--compact">
              <div>
                <p className="sb-kicker"><span /> Side by side</p>
                <h2 id="comparisons-heading">Compare the things <em>that matter.</em></h2>
                <p>Understand the differences between options and decide which trade-offs work for you.</p>
              </div>
              <Link to="/compare" className="sb-section-link">All comparisons <ArrowRight width={15} height={15} /></Link>
            </div>
            <div className="sb-comparison-grid">
              {homepageComparisons.map((comparison) => (
                <ComparisonCard key={comparison.id} comparison={comparison} className="sb-comparison-card" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sb-closing">
        <div className="container sb-closing__inner">
          <div>
            <p className="sb-kicker"><span /> Smart choices start here</p>
            <h2>{SITE_TAGLINE}</h2>
            <p>Research the category, compare your options, then check current price and availability on the retailer's website.</p>
          </div>
          <Link to="/categories" className="btn btn--accent btn--lg">
            Start exploring <ArrowRight width={16} height={16} />
          </Link>
        </div>
        <div className="container sb-closing__disclosure">
          <p><ShieldIcon width={15} height={15} /> SmartBuyIndia is independent and may earn a commission from qualifying affiliate purchases. Product and pricing information should be checked on the retailer's site.</p>
          <Link to="/disclosure">Read our disclosure <ArrowRight width={13} height={13} /></Link>
        </div>
      </section>
    </>
  );
}
