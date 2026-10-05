import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import AmazonButton from './AmazonButton.jsx';
import { getCategoryName } from '../data/categories.js';
import { CheckIcon } from './Icons.jsx';
import { cx } from '../utils/format.js';

/**
 * Product card used on the homepage, category pages, guides and search results.
 *
 * `placement` is passed to the affiliate button so click analytics can tell a
 * homepage impression apart from a related-products impression.
 */
export default function ProductCard({
  product,
  placement = 'product-grid',
  showCta = true,
  showFeatures = true,
  featureLimit = 2,
  className,
}) {
  if (!product) return null;
  const category = getCategoryName(product.categorySlug);
  const features = (product.keyFeatures || []).slice(0, featureLimit);

  return (
    <article className={cx('card card--relative', className)}>
      <div className="product-card__media">
        {(product.isDemo || product.imagePlaceholder) && (
          <span className="badge badge--demo product-card__badge">Demo entry</span>
        )}
        <ProductImage product={product} />
      </div>

      <div className="card__body">
        <p className="card__meta">{category}</p>

        <h3 className="card__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        <p className="card__text">{product.shortDescription}</p>

        {showFeatures && features.length > 0 && (
          <ul className="product-card__features">
            {features.map((feature) => (
              <li key={feature.label}>
                <CheckIcon aria-hidden="true" />
                <span>
                  <strong>{feature.label}:</strong> {feature.value}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="card__footer">
          <Link to={`/product/${product.slug}`} className="link-arrow">
            Read the details
          </Link>
          {showCta && (
            <AmazonButton
              product={product}
              placement={placement}
              variant="accent"
              size="sm"
              label="View on Amazon.in"
            />
          )}
        </div>
      </div>
    </article>
  );
}
