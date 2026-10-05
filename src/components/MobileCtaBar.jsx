import { useEffect } from 'react';
import AmazonButton from './AmazonButton.jsx';

/**
 * Sticky bottom CTA bar for product pages on small screens.
 * The button stays thumb-reachable without covering the content.
 */
export default function MobileCtaBar({ product, placement = 'mobile-sticky' }) {
  useEffect(() => {
    document.body.classList.add('has-mobile-cta');
    return () => document.body.classList.remove('has-mobile-cta');
  }, []);

  if (!product) return null;

  return (
    <div className="mobile-cta-bar">
      <div className="mobile-cta-bar__text">
        <p className="mobile-cta-bar__label">Available at</p>
        <p className="mobile-cta-bar__name">{product.name}</p>
      </div>
      <AmazonButton product={product} placement={placement} variant="accent" size="sm" />
    </div>
  );
}
