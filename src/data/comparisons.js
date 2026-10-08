import { IS_DEMO_CONTENT } from '../config/content.js';

/**
 * ============================================================================
 * COMPARISONS  —  ⚠ DEMO DATA LAYER
 * ============================================================================
 * Structured side-by-side comparisons rendered by <ComparisonTable />.
 *
 * Deliberate design choices:
 *   • There is NO `winner` field. Every entry gets an optional `verdict` that
 *     names a *use case* ("Best for small kitchens"), never a global #1.
 *   • Every `verdict` must be supported by a `verdictWhy` — the table renders
 *     it directly under the label, so a claim always arrives with its reason.
 *   • Cell values are strings written by the content author. Never paste
 *     retailer copy or invent a specification you cannot verify.
 *   • `priceStatus` replaces a fabricated number with an honest state.
 *
 * HOW TO ADD A COMPARISON
 *   1. Add an object with a unique slug -> route becomes /compare/<slug>
 *   2. List `productSlugs` (must exist in products.js) in the display order.
 *   3. Define `rows`; each row's `values` array is index-aligned with
 *      `productSlugs`.
 *   4. Set `isDemo: false` when the content is real and verified.
 * ============================================================================
 */

const comparisonData = [
  {
    id: 'cmp-air-fryer',
    title: 'Compact vs Family Air Fryers: Which Size Suits Your Kitchen?',
    slug: 'air-fryer-comparison',
    categorySlug: 'home-kitchen',
    guideSlug: 'best-air-fryers-indian-kitchens',
    heroTitle: 'Air fryer size comparison',
    metaDescription:
      'A side-by-side look at compact and family-size air fryers for Indian kitchens: capacity, counter space, socket requirements, cleaning and which suits which household.',
    intro:
      'Air fryer choice usually comes down to one question: can you cook your typical meal in a single batch? This comparison puts a compact basket unit against a family-size one across the criteria that decide that — and the practical consequences of each, including counter space, socket rating and how awkward the basket is to wash.',
    howToRead:
      'Each row compares the two size classes rather than specific models. Use it to narrow which class fits your household, then read the individual product entries.',
    productSlugs: ['example-air-fryer', 'example-family-air-fryer'],
    verdicts: {
      'example-air-fryer': {
        label: 'Best for small kitchens and 1–3 people',
        why: 'Small enough to stay on the platform permanently, and a single batch matches a meal for one to three people.',
      },
      'example-family-air-fryer': {
        label: 'Best for a family of four cooking together',
        why: 'Removes batch cooking entirely for a family meal, which is usually the deciding factor for larger households.',
      },
    },
    rows: [
      {
        id: 'capacity',
        label: 'Basket capacity',
        values: [
          { value: 'Around 3.5 L (demo placeholder)', note: 'One to three portions' },
          { value: 'Around 5.5 L (demo placeholder)', note: 'Family portion in one batch' },
        ],
      },
      {
        id: 'counter-space',
        label: 'Counter footprint',
        values: [
          { value: 'Compact', note: 'Can share a platform with a mixer grinder' },
          { value: 'Large', note: 'Needs a dedicated corner; keep 10–15 cm rear clearance' },
        ],
      },
      {
        id: 'power',
        label: 'Typical power draw',
        values: [
          { value: '1200–1500 W class', note: 'Fine on a standard socket' },
          { value: '1700 W and above class', note: 'Plan for a dedicated, suitably rated socket' },
        ],
      },
      {
        id: 'batch-cooking',
        label: 'Batch cooking for a family',
        values: [
          { value: 'Two to three batches', note: 'Earlier batches go cold while later ones cook' },
          { value: 'Single batch', note: 'Everything finishes together' },
        ],
      },
      {
        id: 'cleaning',
        label: 'Cleaning effort',
        values: [
          { value: 'Light basket, easy to handle', note: 'Fits in most sinks' },
          { value: 'Heavy loaded basket', note: 'Check handle design before buying' },
        ],
      },
      {
        id: 'noise',
        label: 'Fan noise',
        values: [
          { value: 'Lower-volume fan', note: 'Noticeable in an open kitchen' },
          { value: 'Larger fan', note: 'More prominent, especially in a small room' },
        ],
      },
      {
        id: 'preheat',
        label: 'Time to heat up',
        values: [
          { value: 'Faster — smaller cavity', note: 'Good for quick snacks' },
          { value: 'Slower — larger cavity', note: 'Plan a few extra minutes' },
        ],
      },
      {
        id: 'best-for',
        label: 'Best suited to',
        values: [
          { value: 'Couples, singles, small kitchens, occasional use' },
          { value: 'Families of four or more, weekly meal prep' },
        ],
        highlight: true,
      },
      {
        id: 'consider',
        label: 'Things to consider',
        values: [
          { value: 'You will cook in batches for larger meals; bulky items fill the basket quickly.' },
          { value: 'Counter space is permanently committed; a loaded basket is heavy to lift and wash.' },
        ],
      },
    ],
    editorialConclusion: {
      heading: 'How to decide',
      body: [
        'Count the people you cook for on a normal weekday, not on a festival. If that number is three or fewer and your platform is tight, the compact class will serve you better and is far more likely to stay in daily use.',
        'If you regularly cook one meal for four or more people at the same time, the batch problem with a compact unit is a daily annoyance rather than an occasional one, and the larger basket earns its footprint.',
        'Whichever class you choose, confirm two things before ordering: the socket rating available where the unit will live, and whether the manufacturer sells a replacement basket in India.',
      ],
    },
    faqs: [
      {
        question: 'Can I cook two different foods at once in an air fryer?',
        answer:
          'In a single-basket unit, only if the foods need similar time and temperature, and some larger models include a separator accessory. Dual-basket air fryers exist specifically for this, at a higher price and a considerably larger footprint.',
      },
      {
        question: 'Does a bigger air fryer use much more electricity?',
        answer:
          'Higher wattage draws more power per minute, but a larger cavity also takes longer to reach temperature. For a small snack, the compact unit is usually more efficient; for a full family meal, cooking one batch in the larger unit typically uses less total energy than three batches in the smaller one.',
      },
    ],
    updatedAt: '2026-09-25',
    isDemo: true,
    status: 'draft',
  },
  {
    id: 'cmp-earbuds',
    title: 'Wireless Earbuds Compared: Commute, Calls and Comfort',
    slug: 'wireless-earbuds-comparison',
    categorySlug: 'electronics-gadgets',
    guideSlug: 'best-wireless-earbuds',
    heroTitle: 'Wireless earbud use-case comparison',
    metaDescription:
      'Comparing wireless earbuds by real Indian use cases: commuting, calls on noisy streets, gym sessions and long desk listening — what to prioritise for each.',
    intro:
      'There is no single correct wireless earbud. A pair that is excellent on a train commute can be poor in a gym, and a pair optimised for calls may not be the one you want for three hours of music at a desk. This comparison organises the decision by use case rather than by price.',
    howToRead:
      'Rows describe what each use case demands from a pair of earbuds. Match your dominant use case first, then compare shortlisted models against those requirements.',
    productSlugs: ['example-wireless-earbuds'],
    verdicts: {
      'example-wireless-earbuds': {
        label: 'Best for daily commuting and calls',
        why: 'In-canal ANC plus a call-focused microphone is the combination that suits train and bus commutes with work calls in between.',
      },
    },
    rows: [
      {
        id: 'commute',
        label: 'Daily train / bus commute',
        values: [
          {
            value: 'Prioritise ANC and a secure seal',
            note: 'Steady engine drone is exactly what ANC handles best. Verify tip sizes in the box.',
          },
        ],
      },
      {
        id: 'two-wheeler',
        label: 'Two-wheeler riding',
        values: [
          {
            value: 'Prioritise ambient mode and physical controls',
            note: 'Heavy ANC reduces awareness of traffic. Gloves-friendly buttons beat touch controls.',
          },
        ],
      },
      {
        id: 'calls',
        label: 'Calls on a noisy street',
        values: [
          {
            value: 'Prioritise microphone array and ENC',
            note: 'Call clarity is a separate design problem from playback quality — check it independently.',
          },
        ],
      },
      {
        id: 'gym',
        label: 'Gym and running',
        values: [
          {
            value: 'Prioritise sweat resistance and fit stability',
            note: 'Look for an IPX4 rating or better, and a shape that does not work loose when you move.',
          },
        ],
      },
      {
        id: 'desk',
        label: 'Long listening at a desk',
        values: [
          {
            value: 'Prioritise comfort and single-charge runtime',
            note: 'Semi-in-ear designs are often more comfortable for hours; check runtime without the case.',
          },
        ],
      },
      {
        id: 'monsoon',
        label: 'Monsoon exposure',
        values: [
          {
            value: 'Prioritise water resistance and case sealing',
            note: 'The case matters as much as the buds — a wet case kills charging contacts.',
          },
        ],
      },
      {
        id: 'longevity',
        label: 'Two to three year ownership',
        values: [
          {
            value: 'Check single-bud replacement and Indian warranty',
            note: 'Battery capacity fades; whether you can replace one bud decides if the pair survives it.',
          },
        ],
      },
    ],
    editorialConclusion: {
      heading: 'How to decide',
      body: [
        'Name your single most common listening situation and buy for that. A pair chosen for the wrong context gets used less, regardless of how good it measures.',
        'If two contexts compete — for example commuting and gym sessions — decide which one you would rather compromise on, because fit, ANC and sweat resistance pull in different directions.',
        'Finally, treat the Indian warranty and single-bud replacement policy as part of the product rather than an afterthought.',
      ],
    },
    faqs: [
      {
        question: 'Should I buy earbuds with ANC for a two-wheeler commute?',
        answer:
          'Generally no. ANC reduces the ambient noise that tells you what traffic behind you is doing, which is a safety issue while riding. If you must use earbuds on a two-wheeler, prefer an open or ambient-mode design at low volume — and check what your local traffic rules permit.',
      },
      {
        question: 'Are expensive earbuds always better for calls?',
        answer:
          'Not reliably. Call quality depends on microphone placement and processing, and some mid-range models with a stem-mounted microphone perform better on a noisy street than pricier stemless designs. Look for the microphone specification and ENC support rather than the price.',
      },
    ],
    updatedAt: '2026-09-24',
    isDemo: true,
    status: 'draft',
  },
  {
    id: 'cmp-desk-lamp',
    title: 'Desk Lamp Comparison: Study, Work and Shared Rooms',
    slug: 'desk-lamp-comparison',
    categorySlug: 'office-study',
    guideSlug: 'best-desk-accessories',
    heroTitle: 'Choosing desk lighting for how you actually work',
    metaDescription:
      'Comparing desk lamp types for Indian homes and hostels: clamp versus base, fixed versus adjustable colour temperature, USB versus adapter power, and what suits each room.',
    intro:
      'Desk lamps look interchangeable and are not. The differences that matter appear over months: whether the arm holds position, whether the colour temperature suits both work and evening reading, how it is powered, and whether the base or clamp suits the surface you have.',
    howToRead:
      'Rows compare lamp characteristics and which situation each suits. Use it to rule out designs that cannot work on your desk before comparing prices.',
    productSlugs: ['example-study-lamp'],
    verdicts: {
      'example-study-lamp': {
        label: 'Best all-round choice for study and evening work',
        why: 'An adjustable arm with directed light covers both focused work and late reading, and can be angled away from someone sleeping in the same room.',
      },
    },
    rows: [
      {
        id: 'mount',
        label: 'Clamp versus weighted base',
        values: [
          {
            value: 'Clamp saves desk space but needs a suitable edge',
            note: 'Check edge thickness and that the desk is sturdy enough to take the load.',
          },
        ],
      },
      {
        id: 'colour-temp',
        label: 'Colour temperature',
        values: [
          {
            value: 'Adjustable suits shared rooms',
            note: 'Cool light for work, warm light in the evening without disturbing a sleeper.',
          },
        ],
      },
      {
        id: 'brightness',
        label: 'Brightness control',
        values: [
          {
            value: 'Stepless or fine-step dimming is worth having',
            note: 'Three coarse levels often leave you between too bright and too dark.',
          },
        ],
      },
      {
        id: 'flicker',
        label: 'Flicker on long sessions',
        values: [
          {
            value: 'Look for flicker-free driver claims',
            note: 'Not always advertised; cheaper drivers can produce tiring flicker at low brightness.',
          },
        ],
      },
      {
        id: 'arm-reach',
        label: 'Arm reach and stability',
        values: [
          {
            value: 'Match reach to your desk depth',
            note: 'A long arm that droops under its own weight is worse than a short rigid one.',
          },
        ],
      },
      {
        id: 'power',
        label: 'Power source',
        values: [
          {
            value: 'USB-powered lamps need a port or an adapter',
            note: 'Confirm whether an adapter is included; some models ship cable only.',
          },
        ],
      },
      {
        id: 'hostel',
        label: 'Hostel and shared-room use',
        values: [
          {
            value: 'Prioritise a narrow beam and low standby draw',
            note: 'Light spill is the main complaint from roommates, not brightness.',
          },
        ],
      },
    ],
    editorialConclusion: {
      heading: 'How to decide',
      body: [
        'Start with the mount. If your desk edge suits a clamp, you reclaim surface area; if it does not, a weighted base is the only option and you need to check stability on a folding table.',
        'Then decide on colour temperature. Anyone working during the day and reading in the evening benefits from an adjustable model; a fixed cool-white lamp is fine for a single-purpose study desk.',
        'Brightness control and flicker behaviour come last but affect long sessions most — these are the two characteristics you will feel after four hours rather than in the first four minutes.',
      ],
    },
    faqs: [
      {
        question: 'How bright should a study lamp be?',
        answer:
          'Enough to light your page or work area clearly without a bright hotspot and without competing glare against a dark room. The practical test is whether you can read for thirty minutes without squinting and without the rest of the room feeling dark by comparison.',
      },
      {
        question: 'Is warm or cool light better for studying?',
        answer:
          'Cooler light around 4000–6500 K is generally preferred for alert, detail-focused work; warmer light around 2700–3000 K is more comfortable in the evening. An adjustable lamp lets you use each at the right time instead of compromising.',
      },
    ],
    updatedAt: '2026-09-21',
    isDemo: true,
    status: 'draft',
  },
];

/* -------------------------------------------------------------------------- */
/* Publication visibility                                                     */
/* -------------------------------------------------------------------------- */

export const comparisons = IS_DEMO_CONTENT
  ? comparisonData
  : comparisonData.filter((c) => c.status === 'published' && !c.isDemo);

/* -------------------------------------------------------------------------- */
/* Lookups                                                                    */
/* -------------------------------------------------------------------------- */

export const getComparisonBySlug = (slug) =>
  comparisons.find((c) => c.slug === slug) || null;
export const getComparisonsByCategory = (categorySlug) =>
  comparisons.filter((c) => c.categorySlug === categorySlug);
export const getComparisonsForProduct = (productSlug) =>
  comparisons.filter((c) => (c.productSlugs || []).includes(productSlug));
