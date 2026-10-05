import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { SITE_NAME, CONTACT_EMAIL, LEGAL_ENTITY, LEGAL_CITY } from '../config/site.js';
import { AMAZON_ASSOCIATE_ID, TRACKING_IDS } from '../config/affiliate.js';
import { breadcrumbSchema } from '../utils/seo.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import AnchorLink from '../components/AnchorLink.jsx';
import { InfoIcon, ShieldIcon } from '../components/Icons.jsx';

const UPDATED = 'Draft — review and date before launch';

/**
 * /disclosure — the full affiliate disclosure.
 * This page exists so the short notices across the site can link somewhere
 * that actually explains the arrangement.
 */
export default function DisclosurePage() {
  useSeo({
    title: 'Affiliate disclosure',
    description:
      'How SmartBuyIndia makes money: which links are affiliate links, what the Amazon Associates programme means for you, and what our commissions do and do not influence.',
    path: '/disclosure',
    type: 'article',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Affiliate disclosure', path: '/disclosure' },
      ]),
    ],
  });

  const trackingRows = Object.entries(TRACKING_IDS);

  return (
    <>
      <div className="page-header">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Affiliate disclosure' }]} />
          <h1>Affiliate disclosure</h1>
          <p className="lede">
            Some links on {SITE_NAME} are affiliate links. If you purchase through one of these links,
            we may earn a qualifying commission at no additional cost to you.
          </p>
          <p className="legal__updated">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="container section">
        <div className="legal">
          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ol>
              <li><AnchorLink id="short-version">The short version</AnchorLink></li>
              <li><AnchorLink id="what-is">What an affiliate link is</AnchorLink></li>
              <li><AnchorLink id="amazon">The Amazon Associates programme</AnchorLink></li>
              <li><AnchorLink id="identify">How to identify our affiliate links</AnchorLink></li>
              <li><AnchorLink id="cost">What it costs you</AnchorLink></li>
              <li><AnchorLink id="influence">What commissions do not influence</AnchorLink></li>
              <li><AnchorLink id="prices">Prices, availability and deals</AnchorLink></li>
              <li><AnchorLink id="content">Our content standards</AnchorLink></li>
              <li><AnchorLink id="other">Other commercial arrangements</AnchorLink></li>
              <li><AnchorLink id="complaints">Questions and complaints</AnchorLink></li>
            </ol>
          </nav>

          <h2 id="short-version">The short version</h2>
          <div className="callout callout--info" style={{ marginBottom: '24px' }}>
            <span className="callout__title">
              <InfoIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
              In three sentences
            </span>
            {SITE_NAME} is free to read and is funded by affiliate commissions. When you click a
            retailer link on this site and buy something, we may receive a small percentage of that
            sale from the retailer. The price you pay does not change, and what we recommend is decided
            before we consider whether a product is even available through an affiliate link.
          </div>

          <h2 id="what-is">What an affiliate link is</h2>
          <p>
            An affiliate link is an ordinary web address with a tracking parameter attached to it. When
            you click it, the retailer&rsquo;s website records that the visit came from us. If you go on
            to make a qualifying purchase within the retailer&rsquo;s tracking window, they attribute
            that sale to us and pay a commission.
          </p>
          <p>
            That is the whole mechanism. It is not a redirect service, it does not pass through a
            third-party server, it does not change the product page you land on, and it does not add
            anything to your basket or your bill.
          </p>

          <h2 id="amazon">The Amazon Associates programme</h2>
          <p>
            {SITE_NAME} is a participant in the Amazon Associates programme, an affiliate advertising
            programme designed to provide a means for websites to earn advertising fees by advertising
            and linking to Amazon.in. Our Associate tracking ID is{' '}
            <code>{AMAZON_ASSOCIATE_ID}</code>.
          </p>
          <p>
            To be explicit about what that does <em>not</em> mean: we are not owned by Amazon, not
            operated by Amazon, not partnered with Amazon in any sense beyond this programme, and not
            endorsed or approved by Amazon. Amazon does not review, approve or supply our
            recommendations, and nothing on this site should be read as Amazon&rsquo;s opinion. Product
            names, brands and trademarks belong to their respective owners and are used here only to
            identify the products being discussed.
          </p>
          <p>
            The commission rates are set by Amazon under the programme&rsquo;s own terms and can change
            at any time. We do not control them and we do not share them per product, because the rate
            varies by category and over time.
          </p>

          <h3>Tracking IDs we use</h3>
          <p>
            We may use more than one tracking ID so we can understand which part of the site is useful
            to readers. All of them belong to the same Associates account:
          </p>
          <ul>
            {trackingRows.map(([campaign, id]) => (
              <li key={campaign}>
                <strong>{campaign}</strong> — <code>{id}</code>
              </li>
            ))}
          </ul>
          <p className="inline-note">
            These identifiers are not secret. They appear in the link you click and in this
            website&rsquo;s source code, which is normal and expected for affiliate links.
          </p>

          <h2 id="identify">How to identify our affiliate links</h2>
          <ul>
            <li>
              Every outbound retailer button is labelled — “View on Amazon.in”, “Check availability on
              Amazon.in” or similar — and carries an external-link icon.
            </li>
            <li>
              Every page containing a retailer button also contains an affiliate disclosure, either
              beside the button or at the foot of the content.
            </li>
            <li>
              Affiliate links carry <code>rel="nofollow sponsored noopener"</code> and open in a new
              tab, so search engines and your browser both treat them as paid outbound links.
            </li>
            <li>
              You can always check yourself: the address will be on <code>amazon.in</code> and will
              contain <code>tag={AMAZON_ASSOCIATE_ID}</code>.
            </li>
          </ul>

          <h2 id="cost">What it costs you</h2>
          <p>
            <strong>Nothing.</strong> The price shown in your cart on Amazon.in is identical whether you
            arrived through our link or by typing amazon.in into your browser. The commission is paid
            out of the retailer&rsquo;s margin. There is no surcharge, no affiliate pricing tier and no
            reduction in your consumer rights — returns, refunds and warranty are handled by the
            retailer under their own policies and applicable Indian consumer law, exactly as they would
            be for any other customer.
          </p>

          <h2 id="influence">What commissions do not influence</h2>
          <p>
            We write the recommendation first and attach the link afterwards. Specifically:
          </p>
          <ul>
            <li>
              We do not accept payment for placement in a guide, a shortlist or a comparison table.
            </li>
            <li>
              We do not accept payment to remove a criticism, a “cons” entry or a “who should look
              elsewhere” section.
            </li>
            <li>
              We do not rank products by commission rate. Where a comparison exists, the criteria are
              listed on the page.
            </li>
            <li>
              We include the case <em>against</em> each recommendation, because a shortlist you cannot
              argue with is not useful.
            </li>
            <li>
              A product with no affiliate link available is still eligible to be written about — we
              would simply note that we cannot link to it.
            </li>
          </ul>
          <p>
            Obviously we would prefer that you buy something after reading, because that is how the site
            stays free. But a reader who buys nothing after ten minutes of reading has cost us nothing
            and is just as welcome.
          </p>

          <h2 id="prices">Prices, availability and deals</h2>
          <p>
            Prices, stock levels, delivery estimates and offers on Amazon.in change constantly and vary
            by pincode, seller and time of day. {SITE_NAME} has no live connection to the
            retailer&rsquo;s catalogue in this version of the site, so:
          </p>
          <ul>
            <li>
              Where a price is shown, it is labelled as approximate and carries the date a person on our
              team checked it.
            </li>
            <li>
              Where no price is shown, it is because we have not verified one — not because the product
              is unavailable.
            </li>
            <li>
              Discounts on our <Link to="/deals">deals page</Link> are published only when both the
              original and the sale price have been observed and dated by a person. We do not publish
              estimated, automated or historical discounts.
            </li>
            <li>
              Nothing on this site is a promise that a price, an offer or a stock level will be
              available when you click through. Always confirm the final amount in your cart.
            </li>
          </ul>

          <h2 id="content">Our content standards</h2>
          <div className="callout" style={{ marginBottom: '24px' }}>
            <span className="callout__title">
              <ShieldIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
              What you will never see on this site
            </span>
            Fabricated ratings or review counts · invented prices or discounts · claims that we
            physically tested a product when we did not · “#1 in India” or “Amazon&rsquo;s best” style
            superlatives · fake stock scarcity or countdown timers we cannot substantiate · copied
            retailer descriptions or product photography · misleading redirect links · medical, safety
            or performance guarantees we cannot support.
          </div>
          <p>
            Our editorial content is written by us. Where we describe a product, the language is
            deliberately framed as “editorial summary”, “product information” and “things to consider”,
            because that is what it is. We do not present ourselves as a testing organisation and we do
            not use the vocabulary of one.
          </p>
          <p>
            If you spot anything on this site that reads as a claim we cannot support, please{' '}
            <Link to="/contact">tell us</Link> and we will correct or remove it.
          </p>

          <h2 id="other">Other commercial arrangements</h2>
          <p>
            At present, affiliate commissions are the only commercial arrangement {SITE_NAME} has. If
            that ever changes — for example if we display advertising, run a sponsored guide or receive
            a product on loan — it will be stated on the affected page and on this page, before the
            content goes live rather than after.
          </p>

          <h2 id="complaints">Questions and complaints</h2>
          <p>
            Anything about this disclosure, or about how our links behave, can be sent to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Concerns about the Amazon
            Associates programme itself should be directed to Amazon through their own channels, as we
            have no ability to act on them.
          </p>

          <hr />

          <p className="inline-note">
            This disclosure is provided by {LEGAL_ENTITY}, operating {SITE_NAME} from {LEGAL_CITY},
            India. It should be reviewed by a qualified legal professional before launch and dated
            accordingly. It forms part of our <Link to="/terms">Terms of use</Link> and should be read
            alongside our <Link to="/privacy">Privacy policy</Link>.
          </p>

          <div className="btn-row" style={{ marginTop: '24px' }}>
            <Link to="/about" className="btn btn--outline">
              How we work
            </Link>
            <Link to="/privacy" className="btn btn--ghost">
              Privacy policy
            </Link>
            <Link to="/terms" className="btn btn--ghost">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
