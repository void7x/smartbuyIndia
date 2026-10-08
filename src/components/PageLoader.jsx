import { BrandMark, CheckIcon, ScaleIcon, TagIcon } from './Icons.jsx';

export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading the next page">
      <div className="page-loader__visual" aria-hidden="true">
        <span className="page-loader__ring page-loader__ring--outer" />
        <span className="page-loader__ring page-loader__ring--inner" />

        <span className="page-loader__orbit page-loader__orbit--one">
          <ScaleIcon width={15} height={15} />
        </span>
        <span className="page-loader__orbit page-loader__orbit--two">
          <TagIcon width={14} height={14} />
        </span>
        <span className="page-loader__orbit page-loader__orbit--three">
          <CheckIcon width={14} height={14} />
        </span>

        <span className="page-loader__brand">
          <BrandMark size={50} />
        </span>
      </div>

      <p className="page-loader__message">
        Finding the useful bits<span className="page-loader__dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span>
      </p>
      <p className="page-loader__hint">Smart choices take a moment.</p>
    </div>
  );
}
