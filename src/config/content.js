/**
 * Master switch for demo vs. production content.
 *
 * While `CONTENT_MODE === 'demo'`:
 *   - every page shows a small "Demo content" ribbon
 *   - prices are hidden unless a real, verified number is supplied
 *   - analytics events are logged to the console instead of being sent anywhere
 *
 * Flip this to 'production' once real, manually verified content replaces the
 * demo records in `src/data/`. The ribbon and demo badges disappear
 * automatically; nothing else has to change.
 */
export const CONTENT_MODE = 'demo'; // 'demo' | 'production'

export const IS_DEMO_CONTENT = CONTENT_MODE === 'demo';

/** Copy used by the demo ribbons / badges. */
export const DEMO_NOTICE =
  'Staging build. Some catalogue entries are still demo content; researched drafts are available for review but are not published to search.';
