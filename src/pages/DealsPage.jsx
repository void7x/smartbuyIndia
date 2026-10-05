import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import {
  dealsBySection,
  DEAL_TYPE_LABELS,
  STALE_AFTER_DAYS,
} from '../data/deals.js';
import { liveCategories } from '../data/categories.js';
import { guidesByRecency } from '../data/buyingGuides.js';
import { trackDealPageView } from '../utils/analytics.js';
import { formatPrice, formatDate } from '../utils/format.js';
import { breadcrumbSchema } from '../utils/seo.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import AmazonButton from '../components/AmazonButton.jsx';
import ProductImage from '../components/ProductImage.jsx';
import DisclosureNotice from '../components/DisclosureNotice.jsx';
import EmptyState from '../components/EmptyState.jsx';
import GuideCard from '../components/GuideCard.jsx';
import { TagIcon, AlertIcon, ClockIcon, InfoIcon } from '../components/Icons.jsx';

/**
 * /deals
 *
 * Honesty rules enforced by this page:
 *   • A discount badge only renders when BOTH prices exist, the sale price is
 *     lower, and a human recorded the date they checked (`verified` flag from
 *     the data layer).
 *   • Anything older than STALE_AFTER_DAYS is flagged as possibly out of date.
 *   • No countdown timers, no "lowest ever", no invented scarcity.
 *   • When a section is empty, it says so plainly.
 */
