/**
 * Route smoke test (no browser needed).
 *
 * Renders every route of the app to a string with react-dom/server and fails
 * on any exception. Effects do not run during SSR, so this catches render-time
 * crashes — the class of bug that would otherwise show as a blank page.
 *
 *   node scripts/smoke.build.mjs   (bundles with esbuild, then runs)
 */
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Layout from '../src/components/Layout.jsx';
import HomePage from '../src/pages/HomePage.jsx';
import CategoriesPage from '../src/pages/CategoriesPage.jsx';
import CategoryPage from '../src/pages/CategoryPage.jsx';
import ProductPage from '../src/pages/ProductPage.jsx';
import ComparePage from '../src/pages/ComparePage.jsx';
import BuyingGuidesPage from '../src/pages/BuyingGuidesPage.jsx';
import GuidePage from '../src/pages/GuidePage.jsx';
import DealsPage from '../src/pages/DealsPage.jsx';
import SearchPage from '../src/pages/SearchPage.jsx';
import AboutPage from '../src/pages/AboutPage.jsx';
import ContactPage from '../src/pages/ContactPage.jsx';
import DisclosurePage from '../src/pages/DisclosurePage.jsx';
import PrivacyPage from '../src/pages/PrivacyPage.jsx';
import TermsPage from '../src/pages/TermsPage.jsx';
import NotFound from '../src/pages/NotFound.jsx';

const ROUTE_PATHS = [
  '/',
  '/categories',
  '/category/home-kitchen',
  '/category/home-kitchen?sub=air-fryers',
  '/category/electronics-gadgets',
  '/category/beauty-grooming',
  '/category/fitness',
  '/category/office-study',
  '/category/coming-soon',
  '/category/does-not-exist',
  '/product/example-air-fryer',
  '/product/example-wireless-earbuds',
  '/product/does-not-exist',
  '/compare',
  '/compare/air-fryer-comparison',
  '/compare/wireless-earbuds-comparison',
  '/compare/desk-lamp-comparison',
  '/compare/does-not-exist',
  '/buying-guides',
  '/guide/best-air-fryers-indian-kitchens',
  '/guide/best-wireless-earbuds',
  '/guide/best-electric-kettles',
  '/guide/best-home-workout-equipment',
  '/guide/best-desk-accessories',
  '/guide/does-not-exist',
  '/deals',
  '/search',
  '/search?q=air%20fryer',
  '/search?q=nonsense-xyz',
  '/about',
  '/contact',
  '/disclosure',
  '/privacy',
  '/terms',
  '/definitely-not-a-page',
];

function renderPath(path) {
  const html = renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/compare/:slug" element={<ComparePage />} />
          <Route path="/buying-guides" element={<BuyingGuidesPage />} />
          <Route path="/guide/:slug" element={<GuidePage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/disclosure" element={<DisclosurePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  if (!html || html.length < 200) throw new Error(`Suspiciously small output for ${path}`);
  return html;
}

let failures = 0;
for (const path of ROUTE_PATHS) {
  try {
    const html = renderPath(path);
    const headings = (html.match(/<h1/g) || []).length;
    if (headings !== 1) {
      console.warn(`WARN  ${path} — ${headings} <h1> elements (expected exactly 1)`);
    }
    console.log(`ok    ${path}  (${html.length} bytes, ${headings} h1)`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL  ${path}\n      ${error && error.stack ? error.stack.split('\n').slice(0, 6).join('\n      ') : error}`);
  }
}

if (failures) {
  console.error(`\n${failures} route(s) failed to render.`);
  process.exit(1);
}
console.log(`\nAll ${ROUTE_PATHS.length} routes rendered successfully.`);
