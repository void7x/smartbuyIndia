/**
 * ---------------------------------------------------------------------------
 * SEO helpers — document head management + schema.org builders
 * ---------------------------------------------------------------------------
 * No third-party dependency: a few dozen lines of DOM manipulation cover
 * titles, meta descriptions, canonical URLs, Open Graph, Twitter cards and
 * JSON-LD, and keep the bundle small.
 *
 * With ROUTER_MODE='hash' the canonical URL keeps the `#/path` fragment, which
 * is what a crawler (and a shared link) actually needs.
 */

import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_BASE,
  ROUTER_MODE,
  DEFAULT_SHARE_IMAGE,
} from '../config/site.js';

/** Absolute URL for an internal route (e.g. '/product/example-air-fryer'). */
export function absoluteUrl(path = '/') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const base = SITE_BASE.endsWith('/') ? SITE_BASE : `${SITE_BASE}/`;
  const prefix = ROUTER_MODE === 'hash' ? `${base}#` : base.replace(/\/$/, '');
  if (SITE_URL) return `${SITE_URL.replace(/\/$/, '')}${prefix}${cleanPath}`;
  // No domain configured yet: fall back to a root-relative URL.
  return `${prefix}${cleanPath}`;
}

/** Asset URL that respects the deploy base path. */
export function assetUrl(path = '') {
  if (/^https?:\/\//i.test(path)) return path;
  const base = SITE_BASE.endsWith('/') ? SITE_BASE : `${SITE_BASE}/`;
  return `${base}${path.replace(/^\//, '')}`;
}

/**
 * Find-or-create a meta tag by its identifying attribute.
 *   setMeta('name', 'description', '…')
 *   setMeta('property', 'og:title', '…')
 */
function setMeta(attributeName, attributeValue, content) {
  const selector = `meta[${attributeName}="${attributeValue}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attributeName, attributeValue);
    document.head.appendChild(el);
  }
  if (content === null || content === undefined) {
    el.remove();
    return;
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  if (!href) {
    el.remove();
    return;
  }
  el.setAttribute('href', href);
}

function setJsonLd(id, data) {
  const elementId = `ld-${id}`;
  let el = document.getElementById(elementId);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = elementId;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Apply page-level SEO metadata.
 *
 * @param {object} opts
 * @param {string} opts.title            Page title (site name is appended)
 * @param {string} opts.description      Meta description (<= ~160 chars)
 * @param {string} [opts.path]           Internal route used for the canonical URL
 * @param {string} [opts.image]          Share image (relative to /public)
 * @param {'article'|'website'} [opts.type]
 * @param {boolean} [opts.noIndex]
 * @param {object|object[]} [opts.schema] Extra JSON-LD graph(s)
 */
export function setSeo({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  image = DEFAULT_SHARE_IMAGE,
  type = 'website',
  noIndex = false,
  schema = null,
} = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  document.title = fullTitle;

  setMeta('name', 'description', description);
  setMeta(
    'name',
    'robots',
    noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large',
  );
  setMeta('name', 'theme-color', '#0f3d33');
  setLink('canonical', absoluteUrl(path));

  // Open Graph
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:url', absoluteUrl(path));
  setMeta('property', 'og:image', assetUrl(image));
  setMeta('property', 'og:locale', 'en_IN');

  // Twitter / X
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', assetUrl(image));

  const graphs = Array.isArray(schema) ? schema : schema ? [schema] : [];
  graphs.forEach((graph, index) => setJsonLd(`page-${index}`, graph));
  for (let i = graphs.length; i < 6; i += 1) setJsonLd(`page-${i}`, null);
}

/* -------------------------------------------------------------------------- */
/* Schema.org builders                                                        */
/* -------------------------------------------------------------------------- */
/* Only mark up what the page genuinely is. We deliberately do NOT emit        */
/* Product/Review/AggregateRating schema: we have not tested the products and   */
/* we do not publish verified prices or ratings.                                */
/* -------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    slogan: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    url: SITE_URL || undefined,
    areaServed: { '@type': 'Country', name: 'India' },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL || absoluteUrl('/'),
    inLanguage: 'en-IN',
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListSchema(name, entries, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    ...(description ? { description } : {}),
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      url: absoluteUrl(entry.path),
    })),
  };
}

export function articleSchema({ headline, description, path, dateModified, author = SITE_NAME }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: 'en-IN',
    image: assetUrl(DEFAULT_SHARE_IMAGE),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    dateModified: dateModified || new Date().toISOString().slice(0, 10),
    author: { '@type': 'Organization', name: author },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
