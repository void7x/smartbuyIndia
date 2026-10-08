import { IS_DEMO_CONTENT } from '../config/content.js';

/**
 * ============================================================================
 * CATEGORIES  —  data-driven taxonomy
 * ============================================================================
 * To launch a new category: add one object here, drop matching products into
 * `products.js` (with the same `categorySlug`), and the category page, nav,
 * search index, sitemap entry and breadcrumbs all appear automatically.
 *
 * ⚠ DEMO DATA — descriptions below are original placeholder copy written for
 * layout review. Replace with your real editorial text before launch.
 */

const categoryData = [
  {
    id: 'cat-home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    tagline: 'Appliances and tools that make an Indian kitchen easier.',
    description:
      'Shortlists and buying guides for everyday kitchen appliances — air fryers, electric kettles, mixer grinders and storage solutions — written around how Indian households actually cook, with attention to voltage, serviceability and counter space.',
    icon: 'kitchen',
    accent: '#c2410c',
    subcategories: [
      { name: 'Air Fryers', slug: 'air-fryers' },
      { name: 'Kitchen Appliances', slug: 'kitchen-appliances' },
      { name: 'Cleaning', slug: 'cleaning' },
      { name: 'Storage', slug: 'storage' },
      { name: 'Cooking', slug: 'cooking' },
    ],
    popularSearches: [
      'best air fryer for Indian kitchen',
      'best electric kettle for office',
      'mixer grinder with 3 jars',
    ],
    featured: true,
    order: 1,
    status: 'demo',
  },
  {
    id: 'cat-beauty-grooming',
    name: 'Beauty & Grooming',
    slug: 'beauty-grooming',
    tagline: 'Grooming tools, compared on what actually matters.',
    description:
      'Practical guides to grooming appliances and everyday personal-care tools. We focus on blade quality, battery behaviour, cleaning effort and long-term cost of ownership — not marketing claims about skin or hair results.',
    icon: 'grooming',
    accent: '#9d174d',
    subcategories: [
      { name: 'Trimmers & Shavers', slug: 'trimmers-shavers' },
      { name: 'Hair Care Tools', slug: 'hair-care-tools' },
      { name: 'Skincare Tools', slug: 'skincare-tools' },
      { name: 'Oral Care', slug: 'oral-care' },
    ],
    popularSearches: ['cordless trimmer for home use', 'best hair dryer under 2000'],
    featured: true,
    order: 2,
    status: 'demo',
  },
  {
    id: 'cat-electronics-gadgets',
    name: 'Electronics & Gadgets',
    slug: 'electronics-gadgets',
    tagline: 'Everyday tech, explained without the jargon.',
    description:
      'Wireless earbuds, power banks, chargers and desk tech. Our guides translate specification sheets into the trade-offs you will actually feel — battery life in a Mumbai local, call quality on a noisy street, and how a device behaves after a year of use.',
    icon: 'electronics',
    accent: '#1d4ed8',
    subcategories: [
      { name: 'Audio', slug: 'audio' },
      { name: 'Charging & Power', slug: 'charging-power' },
      { name: 'Computer Accessories', slug: 'computer-accessories' },
      { name: 'Smart Home', slug: 'smart-home' },
    ],
    popularSearches: [
      'best wireless earbuds for everyday use',
      'power bank for travel in India',
      'usb-c charger 65w',
    ],
    featured: true,
    order: 3,
    status: 'demo',
  },
  {
    id: 'cat-fitness',
    name: 'Fitness',
    slug: 'fitness',
    tagline: 'Home training gear that survives daily use.',
    description:
      'Equipment for training at home in limited space — resistance bands, mats, adjustable dumbbells and skipping ropes. We look at material quality, floor protection, storage footprint and whether the gear holds up in Indian heat and humidity.',
    icon: 'fitness',
    accent: '#15803d',
    subcategories: [
      { name: 'Strength', slug: 'strength' },
      { name: 'Yoga & Mobility', slug: 'yoga-mobility' },
      { name: 'Cardio', slug: 'cardio' },
      { name: 'Recovery', slug: 'recovery' },
    ],
    popularSearches: ['best yoga mat for indian floors', 'resistance band set for home workout'],
    featured: true,
    order: 4,
    status: 'demo',
  },
  {
    id: 'cat-office-study',
    name: 'Office & Study',
    slug: 'office-study',
    tagline: 'A calmer, more productive desk setup.',
    description:
      'Desk accessories for students and professionals working from home — lamps, stands, organisers and seating support. Guides weigh eye comfort, cable management and how well a setup works in a small Indian room shared with family.',
    icon: 'office',
    accent: '#4c1d95',
    subcategories: [
      { name: 'Lighting', slug: 'lighting' },
      { name: 'Desk Organisation', slug: 'desk-organisation' },
      { name: 'Ergonomics', slug: 'ergonomics' },
      { name: 'Stationery', slug: 'stationery' },
    ],
    popularSearches: ['best study lamp under 2000', 'laptop stand for bed table'],
    featured: true,
    order: 5,
    status: 'demo',
  },
  {
    /**
     * Not a real category — it exists so the homepage grid can show a
     * "coming soon" tile. `comingSoon: true` removes it from the sitemap,
     * navigation and search index.
     */
    id: 'cat-coming-soon',
    name: 'More Coming Soon',
    slug: 'coming-soon',
    tagline: 'Baby & Kids, Pet Care, Travel, Automotive and more.',
    description:
      'We are adding new categories gradually so that every guide is properly researched before it goes live. Baby & Kids, Pet Care, Travel Essentials and Automotive Accessories are next on the list.',
    icon: 'sparkle',
    accent: '#0f766e',
    subcategories: [],
    popularSearches: [],
    featured: true,
    comingSoon: true,
    order: 6,
    status: 'demo',
  },
];

export const categories = IS_DEMO_CONTENT
  ? categoryData
  : categoryData.filter((c) => c.status === 'published');

/** Categories that should appear in navigation and the sitemap. */
export const liveCategories = categories.filter(
  (c) => !c.comingSoon && (IS_DEMO_CONTENT || c.status === 'published'),
);

export const getCategoryBySlug = (slug) =>
  liveCategories.find((c) => c.slug === slug) || null;

export const getCategoryName = (slug) => getCategoryBySlug(slug)?.name || slug;

export const categoriesSorted = [...liveCategories].sort((a, b) => a.order - b.order);
