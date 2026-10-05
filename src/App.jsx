import { Suspense, lazy } from 'react';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { ROUTER_MODE } from './config/site.js';
import { ROUTES } from './config/routes.js';

/**
 * Pages are code-split with React.lazy: the initial bundle only carries the
 * shell, routing and the data layer. Each page loads on demand, which keeps the
 * first paint fast on a slow mobile connection.
 */
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage.jsx'));
const CategoryPage = lazy(() => import('./pages/CategoryPage.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'));
const ComparePage = lazy(() => import('./pages/ComparePage.jsx'));
const BuyingGuidesPage = lazy(() => import('./pages/BuyingGuidesPage.jsx'));
const GuidePage = lazy(() => import('./pages/GuidePage.jsx'));
const DealsPage = lazy(() => import('./pages/DealsPage.jsx'));
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const DisclosurePage = lazy(() => import('./pages/DisclosurePage.jsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'));
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const RedirectHandler = lazy(() => import('./pages/RedirectHandler.jsx'));

function PageFallback() {
  return (
    <div className="container section" role="status" aria-live="polite">
      <p className="text-muted">Loading…</p>
    </div>
  );
}

export default function App() {
  const Router = ROUTER_MODE === 'browser' ? BrowserRouter : HashRouter;

  return (
    <Router>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path={ROUTES.categories} element={<CategoriesPage />} />
            <Route path={ROUTES.category} element={<CategoryPage />} />

            <Route path={ROUTES.product} element={<ProductPage />} />

            {/* /compare lists every comparison; /compare/:slug renders one */}
            <Route path={ROUTES.compareIndex} element={<ComparePage />} />
            <Route path={ROUTES.compare} element={<ComparePage />} />

            <Route path={ROUTES.buyingGuides} element={<BuyingGuidesPage />} />
            <Route path={ROUTES.guide} element={<GuidePage />} />

            <Route path={ROUTES.deals} element={<DealsPage />} />
            <Route path={ROUTES.search} element={<SearchPage />} />

            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path={ROUTES.contact} element={<ContactPage />} />
            <Route path={ROUTES.disclosure} element={<DisclosurePage />} />
            <Route path={ROUTES.privacy} element={<PrivacyPage />} />
            <Route path={ROUTES.terms} element={<TermsPage />} />

            {/* GitHub Pages clean-URL fallback (browser mode only) */}
            <Route path="/redirect/*" element={<RedirectHandler />} />

            <Route path={ROUTES.notFound} element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
