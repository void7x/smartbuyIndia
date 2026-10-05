/**
 * In-page anchor link that is safe under HashRouter.
 *
 * A plain `<a href="#section">` would replace the router's location hash with
 * `#section` and navigate away from the page. This component keeps the URL
 * untouched and scrolls the target into view instead.
 */
export default function AnchorLink({ id, children, className, ...rest }) {
  const handleClick = (event) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Move focus for keyboard and screen-reader users without touching the URL.
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };

  return (
    <a href={`#${id}`} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
