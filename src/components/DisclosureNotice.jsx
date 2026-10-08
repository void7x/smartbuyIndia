import { Link } from 'react-router-dom';
import { InfoIcon } from './Icons.jsx';
import { cx } from '../utils/format.js';
import { AMAZON_ASSOCIATE_DISCLOSURE } from '../config/site.js';

/**
 * Affiliate disclosure. Two sizes:
 *
 *   <DisclosureNotice compact />  -> one line, used near CTAs and in tables
 *   <DisclosureNotice />          -> full panel with a link to /disclosure
 *
 * Never remove these from pages that contain affiliate CTAs. Amazon's
 * operating agreement and Indian advertising norms both require clear,
 * conspicuous disclosure — and it is simply the honest thing to do.
 */
export default function DisclosureNotice({
  compact = false,
  withLink = true,
  className = '',
  id,
}) {
  if (compact) {
    return (
      <p className={cx('disclosure', className)} id={id}>
        <InfoIcon />
        <span>
          <strong>Affiliate disclosure:</strong> some links on SmartBuyIndia are affiliate links.
          If you buy through one, we may earn a qualifying commission at no extra cost to you. <strong>${AMAZON_ASSOCIATE_DISCLOSURE}</strong>
          {withLink && (
            <>
              {' '}
              <Link to="/disclosure">How this works</Link>
            </>
          )}
        </span>
      </p>
    );
  }

  return (
    <aside className={cx('callout callout--plain', className)} id={id} aria-label="Affiliate disclosure">
      <span className="callout__title">Affiliate disclosure</span>
      <p><strong>{AMAZON_ASSOCIATE_DISCLOSURE}</strong></p>
      <p>
        SmartBuyIndia is a free, reader-supported product research website. Some links on this page
        — including every “View on Amazon.in” button — are affiliate links carrying our Amazon
        Associates tracking ID. If you click one and make a qualifying purchase, Amazon may pay us a
        commission. The price you pay is the same as if you had gone to Amazon.in directly; you never
        pay extra for using our links.
      </p>
      <p style={{ marginTop: '10px' }}>
        Commissions do not change what we recommend. We publish the reasoning behind every shortlist
        so you can disagree with it, and we do not accept payment for placement.
        {withLink && (
          <>
            {' '}
            <Link to="/disclosure">Read the full affiliate disclosure</Link>.
          </>
        )}
      </p>
    </aside>
  );
}

/**
 * Neutral retailer relationship statement. We are an independent site in the
 * Amazon Associates programme — we never imply that Amazon endorses us.
 */
export function RetailerNote({ className = '' }) {
  return (
    <p className={cx('inline-note', className)}>
      SmartBuyIndia is an independent product research website and is not owned or operated by
      Amazon. Product availability, pricing and offers are set by the retailer and can change at any
      time. We are a participant in the Amazon Associates programme, which provides a means for us to
      earn fees by linking to Amazon.in.
    </p>
  );
}
