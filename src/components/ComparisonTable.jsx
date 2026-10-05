import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import AmazonButton from './AmazonButton.jsx';
import { getProductBySlug } from '../data/products.js';
import { formatPrice, formatDate } from '../utils/format.js';
import { SwapIcon } from './Icons.jsx';

/**
 * Reusable, data-driven comparison table.
 *
 * Design rules enforced here:
 *   • No global "winner". Verdicts are use-case labels ("Best for small
 *     kitchens") and each one is rendered together with its `why`.
 *   • Prices are shown only when the data layer carries a verified value;
 *     otherwise the cell states that no price is published.
 *   • The table scrolls horizontally on small screens with a visible hint, so
 *     nothing is crushed on a phone.
 */
export default function ComparisonTable({ comparison, placement = 'compare-table' }) {
  if (!comparison) return null;

  const items = (comparison.productSlugs || []).map(getProductBySlug).filter(Boolean);
  if (!items.length) return null;

  const verdicts = comparison.verdicts || {};
  const showPriceRow = items.some((p) => p.price !== null && p.price !== undefined);

  return (
    <>
      <div className="table-scroll__hint">
        <SwapIcon width={13} height={13} />
        <span>Scroll the table sideways to see every option.</span>
      </div>

      <div className="table-scroll" tabIndex={0} role="group" aria-label="Comparison table — scrollable">
        <table className="cmp-table">
          <caption>
            {comparison.howToRead ||
              'Each row compares the shortlisted options on one criterion. Nothing here is a ranked list.'}
          </caption>

          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Criterion</span>
              </th>
              {items.map((item) => (
                <th scope="col" key={item.slug}>
                  <span className="cmp-table__product">
                    <span className="cmp-table__thumb" aria-hidden="true">
                      <ProductImage product={item} label="Placeholder" />
                    </span>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    {item.isDemo && <span className="badge badge--demo">Demo entry</span>}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Use-case verdict — always paired with its reasoning */}
            {items.some((item) => verdicts[item.slug]) && (
              <tr className="cmp-row--highlight">
                <th scope="row">Verdict</th>
                {items.map((item) => {
                  const verdict = verdicts[item.slug];
                  return (
                    <td key={item.slug}>
                      {verdict ? (
                        <span className="cmp-verdict">
                          <span className="cmp-verdict__label">{verdict.label}</span>
                          {verdict.why && <span className="cmp-verdict__why">{verdict.why}</span>}
                        </span>
                      ) : (
                        <span className="text-xs text-muted">Depends on your use case</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            )}

            {/* Price row — only when something verified exists */}
            {showPriceRow && (
              <tr>
                <th scope="row">Indicative price</th>
                {items.map((item) => (
                  <td key={item.slug}>
                    <PriceCell product={item} />
                  </td>
                ))}
              </tr>
            )}

            {(comparison.rows || []).map((row) => (
              <tr key={row.id} className={row.highlight ? 'cmp-row--highlight' : undefined}>
                <th scope="row">{row.label}</th>
                {items.map((item, index) => {
                  const cell = row.values?.[index];
                  return (
                    <td key={item.slug}>
                      {cell ? (
                        <>
                          <span className="cmp-cell__value">{cell.value}</span>
                          {cell.note && <span className="cmp-cell__note">{cell.note}</span>}
                        </>
                      ) : (
                        <span className="text-xs text-muted">Not specified</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr>
              <th scope="row">Availability</th>
              {items.map((item) => (
                <td key={item.slug}>
                  <AmazonButton
                    product={item}
                    placement={`${placement}:${item.slug}`}
                    variant="accent"
                    size="sm"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <th scope="row">Full write-up</th>
              {items.map((item) => (
                <td key={item.slug}>
                  <Link to={`/product/${item.slug}`} className="link-arrow">
                    Read about {item.name.replace(/^Example /, 'this ')}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {!showPriceRow && (
        <p className="inline-note" style={{ marginTop: '12px' }}>
          We do not publish prices on this comparison because none have been manually verified yet.
          Check the live price on the retailer&rsquo;s site using the buttons above.
        </p>
      )}
    </>
  );
}

function PriceCell({ product }) {
  const formatted = formatPrice(product.price);
  if (!formatted) {
    return <span className="text-xs text-muted">Price not published — check on Amazon.in</span>;
  }
  return (
    <span className="price-line">
      <span className="price-line__value">{formatted}</span>
      <span className="price-line__note">
        approx.
        {product.priceVerifiedOn ? ` · checked ${formatDate(product.priceVerifiedOn)}` : ''}
      </span>
    </span>
  );
}
