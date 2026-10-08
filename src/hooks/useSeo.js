import { useEffect } from 'react';
import { setSeo } from '../utils/seo.js';
import { IS_DEMO_CONTENT } from '../config/content.js';

/**
 * Declarative page metadata.
 *
 *   useSeo({ title: '…', description: '…', path: '/product/…', schema: [ … ] });
 *
 * Runs after every render that changes the inputs, which keeps the document
 * head in sync with client-side route changes.
 */
export default function useSeo(options) {
  const schema = options?.schema ?? null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Public Render is a staging environment while CONTENT_MODE is 'demo'.
    // Keep placeholder pages out of search until verified production content exists.
    setSeo({ ...options, noIndex: Boolean(options?.noIndex || IS_DEMO_CONTENT), schema });
    // Re-apply on route changes even when the values look identical.
  }, [
    options?.title,
    options?.description,
    options?.path,
    options?.image,
    options?.type,
    options?.noIndex,
    JSON.stringify(schema),
  ]);
}
