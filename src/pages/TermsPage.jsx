import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { SITE_NAME, CONTACT_EMAIL, LEGAL_ENTITY, LEGAL_CITY } from '../config/site.js';
import { breadcrumbSchema } from '../utils/seo.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import AnchorLink from '../components/AnchorLink.jsx';
import { IS_DEMO_CONTENT } from '../config/content.js';

const UPDATED = 'Staging draft — 8 October 2026; final entity, address and legal review required before launch';

/** /terms */
export default function TermsPage() {
  useSeo({
    title: 'Terms of use',
    description:
      'The terms that apply when you use SmartBuyIndia: what the site is, what our content is and is not, the affiliate relationship, intellectual property, liability and governing law.',
    path: '/terms',
    type: 'article',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Terms of use', path: '/terms' },
      ]),
    ],
  });

  return (
    <>
      <div className="page-header">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Terms of use' }]} />
          <h1>Terms of use</h1>
          <p className="lede">
            These terms explain what {SITE_NAME} is, what you can expect from our content, and what we
            are not responsible for. Please read them alongside our{' '}
            <Link to="/disclosure">affiliate disclosure</Link> and{' '}
            <Link to="/privacy">privacy policy</Link>.
          </p>
          <p className="legal__updated">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="container section">
        <div className="legal">
          {IS_DEMO_CONTENT && (
            <div className="callout callout--warn" style={{ marginBottom: '24px' }}>
              <span className="callout__title">Before you publish this page</span>
              Insert your real operating entity, registered address and an effective date, then have
              the terms reviewed by a qualified legal professional in India. The liability, warranty
              and jurisdiction sections in particular should reflect your actual circumstances.
            </div>
          )}

          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ol>
              <li><AnchorLink id="acceptance">1. Acceptance of these terms</AnchorLink></li>
              <li><AnchorLink id="what-we-are">2. What SmartBuyIndia is</AnchorLink></li>
              <li><AnchorLink id="not-a-seller">3. We are not the seller</AnchorLink></li>
              <li><AnchorLink id="no-advice">4. Our content is not professional advice</AnchorLink></li>
              <li><AnchorLink id="accuracy">5. Accuracy, prices and availability</AnchorLink></li>
              <li><AnchorLink id="affiliate-terms">6. Affiliate links</AnchorLink></li>
              <li><AnchorLink id="ip">7. Intellectual property</AnchorLink></li>
              <li><AnchorLink id="acceptable-use">8. Acceptable use</AnchorLink></li>
              <li><AnchorLink id="third-party">9. Third-party websites</AnchorLink></li>
              <li><AnchorLink id="warranty">10. Disclaimer of warranties</AnchorLink></li>
              <li><AnchorLink id="liability">11. Limitation of liability</AnchorLink></li>
              <li><AnchorLink id="indemnity">12. Indemnity</AnchorLink></li>
              <li><AnchorLink id="termination">13. Changes and termination</AnchorLink></li>
              <li><AnchorLink id="law">14. Governing law</AnchorLink></li>
              <li><AnchorLink id="contact-terms">15. Contact</AnchorLink></li>
            </ol>
          </nav>

          <h2 id="acceptance">1. Acceptance of these terms</h2>
          <p>
            By accessing or using {SITE_NAME} you agree to these terms. If you do not agree with any
            part of them, please do not use the site. Any purchase you make after leaving this site is
            subject to the retailer's own terms, including any age or eligibility requirements that apply
            to that transaction.
          </p>

          <h2 id="what-we-are">2. What SmartBuyIndia is</h2>
          <p>
            {SITE_NAME} is an independent product research and discovery website. We publish original
            buying guides, product summaries and comparison tables for Indian shoppers. We do not sell
            goods, hold inventory, take payment, arrange delivery, handle returns or provide customer
            service for any product.
          </p>

          <h2 id="not-a-seller">3. We are not the seller</h2>
          <p>
            Any purchase you make after leaving this site is a contract between you and the retailer —
            for example Amazon.in or a third-party seller on that marketplace — on that
            retailer&rsquo;s own terms. {SITE_NAME} is not a party to that contract and has no
            responsibility for the product, its description, its delivery, its warranty, a refund or a
            return. Direct any such issue to the retailer through their customer service channels.
          </p>

          <h2 id="no-advice">4. Our content is not professional advice</h2>
          <p>
            Our content is general information about consumer products, written to help you narrow a
            shortlist. It is not medical, nutritional, legal, financial, electrical-engineering or
            safety advice, and it is not a substitute for a qualified professional who knows your
            circumstances.
          </p>
          <p>
            In particular: do not rely on anything here for a health condition, an injury, a dietary
            requirement, work on your home&rsquo;s electrical wiring, or the safety of a child or an
            older relative. Always follow the manufacturer&rsquo;s instructions for any appliance, and
            consult a qualified professional where the task calls for one.
          </p>

          <h2 id="accuracy">5. Accuracy, prices and availability</h2>
          <p>
            We take reasonable care that our content is accurate when published, but products, prices,
            offers, specifications and stock change without notice and we cannot monitor every listing
            continuously. Where a price appears it is labelled as approximate and dated from the moment
            a person on our team checked it.
          </p>
          <p>
            Content may contain typographical errors or become outdated, and we are under no obligation
            to update any particular page. Nothing on the site is a guarantee that a product will be
            available, that a price will hold, or that a product will behave as described for your
            specific situation.
          </p>
          <p>
            Where we say we have not tested a product, that is the position — our entries describe a
            product class from published information and general buyer considerations, not from a
            hands-on evaluation by us.
          </p>

          <h2 id="affiliate-terms">6. Affiliate links</h2>
          <p>
            Some links on {SITE_NAME}, including every button labelled “View on Amazon.in”, are
            affiliate links carrying our Associates tracking ID. If you click one and make a qualifying
            purchase, we may earn a commission at no additional cost to you. The full arrangement, the
            tracking IDs we use and what commissions do not influence are set out in our{' '}
            <Link to="/disclosure">affiliate disclosure</Link>, which forms part of these terms.
          </p>
          <p>
            We are an independent participant in the Amazon Associates programme. We are not owned,
            operated, endorsed, approved or sponsored by Amazon, and our recommendations are not
            Amazon&rsquo;s recommendations.
          </p>

          <h2 id="ip">7. Intellectual property</h2>
          <p>
            The text, guides, comparisons, layout, logo and original illustrations on {SITE_NAME} are
            owned by {LEGAL_ENTITY} or licensed to us, and are protected by applicable copyright and
            trademark law. You may read the site, share a link to a page, and quote short passages with
            clear attribution and a link back. You may not republish whole guides, scrape the site into
            another product, present our work as your own, or use our name or logo in a way that
            suggests we endorse a product, service or website.
          </p>
          <p>
            Product names, brand names, logos and trademarks mentioned on this site belong to their
            respective owners and are used only to identify and describe the products discussed. Their
            use does not imply any affiliation with or endorsement by those owners. {SITE_NAME} does not
            reproduce retailer product photography, listing descriptions or customer reviews.
          </p>

          <h2 id="acceptable-use">8. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>use the site for any unlawful purpose or in breach of these terms;</li>
            <li>attempt to interfere with, disrupt or overload the site or its hosting;</li>
            <li>scrape, crawl, data-mine or automatically collect content at scale without permission;</li>
            <li>misrepresent your relationship with {SITE_NAME}, or use our name or marks deceptively;</li>
            <li>frame the site, strip its disclosure notices, or present our content inside another
              product in a way that hides its source;</li>
            <li>submit anything unlawful, defamatory, infringing or malicious through our contact
              channels.</li>
          </ul>

          <h2 id="third-party">9. Third-party websites</h2>
          <p>
            Links to third-party websites, including retailer product pages, are provided for your
            convenience. We do not control those websites and are not responsible for their content,
            privacy practices, terms, pricing, offers or the products and services they provide. Their
            appearance on {SITE_NAME} is not an endorsement of everything they contain. Once you leave
            our site, the destination&rsquo;s own terms and policies apply.
          </p>

          <h2 id="warranty">10. Disclaimer of warranties</h2>
          <p>
            The site and all content on it are provided on an “as is” and “as available” basis, without
            warranties of any kind, whether express or implied, including but not limited to implied
            warranties of merchantability, fitness for a particular purpose, non-infringement, and any
            warranty arising from a course of dealing or usage of trade. We do not warrant that the site
            will be uninterrupted, error-free or free of harmful components, or that any content is
            complete, current or suitable for your purposes.
          </p>

          <h2 id="liability">11. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by applicable law, {LEGAL_ENTITY} and anyone who
            contributes to {SITE_NAME} will not be liable for any indirect, incidental, special,
            consequential or punitive damages, or any loss of profit, revenue, data, savings or
            goodwill, arising out of or in connection with your use of the site, your reliance on any
            content, or any purchase you make with a third party after leaving the site.
          </p>
          <p>
            To the maximum extent permitted by applicable law, our liability arising from your use of the
            site or reliance on its content is limited to losses that are lawfully capable of being limited.
            Nothing in these terms excludes or limits any liability, consumer right or remedy that
            applicable Indian law does not permit us to exclude or limit.
          </p>

          <h2 id="indemnity">12. Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless {LEGAL_ENTITY} and its contributors from claims,
            losses and reasonable expenses arising from your breach of these terms, your misuse of the
            site, or your use of any content in a manner not contemplated here.
          </p>

          <h2 id="termination">13. Changes and termination</h2>
          <p>
            We may update these terms at any time by publishing a revised version on this page with a
            new “last updated” date. Your continued use of the site after a change is published
            constitutes acceptance of the revised terms. We may also suspend or discontinue the site, or
            any part of it, at any time without notice; if we do, these terms continue to apply to your
            prior use.
          </p>

          <h2 id="law">14. Governing law</h2>
          <p>
            These terms are governed by the laws of India. Subject to any mandatory consumer protection
            provisions that apply to you, the courts at {LEGAL_CITY} have exclusive jurisdiction over
            any dispute arising out of or relating to these terms or your use of the site. Nothing here
            removes any statutory rights you hold as a consumer under the Consumer Protection Act, 2019
            or other applicable Indian law.
          </p>

          <h2 id="contact-terms">15. Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or raised through our{' '}
            <Link to="/contact">contact page</Link>.
          </p>

          <hr />
          <p className="inline-note">
            {LEGAL_ENTITY}, {LEGAL_CITY}, India, operating {SITE_NAME}. This document is a starting
            template that describes the site as currently built. It is not legal advice; have it
            reviewed by a qualified legal professional before launch and insert the correct entity
            details and effective date.
          </p>

          <div className="btn-row" style={{ marginTop: '24px' }}>
            <Link to="/disclosure" className="btn btn--outline">
              Affiliate disclosure
            </Link>
            <Link to="/privacy" className="btn btn--ghost">
              Privacy policy
            </Link>
            <Link to="/about" className="btn btn--ghost">
              About us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