export default function DealsPage() {
  const sections = dealsBySection();
  const totalDeals = sections.reduce((sum, section) => sum + section.deals.length, 0);
  const verifiedDeals = sections.find((s) => s.id === 'featured')?.deals.filter((d) => d.verified)
    .length ?? 0;

  useEffect(() => {
    trackDealPageView();
  }, []);

  useSeo({
    title: 'Deals & verified price drops',
    description:
      'Verified deals and price drops across electronics, home & kitchen, beauty and fitness. Every discount on this page is checked by a person and dated — prices and availability can change on the retailer’s website.',
    path: '/deals',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Deals', path: '/deals' },
      ]),
    ],
  });

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Deals' }]} />
          <p className="eyebrow">
            <TagIcon width={13} height={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            Offers we can stand behind
          </p>
          <h1>Deals &amp; price drops</h1>
          <p className="lede">
            We only publish a discount when someone on our team has looked at the live price on
            Amazon.in and recorded the date. No estimated savings, no invented percentages, no fake
            countdowns.
          </p>

          <div className="callout callout--warn" style={{ marginTop: '20px' }}>
            <span className="callout__title">
              <AlertIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
              Prices and availability can change on the retailer&rsquo;s website
            </span>
            Anything shown here was correct at the moment it was checked. Offers can end without
            notice, stock varies by pincode, and the retailer — not SmartBuyIndia — sets the price.
            Always confirm the final amount in your cart before paying.
          </div>
        </div>
      </div>

      <div className="container section">
        {/* Status summary */}
        <div className="stat-row" style={{ marginBottom: '32px' }}>
          <div className="stat">
            <b>{verifiedDeals}</b>
            <span>Verified offers</span>
          </div>
          <div className="stat">
            <b>{totalDeals}</b>
            <span>Tracked entries</span>
          </div>
          <div className="stat">
            <b>{STALE_AFTER_DAYS} days</b>
            <span>Stale-price threshold</span>
          </div>
          <div className="stat">
            <b>{liveCategories.length}</b>
            <span>Categories covered</span>
          </div>
        </div>

        {verifiedDeals === 0 && (
          <EmptyState
            icon={<TagIcon width={46} height={46} />}
            title="No verified deals published right now"
          >
            <p>
              That is deliberate. Publishing a discount nobody has checked is how deal sites lose
              trust, so this page stays empty until an offer has been verified by hand. In the
              meantime, the buying guides below explain what a good price looks like for each
              category — which is usually worth more than a percentage off something you did not need.
            </p>
            <p style={{ marginTop: '12px' }}>
              <strong>What we will show when deals are live:</strong> the original and sale price we
              observed, who checked it, the date, the offer type, and any terms that apply.
            </p>
          </EmptyState>
        )}

        {/* Sections */}
        {sections.map((section) => (
          <section
            key={section.id}
            className="section--tight"
            id={`deals-${section.slug}`}
            aria-labelledby={`deals-${section.slug}-h`}
          >
            <div className="section-head">
              <div className="section-head__text">
                <h2 id={`deals-${section.slug}-h`} style={{ fontSize: 'var(--fs-xl)' }}>
                  {section.title}
                </h2>
                <p>{section.description}</p>
              </div>
              {section.categorySlug && (
                <Link to={`/category/${section.categorySlug}`} className="link-arrow">
                  Browse the category
                </Link>
              )}
            </div>

            {section.deals.length === 0 ? (
              <div className="callout callout--plain">
                <span className="callout__title">Nothing verified in this section yet</span>
                We have not checked a live offer for this category recently, so there is nothing here
                to show. Rather than pad the section with estimated discounts, we leave it empty.
              </div>
            ) : (
              <div className="grid grid-3">
                {section.deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            )}
          </section>
        ))}

        {/* How our deal data works */}
        <section className="section--tight" aria-labelledby="how-deals">
          <div className="content-block">
            <h2 id="how-deals" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <InfoIcon width={22} height={22} style={{ color: 'var(--brand-600)' }} />
              How a deal gets onto this page
            </h2>
            <ol className="prose" style={{ paddingLeft: '1.4em' }}>
              <li>
                <strong>A person opens the product page on Amazon.in</strong> and records the price
                they actually see, including whether a coupon has to be applied at checkout.
              </li>
              <li>
                <strong>Both figures are stored</strong> — the list price and the sale price — along
                with the date of the check and who did it. The percentage is calculated from those two
                numbers, never typed in by hand.
              </li>
              <li>
                <strong>The discount only renders when all of that exists.</strong> A missing date or a
                missing original price means the entry shows as unverified instead of showing a number.
              </li>
              <li>
                <strong>After {STALE_AFTER_DAYS} days it is flagged as possibly out of date</strong>,
                and expired offers are removed rather than left up.
              </li>
            </ol>
            <p className="inline-note" style={{ marginTop: '16px' }}>
              We do not use price-scraping tools or automated feeds in this version of the site, and we
              do not copy retailer product photography or descriptions.
            </p>
          </div>
        </section>

        {/* Instead-of-deals content: guides */}
        <section className="section--tight" aria-labelledby="deals-guides">
          <div className="section-head">
            <div className="section-head__text">
              <h2 id="deals-guides" style={{ fontSize: 'var(--fs-xl)' }}>
                Know what a fair price looks like
              </h2>
              <p>
                A discount is only meaningful against a price you understand. These guides explain what
                to expect at each tier.
              </p>
            </div>
            <Link to="/buying-guides" className="link-arrow">
              All buying guides
            </Link>
          </div>
          <div className="grid grid-3">
            {guidesByRecency.slice(0, 3).map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>

        <section className="section--tight">
          <DisclosureNotice />
        </section>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function DealCard({ deal }) {
  const product = deal.product;
  if (!product) return null;

  const original = formatPrice(deal.originalPrice);
  const sale = formatPrice(deal.salePrice);

  return (
    <article className="card card--relative">
      <div className="product-card__media">
        <span
          className={`badge product-card__badge ${deal.verified ? 'badge--success' : 'badge--demo'}`}
        >
          {deal.verified ? DEAL_TYPE_LABELS[deal.dealType] || 'Verified offer' : 'Unverified entry'}
        </span>
        <ProductImage product={product} label="Placeholder" />
      </div>

      <div className="card__body">
        <p className="card__meta">{deal.title}</p>
        <h3 className="card__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="deal-card__pricing">
          {deal.verified ? (
            <>
              <span className="price-line">
                <span className="price-line__value">{sale}</span>
                {original && <span className="price-line__strike">{original}</span>}
                {deal.discountPercentage !== null && (
                  <span className="badge badge--success">{deal.discountPercentage}% off</span>
                )}
              </span>
              <span className="price-line__note">
                <ClockIcon width={12} height={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                Checked {formatDate(deal.lastChecked)}
                {deal.verifiedBy ? ` by ${deal.verifiedBy}` : ''}
                {deal.stale && ' · may be out of date'}
              </span>
            </>
          ) : (
            <>
              <span className="price-line__value" style={{ fontSize: 'var(--fs-base)' }}>
                No verified price
              </span>
              <span className="price-line__note">
                {deal.note ||
                  'We have not checked a live price for this entry, so no discount is shown.'}
              </span>
            </>
          )}
        </div>

        {deal.terms && <p className="text-xs text-muted">{deal.terms}</p>}
        {deal.couponCode && deal.verified && (
          <p className="text-xs">
            <strong>Coupon:</strong> <code>{deal.couponCode}</code> — apply at checkout
          </p>
        )}

        <div className="card__footer">
          <Link to={`/product/${product.slug}`} className="link-arrow">
            Product details
          </Link>
          <AmazonButton
            product={product}
            placement={`deals:${deal.sectionId}`}
            variant="accent"
            size="sm"
            label="Check price on Amazon.in"
          />
        </div>
      </div>
    </article>
  );
}
