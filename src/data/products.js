import { IS_DEMO_CONTENT } from '../config/content.js';

/**
 * ============================================================================
 * PRODUCTS  —  ⚠ DEMO DATA LAYER
 * ============================================================================
 *
 * Everything in this file is PLACEHOLDER editorial content created to design
 * and test the layout. It is NOT research, NOT a product test, and NOT a claim
 * about any real product.
 *
 *   • `isDemo: true`        -> renders a visible "Demo entry" badge on the page
 *   • `price: null`         -> we never invent a price; the UI says so instead
 *   • `amazonUrl: '#'`      -> inert placeholder link, no traffic goes anywhere
 *   • no `asin`             -> `generateAffiliateUrl()` returns the placeholder
 *
 * --------------------------------------------------------------------------
 * HOW TO ADD A REAL PRODUCT
 * --------------------------------------------------------------------------
 * Copy one object below, then:
 *   1. Write your own original editorial summary (never copy Amazon copy).
 *   2. Set `asin` (found in the Amazon.in product URL: /dp/B0XXXXXXXX) — the
 *      affiliate link is built automatically from it.
 *   3. Set `isDemo: false`.
 *   4. Only set `price` / `priceVerifiedOn` if you personally checked the live
 *      price, and label it as approximate. Otherwise leave `price: null`.
 *   5. Never add ratings, review counts or "we tested this" claims unless they
 *      are true and you can substantiate them.
 *
 * The product page, category listings, search index, comparison tables,
 * related-products blocks and sitemap.xml all read from this array — one edit,
 * whole site updated.
 * ============================================================================
 */

