# SmartBuyIndia

**Smart choices. Better buys.**

SmartBuyIndia is an independent Indian product-research and discovery website. It publishes original
buying guides, product shortlists and side-by-side comparisons, then links out to **Amazon.in** so the
reader completes the purchase with the retailer. The site never sells, stocks or ships anything.

The site is a **fully static React + Vite application** with no backend, no database and no paid services. The `development/smartbuyindia-v2` branch is configured for a Render Static Site at the domain root; `main` retains the original GitHub Pages workflow as a safe backup.

---

## 1. Quick start

```bash
npm install        # install dependencies (react, react-dom, react-router-dom, vite)
npm run dev        # local dev server  -> http://localhost:5173/
npm run build      # production build  -> dist/
npm run preview    # serve the production build locally for testing
node scripts/smoke.build.mjs   # render every route headlessly and fail on any crash
```

No environment variables, no API keys, no `.env` file. Everything is configured in two small files
(see §5).

---

## 2. What is in the box

| Area | Where | Notes |
| --- | --- | --- |
| Routes | `src/App.jsx`, `src/config/routes.js` | `/`, `/categories`, `/category/:slug`, `/product/:slug`, `/compare` + `/compare/:slug`, `/buying-guides`, `/guide/:slug`, `/deals`, `/search`, `/about`, `/contact`, `/disclosure`, `/privacy`, `/terms`, 404 |
| Content data | `src/data/*.js` | categories, products, buying guides, comparisons, deals — plain JS arrays |
| Affiliate links | `src/utils/affiliate.js`, `src/components/AmazonButton.jsx` | one helper builds every outbound URL |
| Disclosure | `src/components/DisclosureNotice.jsx`, `/disclosure` | shown on every page with a retailer CTA |
| Search | `src/utils/search.js`, `src/components/SearchOverlay.jsx`, `/search` | client-side, no service, no server |
| SEO | `src/utils/seo.js`, `plugins/sitemap-plugin.js` | titles, meta, canonical, OG/Twitter, JSON-LD, generated `sitemap.xml` + `robots.txt` |
| Analytics-ready | `src/utils/analytics.js` | typed events, currently console-only no-ops |
| Deployment | `site.config.js`, `render.yaml` | Render Static Site on `development/smartbuyindia-v2`; `main` keeps the GitHub Pages workflow |

---

## 3. Project structure

```text
smartbuyindia/
├── .github/workflows/deploy.yml    # GitHub Pages workflow retained for main
├── .github/workflows/verify-development.yml # Build + route smoke checks on the development branch
├── plugins/sitemap-plugin.js       # build-time sitemap.xml + robots.txt from src/data
├── scripts/
│   ├── smoke.jsx                   # headless render of every route (test)
│   └── smoke.build.mjs             # bundles + runs the smoke test with esbuild
├── site.config.js                  # ⚙ deployment paths: SITE_BASE, SITE_URL, ROUTER_MODE
├── public/
│   ├── 404.html                    # SPA fallback (only needed for browser-router mode)
│   ├── favicon/                    # vector favicon + apple touch icon
│   ├── images/og/                  # 1200×630 social share image (PNG)
│   ├── images/products/README.md   # why this folder is empty + how to add real images
│   ├── robots.txt                  # dev copy; regenerated on every build
│   ├── sitemap.xml                 # dev copy; regenerated on every build
│   └── site.webmanifest
└── src/
    ├── components/
    │   ├── AmazonButton.jsx        # the ONLY component that renders retailer links
    │   ├── AnchorLink.jsx          # in-page anchors that are safe under HashRouter
    │   ├── Breadcrumbs.jsx
    │   ├── CategoryCard.jsx  GuideCard.jsx  ComparisonCard.jsx  ProductCard.jsx
    │   ├── ComparisonTable.jsx     # reusable data-driven comparison table
    │   ├── DisclosureNotice.jsx    # compact + full disclosure, retailer note
    │   ├── EmptyState.jsx  FAQSection.jsx  FilterBar.jsx  Footer.jsx  Header.jsx
    │   ├── GuideRenderer.jsx       # turns one guide object into a full page
    │   ├── Icons.jsx               # inline SVG icon set (no icon library)
    │   ├── Layout.jsx              # shell + scroll restoration + page views
    │   ├── MobileCtaBar.jsx        # sticky thumb-reachable CTA on phones
    │   ├── ProductImage.jsx        # real <img> or clearly-labelled placeholder art
    │   └── SearchOverlay.jsx       # instant search dialog (/, Cmd/Ctrl+K)
    ├── config/
    │   ├── affiliate.js            # ⚙ Associates ID, campaign tracking IDs, CTA copy
    │   ├── content.js              # ⚙ CONTENT_MODE: 'demo' | 'production'
    │   ├── routes.js               # route table + path builders
    │   └── site.js                 # brand, tagline, contact, social, locale
    ├── data/
    │   ├── categories.js  products.js  buyingGuides.js  comparisons.js  deals.js
    │   └── index.js                # cross-entity helpers (related products etc.)
    ├── hooks/useSeo.js
    ├── pages/                      # one file per route (code-split with React.lazy)
    ├── styles/index.css            # the whole design system, hand-written
    ├── utils/
    │   ├── affiliate.js  analytics.js  format.js  search.js  seo.js
    ├── App.jsx  main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 4. Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR at `http://localhost:5173/` |
