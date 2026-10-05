import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * GitHub Pages clean-URL fallback (only relevant when ROUTER_MODE = 'browser').
 *
 * public/404.html stashes the requested path and redirects to
 * `/#/redirect<path>`. This component reads that path and replaces the URL with
 * the real route, so a shared link like /product/example-air-fryer still lands
 * on the right page.
 *
 * With the default HashRouter this route is simply never used.
 */
export default function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const raw = decodeURIComponent(location.pathname.replace(/^\/redirect/, ''));
    const stored = sessionStorage.getItem('sbi_redirect');
    sessionStorage.removeItem('sbi_redirect');
    const target = raw && raw !== '/' ? raw : stored || '/';
    navigate(target, { replace: true });
  }, [location.pathname, navigate]);

  return null;
}
