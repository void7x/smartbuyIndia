import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sitemapPlugin } from './plugins/sitemap-plugin.js';
import { SITE_BASE, SITE_URL, ROUTER_MODE } from './site.config.js';
import { CONTENT_MODE } from './src/config/content.js';

/**
 * All deployment paths live in `site.config.js` — nothing to duplicate here.
 * See the README for the GitHub Pages walkthrough.
 */
export default defineConfig({
  base: SITE_BASE,
  plugins: [
    {
      name: 'smartbuyindia:staging-meta',
      transformIndexHtml(html) {
        const robots = CONTENT_MODE === 'production' ? 'index,follow,max-image-preview:large' : 'noindex,nofollow';
        return html.replace('__SMARTBUY_ROBOTS__', robots);
      },
    },
    react(),
    // Writes dist/sitemap.xml + dist/robots.txt from src/data — no manual step.
    sitemapPlugin({ base: SITE_BASE, siteUrl: SITE_URL, routerMode: ROUTER_MODE }),
  ],
  build: {
    target: 'es2018',
    cssCodeSplit: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Dev-only: accept any Host header so the sandboxed preview proxy works.
    // This has no effect on the static production build.
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
