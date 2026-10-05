import { useCallback } from 'react';
import { generateAffiliateUrl, isPlaceholderAffiliateUrl, RETAILER_LABEL } from '../utils/affiliate.js';
import { trackAffiliateClick } from '../utils/analytics.js';
import { CTA_LABELS } from '../config/affiliate.js';
import { ExternalIcon } from './Icons.jsx';
import { cx } from '../utils/format.js';

/**
 * ---------------------------------------------------------------------------
 * <AmazonButton /> — the ONLY component that renders an outbound retailer CTA.
 * ---------------------------------------------------------------------------
 * Responsibilities:
 *   1. Builds the link through `generateAffiliateUrl()` so the tracking ID is
 *      always attached centrally (never hand-written in a component).
 *   2. Fires `trackAffiliateClick(productId, category, placement)` on click.
 *   3. Opens in a new tab with `rel="nofollow sponsored noopener"` — the
 *      correct attributes for a paid affiliate link.
 *   4. While a product has no verified link, renders an inert, clearly labelled
 *      disabled state instead of sending anyone to a wrong page.
 */
export default function AmazonButton({
  product,
  placement = 'unspecified',
  campaign,
  label,
  variant = 'primary',
  size = 'md',
  block = false,
  showExternalIcon = true,
  disabledTitle = 'Affiliate links activate once verified product data is added.',
  className,
  ...rest
}) {
  const url = generateAffiliateUrl(product, { placement, campaign });
  const placeholder = isPlaceholderAffiliateUrl(url);

  const handleClick = useCallback(
    (event) => {
      if (placeholder) {
        event.preventDefault();
        return;
      }
      trackAffiliateClick(product?.id, product?.categorySlug, placement);
    },
    [placeholder, product, placement],
  );

  const resolvedLabel =
    label || (variant === 'secondary' ? CTA_LABELS.secondary : CTA_LABELS.primary);

  const classes = cx(
    'btn',
    variant === 'accent' && 'btn--accent',
    variant === 'secondary' && 'btn--outline',
    variant === 'ghost' && 'btn--ghost',
    size === 'lg' && 'btn--lg',
    size === 'sm' && 'btn--sm',
    block && 'btn--block',
    className,
  );

  if (placeholder) {
    return (
      <span
        className={classes}
        role="link"
        aria-disabled="true"
        title={disabledTitle}
      >
        {resolvedLabel}
        {showExternalIcon && <ExternalIcon className="btn__external" />}
      </span>
    );
  }

  return (
    <a
      className={classes}
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={handleClick}
      data-product-id={product?.id}
      data-placement={placement}
      data-retailer={RETAILER_LABEL}
      {...rest}
    >
      {resolvedLabel}
      {showExternalIcon && <ExternalIcon className="btn__external" />}
    </a>
  );
}

/**
 * Small text link variant for use inside tables and tight layouts.
 */
export function AmazonTextLink({ product, placement = 'inline', campaign, children, ...rest }) {
  const url = generateAffiliateUrl(product, { placement, campaign });
  const placeholder = isPlaceholderAffiliateUrl(url);

  if (placeholder) {
    return (
      <span className="text-xs text-muted" title="Affiliate link not yet available for this demo entry.">
        {children || 'Link coming soon'}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={() => trackAffiliateClick(product?.id, product?.categorySlug, placement)}
      {...rest}
    >
      {children || `View on ${RETAILER_LABEL}`}
    </a>
  );
}