const productData = [
  {
    id: 'demo-air-fryer-01',
    name: 'Example Compact Air Fryer 3.5 L',
    slug: 'example-air-fryer',
    categorySlug: 'home-kitchen',
    subcategorySlug: 'air-fryers',
    shortDescription:
      'A small-capacity basket air fryer shaped for a two-person household and a tight kitchen counter.',
    editorialSummary:
      'This demo entry stands in for a compact 3.5-litre basket air fryer. A capacity in this range suits one to three people and leaves room on a standard Indian kitchen platform next to a mixer grinder. Basket models are simpler to clean than oven-style units, but they cook one batch at a time, which matters when you are feeding a family.',
    keyFeatures: [
      { label: 'Capacity class', value: '3.5 L basket (demo placeholder)' },
      { label: 'Best for', value: '1–3 people, single-batch cooking' },
      { label: 'Control type', value: 'Manual dial or digital panel (model dependent)' },
      { label: 'Counter footprint', value: 'Compact, but needs rear clearance for the vent' },
      { label: 'Power draw', value: 'Typically 1200–1500 W for this size class' },
    ],
    whoItsFor: [
      'Couples or single occupants who want to roast vegetables and reheat fried snacks.',
      'Homes with limited platform space that cannot fit an oven-style unit.',
      'Anyone replacing deep-frying for a couple of snacks a week rather than daily.',
    ],
    whoMightSkip: [
      'Families of four or more who would end up cooking in three separate batches.',
      'Kitchens without a dedicated 15 A socket nearby — air fryers draw a lot of current.',
      'Anyone wanting to bake, toast bread slices and grill simultaneously; an OTG covers that better.',
    ],
    pros: [
      'Small footprint suits compact Indian kitchens.',
      'Basket and tray are usually the only parts that need washing.',
      'Cooks faster than heating a full-size oven.',
    ],
    cons: [
      'Single-batch cooking slows down larger meals.',
      'Fan noise is noticeable in an open kitchen.',
      'Non-stick coating needs careful handling to last.',
    ],
    considerations: [
      'Check that the wattage matches your home wiring and that you have a dedicated socket rather than an extension board.',
      'Measure the space behind the unit — hot air exits at the rear and needs clearance from walls and tiles.',
      'Ask whether the basket is dishwasher-safe in India, where most households wash by hand.',
      'Confirm spare-part availability (basket, tray) for the brand you choose.',
    ],
    whyWePickedIt:
      'Selected for this demo layout because the compact-basket segment is the most common starting point for first-time air fryer buyers in India. The entry is a structural example, not a recommendation of any specific model.',
    price: null,
    priceNote: 'No price is published for demo entries. Live prices will be added only after manual verification.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-air-fryer.svg',
    imageAlt: 'Abstract placeholder illustration representing a compact air fryer. Demo artwork, not a product photograph.',
    tags: ['air fryer', 'compact kitchen', 'low oil cooking', 'home appliance'],
    badges: ['Compact pick'],
    relatedGuideSlugs: ['best-air-fryers-indian-kitchens'],
    relatedComparisonSlugs: ['air-fryer-comparison'],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-20',
  },
  {
    id: 'demo-air-fryer-02',
    name: 'Example Large Family Air Fryer 5.5 L',
    slug: 'example-family-air-fryer',
    categorySlug: 'home-kitchen',
    subcategorySlug: 'air-fryers',
    shortDescription:
      'A larger basket unit intended to cook a full family portion in one go.',
    editorialSummary:
      'This placeholder represents the 5–6 litre family segment. The extra capacity mostly buys you batch-free cooking: a tray of vegetables and a portion of chicken can go in together. The trade-off is a substantially bigger footprint and a heavier basket to lift and wash.',
    keyFeatures: [
      { label: 'Capacity class', value: '5.5 L basket (demo placeholder)' },
      { label: 'Best for', value: 'Households of 4+ or meal-prep cooking' },
      { label: 'Footprint', value: 'Needs a permanent corner of the platform' },
      { label: 'Power draw', value: 'Typically 1700 W and above for this size class' },
    ],
    whoItsFor: [
      'Families that cook for four or more in a single sitting.',
      'Anyone who meal-preps in bulk on weekends.',
      'Homes that already have counter space allocated to large appliances.',
    ],
    whoMightSkip: [
      'Small kitchens where the unit would permanently occupy the workspace.',
      'Single occupants — you will pay for capacity you rarely use.',
      'Renters who move often; these units are bulky to transport.',
    ],
    pros: [
      'Cooks a full family portion in one batch.',
      'Better for roasting whole vegetables and larger cuts.',
      'Fewer cycles means lower total energy use for a big meal.',
    ],
    cons: [
      'Takes up significant counter space.',
      'Heavier basket, more awkward to clean.',
      'Slower to preheat than a compact model.',
    ],
    considerations: [
      'Verify your kitchen socket rating before buying anything above 1500 W.',
      'Check the basket handle design — a full 5.5 L basket is heavy when loaded.',
      'Consider whether you need a separator accessory for cooking two items at once.',
    ],
    whyWePickedIt:
      'Included in the demo set to show how a category page handles two products in the same subcategory with clearly different use cases.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-family-air-fryer.svg',
    imageAlt: 'Abstract placeholder illustration representing a large family air fryer. Demo artwork, not a product photograph.',
    tags: ['air fryer', 'family kitchen', 'large capacity'],
    badges: ['Family size'],
    relatedGuideSlugs: ['best-air-fryers-indian-kitchens'],
    relatedComparisonSlugs: ['air-fryer-comparison'],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-20',
  },
  {
    id: 'demo-kettle-01',
    name: 'Example Stainless Steel Electric Kettle 1.8 L',
    slug: 'example-electric-kettle',
    categorySlug: 'home-kitchen',
    subcategorySlug: 'kitchen-appliances',
    shortDescription:
      'A general-purpose stainless steel kettle for chai, instant noodles and hot water at home or at a desk.',
    editorialSummary:
      'This demo entry stands in for the most common kettle shape sold in India: stainless steel body, concealed heating element, 1.5–1.8 L capacity. Steel bodies are more durable than glass for shared office use, while the wide mouth makes descaling — a real issue with hard water in many Indian cities — much easier.',
    keyFeatures: [
      { label: 'Capacity class', value: '1.8 L (demo placeholder)' },
      { label: 'Body', value: 'Stainless steel, wide mouth for cleaning' },
      { label: 'Best for', value: 'Chai, coffee, instant meals, hot water bottles' },
      { label: 'Water type', value: 'Hard-water areas need regular descaling' },
    ],
    whoItsFor: [
      'Households that boil water several times a day for tea and cooking.',
      'Hostel students and working professionals with a shared pantry.',
      'Small offices where a kettle is used by many people daily.',
    ],
    whoMightSkip: [
      'Anyone who wants precise temperature control for filter coffee or green tea — look for a variable-temperature model instead.',
      'Very small kitchens where a stovetop kettle already does the job.',
    ],
    pros: [
      'Boils faster than a stovetop pan for the same volume.',
      'Stainless steel survives knocks and shared use.',
      'Wide opening makes manual descaling practical.',
    ],
    cons: [
      'Outer surface gets hot on single-wall models.',
      'Auto shut-off switches can fail over time with heavy use.',
      'No temperature control on basic models.',
    ],
    considerations: [
      'Double-wall or insulated bodies stay cooler to touch — worth it around children.',
      'Check the filter mesh at the spout; it should be removable for cleaning.',
      'Look at the cord length against your actual socket position.',
      'In hard-water areas, plan on descaling every few weeks regardless of brand.',
    ],
    whyWePickedIt:
      'Used in the demo set because electric kettles are one of the highest-intent, lowest-confusion purchases for Indian households and offices.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-kettle.svg',
    imageAlt: 'Abstract placeholder illustration representing a stainless steel electric kettle. Demo artwork, not a product photograph.',
    tags: ['electric kettle', 'chai', 'office pantry', 'kitchen appliance'],
    badges: ['Everyday pick'],
    relatedGuideSlugs: ['best-electric-kettles'],
    relatedComparisonSlugs: [],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-18',
  },
  {
    id: 'demo-mixer-01',
    name: 'Example Mixer Grinder with 3 Jars',
    slug: 'example-mixer-grinder',
    categorySlug: 'home-kitchen',
    subcategorySlug: 'kitchen-appliances',
    shortDescription:
      'A three-jar mixer grinder placeholder covering the everyday Indian workload of masala, chutney and batter.',
    editorialSummary:
      'This entry represents the standard three-jar mixer grinder configuration. In Indian kitchens the jar set matters more than the motor rating on paper: a wet-grinding jar for batter, a medium jar for masala and chutney, and a small chutney jar. Motor noise and the availability of replacement jars and blades are the practical long-term concerns.',
    keyFeatures: [
      { label: 'Configuration', value: '3 jars (wet, dry/masala, chutney)' },
      { label: 'Typical motor', value: '500–750 W class' },
      { label: 'Best for', value: 'Daily masala, chutney and idli/dosa batter' },
      { label: 'Noise', value: 'Loud by nature — a real factor in flats' },
    ],
    whoItsFor: [
      'Households that grind fresh masala and chutney most days.',
      'Homes making batter weekly for idli, dosa or vada.',
      'Anyone replacing an ageing mixer whose jars are no longer available as spares.',
    ],
    whoMightSkip: [
      'People who only need occasional dry spice grinding — a small grinder is cheaper and quieter.',
      'Households with a strict noise constraint, such as a newborn at home or thin walls.',
    ],
    pros: [
      'Three-jar set covers nearly all everyday Indian grinding tasks.',
      'Widely available spare jars and blades for established brands.',
      'Handles both wet batter and dry spice work.',
    ],
    cons: [
      'Noise levels are high during operation.',
      'Heavier and bulkier than a single-jar grinder.',
      'Jar gaskets wear out and need periodic replacement.',
    ],
    considerations: [
      'Match motor rating to workload: heavy daily batter work needs a stronger motor than occasional chutney.',
      'Check whether the jars are stainless steel and whether lids seal properly under load.',
      'Confirm that replacement blades and gaskets are sold separately for the model you pick.',
      'Overload protection is worth having in homes with unstable voltage.',
    ],
    whyWePickedIt:
      'Added to the demo set to show how a category page groups multiple subcategories and how filters work across them.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-mixer-grinder.svg',
    imageAlt: 'Abstract placeholder illustration representing a three-jar mixer grinder. Demo artwork, not a product photograph.',
    tags: ['mixer grinder', 'masala', 'chutney', 'batter', 'kitchen appliance'],
    badges: [],
    relatedGuideSlugs: ['best-air-fryers-indian-kitchens'],
    relatedComparisonSlugs: [],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-15',
  },
  {
    id: 'demo-earbuds-01',
    name: 'Example Wireless Earbuds with ANC',
    slug: 'example-wireless-earbuds',
    categorySlug: 'electronics-gadgets',
    subcategorySlug: 'audio',
    shortDescription:
      'An everyday true-wireless earbud placeholder positioned around commute noise and call clarity.',
    editorialSummary:
      'This demo entry stands in for a mid-range true-wireless earbud with active noise cancellation. For Indian buyers the useful questions are narrower than the spec sheet suggests: how much of a bus or train drone the ANC actually removes, whether the microphone is intelligible on a noisy street call, and how long the buds last on a single charge during a two-hour commute each way.',
    keyFeatures: [
      { label: 'Type', value: 'True wireless, in-canal fit' },
      { label: 'Noise handling', value: 'Active noise cancellation (effectiveness varies)' },
      { label: 'Best for', value: 'Daily commuting, calls, podcasts and music' },
      { label: 'Fit', value: 'In-canal tips — comfort depends on ear shape' },
    ],
    whoItsFor: [
      'Daily commuters on trains, buses or two-wheelers who want less ambient drone.',
      'People who take a lot of calls on the move and need a usable microphone.',
      'Anyone replacing wired earphones that keep failing at the jack.',
    ],
    whoMightSkip: [
      'Listeners who find in-canal tips uncomfortable over long sessions — an open or semi-in-ear design may suit better.',
      'Anyone who needs to stay aware of traffic; heavy ANC can be unsafe while riding or crossing roads.',
      'Buyers prioritising pure sound quality per rupee — wired earphones often deliver more.',
    ],
    pros: [
      'No cable to tangle in a bag or catch on a helmet strap.',
      'ANC reduces low-frequency commute noise on most models in this class.',
      'Case charging extends total listening time across the day.',
    ],
    cons: [
      'Battery life degrades over a couple of years.',
      'Easy to lose one bud; replacements are rarely sold singly.',
      'Touch controls can trigger accidentally.',
    ],
    considerations: [
      'Check the single-charge runtime separately from the "total with case" figure that marketing leads with.',
      'Confirm whether transparency or ambient mode exists — useful at railway crossings and while ordering at a counter.',
      'Look at ear-tip sizes included; a poor seal removes most of the ANC benefit.',
      'Verify the warranty and service process in India before buying an import-only model.',
    ],
    whyWePickedIt:
      'Included because earbuds are among the most searched everyday electronics in India, and the demo shows how a product page handles a spec-heavy category without inventing numbers.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-earbuds.svg',
    imageAlt: 'Abstract placeholder illustration representing true wireless earbuds. Demo artwork, not a product photograph.',
    tags: ['wireless earbuds', 'anc', 'commute', 'audio'],
    badges: ['Commute pick'],
    relatedGuideSlugs: ['best-wireless-earbuds'],
    relatedComparisonSlugs: ['wireless-earbuds-comparison'],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-22',
  },
  {
    id: 'demo-powerbank-01',
    name: 'Example 20000 mAh Power Bank',
    slug: 'example-power-bank',
    categorySlug: 'electronics-gadgets',
    subcategorySlug: 'charging-power',
    shortDescription:
      'A high-capacity power bank placeholder aimed at long travel days and multi-device charging.',
    editorialSummary:
      'This entry represents the 20,000 mAh class of power bank. Capacity on paper is not what most buyers need to compare: output wattage determines whether it can actually fast-charge a modern phone, and the number of usable ports determines whether two people can share it on a train journey. Airline rules around rated capacity also matter for frequent flyers.',
    keyFeatures: [
      { label: 'Capacity class', value: '20000 mAh (rated capacity is lower)' },
      { label: 'Best for', value: 'Long travel days, two-device households' },
      { label: 'Ports', value: 'USB-A + USB-C on most models in this class' },
      { label: 'Air travel', value: 'Carry-on only, subject to airline limits' },
    ],
    whoItsFor: [
      'Frequent travellers on long train or road journeys.',
      'People who charge both a phone and earbuds or a watch away from home.',
      'Anyone in an area with regular power cuts who needs a buffer.',
    ],
    whoMightSkip: [
      'Light commuters — a 10,000 mAh unit is noticeably lighter and usually enough.',
      'Laptop users, unless the model explicitly supports high-wattage USB-C power delivery.',
    ],
    pros: [
      'Comfortably recharges a typical smartphone multiple times.',
      'Usually supports charging two devices at once.',
      'Useful buffer during travel and power cuts.',
    ],
    cons: [
      'Heavier and bulkier than smaller capacity models.',
      'Takes several hours to recharge the bank itself.',
      'Actual delivered capacity is always lower than the printed figure.',
    ],
    considerations: [
      'Look for the rated output capacity (Wh), not just mAh — that is the number airlines and real-world runtime depend on.',
      'Check whether the USB-C port supports input as well as output; otherwise you must charge the bank through a slower port.',
      'Confirm BIS certification for cells sold in India.',
      'Heat during fast charging shortens cell life; avoid leaving it in a parked car.',
    ],
    whyWePickedIt:
      'Used in the demo set to show how a product page presents technical considerations without stating unverified specifications.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-power-bank.svg',
    imageAlt: 'Abstract placeholder illustration representing a high-capacity power bank. Demo artwork, not a product photograph.',
    tags: ['power bank', 'travel', 'charging', 'usb-c'],
    badges: [],
    relatedGuideSlugs: ['best-wireless-earbuds'],
    relatedComparisonSlugs: [],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-12',
  },
  {
    id: 'demo-trimmer-01',
    name: 'Example Cordless Beard Trimmer',
    slug: 'example-cordless-trimmer',
    categorySlug: 'beauty-grooming',
    subcategorySlug: 'trimmers-shavers',
    shortDescription:
      'A cordless beard trimmer placeholder focused on length settings, runtime and easy blade cleaning.',
    editorialSummary:
      'This demo entry stands in for a cordless beard trimmer in the everyday home-use segment. The decisions that matter over months of use are practical: whether the length comb clicks securely at each setting, how the blade is cleaned, whether it can be used while plugged in when the battery runs out mid-trim, and how long a charge lasts.',
    keyFeatures: [
      { label: 'Type', value: 'Cordless / corded use (model dependent)' },
      { label: 'Best for', value: 'Regular beard and stubble maintenance at home' },
      { label: 'Length settings', value: 'Comb-based presets on most models' },
      { label: 'Cleaning', value: 'Brush-out or rinseable head (varies)' },
    ],
    whoItsFor: [
      'Anyone maintaining a beard or stubble weekly at home.',
      'Travellers who want a compact grooming kit without a salon visit.',
      'Households sharing one trimmer between family members.',
    ],
    whoMightSkip: [
      'People who need a clean shave rather than trimming — a shaver or razor is a different tool.',
      'Anyone wanting precise detailing work; a dedicated detail trimmer handles edges better.',
    ],
    pros: [
      'Cordless use is easier for reaching the neck and jawline.',
      'Combs make a consistent length repeatable between trims.',
      'Usually cheaper over time than regular salon visits.',
    ],
    cons: [
      'Battery capacity drops with age.',
      'Plastic combs can crack if dropped.',
      'Blades eventually dull and are not always replaceable.',
    ],
    considerations: [
      'Check whether the trimmer works while charging — very useful if you forget to top up.',
      'Confirm the shortest cutting length without a comb if you keep very short stubble.',
      'Look for a rinseable head only if you actually intend to wash it; most users brush it out.',
      'Charging time matters more than advertised runtime if you travel often.',
    ],
    whyWePickedIt:
      'Added to demonstrate the Beauty & Grooming category with copy that avoids any medical or performance claims.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-trimmer.svg',
    imageAlt: 'Abstract placeholder illustration representing a cordless beard trimmer. Demo artwork, not a product photograph.',
    tags: ['trimmer', 'beard', 'grooming', 'cordless'],
    badges: [],
    relatedGuideSlugs: [],
    relatedComparisonSlugs: [],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-10',
  },
  {
    id: 'demo-resistance-bands-01',
    name: 'Example Resistance Band Set (3 Bands)',
    slug: 'example-resistance-band-set',
    categorySlug: 'fitness',
    subcategorySlug: 'strength',
    shortDescription:
      'A loop resistance band set placeholder for strength work in a small home space.',
    editorialSummary:
      'This entry represents a three-band loop set in light, medium and heavy resistance. Bands are the most space-efficient strength equipment available for Indian homes — they store in a drawer, work on any floor, and let you load squats, rows and presses without a rack. The limiting factor is progressive overload: once the heaviest band becomes easy, you need something more.',
    keyFeatures: [
      { label: 'Set contents', value: '3 loop bands, light / medium / heavy (demo placeholder)' },
      { label: 'Best for', value: 'Home strength work, travel, rehab-style mobility' },
      { label: 'Storage', value: 'Fits in a drawer or a small pouch' },
      { label: 'Floor impact', value: 'None — safe for tiles and wood' },
    ],
    whoItsFor: [
      'Beginners building a habit at home without equipment investment.',
      'People in small apartments or shared rooms with no floor space.',
      'Travellers who want to keep training in a hotel room.',
    ],
    whoMightSkip: [
      'Intermediate lifters who already move significant weight — bands alone will not provide enough progression.',
      'Anyone wanting to train maximum strength; free weights or a gym membership is more suitable.',
    ],
    pros: [
      'Very low cost of entry compared with dumbbells or machines.',
      'Stores flat; no dedicated space needed.',
      'Joint-friendly resistance curve for many exercises.',
    ],
    cons: [
      'Limited maximum resistance for advanced training.',
      'Latex and TPE degrade with heat, sunlight and time.',
      'Resistance values printed on bands are rarely precise.',
    ],
    considerations: [
      'Check the material — natural latex is more durable than cheap TPE but not suitable for latex allergies.',
      'Inspect bands before every session; a nick can turn into a snap under load.',
      'Store away from direct sunlight, which is a real issue in Indian summers.',
      'A door anchor expands the exercise list significantly if you have a solid door frame.',
    ],
    whyWePickedIt:
      'Included to show a Fitness category product with honest limitation statements rather than transformation claims.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-resistance-bands.svg',
    imageAlt: 'Abstract placeholder illustration representing a set of loop resistance bands. Demo artwork, not a product photograph.',
    tags: ['resistance bands', 'home workout', 'strength', 'compact fitness'],
    badges: ['Small-space pick'],
    relatedGuideSlugs: ['best-home-workout-equipment'],
    relatedComparisonSlugs: [],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-21',
  },
  {
    id: 'demo-yoga-mat-01',
    name: 'Example Non-Slip Yoga Mat 6 mm',
    slug: 'example-yoga-mat',
    categorySlug: 'fitness',
    subcategorySlug: 'yoga-mobility',
    shortDescription:
      'A mid-thickness yoga mat placeholder for practice on tiled Indian floors.',
    editorialSummary:
      'This demo entry stands in for a 6 mm non-slip mat, the thickness that balances knee comfort against stability on hard tiled floors. Thinner mats feel more stable for standing balances; thicker mats protect joints during floor work but can make balancing poses wobbly. In a humid Indian climate, surface grip when slightly sweaty is the characteristic that separates a mat you keep using from one you roll away.',
    keyFeatures: [
      { label: 'Thickness class', value: '6 mm (demo placeholder)' },
      { label: 'Best for', value: 'Yoga, stretching, floor workouts on tiles' },
      { label: 'Surface', value: 'Textured, non-slip top layer' },
      { label: 'Care', value: 'Wipe down after use; air dry before rolling' },
    ],
    whoItsFor: [
      'Home practitioners working out directly on tile or marble floors.',
      'People doing bodyweight floor work, stretching or physiotherapy exercises.',
      'Anyone whose knees or wrists ache on a thin mat.',
    ],
    whoMightSkip: [
      'Practitioners focused on demanding standing balances who prefer a thinner, firmer surface.',
      'Hot-yoga practitioners with heavy sweat — a towel-on-mat setup or an absorbent mat surface works better.',
    ],
    pros: [
      'Cushions knees, wrists and spine on hard floors.',
      'Rolls up small enough to store behind a door.',
      'Defines a workout area in a shared room.',
    ],
    cons: [
      'Can feel unstable in deep balancing poses at this thickness.',
      'Cheap mats shed an initial odour and wear quickly.',
      'Absorbs sweat over time if not cleaned.',
    ],
    considerations: [
      'Check the material: TPE is lighter, PVC is more durable, natural rubber grips best but is heavier and smells initially.',
      'Confirm the length against your height — taller practitioners need more than the standard mat.',
      'A carry strap matters if you plan to take it to a class.',
      'Air mats out fully before the first use to reduce manufacturing odour.',
    ],
    whyWePickedIt:
      'Used in the demo set to show a second Fitness product and how subcategory filters behave with more than one item.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-yoga-mat.svg',
    imageAlt: 'Abstract placeholder illustration representing a rolled yoga mat. Demo artwork, not a product photograph.',
    tags: ['yoga mat', 'non-slip', 'home fitness', 'floor workout'],
    badges: [],
    relatedGuideSlugs: ['best-home-workout-equipment'],
    relatedComparisonSlugs: [],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-19',
  },
  {
    id: 'demo-study-lamp-01',
    name: 'Example LED Study Lamp with Adjustable Arm',
    slug: 'example-study-lamp',
    categorySlug: 'office-study',
    subcategorySlug: 'lighting',
    shortDescription:
      'A desk lamp placeholder for late-night study and work sessions in a shared room.',
    editorialSummary:
      'This entry represents an adjustable-arm LED desk lamp. For students and remote workers in India the practical requirements are narrow: enough light on the page without glare on a screen, a clamp or weighted base that suits the desk you actually have, and a colour temperature warm enough to use late at night without disturbing someone sleeping in the same room.',
    keyFeatures: [
      { label: 'Type', value: 'Adjustable-arm LED desk lamp' },
      { label: 'Best for', value: 'Reading, writing, late-night study' },
      { label: 'Mounting', value: 'Weighted base or desk clamp (varies by model)' },
      { label: 'Power', value: 'USB or adapter powered on most models' },
    ],
    whoItsFor: [
      'Students studying after household lights go off.',
      'Remote workers on evening calls who need task light without lighting the whole room.',
      'Anyone reading in bed who does not want to disturb a partner.',
    ],
    whoMightSkip: [
      'People who already have good ambient lighting and only need a screen — a monitor light bar may be a better fit.',
      'Buyers wanting a statement décor piece rather than a task light.',
    ],
    pros: [
      'Focused task light reduces eye strain compared with a single ceiling tube light.',
      'LED lamps draw very little power, useful during long sessions.',
      'Adjustable arms let you direct light away from a sleeping person.',
    ],
    cons: [
      'Cheap LED drivers can produce visible flicker.',
      'Clamp models need a desk edge of the right thickness.',
      'Fixed-colour models cannot shift from cool work light to warm evening light.',
    ],
    considerations: [
      'Look for adjustable colour temperature if you use the lamp for both work and evening reading.',
      'Check the arm reach against your desk depth.',
      'Flicker-free dimming matters for long study sessions; it is not always advertised.',
      'If powered by USB, confirm whether the adapter is included.',
    ],
    whyWePickedIt:
      'Added to the demo set to cover the Office & Study category with a genuinely useful, non-medical framing of lighting choices.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-study-lamp.svg',
    imageAlt: 'Abstract placeholder illustration representing an adjustable LED desk lamp. Demo artwork, not a product photograph.',
    tags: ['study lamp', 'desk lamp', 'led', 'student essentials'],
    badges: ['Student pick'],
    relatedGuideSlugs: ['best-desk-accessories'],
    relatedComparisonSlugs: ['desk-lamp-comparison'],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-17',
  },
  {
    id: 'demo-laptop-stand-01',
    name: 'Example Foldable Laptop Stand',
    slug: 'example-laptop-stand',
    categorySlug: 'office-study',
    subcategorySlug: 'ergonomics',
    shortDescription:
      'A foldable aluminium laptop stand placeholder that raises the screen to a more comfortable height.',
    editorialSummary:
      'This demo entry stands in for a foldable laptop riser. The purpose is posture and airflow rather than aesthetics: raising the screen reduces how far you tilt your head down, and lifting the base off the desk gives the machine more room to breathe during long work sessions in a warm room. The catch is that once the laptop is raised you will want an external keyboard and mouse, which is an extra cost to plan for.',
    keyFeatures: [
      { label: 'Type', value: 'Foldable, height-adjustable laptop riser' },
      { label: 'Best for', value: 'Desk work, video calls, long typing sessions' },
      { label: 'Portability', value: 'Folds flat for a bag' },
      { label: 'Airflow', value: 'Open base improves ventilation under the laptop' },
    ],
    whoItsFor: [
      'Remote workers using a laptop as their main machine for hours daily.',
      'Students attending long online classes.',
      'Anyone whose neck or shoulders ache after a day at a low screen.',
    ],
    whoMightSkip: [
      'People who work mostly from a couch or bed — a lap desk suits that better.',
      'Buyers unwilling to add an external keyboard; typing on a raised laptop is awkward.',
    ],
    pros: [
      'Raises the screen towards eye level for a more neutral neck position.',
      'Improves airflow under the machine.',
      'Folds flat and travels easily.',
    ],
    cons: [
      'Effectively requires an external keyboard and mouse.',
      'Typing directly on a raised laptop can feel unstable on lighter stands.',
      'Adds another item to the desk footprint.',
    ],
    considerations: [
      'Check the stated weight and size limit against your actual laptop.',
      'Rubber or silicone contact pads protect the chassis and stop sliding.',
      'Adjustable height beats fixed height if two people share the desk.',
      'Budget for a keyboard and mouse before buying the stand — the ergonomics gain depends on them.',
    ],
    whyWePickedIt:
      'Included to give the Office & Study category two entries and to demonstrate the "things to consider" block on a non-appliance product.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-laptop-stand.svg',
    imageAlt: 'Abstract placeholder illustration representing a foldable laptop stand. Demo artwork, not a product photograph.',
    tags: ['laptop stand', 'ergonomics', 'work from home', 'desk setup'],
    badges: [],
    relatedGuideSlugs: ['best-desk-accessories'],
    relatedComparisonSlugs: [],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-14',
  },
  {
    id: 'demo-hair-dryer-01',
    name: 'Example Ionic Hair Dryer 1200 W',
    slug: 'example-hair-dryer',
    categorySlug: 'beauty-grooming',
    subcategorySlug: 'hair-care-tools',
    shortDescription:
      'A compact hair dryer placeholder covering everyday home drying with multiple heat settings.',
    editorialSummary:
      'This entry represents a compact home hair dryer with two or three heat and speed settings. In Indian conditions the relevant trade-offs are heat control rather than raw power: a high-wattage dryer on the hottest setting is fast but harsh, and a cool-shot button is what lets you set a style rather than simply dry it. Weight matters too for people with long hair and a five-minute arm ache.',
    keyFeatures: [
      { label: 'Type', value: 'Compact AC/DC motor home dryer' },
      { label: 'Settings', value: 'Multiple heat and speed steps plus cool shot (model dependent)' },
      { label: 'Best for', value: 'Everyday drying at home, travel' },
      { label: 'Attachments', value: 'Concentrator nozzle on most models' },
    ],
    whoItsFor: [
      'People drying hair at home a few times a week.',
      'Travellers who want something lighter than a salon-grade dryer.',
      'Households sharing a single grooming appliance.',
    ],
    whoMightSkip: [
      'Anyone styling with a round brush daily — a dryer with a stronger motor and a diffuser attachment is more suitable.',
      'Buyers with very thick, long hair who need maximum airflow.',
    ],
    pros: [
      'Light enough for one-handed use.',
      'Cool-shot button helps set a style after drying.',
      'Compact size is easy to store and pack.',
    ],
    cons: [
      'Lower airflow means longer drying time for thick hair.',
      'Fixed cords tangle in shared storage.',
      'Heat settings on budget models are coarse.',
    ],
    considerations: [
      'Use the lowest heat setting that dries your hair in acceptable time; sustained high heat is hard on hair.',
      'Check whether a concentrator nozzle is included — it makes a real difference to control.',
      'Look for a removable rear filter that you can actually clean of lint.',
      'Confirm the cord length against your bathroom or dressing-table socket position.',
    ],
    whyWePickedIt:
      'Added so the Beauty & Grooming category has two demo entries and to show how the site handles personal-care products without making result claims.',
    price: null,
    priceNote: 'Demo entry — no live price published.',
    priceVerifiedOn: null,
    asin: null,
    amazonUrl: '#',
    image: '/images/products/demo-hair-dryer.svg',
    imageAlt: 'Abstract placeholder illustration representing a compact hair dryer. Demo artwork, not a product photograph.',
    tags: ['hair dryer', 'grooming', 'ionic', 'home use'],
    badges: [],
    relatedGuideSlugs: [],
    relatedComparisonSlugs: [],
    isDemo: true,
    status: 'draft',
    updatedAt: '2026-09-11',
  },
];

export const products = IS_DEMO_CONTENT
  ? productData
  : productData.filter((p) => p.status === 'published' && !p.isDemo);

/* -------------------------------------------------------------------------- */
/* Lookups                                                                    */
/* -------------------------------------------------------------------------- */

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug) || null;
export const getProductById = (id) => products.find((p) => p.id === id) || null;
export const getProductsByCategory = (categorySlug) =>
  products.filter((p) => p.categorySlug === categorySlug);
export const getProductsBySubcategory = (categorySlug, subcategorySlug) =>
  products.filter(
    (p) => p.categorySlug === categorySlug && p.subcategorySlug === subcategorySlug,
  );

/** Products flagged for the homepage grid. */
export const featuredProducts = products.filter((p) => (p.badges || []).length > 0);

/** Resolve an array of product slugs into full records, ignoring misses. */
export const resolveProducts = (slugs = []) =>
  slugs.map((slug) => getProductBySlug(slug)).filter(Boolean);

/** Most recently updated products first. */
export const productsByRecency = [...products].sort((a, b) =>
  String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')),
);
