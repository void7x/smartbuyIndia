import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// The data layer is plain ESM with no JSX and no Vite-only syntax, so it can be
// imported directly by Node at build time. `SITE_BASE` falls back to '/' when
// `import.meta.env` is unavailable outside Vite — we pass the real base in.
import { categories, products, buyingGuides, comparisons } from '../src/data/index.js';
import { CONTENT_MODE } from '../src/config/content.js';
import {
  SITE_BASE as DEFAULT_BASE,
  SITE_URL as DEFAULT_URL,
  ROUTER_MODE as DEFAULT_ROUTER,
} from '../site.config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * Generates `dist/sitemap.xml` and `dist/robots.txt` from the site's own data
 * layer, so the sitemap can never drift away from the real routes.
 *
 * Free, zero-dependency, build-time only. Set SITE_URL in src/config/site.js
 * once you have a domain and the generated <loc> values become absolute.
 */
export function sitemapPlugin({
  base = DEFAULT_BASE,
  siteUrl = DEFAULT_URL,
  routerMode = DEFAULT_ROUTER,
} = {}) {
  return {
    name: 'smartbuyindia:sitemap',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(__dirname, '..', 'dist');
      mkdirSync(outDir, { recursive: true });

      // HashRouter URLs must keep the `#` so crawlers and users land correctly.
      const prefix =
        routerMode === 'hash' ? `${base}#` : base.replace(/\/$/, '');
      const origin = siteUrl ? siteUrl.replace(/\/$/, '') : '';
      const full = (path) => `${origin}${prefix}${path}`;
      const today = new Date().toISOString().slice(0, 10);

      // Only verified production content belongs in the sitemap.
      // During demo/staging mode we publish an intentionally empty sitemap.
      const isProduction = CONTENT_MODE === 'production';
      const liveCats = categories.filter((c) => isProduction && !c.comingSoon && c.status === 'published');
      const liveProducts = products.filter((p) => isProduction && p.status === 'published' && !p.isDemo);
      const liveGuides = buyingGuides.filter((g) => isProduction && g.status === 'published' && !g.isDemo);
      const liveComparisons = comparisons.filter((c) => isProduction && c.status === 'published' && !c.isDemo);

      const urls = isProduction
        ? [
            { path: '/', changefreq: 'weekly', priority: '1.0' },
            { path: '/categories', changefreq: 'weekly', priority: '0.9' },
            { path: '/buying-guides', changefreq: 'weekly', priority: '0.9' },
            { path: '/compare', changefreq: 'weekly', priority: '0.8' },
            { path: '/deals', changefreq: 'daily', priority: '0.8' },
            { path: '/about', changefreq: 'monthly', priority: '0.5' },
            { path: '/contact', changefreq: 'monthly', priority: '0.4' },
            { path: '/disclosure', changefreq: 'yearly', priority: '0.6' },
            { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
            { path: '/terms', changefreq: 'yearly', priority: '0.3' },
            ...liveCats.map((c) => ({ path: `/category/${c.slug}`, changefreq: 'weekly', priority: '0.8' })),
            ...liveProducts.map((p) => ({ path: `/product/${p.slug}`, changefreq: 'weekly', priority: '0.7' })),
            ...liveGuides.map((g) => ({ path: `/guide/${g.slug}`, changefreq: 'monthly', priority: '0.8' })),
            ...liveComparisons.map((c) => ({ path: `/compare/${c.slug}`, changefreq: 'monthly', priority: '0.7' })),
          ]
        : [];

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">',
        ...urls.map(
          (u) =>
            `  <url>\n    <loc>${escapeXml(full(u.path))}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
        ),
        '</urlset>',
        '',
      ].join('\n');

      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf8');

      const sitemapUrl = origin
        ? `${origin}${base.replace(/\/$/, '')}/sitemap.xml`
        : `https://YOUR-DOMAIN${base.replace(/\/$/, '')}/sitemap.xml`;

      const robots = isProduction
        ? [
            '# robots.txt — SmartBuyIndia (generated at build time)',
            'User-agent: *',
            'Allow: /',
            '',
            ...(origin
              ? [`Sitemap: ${sitemapUrl}`]
              : [
                  '# Set SITE_URL in src/config/site.js before launch:',
                  `# Sitemap: ${sitemapUrl}`,
                ]),
            '',
          ].join('\n')
        : [
            '# robots.txt — SmartBuyIndia staging',
            '# Placeholder/demo content is intentionally blocked from search engines.',
            'User-agent: *',
            'Disallow: /',
            '',
          ].join('\n');

      writeFileSync(resolve(outDir, 'robots.txt'), robots, 'utf8');

      console.log(`[sitemap] ${urls.length} URLs -> dist/sitemap.xml`);
    },
  };
}
