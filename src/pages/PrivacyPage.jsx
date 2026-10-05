import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { SITE_NAME, CONTACT_EMAIL, LEGAL_ENTITY, LEGAL_CITY } from '../config/site.js';
import { breadcrumbSchema } from '../utils/seo.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import AnchorLink from '../components/AnchorLink.jsx';
import { IS_DEMO_CONTENT } from '../config/content.js';

const UPDATED = 'Draft — review, date and have checked by a qualified professional before launch';

/**
 * /privacy — accurate for what the site actually does today (a static site with
 * no backend), with the analytics additions clearly flagged as "when enabled".
 */
export default function PrivacyPage() {
  useSeo({
    title: 'Privacy policy',
    description:
      'How SmartBuyIndia handles data: what a static site collects, what it does not, third-party services you may encounter, and your rights under Indian law.',
    path: '/privacy',
    type: 'article',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Privacy policy', path: '/privacy' },
      ]),
    ],
  });

  return (
    <>
      <div className="page-header">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Privacy policy' }]} />
          <h1>Privacy policy</h1>
          <p className="lede">
            {SITE_NAME} is a static website with no user accounts, no database and no server of our own
            that receives your data. That makes our privacy position unusually simple — and this page
            sets out exactly what that means in practice.
          </p>
          <p className="legal__updated">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="container section">
        <div className="legal">
          {IS_DEMO_CONTENT && (
            <div className="callout callout--warn" style={{ marginBottom: '24px' }}>
              <span className="callout__title">Before you publish this page</span>
              Replace the placeholder contact address, add your real operating entity and address,
              confirm which analytics provider (if any) you connect, and have the finished policy
              reviewed against the Digital Personal Data Protection Act, 2023. A privacy policy that
              describes a different website than the one you are running is worse than none.
            </div>
          )}

          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ol>
              <li><AnchorLink id="summary">Summary</AnchorLink></li>
              <li><AnchorLink id="collect">What we collect</AnchorLink></li>
              <li><AnchorLink id="not-collect">What we do not collect</AnchorLink></li>
              <li><AnchorLink id="analytics">Analytics</AnchorLink></li>
              <li><AnchorLink id="cookies">Cookies and local storage</AnchorLink></li>
              <li><AnchorLink id="third-parties">Third parties you leave us for</AnchorLink></li>
              <li><AnchorLink id="children">Children</AnchorLink></li>
              <li><AnchorLink id="rights">Your rights</AnchorLink></li>
              <li><AnchorLink id="security">Security and hosting</AnchorLink></li>
              <li><AnchorLink id="changes">Changes to this policy</AnchorLink></li>
              <li><AnchorLink id="contact-privacy">Contact</AnchorLink></li>
            </ol>
          </nav>

          <h2 id="summary">Summary</h2>
          <p>
            You can read every page on {SITE_NAME} without creating an account, signing in, giving us
            your name, or telling us anything about yourself. We do not sell personal data, we do not
            build advertising profiles, and we do not operate a server that stores information about
            you. When you click a retailer link, you leave our site and the retailer&rsquo;s own privacy
            policy applies from that point.
          </p>

          <h2 id="collect">What we collect</h2>
          <p>
            In this version of the site, the only information that could be described as collected is:
          </p>
          <ul>
            <li>
              <strong>Standard web server logs.</strong> Our site is hosted on static hosting, which
              (like almost all hosts) may log technical details of each request: the pages requested,
              approximate time, browser type, and a truncated or full IP address. These logs are
              created by the host for security and reliability, are not used by us to identify
              individuals, and we do not have access to any additional information about you through
              them.
            </li>
            <li>
              <strong>Anything you choose to send us.</strong> If you email us, or use the contact page
              (which opens your own email client rather than submitting to a server), we receive the
              message you wrote and the address you sent it from. We use that only to reply.
            </li>
          </ul>

          <h2 id="not-collect">What we do not collect</h2>
          <ul>
            <li>No account, no profile, no login — there is nothing to log in to.</li>
            <li>No payment information. We never take payment; the retailer does.</li>
            <li>No order history, address, phone number or purchase data. We have no visibility into
              what you buy after clicking through, beyond the aggregated commission reporting the
              affiliate programme provides.</li>
            <li>No cross-site tracking, no advertising identifiers, no fingerprinting.</li>
            <li>No location data beyond whatever the host infers from an IP address for its own logs.</li>
            <li>No data sold or shared with advertisers, data brokers or any other third party.</li>
          </ul>

          <h2 id="analytics">Analytics</h2>
          <p>
            The application is built with an analytics-ready event layer: actions such as a product page
            view, a search query, a category view or a click on a retailer button are passed to a single
            internal function. <strong>In this version that function does not transmit anything
            anywhere</strong> — during development it writes to the browser console so we can check the
            site behaves correctly, and it is invisible to normal browsing.
          </p>
          <p>If we later connect an analytics provider, this section will be updated to state:</p>
          <ul>
            <li>the provider&rsquo;s name and privacy policy;</li>
            <li>exactly which events are sent (page path, search term, product identifier, placement);</li>
            <li>whether IP addresses are anonymised, and the retention period;</li>
            <li>how to opt out.</li>
          </ul>
          <p>
            Even then, our intent is aggregate measurement — which guides people read, which searches
            return nothing — not individual profiling. We would not collect names, email addresses or
            precise location through analytics.
          </p>

          <h2 id="cookies">Cookies and local storage</h2>
          <p>
            {SITE_NAME} does not set advertising or tracking cookies. We use the browser&rsquo;s local
            storage in one limited way: if you arrive through a broken or moved link, a temporary value
            may be stored so we can send you to the right page. It contains no personal information and
            is cleared immediately after use.
          </p>
          <p>
            Third parties can set their own cookies once you leave our site — most relevantly Amazon.in
            after you click a retailer link, and any analytics provider if one is connected in future.
            We have no control over those and cannot see them. Your browser settings let you block or
            delete cookies for any site.
          </p>

          <h2 id="third-parties">Third parties you leave us for</h2>
          <ul>
            <li>
              <strong>Amazon.in.</strong> Clicking a retailer button takes you to Amazon&rsquo;s website,
              where their privacy notice and cookie policy govern what happens next. The link carries
              our Associates tracking ID, which is how a qualifying purchase is attributed to us.
            </li>
            <li>
              <strong>Static hosting.</strong> Our site is served by a static hosting provider, which
              handles request logs as described above.
            </li>
            <li>
              <strong>Social profiles.</strong> Footer social links currently point to placeholder
              destinations. Once live profiles are linked, visiting them is subject to that
              platform&rsquo;s own policies.
            </li>
          </ul>
          <p>
            We do not embed third-party widgets, comment systems, ad networks, video players or social
            media frames that would transmit your data before you choose to interact with them.
          </p>

          <h2 id="children">Children</h2>
          <p>
            {SITE_NAME} is a general-audience product research website and is not directed at children.
            We do not knowingly collect personal data from anyone under 18. If you believe a child has
            sent us personal information, contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will delete it.
          </p>

          <h2 id="rights">Your rights</h2>
          <p>
            Because we hold essentially no personal data about you, most privacy rights are satisfied by
            default. To the extent the Digital Personal Data Protection Act, 2023 and other applicable
            Indian law give you rights over your personal data, you may at any time:
          </p>
          <ul>
            <li>ask what personal data we hold about you (in practice: any message you sent us);</li>
            <li>ask us to correct it;</li>
            <li>ask us to erase it;</li>
            <li>withdraw any consent you gave, for example to be replied to by email;</li>
            <li>ask how to complain to the relevant regulator.</li>
          </ul>
          <p>
            Send any request to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with enough
            detail for us to find the record. We will respond within a reasonable period, and there is
            no charge.
          </p>

          <h2 id="security">Security and hosting</h2>
          <p>
            The site is served over HTTPS, which protects the connection between your browser and the
            host. Because there is no database and no user accounts, there is no store of personal data
            on our side that could be breached. The main residual risk is the content of any email you
            choose to send us, which you should not use for sensitive personal, financial or health
            information.
          </p>

          <h2 id="changes">Changes to this policy</h2>
          <p>
            If we add analytics, advertising, a newsletter, comments or any other feature that changes
            what data is handled, we will update this page first and change the “last updated” date
            above. Continued use of the site after a change is published means you accept the updated
            policy.
          </p>

          <h2 id="contact-privacy">Contact</h2>
          <p>
            Questions about privacy can be sent to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or raised through our{' '}
            <Link to="/contact">contact page</Link>.
          </p>

          <hr />
          <p className="inline-note">
            {LEGAL_ENTITY}, operating {SITE_NAME} from {LEGAL_CITY}, India. This policy is a template
            describing the site as currently built. It is not legal advice and should be reviewed by a
            qualified professional before launch. See also our{' '}
            <Link to="/disclosure">affiliate disclosure</Link> and <Link to="/terms">terms of use</Link>.
          </p>

          <div className="btn-row" style={{ marginTop: '24px' }}>
            <Link to="/disclosure" className="btn btn--outline">
              Affiliate disclosure
            </Link>
            <Link to="/terms" className="btn btn--ghost">
              Terms of use
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
