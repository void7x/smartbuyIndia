import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import { getCategoryName } from '../data/categories.js';
import ProductImage from './ProductImage.jsx';
import AmazonButton from './AmazonButton.jsx';
import DisclosureNotice from './DisclosureNotice.jsx';

/**
 * Interactive two-product comparison.
 *
 * Eligibility is intentionally stricter than the staging catalogue:
 * only explicitly published, non-demo records with verified Amazon link data
 * can appear here. A visual redesign must never turn a research draft into a
 * public recommendation.
 */
const eligibleProducts = products.filter(
  (product) =>
    product.status === 'published' &&
    !product.isDemo &&
    product.affiliateVerified === true &&
    Boolean(product.asin),
);

export default function TwoProductCompare() {
  const [leftSlug, setLeftSlug] = useState(() => eligibleProducts[0]?.slug || '');
  const [rightSlug, setRightSlug] = useState(() => eligibleProducts[1]?.slug || '');

  const leftProduct = eligibleProducts.find((product) => product.slug === leftSlug) || null;
  const rightProduct = eligibleProducts.find((product) => product.slug === rightSlug) || null;

  const featureLabels = [];
  const seenLabels = new Set();
  [leftProduct, rightProduct].forEach((product) => {
    (product?.keyFeatures || []).forEach((feature) => {
      const label = String(feature.label || '').trim();
      const key = label.toLocaleLowerCase();
      if (label && !seenLabels.has(key)) {
        seenLabels.add(key);
        featureLabels.push(label);
      }
    });
  });

  const changeLeft = (nextSlug) => {
    setLeftSlug(nextSlug);
    if (nextSlug === rightSlug) setRightSlug(leftSlug);
  };

  const changeRight = (nextSlug) => {
    setRightSlug(nextSlug);
    if (nextSlug === leftSlug) setLeftSlug(rightSlug);
  };

  return (
    <section className="two-product-compare" id="compare-two" aria-labelledby="two-compare-heading">
      <div className="two-product-compare__intro">
        <p className="eyebrow">Build your own comparison</p>
        <h2 id="two-compare-heading">Choose two products. See what matters.</h2>
        <p>
          Compare two eligible products at a time. We show the information in our published research
          and leave gaps visible instead of guessing.
        </p>
      </div>

      {eligibleProducts.length < 2 ? (
        <div className="two-product-compare__empty" role="status">
          <span className="two-product-compare__empty-mark" aria-hidden="true">02</span>
          <div>
            <h3>The two-product picker is being prepared</h3>
            <p>
              Product choices appear here only after at least two non-demo products have been
              explicitly published with verified Amazon link data. This staging catalogue does not
              currently meet that requirement; researched drafts remain ineligible.
            </p>
            <Link to="/buying-guides" className="link-arrow">
              Explore buying guides <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="two-product-compare__selectors">
            <div className="two-product-compare__field">
              <label htmlFor="compare-product-a">First product</label>
              <select
                id="compare-product-a"
                value={leftSlug}
                onChange={(event) => changeLeft(event.target.value)}
              >
                {eligibleProducts.map((product) => (
                  <option key={product.slug} value={product.slug}>{product.name}</option>
                ))}
              </select>
            </div>
            <span className="two-product-compare__versus" aria-hidden="true">VS</span>
            <div className="two-product-compare__field">
              <label htmlFor="compare-product-b">Second product</label>
              <select
                id="compare-product-b"
                value={rightSlug}
                onChange={(event) => changeRight(event.target.value)}
              >
                {eligibleProducts.map((product) => (
                  <option key={product.slug} value={product.slug}>{product.name}</option>
                ))}
              </select>
            </div>
          </div>

          {leftProduct && rightProduct && leftProduct.slug !== rightProduct.slug && (
            <div className="two-product-compare__result">
              <div className="two-product-compare__product-pair">
                {[leftProduct, rightProduct].map((product, index) => (
                  <article className="two-product-compare__product" key={product.slug}>
                    <div className="two-product-compare__image">
                      <ProductImage product={product} label="Product image" />
                    </div>
                    <div className="two-product-compare__product-copy">
                      <p className="card__meta">{getCategoryName(product.categorySlug)}</p>
                      <h3><Link to={`/product/${product.slug}`}>{product.name}</Link></h3>
                      <p>{product.shortDescription}</p>
                      <Link className="link-arrow" to={`/product/${product.slug}`}>
                        Read product details <span aria-hidden="true">→</span>
                      </Link>
                      <AmazonButton
                        product={product}
                        placement={`compare-builder-${index === 0 ? 'a' : 'b'}`}
                        variant="accent"
                        size="sm"
                        label="View on Amazon.in"
                      />
                    </div>
                  </article>
                ))}
              </div>

              <div className="two-product-compare__table-wrap" tabIndex={0} role="group" aria-label="Two-product comparison table">
                <table className="two-product-compare__table">
                  <caption>
                    Published research only. “Not covered” means we have not verified or documented that detail for this product.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">What matters</th>
                      <th scope="col">{leftProduct.name}</th>
                      <th scope="col">{rightProduct.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Overview</th>
                      <td>{leftProduct.editorialSummary || leftProduct.shortDescription || 'Not covered in our published research.'}</td>
                      <td>{rightProduct.editorialSummary || rightProduct.shortDescription || 'Not covered in our published research.'}</td>
                    </tr>
                    {featureLabels.map((label) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{findFeatureValue(leftProduct, label)}</td>
                        <td>{findFeatureValue(rightProduct, label)}</td>
                      </tr>
                    ))}
                    <tr>
                      <th scope="row">Who it may suit</th>
                      <td><ResearchList items={leftProduct.whoItsFor} /></td>
                      <td><ResearchList items={rightProduct.whoItsFor} /></td>
                    </tr>
                    <tr>
                      <th scope="row">Who may want to skip it</th>
                      <td><ResearchList items={leftProduct.whoMightSkip} /></td>
                      <td><ResearchList items={rightProduct.whoMightSkip} /></td>
                    </tr>
                    <tr>
                      <th scope="row">Price</th>
                      <td>{leftProduct.priceVerifiedOn && leftProduct.price != null ? 'A manually verified price is listed on the product page.' : 'Not published — check the retailer for the current price.'}</td>
                      <td>{rightProduct.priceVerifiedOn && rightProduct.price != null ? 'A manually verified price is listed on the product page.' : 'Not published — check the retailer for the current price.'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="two-product-compare__note">
                We do not calculate a winner or invent a score. Use the differences above to decide
                which trade-offs matter most to you.
              </p>
              <DisclosureNotice compact />
            </div>
          )}
        </>
      )}
    </section>
  );
}

function findFeatureValue(product, label) {
  const feature = (product.keyFeatures || []).find(
    (item) => String(item.label || '').trim().toLocaleLowerCase() === label.toLocaleLowerCase(),
  );
  return feature?.value || 'Not covered in our published research.';
}

function ResearchList({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <>Not covered in our published research.</>;
  }
  return (
    <ul className="two-product-compare__list">
      {items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}
    </ul>
  );
}
