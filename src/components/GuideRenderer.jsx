import { Link } from 'react-router-dom';
import DecisionProductCard from './DecisionProductCard.jsx';
import ComparisonTable from './ComparisonTable.jsx';
import FAQSection from './FAQSection.jsx';
import DisclosureNotice from './DisclosureNotice.jsx';
import AnchorLink from './AnchorLink.jsx';
import { AlertIcon, InfoIcon, ArrowRight, ClockIcon } from './Icons.jsx';
import { getProductBySlug } from '../data/products.js';
import { getComparisonBySlug } from '../data/comparisons.js';
import { formatDate } from '../utils/format.js';

/**
 * ---------------------------------------------------------------------------
 * <GuideRenderer /> — turns one buying-guide data object into a full page.
 * ---------------------------------------------------------------------------
 * Every block is optional: omit a field and its section does not render.
 * Adding a new guide therefore never requires touching a component.
 *
 * Section anchors are stable, so a table of contents and deep links work.
 */
const SECTIONS = {
  intro: 'introduction',
  whatToLookFor: 'what-to-look-for',
  keySpecs: 'key-specifications',
  picks: 'recommended',
  comparison: 'comparison',
  thingsToAvoid: 'things-to-avoid',
  faqs: 'faq',
  finalThoughts: 'final-considerations',
};

export function getGuideToc(guide) {
  const toc = [];
  if (guide.intro?.length) toc.push({ id: SECTIONS.intro, label: 'Introduction' });
  if (guide.whatToLookFor?.length) toc.push({ id: SECTIONS.whatToLookFor, label: 'What to look for' });
  if (guide.keySpecs?.length) toc.push({ id: SECTIONS.keySpecs, label: 'Key specifications' });
  if (guide.picks?.length) toc.push({ id: SECTIONS.picks, label: 'Recommended products' });
  if (guide.comparisonSlug) toc.push({ id: SECTIONS.comparison, label: 'Side-by-side comparison' });
  if (guide.thingsToAvoid?.length) toc.push({ id: SECTIONS.thingsToAvoid, label: 'Things to avoid' });
  if (guide.faqs?.length) toc.push({ id: SECTIONS.faqs, label: 'FAQs' });
  if (guide.finalThoughts?.length) toc.push({ id: SECTIONS.finalThoughts, label: 'Final considerations' });
  return toc;
}