| `npm run build` | Production build into `dist/` (also regenerates `sitemap.xml` + `robots.txt`) |
| `npm run preview` | Serve `dist/` locally on port 4173 to test the production bundle |
| `node scripts/smoke.build.mjs` | Render all 35 routes with `react-dom/server`; exits non-zero on any render crash or missing `<h1>` |

---

## 5. Configuration

### 5.1 Deployment paths — `site.config.js` (root)

The app, Vite and the sitemap generator read the same deployment configuration:

```js
export const SITE_BASE = '/';       // Render static site at the domain root
export const SITE_URL = '';          // Set the final public origin before launch
export const ROUTER_MODE = 'browser'; // Render rewrite handles direct nested routes
```

Render rewrites unknown paths to `/index.html`, allowing the React router to handle clean URLs such as `/product/...`, `/category/...` and `/guide/...`. Keep the branch's configured rewrite in `render.yaml` in sync if hosting settings change.

### 5.2 Brand & content — `src/config/*`

| File | Contains |
| --- | --- |
| `src/config/site.js` | `SITE_NAME`, `SITE_TAGLINE`, description, contact email, legal entity/city, locale, social links, share image |
| `src/config/affiliate.js` | `AMAZON_ASSOCIATE_ID`, `TRACKING_IDS` per campaign, retailer domain + labels, CTA button copy |
| `src/config/content.js` | `CONTENT_MODE = 'demo' \| 'production'` — controls the demo ribbon, demo badges and console analytics |

### 5.3 Amazon Associate / tracking IDs — `src/config/affiliate.js`

```js
export const AMAZON_ASSOCIATE_ID = 'smartbuyi080f-21';

export const TRACKING_IDS = {
  default: AMAZON_ASSOCIATE_ID,
  website: AMAZON_ASSOCIATE_ID,
  // instagram: 'your-other-id-21',   // add only IDs that exist in your Associates account
};
```

Never write an Amazon URL inside a component. Everything goes through:

```js
import { generateAffiliateUrl } from '../utils/affiliate.js';
const url = generateAffiliateUrl(product, { placement: 'guide-pick', campaign: 'website' });
```

The helper resolves, in order: `product.asin` → `product.amazonUrl` → inert placeholder. It always
overwrites any incoming `tag=` with the configured tracking ID and can append `subid` later.
`<AmazonButton />` wraps this and also fires `trackAffiliateClick(productId, category, placement)`.

An Associates tracking ID is a public identifier, not a secret — shipping it in the client bundle is
normal and expected.

---

## 6. Current development deployment (Render)

The active development branch is configured for **Render Static Site** with clean browser URLs:

- Branch: `development/smartbuyindia-v2`
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Rewrite: `/*` → `/index.html` so direct visits and refreshes on nested routes work.
- Local dev URL: `http://localhost:5173/`

The deployment configuration lives in `site.config.js` and `render.yaml`. Keep `SITE_BASE = '/'` and `ROUTER_MODE = 'browser'` for Render's root URL setup. The `.github/workflows/deploy.yml` GitHub Pages workflow is retained for the safe `main` branch; do not use it as the deployment instructions for this development branch.

### Staging and launch safeguards

- `CONTENT_MODE = 'demo'` keeps this staging build out of search with `noindex,nofollow` metadata and generates an empty sitemap.
- Do not flip staging to production mode merely to expose draft products. Publish only records that passed the editorial, listing and image-rights checks.
- Before the public launch, configure the final public origin in `site.config.js`, complete the contact and legal pages, verify affiliate disclosures, and deliberately enable indexing only on the intended production site.
- Run `npm run build` and `node scripts/smoke.build.mjs` after code or data changes.

---

## 7. Adding content

Everything is data-driven: **add one object, the whole site updates** (page, nav counts, search index,
related blocks, breadcrumbs, sitemap). No component changes.

### 7.1 Add a product — `src/data/products.js`

