import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { SITE_NAME, SITE_TAGLINE, LEGAL_CITY, CONTACT_EMAIL } from '../config/site.js';
import { AMAZON_ASSOCIATE_ID } from '../config/affiliate.js';
import { getStats } from '../data/index.js';
import { liveCategories } from '../data/categories.js';
import { breadcrumbSchema } from '../utils/seo.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { BookIcon, ScaleIcon, ShieldIcon, TagIcon, AlertIcon } from '../components/Icons.jsx';

/**
 * /about
 *
 * Written to be true. No invented founding year, no "team of experts", no
 * laboratory, no claim that we physically test products. If any of that changes,
 * this page is where it gets updated first.
 */
export default function AboutPage() {
  const stats = getStats();

  useSeo({
    title: 'About SmartBuyIndia',
    description:
      'SmartBuyIndia helps Indian shoppers research products through original buying guides, comparisons and product shortlists. How we work, how we earn, and what we do not claim.',
    path: '/about',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  });

  return (
    <>
      <div className="page-header">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'About' }]} />
          <h1>About {SITE_NAME}</h1>
          <p className="lede">
            {SITE_NAME} helps Indian shoppers research products through buying guides, comparisons and
            product recommendations. We do the reading and narrowing-down; you make the decision and
            buy from the retailer.
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="legal">
          <h2>What we do</h2>
          <p>
            Buying a kitchen appliance, a pair of earbuds or a desk lamp in India usually means
            scrolling through hundreds of near-identical listings, specification tables written for
            engineers, and reviews that may or may not have been written by someone who owns the
            product. It takes far longer than the purchase is worth.
          </p>
          <p>
            We try to remove that work. For each category we publish a buying guide that explains what
            actually matters — capacity against family size, wattage against your wiring, battery
            runtime against your commute, mat thickness against your floor — and then a shortlist of
            products with the reasoning attached to each one. When two options are genuinely close, we
            build a comparison table so you can see the trade-off rather than being told the answer.
          </p>
          <p>
            We are a <strong>discovery and research website</strong>. We do not sell products, hold
            stock, take payment or arrange delivery. When you decide to buy, our links send you to
            Amazon.in, and the purchase is between you and the retailer.
          </p>

          <h2>How we make money</h2>
          <p>
            {SITE_NAME} participates in the Amazon Associates programme. Links to Amazon.in on this
            site carry our tracking ID (<code>{AMAZON_ASSOCIATE_ID}</code>). If you click one and make
            a qualifying purchase, Amazon may pay us a commission. The price you pay is exactly the
            same as if you had gone to Amazon.in yourself — the commission comes out of the
            retailer&rsquo;s margin, not your wallet.
          </p>
          <p>
            This is the entire business model. We do not charge brands, we do not accept payment for
            placement in a shortlist, and we do not run sponsored listings dressed up as editorial.
            Full details are on our <Link to="/disclosure">affiliate disclosure</Link> page.
          </p>

          <h2>What we do not claim</h2>
          <p>
            This matters more than the marketing, so we would rather say it plainly. Unless a page
            says otherwise in its own words, you should assume the following:
          </p>
          <ul>
            <li>
              <strong>We have not physically tested the products.</strong> Our entries are built from
              published specifications, category knowledge and the questions buyers actually ask. We
              do not run a laboratory, and we do not claim one.
            </li>
            <li>
              <strong>We do not publish ratings or review counts.</strong> A number out of five on our
              site would be ours, not yours, and we have no defensible way to produce one.
            </li>
            <li>
              <strong>We do not publish prices we have not checked.</strong> Where a price appears, it
              is labelled approximate and dated. Where none appears, that is deliberate.
            </li>
            <li>
              <strong>We do not rank products against the whole market.</strong> Labels such as “Best
              for small kitchens” describe a situation, and every one is shown next to its reason.
            </li>
            <li>
              <strong>We are not partnered with, endorsed by or approved by Amazon.</strong> We are an
              independent participant in an affiliate programme, which is a commercial arrangement and
              nothing more.
            </li>
            <li>
              <strong>We do not copy retailer content.</strong> Product descriptions, photography and
              customer reviews belong to the retailer and the customers who wrote them. Everything you
              read here is written by us.
            </li>
          </ul>

          <h2>How a page gets written</h2>
          <ol>
            <li>
              We pick a category people are genuinely confused by — where the specification sheet does
              not answer the question a shopper is asking.
            </li>
            <li>
              We write the buying criteria first: what varies between products, and what consequence
              each variation has in an Indian home.
            </li>
            <li>
              We shortlist products against those criteria and write an original summary for each,
              including who should look elsewhere.
            </li>
            <li>
              Where options are close, we build a comparison table with a reason attached to each
              label.
            </li>
            <li>
              We record what we could not verify, and leave it out rather than guessing.
            </li>
          </ol>

          <h2>What is on the site right now</h2>
          <div className="stat-row" style={{ marginBlock: '20px' }}>
            <div className="stat">
              <b>{stats.categories}</b>
              <span>Categories</span>
            </div>
            <div className="stat">
              <b>{stats.products}</b>
              <span>Product entries</span>
            </div>
            <div className="stat">
              <b>{stats.guides}</b>
              <span>Buying guides</span>
            </div>
            <div className="stat">
              <b>{stats.comparisons}</b>
              <span>Comparisons</span>
            </div>
          </div>
          <p className="inline-note">
            The catalogue is intentionally small. We would rather publish {stats.guides} guides that
            answer a real question than {stats.guides * 20} that repeat a specification sheet.
          </p>

          <h2>Corrections</h2>
          <p>
            If something on this site is wrong, out of date, or reads as a claim we cannot support,
            tell us and we will fix it. Send the page URL and what you believe is inaccurate to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We do not treat a correction
            request as a complaint to be defended.
          </p>
        </div>

        <section className="section--tight" aria-labelledby="about-principles">
          <h2 id="about-principles" style={{ marginBottom: '20px' }}>
            The four rules we work to
          </h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>
                <BookIcon width={18} height={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8 }} />
                Say why
              </h3>
              <p>
                Every recommendation carries its reasoning, including the case against it. If a reader
                cannot disagree with us, we have not told them enough.
              </p>
            </div>
            <div className="feature-card">
              <h3>
                <ScaleIcon width={18} height={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8 }} />
                Fit, not rank
              </h3>
              <p>
                There is rarely one best product. There is a best product for a two-person household on
                a tight platform, and a different one for a family of five. We label the situation.
              </p>
            </div>
            <div className="feature-card">
              <h3>
                <ShieldIcon width={18} height={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8 }} />
                Nothing unverified
              </h3>
              <p>
                No invented prices, ratings, discounts, test results or scarcity. An empty section
                stays empty until there is something true to put in it.
              </p>
            </div>
            <div className="feature-card">
              <h3>
                <TagIcon width={18} height={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8 }} />
                Disclose always
              </h3>
              <p>
                The affiliate relationship is stated on every page with a retailer link, not buried in
                a footer you have to hunt for.
              </p>
            </div>
          </div>
        </section>

        <section className="section--tight" aria-labelledby="about-categories">
          <h2 id="about-categories" style={{ marginBottom: '16px' }}>
            Categories we cover
          </h2>
          <ul className="chip-row">
            {liveCategories.map((category) => (
              <li key={category.slug}>
                <Link className="chip chip--brand" to={`/category/${category.slug}`} style={{ textDecoration: 'none' }}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="inline-note" style={{ marginTop: '14px' }}>
            Baby &amp; Kids, Pet Care, Travel Essentials and Automotive Accessories are planned next,
            once the research is done rather than before.
          </p>
        </section>

        <div className="callout callout--warn" style={{ marginTop: '32px' }}>
          <span className="callout__title">
            <AlertIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            Not professional advice
          </span>
          Nothing on {SITE_NAME} is medical, legal, financial or safety advice. Guidance about
          nutrition, injuries, health conditions, electrical work in your home or child safety should
          come from a qualified professional who knows your situation. We write about products, not
          about your health or your wiring.
        </div>

        <div className="btn-row" style={{ marginTop: '32px' }}>
          <Link to="/contact" className="btn">
            Get in touch
          </Link>
          <Link to="/disclosure" className="btn btn--outline">
            Read the affiliate disclosure
          </Link>
          <Link to="/buying-guides" className="btn btn--ghost">
            Start with a buying guide
          </Link>
        </div>

        <p className="inline-note" style={{ marginTop: '32px' }}>
          {SITE_NAME} · {SITE_TAGLINE} · Operated from {LEGAL_CITY} · Contact:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </>
  );
}