export default function GuideRenderer({ guide, placementPrefix = 'guide' }) {
  if (!guide) return null;
  const toc = getGuideToc(guide);
  const comparison = guide.comparisonSlug ? getComparisonBySlug(guide.comparisonSlug) : null;

  return (
    <div className="stack">
      {/* Header meta */}
      <div className="chip-row" style={{ marginBottom: '20px' }}>
        {guide.readingTimeMinutes && (
          <span className="chip">
            <ClockIcon width={12} height={12} /> {guide.readingTimeMinutes} min read
          </span>
        )}
        {guide.updatedAt && <span className="chip">Updated {formatDate(guide.updatedAt)}</span>}
        {guide.author && <span className="chip">By {guide.author}</span>}
        {guide.isDemo && <span className="badge badge--demo">Demo content</span>}
      </div>

      {/* Table of contents */}
      {toc.length > 2 && (
        <nav className="toc" aria-label="In this guide">
          <p className="toc__title">In this guide</p>
          <ol>
            {toc.map((item) => (
              <li key={item.id}>
                <AnchorLink id={item.id}>{item.label}</AnchorLink>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {guide.isDemo && (
        <div className="callout callout--warn">
          <span className="callout__title">This is demonstration content</span>
          The guide structure below is real, but the product entries it links to are placeholders.
          Nothing on this page is a review, a test result or a current market ranking, and no price
          is published because none has been verified.
        </div>
      )}

      {/* 1. Introduction */}
      {guide.intro?.length > 0 && (
        <section id={SECTIONS.intro} className="content-block block-intro" aria-labelledby={`${SECTIONS.intro}-h`}>
          <h2 id={`${SECTIONS.intro}-h`}>Introduction</h2>
          {guide.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      )}

      {/* 2. What to look for */}
      {guide.whatToLookFor?.length > 0 && (
        <section id={SECTIONS.whatToLookFor} className="content-block" aria-labelledby={`${SECTIONS.whatToLookFor}-h`}>
          <h2 id={`${SECTIONS.whatToLookFor}-h`}>What to look for</h2>
          <p className="text-muted" style={{ marginBottom: '20px', maxWidth: '70ch' }}>
            The decisions that actually change how the product behaves in your home, in the order
            they usually come up.
          </p>
          <div className="feature-cards">
            {guide.whatToLookFor.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 3. Key specifications */}
      {guide.keySpecs?.length > 0 && (
        <section id={SECTIONS.keySpecs} className="content-block" aria-labelledby={`${SECTIONS.keySpecs}-h`}>
          <h2 id={`${SECTIONS.keySpecs}-h`}>Important specifications &amp; features</h2>
          <p className="text-muted" style={{ marginBottom: '20px', maxWidth: '70ch' }}>
            Typical ranges only — always confirm the exact figure on the product page before you buy.
          </p>
          <div className="table-scroll">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th scope="col">Specification</th>
                  <th scope="col">Why it matters</th>
                  <th scope="col">Typical range</th>
                </tr>
              </thead>
              <tbody>
                {guide.keySpecs.map((spec) => (
                  <tr key={spec.name}>
                    <th scope="row">{spec.name}</th>
                    <td>{spec.why}</td>
                    <td>
                      <span className="cmp-cell__note" style={{ marginTop: 0 }}>
                        {spec.typical}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 4. Recommended products */}
      {guide.picks?.length > 0 && (
        <section id={SECTIONS.picks} className="content-block" aria-labelledby={`${SECTIONS.picks}-h`}>
          <div className="decision-section__header">
            <div>
              <h2 id={`${SECTIONS.picks}-h`}>Recommended products</h2>
              <p className="text-muted">
                Quick cards for the buying decision. Labels describe the situation each option suits;
                they are not overall rankings.
              </p>
            </div>
          </div>

          <div className="decision-grid">
            {guide.picks.map((pick) => {
              const product = getProductBySlug(pick.productSlug);
              if (!product) return null;

              return (
                <DecisionProductCard
                  key={pick.productSlug}
                  product={product}
                  label={pick.label}
                  why={pick.why}
                  watchOuts={pick.watchOuts}
                  placement={`${placementPrefix}-pick:${product.slug}`}
                />
              );
            })}
          </div>

          <div style={{ marginTop: '20px' }}>
            <DisclosureNotice compact />
          </div>
        </section>
      )}

      {/* 5. Comparison */}
      {comparison && (
        <section id={SECTIONS.comparison} className="content-block" aria-labelledby={`${SECTIONS.comparison}-h`}>
          <h2 id={`${SECTIONS.comparison}-h`}>Side-by-side comparison</h2>
          <p className="text-muted" style={{ marginBottom: '20px', maxWidth: '70ch' }}>
            {comparison.title}
          </p>
          <ComparisonTable comparison={comparison} placement={`${placementPrefix}-comparison`} />
          <Link to={`/compare/${comparison.slug}`} className="link-arrow" style={{ marginTop: '16px' }}>
            Open the full comparison page <ArrowRight width={14} height={14} />
          </Link>
        </section>
      )}

      {/* 6. Things to avoid */}
      {guide.thingsToAvoid?.length > 0 && (
        <section id={SECTIONS.thingsToAvoid} className="content-block" aria-labelledby={`${SECTIONS.thingsToAvoid}-h`}>
          <h2 id={`${SECTIONS.thingsToAvoid}-h`}>Things to avoid</h2>
          <ul className="check-list check-list--cons" style={{ maxWidth: '78ch' }}>
            {guide.thingsToAvoid.map((item) => (
              <li key={item}>
                <AlertIcon aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 7. FAQs */}
      {guide.faqs?.length > 0 && (
        <section id={SECTIONS.faqs} aria-labelledby={`${SECTIONS.faqs}-h`}>
          <FAQSection items={guide.faqs} title="Frequently asked questions" defaultOpenIndex={0} />
        </section>
      )}

      {/* 8. Final considerations */}
      {guide.finalThoughts?.length > 0 && (
        <section id={SECTIONS.finalThoughts} className="content-block" aria-labelledby={`${SECTIONS.finalThoughts}-h`}>
          <h2 id={`${SECTIONS.finalThoughts}-h`} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <InfoIcon width={22} height={22} style={{ color: 'var(--brand-600)' }} />
            Final buying considerations
          </h2>
          {guide.finalThoughts.map((paragraph, index) => (
            <p key={index} style={{ maxWidth: '74ch', marginTop: index === 0 ? 0 : '12px' }}>
              {paragraph}
            </p>
          ))}
        </section>
      )}
    </div>
  );
}