```js
{
  id: 'real-kettle-01',                      // unique id
  name: 'Brand 1.8 L Stainless Steel Kettle',
  slug: 'brand-18l-kettle',                  // becomes /product/brand-18l-kettle
  categorySlug: 'home-kitchen',
  subcategorySlug: 'kitchen-appliances',
  shortDescription: 'One or two original sentences.',
  editorialSummary: 'Your own paragraph: what this product class does, and where this one differs.',
  keyFeatures: [{ label: 'Capacity', value: '1.8 L (checked on the listing)' }],
  whoItsFor: ['…'], whoMightSkip: ['…'],
  pros: ['…'], cons: ['…'],
  considerations: ['…'],
  whyWePickedIt: 'The reason it is on the shortlist, in your words.',
  price: null,                               // OR a number you personally verified
  priceVerifiedOn: null,                     // 'YYYY-MM-DD' of your manual check
  asin: 'B0XXXXXXXX',                        // from the amazon.in /dp/ URL -> affiliate link
  amazonUrl: '#',                            // fallback if you prefer an explicit URL
  image: '/images/products/brand-18l-kettle.webp',   // see public/images/products/README.md
  imageAlt: 'What the photo actually shows.',
  tags: ['electric kettle', 'office pantry'],
  badges: ['Everyday pick'],
  relatedGuideSlugs: ['best-electric-kettles'],
  relatedComparisonSlugs: [],
  isDemo: false,
  status: 'published',
  updatedAt: '2026-10-03',
}
```

Rules the UI enforces for you: `price: null` renders “Price not published” instead of a guess; missing
`asin`/`amazonUrl` renders a disabled, labelled CTA instead of a misleading link; `isDemo: true` adds a
visible “Demo entry” badge.

### 7.2 Add a category — `src/data/categories.js`

Copy an existing object, give it a unique `slug`, an `icon` key from `src/components/Icons.jsx`
(`kitchen | grooming | electronics | fitness | office | sparkle`), subcategories and popular searches.
It then appears on `/categories`, in the header drawer, in search, in the footer and in the sitemap.
Set `comingSoon: true` to show a “not live yet” tile without creating a route.

### 7.3 Add a buying guide — `src/data/buyingGuides.js`

One object; every block is optional and simply does not render if omitted:
`intro[]`, `whatToLookFor[]`, `keySpecs[]`, `picks[]` (each with a `label` like “Best for small
kitchens” **and** a `why`), `comparisonSlug`, `thingsToAvoid[]`, `faqs[]`, `finalThoughts[]`.
`<GuideRenderer />` and the table of contents are derived from whatever you fill in, and Article +
FAQPage structured data are generated from the same fields.

### 7.4 Add a comparison — `src/data/comparisons.js`

`productSlugs` in display order, `verdicts` per slug (`{ label, why }` — a use-case label plus its
reason, never a global winner), then `rows[]` whose `values` arrays are index-aligned with
`productSlugs`. `row.highlight: true` emphasises a decisive row.

### 7.5 Add a deal — `src/data/deals.js`

Only after a **human** checked the live price on Amazon.in:

```js
{
  productSlug: 'brand-18l-kettle',
  sectionId: 'home',
  dealType: 'price-drop',
  originalPrice: 2499,      // what you saw
  salePrice: 1999,          // what you saw
  lastChecked: '2026-10-03',// when YOU looked
  verifiedBy: 'Your name',
  terms: 'Coupon applied at checkout.',
}
```

`discountPercentage` is computed, never typed. Missing date or prices ⇒ the card renders as an
unverified entry with no number. After `STALE_AFTER_DAYS` (3) it is flagged; past `expiresOn` it is
removed from the page.

### 7.6 Flip demo → production — `src/config/content.js`

```js
export const CONTENT_MODE = 'production';
```

Removes the demo ribbon, the “Demo entry” badges and console analytics logging in one change. Do this
only after every record has `isDemo: false` and real, verifiable content.

---

## 8. Content rules baked into the code

The data model makes the honest path the easy path:

- No field exists for ratings, review counts or “#1” claims, so they cannot sneak in.
- Verdicts are use-case labels with a mandatory `why`, rendered next to the label.
- Prices render only when `price` + optional `priceVerifiedOn` are present, always as “approx.”.
- Deals render discounts only when both prices and a check date exist.
- Retailer copy is never used: buttons say **“View on Amazon.in” / “Check availability on Amazon.in”**,
  never “partnered with” or “Amazon recommends”.
- Outbound links carry `rel="nofollow sponsored noopener"` and open in a new tab.
- Placeholder artwork is generated in-app and labelled “Placeholder artwork” in both the image and its
  alt text; `public/images/products/README.md` explains the licensing rules for real photos.
- Legal pages ship with visible “review before launch” callouts and placeholder dates.

---

## 9. SEO

- Unique `<title>`, meta description, canonical, Open Graph and Twitter tags per route via
  `useSeo()` (see `src/utils/seo.js`).
