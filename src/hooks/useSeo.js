import { useEffect } from 'react';
import { setSeo } from '../utils/seo.js';

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
    setSeo({ ...options, schema });
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
