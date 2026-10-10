import { Link } from 'react-router-dom';
import {
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_LINKS,
  LAUNCH_YEAR,
  LEGAL_ENTITY,
  LEGAL_CITY,
} from '../config/site.js';
import { liveCategories } from '../data/categories.js';
import { guidesByRecency } from '../data/buyingGuides.js';
import { BrandMark, SOCIAL_ICONS, ArrowRight } from './Icons.jsx';
import { RetailerNote } from './DisclosureNotice.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label={`${SITE_NAME} — home`}>
              <BrandMark size={46} />
              <span className="brand__text">
                <span className="brand__name" aria-label="SmartBuyIndia">
                  <span className="brand__word-smart">Smart</span><em className="brand__word-buy">Buy</em><span className="brand__word-india">India</span>
                </span>
                <span className="brand__tagline">
                  {SITE_TAGLINE}
                </span>
              </span>
            </Link>
            <p className="footer__about">
              SmartBuyIndia is an independent product research website for Indian shoppers. We write
              original buying guides and comparisons to help you narrow a long list down to a few
              sensible options — then link out to Amazon.in so you can buy.
            </p>

            <p className="footer__heading">Social</p>
            <div className="footer__social">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                if (social.url) {
                  return (
                    <a
                      key={social.id}
                      className="social-btn"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      {Icon && <Icon />}
                      {social.label}
                    </a>
                  );
                }
                return (
                  <span
                    key={social.id}
                    className="social-btn"
                    aria-disabled="true"
                    title={`${social.label} profile coming soon`}
                  >
                    {Icon && <Icon />}
                    {social.label} · soon
                  </span>
                );
              })}
            </div>
          </div>

          <nav aria-labelledby="footer-explore">
            <p className="footer__heading" id="footer-explore">
              Shop / Explore
            </p>
            <ul className="footer__list">
              <li>
                <Link to="/categories">All categories</Link>
              </li>
              {liveCategories.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-guides">
            <p className="footer__heading" id="footer-guides">
              Buying guides
            </p>
            <ul className="footer__list">
              <li>
                <Link to="/buying-guides">All buying guides</Link>
              </li>
              <li>
                <Link to="/deals">Deals</Link>
              </li>
              {guidesByRecency.slice(0, 3).map((guide) => (
                <li key={guide.slug}>
                  <Link to={`/guide/${guide.slug}`}>{guide.title.replace(/^Best /, '')}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <p className="footer__heading" id="footer-company">
              Company
            </p>
            <ul className="footer__list">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/disclosure">How we make money</Link>
              </li>
            </ul>

            <p className="footer__heading" style={{ marginTop: '28px' }} id="footer-legal">
              Legal
            </p>
            <ul className="footer__list" aria-labelledby="footer-legal">
              <li>
                <Link to="/disclosure">Affiliate disclosure</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of use</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <RetailerNote className="footer__legal-note" />

          <div className="footer__bottom-row">
            <p className="footer__legal-note">
              © {year === LAUNCH_YEAR ? year : `${LAUNCH_YEAR}–${year}`} {LEGAL_ENTITY}. Built for
              shoppers in {LEGAL_CITY}. All product names, logos and brands are the property of their
              respective owners and are used for identification only.
            </p>
            <Link to="/contact" className="link-arrow" style={{ color: '#d5e3de' }}>
              Report an issue <ArrowRight width={14} height={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