- JSON-LD: `Organization` on every page; `WebSite` on the home page; `BreadcrumbList` on detail pages;
  `ItemList` for category/guide/comparison lists; `Article` for guides and comparisons; `FAQPage`
  where FAQs exist. **No Product/Review/AggregateRating markup** — we publish neither verified prices
  nor reviews, so emitting it would be false structured data.
- Semantic HTML, one `<h1>` per route (enforced by the smoke test), descriptive alt text, lazy images
  with fixed aspect ratios (no layout shift).
- `sitemap.xml` + `robots.txt` are regenerated on every build from `src/data` — they cannot drift.
- Set `SITE_URL` in `site.config.js` once you have a domain: canonical/OG URLs and the robots
  `Sitemap:` line become absolute automatically.
- Search-result pages are `noindex` so they never compete with content pages.
- Indian search intent is covered in data (`popularSearches`, guide titles/copy), not by stuffing.

---

## 10. Analytics

`src/utils/analytics.js` exposes typed events and is a no-op (console in demo mode) today:

```js
trackPageView(path)               trackProductView(product)
trackCategoryView(category)       trackGuideView(guide)
trackComparisonView(comparison)   trackDealPageView()
trackAffiliateClick(productId, category, placement)
trackSearch(query, resultCount)   trackFilterChange(category, filters)
trackContactSubmit()              trackNotFound(path)
```

To connect a provider later, implement one function:

```js
import { setAnalyticsTransport } from './utils/analytics.js';
setAnalyticsTransport((event) => window.dataLayer?.push(event)); // GA4, or your own beacon
```

No personal data is collected: product ids, slugs, placements and search terms only.

---

## 11. Performance & accessibility

- Hand-written CSS, inline SVG icons, no icon/CSS framework, no analytics SDK, no fonts downloaded
  (system font stack) — the whole initial payload is roughly **95 KB gzipped** including React and the
  router; every page is a separate lazy chunk of a few KB.
- Images: lazy loading, fixed aspect ratios, generated SVG placeholders in demo mode.
- Keyboard: skip link, focus-visible outlines, focus-trapped search dialog with `/` and `Cmd/Ctrl+K`
  shortcuts, arrow-key result navigation, `Esc` to close, focus restoration.
- Touch: 44 px minimum targets, sticky mobile CTA bar that content never hides behind, horizontally
  scrollable comparison tables with a visible hint.
- `prefers-reduced-motion` respected; print stylesheet strips chrome.
- Contrast: body text on paper background sits around 7:1; accents are used for emphasis, not for
  information alone.

---

## 12. Testing checklist used for this release

- [x] `npm run build` succeeds; `node scripts/smoke.build.mjs` renders all 35 routes with exactly one `<h1>`
- [x] `npm run preview` serves every asset, `sitemap.xml`, `robots.txt`, `404.html`, OG image
- [x] Desktop + mobile widths reviewed (360 / 390 / 414 / 768 / 1024 / 1280) via responsive CSS
- [x] All navigation links resolve (header, drawer, footer, breadcrumbs, cards, related blocks)
- [x] Search: instant results, grouped by type, keyboard nav, empty state, full-page `/search?q=`
- [x] Category filters + sort update results and URL (`?sub=`), with a clear-filters control
- [x] Product pages: every section renders; CTA is inert and labelled while links are placeholders
- [x] Comparison tables scroll horizontally on narrow screens; verdicts show reasons
- [x] Disclosure appears beside CTAs and on `/disclosure`; retailer note is neutral wording
- [x] No console errors from render paths (SSR smoke test) and no fabricated data rendered

Re-run the smoke test after any data-layer change: `node scripts/smoke.build.mjs`.

---

## 13. Before you launch

1. Replace demo records in `src/data/` with researched content; set each `isDemo: false`.
2. `CONTENT_MODE = 'production'` in `src/config/content.js`.
3. Set `SITE_URL` (and `SITE_BASE` if the repo name differs) in `site.config.js`; rebuild.
4. Replace `CONTACT_EMAIL`, `LEGAL_ENTITY`, `LEGAL_CITY` in `src/config/site.js`.
5. Fill real social URLs in `src/config/site.js` (unset items show “soon”, never a dead link).
6. Add real OG/product images per `public/images/products/README.md`.
7. Have `/disclosure`, `/privacy` and `/terms` reviewed and dated by a qualified professional.
8. Connect analytics via `setAnalyticsTransport` if you want reporting.
9. Verify the Render deployment and nested-route refreshes; keep staging noindex until the public launch checklist is complete.

---

## 14. Licence & attribution

The codebase is provided for the SmartBuyIndia project. All editorial content is original. Product
names, brands and trademarks belong to their respective owners and are used for identification only.
SmartBuyIndia is not affiliated with, endorsed by, or sponsored by Amazon; it participates in the
Amazon Associates programme as an independent publisher.
