import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import AmazonButton from './AmazonButton.jsx';
import { formatPrice, formatDate } from '../utils/format.js';
import { ArrowRight, CheckIcon, AlertIcon } from './Icons.jsx';
import { cx } from '../utils/format.js';

/**
 * DecisionProductCard
 *
 * Compact, scan-first product card for buying guides and comparisons.
 * It intentionally avoids rankings and uses a use-case label plus a reason.
 */
export default function DecisionProductCard({
  product,
  label,
  why,
  watchOuts = [],
  placement = 'decision-card',
  className,
}) {
  if (!product) return null;

  const features = (product.keyFeatures || []).slice(0, 5);
  const price = formatPrice(product.price);
  const goodFor = label || product.goodFor || product.whoItsFor?.[0];
  const skipIf =
    watchOuts?.[0] ||
    product.skipIf ||
    product.whoMightSkip?.[0] ||
    product.cons?.[0];

  return (
    <article className={cx('decision-card', className)}>
      <div className="decision-card__media">
        {product.isDemo && <span className="badge badge--demo decision-card__badge">Demo entry</span>}
        <ProductImage product={product} label={product.isDemo ? 'Placeholder' : 'Product image'} />
      </div>

      <div className="decision-card__body">
        <div className="decision-card__head">
          {label && <span className="badge decision-card__label">{label}</span>}
          {product.updatedAt && (
            <span className="decision-card__updated">Updated {formatDate(product.updatedAt)}</span>
          )}
        </div>

        <h3 className="decision-card__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        {price && (
          <p className="decision-card__price">
            {price}
            <span>approx.</span>
          </p>
        )}

        {features.length > 0 && (
          <ul className="decision-card__specs" aria-label="Key specifications">
            {features.map((feature) => (
              <li key={feature.label}>
                <span className="decision-card__spec-label">{feature.label}</span>
                <span className="decision-card__spec-value">{feature.value}</span>
              </li>
            ))}
          </ul>
        )}

        {goodFor && (
          <div className="decision-card__fit decision-card__fit--good">
            <CheckIcon aria-hidden="true" />
            <span>
              <strong>Good for:</strong> {goodFor}
            </span>
          </div>
        )}

        {(why || skipIf) && (
          <div className="decision-card__notes">
            {why && (
              <p className="decision-card__why">
                <strong>Why:</strong> {why}
              </p>
            )}
            {skipIf && (
              <p className="decision-card__fit decision-card__fit--skip">
                <AlertIcon aria-hidden="true" />
                <span>
                  <strong>Skip if:</strong> {skipIf}
                </span>
              </p>
            )}
          </div>
        )}

        <div className="decision-card__actions">
          <AmazonButton
            product={product}
            placement={placement}
            variant="accent"
            size="sm"
            label="Check on Amazon.in"
          />
          <Link to={`/product/${product.slug}`} className="link-arrow">
            Details <ArrowRight width={14} height={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
