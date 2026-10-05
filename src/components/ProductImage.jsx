import { CategoryIcon } from './Icons.jsx';
import { assetUrl } from '../utils/seo.js';
import { cx, hashHue } from '../utils/format.js';

/**
 * ---------------------------------------------------------------------------
 * Placeholder artwork
 * ---------------------------------------------------------------------------
 * We never use retailer product photography, so during development every
 * product renders an original, generated illustration that is clearly labelled
 * as placeholder art. This also means zero image requests, zero layout shift
 * (fixed aspect ratio) and zero licensing risk.
 *
 * When a real, licensed photograph is available:
 *   1. Drop it in `public/images/products/`
 *   2. Set the product's `image` field to that path and clear `imagePlaceholder`
 *   3. This component renders an <img loading="lazy"> instead — no other change.
 */

const isPlaceholderPath = (path) =>
  !path || path === '#' || /placeholder|demo-/i.test(path) || path.endsWith('.svg');

function PlaceholderArt({ product, label = 'Placeholder artwork', className }) {
  const hue = hashHue(product?.slug || product?.id || 'smartbuyindia');
  const iconName = product?.categorySlug
    ? {
        'home-kitchen': 'kitchen',
        'beauty-grooming': 'grooming',
        'electronics-gadgets': 'electronics',
        fitness: 'fitness',
        'office-study': 'office',
      }[product.categorySlug] || 'grid'
    : 'grid';

  return (
    <svg
      className={cx('placeholder-art', className)}
      viewBox="0 0 400 300"
      role="img"
      aria-label={product?.imageAlt || `Placeholder illustration for ${product?.name || 'a product'}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${hue}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 34% 94%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 34) % 360} 30% 87%)`} />
        </linearGradient>
        <pattern id={`dots-${hue}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill={`hsl(${hue} 26% 74%)`} opacity="0.55" />
        </pattern>
      </defs>

      <rect width="400" height="300" fill={`url(#bg-${hue})`} />
      <rect width="400" height="300" fill={`url(#dots-${hue})`} />

      {/* Abstract, non-representational geometry — deliberately not a product drawing */}
      <circle cx="286" cy="86" r="58" fill={`hsl(${hue} 42% 78%)`} opacity="0.5" />
      <rect x="46" y="176" width="150" height="86" rx="14" fill={`hsl(${(hue + 18) % 360} 36% 80%)`} opacity="0.72" />
      <path d="M196 262 L330 262 L263 138 Z" fill={`hsl(${(hue + 300) % 360} 30% 84%)`} opacity="0.6" />

      <g transform="translate(168,116)" color={`hsl(${hue} 40% 32%)`}>
        <circle cx="32" cy="32" r="32" fill="#ffffff" opacity="0.9" />
        <g transform="translate(16,16) scale(1.33)">
          <CategoryIcon name={iconName} width={24} height={24} />
        </g>
      </g>

      <g transform="translate(24,258)">
        <rect x="-8" y="-16" width={String(label).length * 6.4 + 20} height="22" rx="11" fill="#10211d" opacity="0.72" />
        <text x="2" y="0" fill="#f5f2ea" fontFamily="system-ui, sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="0.4">
          {label}
        </text>
      </g>
    </svg>
  );
}

/**
 * Product image with a safe placeholder fallback.
 *
 * @param {object}   product
 * @param {string}   [className]
 * @param {string}   [label]     Caption baked into the placeholder art
 * @param {boolean}  [eager]     Load above-the-fold images eagerly
 */
export default function ProductImage({
  product,
  className,
  label = 'Placeholder artwork',
  eager = false,
  sizes,
}) {
  const src = product?.image;
  const useRealImage = src && !isPlaceholderPath(src) && !product?.imagePlaceholder;

  if (!useRealImage) {
    return <PlaceholderArt product={product} label={label} className={className} />;
  }

  return (
    <img
      className={className}
      src={assetUrl(src)}
      alt={product?.imageAlt || product?.name || ''}
      width="400"
      height="300"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...(sizes ? { sizes } : {})}
    />
  );
}

export { PlaceholderArt };
