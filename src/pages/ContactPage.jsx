import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { CONTACT_EMAIL, SITE_NAME } from '../config/site.js';
import { trackContactSubmit } from '../utils/analytics.js';
import { breadcrumbSchema } from '../utils/seo.js';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { MailIcon, InfoIcon, AlertIcon, CheckIcon } from '../components/Icons.jsx';

const TOPICS = [
  { value: 'correction', label: 'Report something inaccurate' },
  { value: 'suggestion', label: 'Suggest a product or category to cover' },
  { value: 'question', label: 'Ask a question about a guide' },
  { value: 'partnership', label: 'Business or partnership enquiry' },
  { value: 'privacy', label: 'Privacy-related request' },
  { value: 'other', label: 'Something else' },
];

/**
 * /contact
 *
 * Version 1 has no backend, so the form does not pretend to send anything. It
 * validates in the browser and opens a pre-filled email to the address below —
 * and the email address is always visible on the page as a direct route.
 */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'suggestion',
    pageUrl: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useSeo({
    title: 'Contact SmartBuyIndia',
    description:
      'Contact SmartBuyIndia about a correction, a product you would like us to cover, a question about a buying guide, or a privacy request.',
    path: '/contact',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  });

  const update = (field) => (event) => {
    const value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell us what to call you.';
    if (!form.email.trim()) next.email = 'We need an email address to reply to.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = 'That email address does not look complete.';
    if (form.message.trim().length < 20)
      next.message = 'Please add a little more detail — at least 20 characters.';
    if (form.topic === 'correction' && !form.pageUrl.trim())
      next.pageUrl = 'For a correction, please include the URL of the page.';
    if (!form.consent) next.consent = 'Please confirm before we open your email client.';
    return next;
  };

  const buildMailto = () => {
    const subject = `[${SITE_NAME}] ${TOPICS.find((t) => t.value === form.topic)?.label || 'Enquiry'}`;
    const body = [
      `Name: ${form.name}`,
      `Reply to: ${form.email}`,
      form.pageUrl ? `Page: ${form.pageUrl}` : null,
      '',
      form.message,
      '',
      `— Sent from the ${SITE_NAME} contact page`,
    ]
      .filter(Boolean)
      .join('\n');
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      setSubmitted(false);
      const firstKey = Object.keys(next)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }
    trackContactSubmit();
    setSubmitted(true);
    // Open the visitor's own email client with everything pre-filled.
    window.location.href = buildMailto();
  };

  return (
    <>
      <div className="page-header">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Contact' }]} />
          <h1>Contact {SITE_NAME}</h1>
          <p className="lede">
            Corrections, gaps in our coverage, questions about a guide, or a privacy request — all
            welcome. The fastest route is email:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <MailIcon width={15} height={15} style={{ display: 'inline', verticalAlign: '-3px' }} />{' '}
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="grid grid-2 contact-layout" style={{ alignItems: 'start' }}>
          {/* ------------------------------------------------------------ Form */}
          <div className="content-block">
            <h2 style={{ fontSize: 'var(--fs-xl)', marginBottom: '8px' }}>Send a message</h2>
            <p className="text-muted text-sm" style={{ marginBottom: '24px' }}>
              Fill this in and we will open a pre-written email in your own mail app. Nothing you type
              here is sent to, stored on or read by a {SITE_NAME} server.
            </p>

            {submitted && (
              <div className="form-status form-status--success" role="status" style={{ marginBottom: '20px' }}>
                <strong>
                  <CheckIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
                  Your email client should now be open.
                </strong>
                <br />
                If nothing happened, email us directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or{' '}
                <a href={buildMailto()}>click here to try again</a>.
              </div>
            )}

            <form onSubmit={onSubmit} noValidate className="form-grid">
              <div className={`field ${errors.name ? 'field--invalid' : ''}`}>
                <label className="field__label" htmlFor="contact-name">
                  Your name <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  value={form.name}
                  onChange={update('name')}
                />
                {errors.name && (
                  <p className="field__error" id="contact-name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={`field ${errors.email ? 'field--invalid' : ''}`}>
                <label className="field__label" htmlFor="contact-email">
                  Email address <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : 'contact-email-hint'}
                  value={form.email}
                  onChange={update('email')}
                />
                <p className="field__hint" id="contact-email-hint">
                  Used only to reply to you. We do not add it to any mailing list.
                </p>
                {errors.email && (
                  <p className="field__error" id="contact-email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="contact-topic">
                  What is this about?
                </label>
                <select id="contact-topic" name="topic" value={form.topic} onChange={update('topic')}>
                  {TOPICS.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`field ${errors.pageUrl ? 'field--invalid' : ''}`}>
                <label className="field__label" htmlFor="contact-pageUrl">
                  Page URL{' '}
                  {form.topic === 'correction' ? (
                    <span className="req" aria-hidden="true">*</span>
                  ) : (
                    <span className="field__hint">(optional)</span>
                  )}
                </label>
                <input
                  id="contact-pageUrl"
                  name="pageUrl"
                  type="text"
                  inputMode="url"
                  placeholder="https://…/guide/best-air-fryers-indian-kitchens"
                  aria-invalid={Boolean(errors.pageUrl)}
                  aria-describedby={errors.pageUrl ? 'contact-pageUrl-error' : undefined}
                  value={form.pageUrl}
                  onChange={update('pageUrl')}
                />
                {errors.pageUrl && (
                  <p className="field__error" id="contact-pageUrl-error">
                    {errors.pageUrl}
                  </p>
                )}
              </div>

              <div className={`field ${errors.message ? 'field--invalid' : ''}`}>
                <label className="field__label" htmlFor="contact-message">
                  Message <span className="req" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-hint'}
                  placeholder="Tell us what you found, what you were hoping to see, or what needs correcting."
                  value={form.message}
                  onChange={update('message')}
                />
                <p className="field__hint" id="contact-message-hint">
                  Please do not include payment details, passwords or anyone else&rsquo;s personal
                  information.
                </p>
                {errors.message && (
                  <p className="field__error" id="contact-message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className={`field ${errors.consent ? 'field--invalid' : ''}`}>
                <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: 'var(--fs-sm)' }}>
                  <input
                    id="contact-consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={update('consent')}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
                    style={{ marginTop: '4px', width: '18px', height: '18px', flex: 'none' }}
                  />
                  <span>
                    I understand this opens an email in my own mail app, and that my message is not
                    stored on this website.
                  </span>
                </label>
                {errors.consent && (
                  <p className="field__error" id="contact-consent-error">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="btn-row">
                <button type="submit" className="btn">
                  <MailIcon width={16} height={16} /> Open my email
                </button>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => {
                    setForm({ name: '', email: '', topic: 'suggestion', pageUrl: '', message: '', consent: false });
                    setErrors({});
                    setSubmitted(false);
                  }}
                >
                  Clear the form
                </button>
              </div>
            </form>
          </div>

          {/* -------------------------------------------------------- Sidebar */}
          <div className="stack" style={{ gap: '20px' }}>
            <div className="panel panel--tinted">
              <p className="panel__title">
                <MailIcon width={18} height={18} /> Email us directly
              </p>
              <p style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, color: 'var(--ink-900)', marginBottom: '8px' }}>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
              <p className="text-sm text-muted">
                This is currently a placeholder address — update{' '}
                <code>CONTACT_EMAIL</code> in <code>src/config/site.js</code> before launch.
              </p>
            </div>

            <div className="callout">
              <span className="callout__title">
                <InfoIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
                What we can and cannot help with
              </span>
              <p style={{ marginBottom: '10px' }}>
                <strong>We can help with:</strong> our own content — corrections, missing
                information, a category you want covered, a question about something we wrote, and
                privacy requests about this website.
              </p>
              <p>
                <strong>We cannot help with:</strong> an order you placed, a delivery, a refund, a
                return or a warranty claim. We do not sell anything and have no access to your Amazon
                account or orders. For those, contact the retailer directly through the &ldquo;Your
                Orders&rdquo; section of Amazon.in or their customer service.
              </p>
            </div>

            <div className="callout callout--warn">
              <span className="callout__title">
                <AlertIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
                No backend in version 1
              </span>
              This website is a static site, so there is no server receiving form submissions and no
              database storing them. That is a deliberate choice: it keeps the site fast, free to host
              and free of any personal data we would otherwise be responsible for.
            </div>

            <nav className="panel" aria-labelledby="contact-related">
              <p className="panel__title" id="contact-related">
                Related pages
              </p>
              <ul className="footer__list" style={{ gap: '10px' }}>
                <li>
                  <Link className="link-arrow" to="/about">
                    About SmartBuyIndia
                  </Link>
                </li>
                <li>
                  <Link className="link-arrow" to="/disclosure">
                    Affiliate disclosure
                  </Link>
                </li>
                <li>
                  <Link className="link-arrow" to="/privacy">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link className="link-arrow" to="/terms">
                    Terms of use
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
