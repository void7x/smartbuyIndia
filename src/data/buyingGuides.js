import { IS_DEMO_CONTENT } from '../config/content.js';

/**
 * ============================================================================
 * BUYING GUIDES  —  ⚠ DEMO DATA LAYER
 * ============================================================================
 * Structured, long-form editorial pages. The shape below is intentionally
 * explicit: each block is rendered by <GuideRenderer />, so adding a guide is
 * a single object in this array — no new component, no new route.
 *
 * HOW TO ADD A REAL GUIDE
 *   1. Add an object with a unique `slug` (this becomes the URL: /guide/<slug>).
 *   2. Fill in the content blocks you need — any block can be omitted or left
 *      as an empty array and it simply won't render.
 *   3. Link real products via `productSlugs` (they must exist in products.js).
 *   4. Set `isDemo: false` and `status: 'published'`.
 *
 * Editorial rules baked into this data model:
 *   • No ratings, scores or rankings — use `label` (e.g. "Best for small
 *     kitchens") which must be justified in `why`.
 *   • No medical, safety or performance guarantees.
 *   • `updatedAt` must reflect real edits so Article schema stays honest.
 * ============================================================================
 */

const guideData = [
  {
    id: 'guide-air-fryers',
    title: 'Best Air Fryers for Indian Kitchens',
    slug: 'best-air-fryers-indian-kitchens',
    categorySlug: 'home-kitchen',
    heroTitle: 'Choosing an air fryer that fits an Indian kitchen',
    metaDescription:
      'How to choose an air fryer for an Indian home: capacity by family size, socket and wattage checks, cleaning realities, and what to avoid before you buy.',
    intro: [
      'Air fryers have moved from novelty to a common appliance on Indian kitchen platforms, largely because they handle two everyday jobs well: roasting vegetables with very little oil, and reheating fried snacks so they stay crisp instead of turning soggy in a microwave.',
      'They are not magic. An air fryer is a small convection oven with a fast fan, which means it behaves like one — it cooks in batches, it needs rear clearance, and it draws enough current that your socket matters.',
      'This guide explains the decisions in the order you will actually face them at a store shelf or on a product page, so you can narrow a long list down to two or three sensible options.',
    ],
    readingTimeMinutes: 7,
    whatToLookFor: [
      {
        title: 'Capacity, matched to how you actually cook',
        body: 'Basket capacity is quoted in litres, but the number that matters is portions per batch. As a rough planning guide, a 3–4 L basket suits one to three people, 5–6 L suits a family of four cooking in a single batch, and anything above that starts to behave like a small oven. Buy for your largest typical meal, not your average one.',
      },
      {
        title: 'Wattage versus your home wiring',
        body: 'Most air fryers run between 1200 W and 1800 W. That is comparable to a kettle or an iron. In older buildings with shared extension boards or thin wiring, running one alongside a microwave or a fridge compressor on the same circuit is asking for trouble. Plan for a dedicated wall socket, ideally a 15 A one for larger models.',
      },
      {
        title: 'Basket versus oven-style',
        body: 'Basket models are simpler, cheaper and easier to wash — the basket and a tray are usually the only parts needing attention. Oven-style units with shelves can toast, bake and dehydrate, and let you cook two things at once, but they take up considerably more counter space and take longer to clean. If your primary job is roasting and reheating, a basket model is usually the better fit.',
      },
      {
        title: 'Controls you will not fight with',
        body: 'Manual dials are cheap, obvious and rarely break. Digital panels offer presets and precise temperature, but presets are mostly marketing — you will learn your own times for your own food within a week. What does matter is whether the display is readable in bright kitchen light and whether the buttons respond with wet hands.',
      },
      {
        title: 'Cleaning reality',
        body: 'Assume you will hand-wash everything. Check the basket mouth width, whether the tray lifts out cleanly, and whether the non-stick coating is described as PFOA-free by the manufacturer. Also check the fan and rear vent — grease mist settles there, and units with an accessible rear panel stay cleaner over years.',
      },
      {
        title: 'Spares and service in India',
        body: 'The most common failure over time is a worn non-stick basket, not the motor. Brands that sell replacement baskets and trays separately in India will save you from replacing a perfectly working appliance. Confirm this before you buy, not after.',
      },
    ],
    keySpecs: [
      {
        name: 'Basket capacity',
        why: 'Decides how many portions you cook per batch — the single most important number.',
        typical: '3 L to 8 L; 4–5.5 L covers most households',
      },
      {
        name: 'Power rating',
        why: 'Affects heating speed and, more importantly, what your socket and wiring must handle.',
        typical: '1200 W – 1800 W for home models',
      },
      {
        name: 'Temperature range',
        why: 'Wider ranges allow slow roasting as well as high-heat crisping.',
        typical: '80 °C – 200 °C',
      },
      {
        name: 'Timer',
        why: 'An auto cut-off timer is what makes it safe to walk away mid-cook.',
        typical: '30 – 60 minutes',
      },
      {
        name: 'Basket coating',
        why: 'Determines how easily food releases and how long the basket stays usable.',
        typical: 'Non-stick; check manufacturer statements on PFOA',
      },
      {
        name: 'Footprint and vent clearance',
        why: 'Decides whether it can live permanently on your platform.',
        typical: 'Allow 10–15 cm behind the unit',
      },
    ],
    productSlugs: ['example-air-fryer', 'example-family-air-fryer'],
    picks: [
      {
        productSlug: 'example-air-fryer',
        label: 'Best for small kitchens and 1–3 people',
        why: 'The compact-basket segment keeps the footprint small enough to leave on a platform permanently, and a 3.5 L capacity matches a single-batch meal for a couple without heating a large cavity every time.',
        watchOuts: [
          'You will cook in multiple batches for four or more people.',
          'Smaller baskets fill up quickly with bulky items like whole vegetables.',
        ],
      },
      {
        productSlug: 'example-family-air-fryer',
        label: 'Best for a family of four cooking in one batch',
        why: 'Larger baskets remove the batch problem entirely for a family meal, which is usually the deciding factor for households that cook together rather than one person at a time.',
        watchOuts: [
          'Needs a permanent corner of the platform and a suitably rated socket.',
          'A loaded basket is heavy; check the handle design.',
        ],
      },
    ],
    comparisonSlug: 'air-fryer-comparison',
    thingsToAvoid: [
      'Buying purely on preset count. Presets are convenience labels, not capability — two settings you use beat eight you never touch.',
      'Ignoring the socket. A 1700 W appliance on a multi-plug extension board shared with a refrigerator is a genuine electrical risk.',
      'Choosing the largest capacity you can afford. Oversized units are slower to heat, harder to store and more awkward to wash.',
      'Assuming air-fried food is automatically healthy. It reduces the oil used for crisping; the food itself still determines the nutrition.',
      'Skipping the spares check. If replacement baskets are not sold in India, the appliance has a shorter practical life.',
    ],
    faqs: [
      {
        question: 'Is an air fryer worth buying for an Indian household?',
        answer:
          'It is worth it if you regularly roast vegetables, make crispy snacks with less oil, or reheat fried food without making it soggy. If your cooking is mostly gravies, rotis and rice, a good kadhai and a convection microwave may serve you better for the same money.',
      },
      {
        question: 'How much electricity does an air fryer use?',
        answer:
          'Home models are typically rated between 1200 W and 1800 W, but they run in short cycles with the element switching on and off. A 20-minute cook on a 1500 W unit draws considerably less than 0.5 kWh in practice, which is usually cheaper than heating a full-size oven for the same job.',
      },
      {
        question: 'Can I use aluminium foil or parchment paper in an air fryer?',
        answer:
          'Many manufacturers allow foil or parchment inside the basket, but you must follow the instructions for your specific model. Loose foil can be lifted by the fan into the heating element, so it always needs to be weighed down by food and kept clear of the top element.',
      },
      {
        question: 'Air fryer or OTG — which should I buy first?',
        answer:
          'An air fryer is better for fast crisping, roasting small portions and reheating. An OTG is better for baking cakes, toasting multiple bread slices and cooking larger volumes at once. If you can only buy one, decide which of those jobs you do more often.',
      },
      {
        question: 'Does air frying make food taste like deep frying?',
        answer:
          'No, and any claim that it does exactly should be treated sceptically. It produces a similar dry, crisp exterior on many foods with far less oil, but the mouthfeel of deep-fried food is different. Judging it as a roaster that crisps well is a fairer expectation.',
      },
    ],
    finalThoughts: [
      'Start with capacity and sockets — those two constraints eliminate most of the catalogue. Then decide basket versus oven style based on whether you want to bake as well as roast.',
      'Everything beyond that is comfort: control layout, basket handle, noise, and whether spares are available. Spend a little more for a basket you can actually replace in two years rather than for presets you will never use.',
    ],
    updatedAt: '2026-09-25',
    author: 'SmartBuyIndia Editorial',
    isDemo: true,
    status: 'draft',
  },
  {
    id: 'guide-earbuds',
    title: 'Best Wireless Earbuds for Everyday Use',
    slug: 'best-wireless-earbuds',
    categorySlug: 'electronics-gadgets',
    heroTitle: 'Picking wireless earbuds for a noisy Indian commute',
    metaDescription:
      'A practical guide to choosing wireless earbuds in India: fit and seal, real battery runtime, ANC expectations, call quality on the street, and service considerations.',
    intro: [
      'Wireless earbuds are one of the most searched everyday electronics in India, and one of the most inconsistently reviewed. Specification sheets are dominated by numbers that do not predict whether you will still be using the pair in a year.',
      'For most buyers the deciding factors are unglamorous: whether the tips seal in your ears, how long a single charge lasts on your actual commute, whether the microphone is intelligible on a busy street, and what happens when one bud stops working.',
      'This guide works through those factors in the order they affect daily use.',
    ],
    readingTimeMinutes: 6,
    whatToLookFor: [
      {
        title: 'Fit and seal before everything else',
        body: 'Active noise cancellation, bass response and sound isolation all depend on the tip forming a seal in your ear canal. If the included tip sizes do not suit you, no amount of tuning will fix it. Check how many tip sizes ship in the box, and whether the model has a fit test in its companion app.',
      },
      {
        title: 'Two battery numbers, not one',
        body: 'Marketing leads with the total figure including the case — often 30 hours or more. The number that matters daily is runtime on a single charge, typically 4 to 8 hours. Compare that against your commute plus your workday. Also check how long the case itself takes to recharge.',
      },
      {
        title: 'What ANC realistically does',
        body: 'Active noise cancellation is genuinely good at removing steady low-frequency drone: a train, a bus engine, an aircraft cabin. It is far weaker against sudden, sharp or unpredictable sounds like horns, announcements and conversation. Judging ANC on a commute rather than in a quiet room gives you an accurate expectation.',
      },
      {
        title: 'Transparency or ambient mode',
        body: 'The ability to let outside sound in without removing a bud matters more in India than the specification sheet suggests — at railway crossings, while ordering at a counter, while crossing a road on foot. Confirm the mode exists and that it is reachable from a physical control.',
      },
      {
        title: 'Call quality in real noise',
        body: 'Multiple microphones and "AI noise cancellation" claims are not a guarantee. Look for models with an ENC or beamforming microphone described for calls, and treat call quality as a distinct purchase criterion if you take work calls on the move.',
      },
      {
        title: 'Controls you can operate one-handed',
        body: 'Capacitive touch controls misfire in a helmet or when you adjust the bud. Physical buttons, or a squeeze-style stem, are more reliable on a two-wheeler or in a crowded local. Check whether controls are customisable in the app.',
      },
      {
        title: 'Warranty, service and spare parts',
        body: 'A single dead bud effectively ends the life of the pair unless the brand sells replacements. Check the warranty period offered in India, whether service centres exist in your city, and whether the case can be replaced separately.',
      },
    ],
    keySpecs: [
      {
        name: 'Driver size',
        why: 'Quoted in millimetres, but it is a poor predictor of sound quality on its own — tuning matters more.',
        typical: '6 mm – 13 mm',
      },
      {
        name: 'Single-charge runtime',
        why: 'The number that determines whether the buds survive your day.',
        typical: '4 – 8 hours, less with ANC on',
      },
      {
        name: 'Total runtime with case',
        why: 'Useful for travel, not for daily planning.',
        typical: '20 – 40 hours',
      },
      {
        name: 'Bluetooth version and codecs',
        why: 'Affects connection stability and, with supported codecs, audio quality on compatible phones.',
        typical: 'Bluetooth 5.2+; SBC/AAC universally, LDAC/aptX on some models',
      },
      {
        name: 'Water and sweat resistance',
        why: 'Determines whether the buds survive monsoon rain and gym sessions.',
        typical: 'IPX4 or higher is a sensible minimum',
      },
      {
        name: 'Charging interface',
        why: 'USB-C avoids carrying a second cable; wireless charging is a convenience, not a necessity.',
        typical: 'USB-C, some with Qi wireless charging',
      },
    ],
    productSlugs: ['example-wireless-earbuds'],
    picks: [
      {
        productSlug: 'example-wireless-earbuds',
        label: 'Best for daily commuting and calls',
        why: 'The in-canal ANC segment is where commute-drone reduction and usable call microphones meet at a reasonable price, which covers the two jobs most Indian buyers actually need.',
        watchOuts: [
          'Comfort over multi-hour sessions varies a lot by ear shape — try the tip sizes.',
          'Heavy ANC reduces situational awareness, which is a safety issue on two-wheelers.',
        ],
      },
    ],
    comparisonSlug: 'wireless-earbuds-comparison',
    thingsToAvoid: [
      'Chasing driver size or "studio-tuned" claims instead of fit. A poor seal beats any tuning advantage.',
      'Assuming the total-with-case figure is your daily runtime. It never is.',
      'Buying ANC for traffic safety. It reduces drone; it does not make you aware of horns behind you.',
      'Ignoring the app. Equaliser settings, firmware updates and control remapping all live there, and a poor app undermines good hardware.',
      'Choosing an import-only model with no Indian warranty. Replacement of a single bud is rarely economical without one.',
    ],
    faqs: [
      {
        question: 'Do wireless earbuds damage hearing?',
        answer:
          'Any earphone can contribute to hearing strain at high volumes over long periods, wireless or not. The relevant habit is volume and duration rather than the connection type. Lower volume with a good seal often sounds better than a higher volume with a poor one.',
      },
      {
        question: 'Is ANC worth paying extra for in India?',
        answer:
          'It is worth it if you commute on trains, buses or flights regularly, because that is exactly the steady low-frequency noise ANC handles well. It is a poor justification on a two-wheeler, where you need to hear traffic, or if you mostly listen at a desk.',
      },
      {
        question: 'Can I replace just one earbud if it stops working?',
        answer:
          'Some brands sell single-bud replacements, many do not. If the pair is out of warranty and replacement buds are unavailable, the whole set usually has to be replaced. Check this policy before buying.',
      },
      {
        question: 'How long do wireless earbud batteries last?',
        answer:
          'Lithium cells in small buds typically lose noticeable capacity after two to three years of daily charge cycles. Keeping the buds away from extreme heat — a parked car in an Indian summer is the worst case — slows that degradation.',
      },
      {
        question: 'Which codec should I care about?',
        answer:
          'Most phones and buds work fine with SBC or AAC, which is what the majority of streaming uses. LDAC and aptX matter if your phone supports them and you listen to high-bitrate sources. For podcasts, calls and streaming music, fit and tuning make a far larger difference.',
      },
    ],
    finalThoughts: [
      'Shortlist by fit and single-charge runtime first, then decide whether ANC is a genuine need for your commute rather than a specification you are paying for.',
      'Finally, check the Indian warranty and single-bud replacement policy. Earbuds are small, easy to lose and have a finite battery life — the after-sales policy is part of the product.',
    ],
    updatedAt: '2026-09-24',
    author: 'SmartBuyIndia Editorial',
    isDemo: true,
    status: 'draft',
  },
  {
    id: 'guide-kettles',
    title: 'Best Electric Kettles for Home & Office',
    slug: 'best-electric-kettles',
    categorySlug: 'home-kitchen',
    heroTitle: 'Electric kettles for chai, coffee and the office pantry',
    metaDescription:
      'How to choose an electric kettle in India: capacity for home versus office, hard-water descaling, double-wall safety, wattage and what to avoid.',
    intro: [
      'An electric kettle is one of the cheapest appliances that measurably saves time, because it boils a given volume of water faster and more efficiently than a pan on a gas stove.',
      'The differences between models matter in specific situations: a shared office pantry has different needs from a home used twice a day, and hard-water cities impose a maintenance burden that a wide-mouth design makes far more manageable.',
      'This guide covers capacity, material, safety features and the maintenance reality of Indian water.',
    ],
    readingTimeMinutes: 5,
    whatToLookFor: [
      {
        title: 'Capacity by usage pattern',
        body: 'For one to two people, 1.0–1.5 L is enough and boils faster. A family of four making chai twice a day is better served by 1.7–1.8 L. Shared office pantries need 1.8 L or more, and often benefit from a second unit rather than one large one that everyone queues behind.',
      },
      {
        title: 'Body material',
        body: 'Stainless steel is durable, does not retain flavours and survives knocks in a shared pantry. Glass lets you see the water level and looks better, but is fragile and shows scale quickly. Plastic bodies are light and cheap; look for food-grade, BPA-free statements from the manufacturer if you choose one. Double-wall designs keep the outside cool to touch, which is the single best safety feature around children.',
      },
      {
        title: 'Wide mouth and removable filter',
        body: 'In hard-water areas, scale build-up is inevitable. A wide opening you can fit a hand or brush into, plus a removable spout filter, turns descaling from a chore into a two-minute job. Sealed narrow-neck designs look better and age worse.',
      },
      {
        title: 'Wattage and boil time',
        body: 'Most home kettles are 1500–2200 W. Higher wattage boils faster but draws more current — relevant in offices on a shared circuit and in homes with unstable voltage. A 1500 W kettle is usually the safer choice for older wiring.',
      },
      {
        title: 'Auto shut-off and boil-dry protection',
        body: 'Both are standard on decent models and both matter. Auto shut-off prevents a boiled kettle from continuing to draw power; boil-dry protection cuts power if the kettle is switched on empty, which happens more often than anyone admits in a shared pantry.',
      },
      {
        title: 'Variable temperature, if you actually need it',
        body: 'Green tea, filter coffee decoction and infant formula all want different temperatures. A variable-temperature or keep-warm kettle is a genuine upgrade if you brew seriously — an unnecessary cost if you mostly make chai, which is boiled anyway.',
      },
    ],
    keySpecs: [
      {
        name: 'Capacity',
        why: 'Matches the kettle to your household or pantry size.',
        typical: '0.8 L – 2.0 L',
      },
      {
        name: 'Power rating',
        why: 'Sets boil speed and the load on your circuit.',
        typical: '1500 W – 2200 W',
      },
      {
        name: 'Body material',
        why: 'Durability, heat retention and how the outside feels to touch.',
        typical: 'Stainless steel, glass, double-wall insulated',
      },
      {
        name: 'Heating element',
        why: 'Concealed elements are easier to clean and less prone to scale damage.',
        typical: 'Concealed stainless steel base',
      },
      {
        name: 'Safety features',
        why: 'Auto shut-off and boil-dry protection are the two that matter.',
        typical: 'Both standard on quality models',
      },
      {
        name: 'Cord and base',
        why: 'A 360° cordless base and cord storage make daily use much easier.',
        typical: 'Detachable base, 0.7 – 1 m cord',
      },
    ],
    productSlugs: ['example-electric-kettle'],
    picks: [
      {
        productSlug: 'example-electric-kettle',
        label: 'Best all-round choice for home and shared use',
        why: 'A 1.8 L stainless steel kettle with a wide mouth covers the largest number of Indian use cases — family chai, hostel cooking and a shared office pantry — while staying easy to descale in hard-water cities.',
        watchOuts: [
          'Single-wall steel bodies get hot on the outside; keep away from children.',
          'No temperature control on basic models, so it is not ideal for delicate brewing.',
        ],
      },
    ],
    comparisonSlug: null,
    thingsToAvoid: [
      'Buying on appearance alone. A stylish narrow-neck kettle that cannot be cleaned becomes unusable within months in hard water.',
      'Using a kettle to cook food. Some models are marketed for noodles; if yours is not explicitly designed for it, do not.',
      'Ignoring cord length. A short cord forces you to place the kettle next to the socket, which is often the wrong end of the counter.',
      'Choosing maximum wattage in an old building. Faster boils are not worth nuisance tripping.',
      'Assuming "BPA-free plastic" is equivalent to steel. It is a different durability and flavour profile, not just a label.',
    ],
    faqs: [
      {
        question: 'How do I descale a kettle in a hard-water city?',
        answer:
          'Fill the kettle with a mix of water and white vinegar or a dissolved citric acid solution, bring it to a boil, leave it for 15–20 minutes, then rinse thoroughly and boil a fresh batch of clean water to remove any taste. Doing this every few weeks keeps the element efficient.',
      },
      {
        question: 'Is a steel kettle better than a glass one?',
        answer:
          'For durability and shared use, yes — steel survives knocks and hides scale better. Glass is easier to judge water level visually and does not retain any taste, but it is fragile and shows limescale immediately.',
      },
      {
        question: 'Can I leave water in the kettle between uses?',
        answer:
          'It is better to empty it. Standing water accelerates scale deposits on the element and, in a warm kitchen, is not hygienic over long periods. Rinsing and leaving the lid open keeps it fresher.',
      },
      {
        question: 'Does a kettle use less electricity than boiling on a gas stove?',
        answer:
          'For the same volume, an electric kettle is generally more efficient because the heating element sits directly in the water and the vessel is enclosed, whereas a stove loses a lot of heat to the surrounding air. The comparison against induction is closer.',
      },
    ],
    finalThoughts: [
      'Choose capacity first, then a body you can actually clean, then safety features if children or colleagues are around.',
      'Variable temperature control is the only upgrade worth paying extra for, and only if you brew at specific temperatures rather than making chai.',
    ],
    updatedAt: '2026-09-22',
    author: 'SmartBuyIndia Editorial',
    isDemo: true,
    status: 'draft',
  },
  {
    id: 'guide-home-workout',
    title: 'Best Home Workout Equipment for Small Spaces',
    slug: 'best-home-workout-equipment',
    categorySlug: 'fitness',
    heroTitle: 'Building a home setup that survives an Indian apartment',
    metaDescription:
      'How to choose home workout equipment for small Indian apartments: resistance bands, mats, adjustable dumbbells and skipping ropes, with storage and floor considerations.',
    intro: [
      'Training at home works or fails on two things that have nothing to do with the exercises: whether the equipment stays accessible, and whether your floor and neighbours tolerate it.',
      'In a typical Indian apartment that means a small footprint, something that stores away in minutes, low impact noise transmission, and materials that survive heat and humidity.',
      'This guide prioritises equipment by how much consistent use it enables per rupee and per square foot, rather than by how impressive it looks.',
    ],
    readingTimeMinutes: 6,
    whatToLookFor: [
      {
        title: 'Storage footprint beats maximum capability',
        body: 'Equipment that stays out gets used; equipment that requires fifteen minutes to assemble gets abandoned. Prefer items that hang on a hook, roll behind a door or fit in a drawer. This single criterion eliminates most large machines for apartment living.',
      },
      {
        title: 'Noise transmission to floors below',
        body: 'Dropping weights, jumping rope and high-impact burpees all travel through a slab. If you live above someone, choose low-impact equipment and a thick mat, and avoid anything that lands heavily. This is a social constraint, not just a comfort one.',
      },
      {
        title: 'Heat and humidity tolerance',
        body: 'Latex degrades in direct sunlight, foam absorbs sweat, steel rusts in a coastal city like Mumbai, and cheap plastic becomes brittle. Store equipment away from windows and wipe it down after every session — this doubles the life of most items.',
      },
      {
        title: 'Progression path',
        body: 'A purchase is only worth it if you can get stronger with it. Resistance bands cap out relatively early; adjustable dumbbells have a much longer useful life. Ask, before buying, what the next step up looks like when the current one becomes easy.',
      },
      {
        title: 'Floor protection',
        body: 'Tiles and marble chip, wood dents and both stain with sweat. A mat is not optional — it is the cheapest insurance in the whole setup, and it also defines your workout area in a shared room.',
      },
    ],
    keySpecs: [
      {
        name: 'Stored size',
        why: 'Decides whether the equipment stays in daily use.',
        typical: 'Bands and ropes: drawer-sized. Mats: rolled. Dumbbells: a shelf.',
      },
      {
        name: 'Material',
        why: 'Determines durability in Indian heat, humidity and sunlight.',
        typical: 'Natural latex, TPE, foam, coated steel',
      },
      {
        name: 'Resistance or weight range',
        why: 'Sets how long the item supports progression.',
        typical: 'Bands 5–50 lb equivalents; adjustable dumbbells 2–24 kg per hand',
      },
      {
        name: 'Impact and noise level',
        why: 'A constraint in multi-storey buildings.',
        typical: 'Bands and dumbbells: low. Rope skipping: high.',
      },
      {
        name: 'Mat thickness',
        why: 'Balances joint comfort against stability on hard floors.',
        typical: '4 mm – 8 mm for yoga and floor work',
      },
    ],
    productSlugs: ['example-resistance-band-set', 'example-yoga-mat'],
    picks: [
      {
        productSlug: 'example-resistance-band-set',
        label: 'Best starting point for a small apartment',
        why: 'A three-band loop set costs little, stores in a drawer, works on any floor and produces no impact noise — the highest ratio of usable training to space consumed of anything on this list.',
        watchOuts: [
          'Resistance caps out for intermediate lifters.',
          'Latex degrades in sunlight and needs inspection before every session.',
        ],
      },
      {
        productSlug: 'example-yoga-mat',
        label: 'Best foundation for floor work',
        why: 'A 6 mm non-slip mat protects joints on tiled floors, keeps sweat off the surface below and defines a training area in a shared room — which makes consistent practice far more likely.',
        watchOuts: [
          'Thicker mats feel wobbly in demanding standing balances.',
          'Cheap mats shed an odour initially and wear out quickly.',
        ],
      },
    ],
    comparisonSlug: null,
    thingsToAvoid: [
      'Buying a large machine first. Treadmills and multi-gyms are the most commonly abandoned equipment in Indian homes, largely because of space and noise.',
      'Skipping the mat to save money. It protects your joints, your floor and your relationship with the neighbours.',
      'Ignoring the ceiling height for overhead work. Press movements need more clearance than most people measure.',
      'Buying a fixed-weight dumbbell set with no progression plan. You will outgrow the light pair and be stuck with the heavy one.',
      'Storing latex bands near a window. Indian sun will shorten their life dramatically.',
      'Assisting any medical condition with exercise equipment based on internet advice — speak to a qualified professional about injuries or health conditions.',
    ],
    faqs: [
      {
        question: 'What is the minimum equipment for a complete home workout?',
        answer:
          'A mat plus a resistance band set covers pushing, pulling, squatting and hinging movements for a beginner. Adding one adjustable dumbbell pair extends that progression considerably. Anything beyond that is refinement.',
      },
      {
        question: 'Are resistance bands as effective as dumbbells?',
        answer:
          'They provide a different resistance curve — tension increases as the band stretches — which works well for many movements but is harder to progress precisely. For beginners they are comparable in effect; for advanced strength work, free weights have a much higher ceiling.',
      },
      {
        question: 'Will skipping rope disturb neighbours below?',
        answer:
          'Very likely, yes, unless you use a thick mat and land softly. Repeated impact transmits through a concrete slab efficiently. If you live above someone, choose low-impact cardio instead, or restrict jumping to daytime hours.',
      },
      {
        question: 'How thick should a yoga mat be?',
        answer:
          'Around 4–6 mm suits most home practice on tiled floors: enough cushioning for knees and wrists while staying stable for standing poses. Above 8 mm starts to feel unstable in balancing postures and is aimed at therapeutic or restorative use.',
      },
      {
        question: 'Is home training enough to build strength long term?',
        answer:
          'For beginners and intermediate trainees, yes, provided the load keeps increasing. Beyond that point, progressive overload at home requires either heavier adjustable dumbbells or a gym, because bands and bodyweight eventually stop providing enough stimulus.',
      },
    ],
    finalThoughts: [
      'Buy in this order: mat, bands, then one adjustable dumbbell pair. That sequence covers most training needs for well under the cost of a single machine.',
      'Before each purchase, answer two questions honestly — where will it live when not in use, and what does the next progression step look like.',
    ],
    updatedAt: '2026-09-23',
    author: 'SmartBuyIndia Editorial',
    isDemo: true,
    status: 'draft',
  },
  {
    id: 'guide-desk-accessories',
    title: 'Best Desk Accessories for Students & Professionals',
    slug: 'best-desk-accessories',
    categorySlug: 'office-study',
    heroTitle: 'A calmer, more comfortable desk in a shared Indian room',
    metaDescription:
      'How to build a productive desk setup in India: task lighting, laptop stands, cable management and organisation for small shared rooms, with practical buying checks.',
    intro: [
      'Most Indian home desks are not dedicated rooms. They are a corner of a bedroom, a dining table reclaimed after meals, or a shared study area where someone else may be sleeping a metre away.',
      'That changes what good accessories mean. The priorities become light that does not disturb others, a screen height that does not hurt your neck after six hours, and organisation that can be cleared away in under a minute.',
      'This guide covers the accessories that genuinely change how a desk feels to use, and the ones that only change how it looks.',
    ],
    readingTimeMinutes: 6,
    whatToLookFor: [
      {
        title: 'Task lighting, not more room lighting',
        body: 'A single ceiling tube light produces glare on screens and shadows on paper at the same time. A directed task lamp with adjustable colour temperature solves both: cool light for focused work, warm light for evening reading, and a beam you can point away from a sleeping person.',
      },
      {
        title: 'Screen height and the keyboard that follows',
        body: 'Raising a laptop screen towards eye level reduces how far your neck flexes over a long session. The trade-off is that typing on a raised laptop is awkward, so a stand only pays off if you also add an external keyboard and mouse. Budget for all three together or none.',
      },
      {
        title: 'Flicker and glare on long sessions',
        body: 'Cheap LED drivers can produce flicker that is not consciously visible but is tiring over hours. Look for lamps described as flicker-free, and position any light source so it does not reflect off your screen into your eyes.',
      },
      {
        title: 'Cable management that survives daily unplugging',
        body: 'In a shared or temporary setup, cables get disconnected constantly. Simple solutions — a clip strip on the desk edge, a velcro tie bundle, a small power strip mounted under the desk — outlast elaborate trays that you have to dismantle to reach anything.',
      },
      {
        title: 'Organisation you can clear in a minute',
        body: 'If your desk doubles as a dining table or a family surface, everything has to be put away quickly. A single caddy for pens, cables and a notebook beats five separate organisers, because it moves as one object.',
      },
      {
        title: 'Chair and back support first',
        body: 'No desk accessory compensates for a bad seat. If your budget is limited, a lumbar support cushion for the chair you already own does more for a six-hour session than any gadget on the desk.',
      },
    ],
    keySpecs: [
      {
        name: 'Lamp colour temperature range',
        why: 'Cool light for work, warm light for evening use without disturbing others.',
        typical: '2700 K – 6500 K adjustable on better models',
      },
      {
        name: 'Lamp brightness steps',
        why: 'Fine dimming lets you match ambient light rather than choose between glare and darkness.',
        typical: '3 – 10 steps or stepless dimming',
      },
      {
        name: 'Stand height range and weight limit',
        why: 'Must suit your laptop size and your seated eye level.',
        typical: 'Adjustable 6–20 cm; limits often 4–8 kg',
      },
      {
        name: 'Stand contact surface',
        why: 'Silicone or rubber pads protect the chassis and stop sliding.',
        typical: 'Aluminium body with silicone pads',
      },
      {
        name: 'Power source',
        why: 'USB-powered lamps depend on a free port or an adapter that may not be included.',
        typical: 'USB-A/USB-C or included adapter',
      },
    ],
    productSlugs: ['example-study-lamp', 'example-laptop-stand'],
    picks: [
      {
        productSlug: 'example-study-lamp',
        label: 'Best first upgrade for a shared room',
        why: 'Directed task lighting is the highest-impact single change for evening study or late work, because it lets you see your page clearly while the rest of the room stays dark enough for someone else to sleep.',
        watchOuts: [
          'Budget models may flicker on low settings.',
          'Clamp mounts need a desk edge of the right thickness.',
        ],
      },
      {
        productSlug: 'example-laptop-stand',
        label: 'Best for long work sessions at a laptop',
        why: 'Raising the screen moves your head towards a neutral position over hours of work and lifts the base clear of the desk for better airflow in a warm room.',
        watchOuts: [
          'You will need an external keyboard and mouse for it to be worth it.',
          'Lighter stands can flex under aggressive typing.',
        ],
      },
    ],
    comparisonSlug: 'desk-lamp-comparison',
    thingsToAvoid: [
      'Buying a laptop stand without an external keyboard. On its own, it moves the strain from your neck to your wrists.',
      'Adding decorative organisers before solving light and seating. They make the desk look better and change nothing about how it feels after four hours.',
      'Using a single cool-white lamp late at night if you are sensitive to it — adjustable colour temperature exists for a reason.',
      'Overloading one power strip with a lamp, charger, monitor and laptop. Check the total rating.',
      'Ignoring chair height relative to desk height. Elbows roughly level with the desk surface is a good starting point.',
      'Treating ergonomic advice here as medical guidance — for persistent neck, back or wrist pain, consult a qualified professional.',
    ],
    faqs: [
      {
        question: 'What should I buy first for a home desk setup?',
        answer:
          'In order of impact: a chair or lumbar support you can sit in for hours, a directed task lamp, then a laptop stand with an external keyboard. Cable management and organisers come after those, because they improve tidiness rather than comfort.',
      },
      {
        question: 'Is a monitor arm worth it on a small desk?',
        answer:
          'It can be, mainly because it reclaims the desk surface under the screen and lets you set the exact height. But a clamp arm needs a sturdy desk edge and enough depth behind it, which rules out many folding or wall-mounted Indian desk setups.',
      },
      {
        question: 'Which colour temperature is best for studying?',
        answer:
          'Cooler light in the 4000–6500 K range is generally preferred for alert, detail-focused work, while warmer light around 2700–3000 K is easier in the evening. An adjustable lamp lets you use both instead of choosing one.',
      },
      {
        question: 'Do laptop cooling pads actually help?',
        answer:
          'They can reduce surface temperatures somewhat on laptops that draw intake air from underneath, and they raise the machine slightly, which helps posture. The effect is usually modest — a clean vent and a hard flat surface matter more than the fan.',
      },
      {
        question: 'Is a standing desk practical in an Indian apartment?',
        answer:
          'A full standing desk needs floor space and a stable power supply for the motor, which is a real constraint in a shared bedroom. A desktop riser that sits on your existing table is usually the practical middle ground, if you have the desk depth for it.',
      },
    ],
    finalThoughts: [
      'Solve light and seating before anything on the desk. Those two determine whether six hours of work leaves you tired or sore.',
      'Then add a screen-height solution with the keyboard and mouse to match, and only after that invest in organisation — which should be chosen for how fast it clears away, not how it photographs.',
    ],
    updatedAt: '2026-09-21',
    author: 'SmartBuyIndia Editorial',
    isDemo: true,
    status: 'draft',
  },
  {
    id: 'guide-beard-trimmer-india',
    title: 'How to Choose a Beard Trimmer in India',
    slug: 'how-to-choose-beard-trimmer-india',
    categorySlug: 'beauty-grooming',
    heroTitle: 'How to Choose a Beard Trimmer in India',
    metaDescription: 'A quick guide to beard-trimmer length control, blades, battery, charging and water resistance — plus three researched options for different needs.',
    intro: ['You do not need the trimmer with the biggest specification sheet. Start with the beard length you keep, then check length control, charging, cleaning and warranty.'],
    readingTimeMinutes: 3,
    whatToLookFor: [
      { title: '1. Length control first', body: 'Check the real range, adjustment steps and how many combs are needed. Xiaomi 2C and Vega S3 cover 0.5–20 mm across two combs; Philips BT1232/18 uses a simpler 3 mm and 7 mm comb setup.' },
      { title: '2. Battery + charging', body: 'Runtime matters, but so does recharge time. In this shortlist, Philips lists 30 minutes after an 8-hour charge, Xiaomi lists up to 90 minutes after about 2 hours, and Vega lists up to 160 minutes after about 90 minutes.' },
      { title: '3. Cleaning and water claims', body: 'Look for the exact manufacturer wording. Washable attachments are not the same thing as a trimmer that is designed for shower use; Vega lists an IPX7 claim, while Xiaomi and Philips specify washable or rinseable parts.' },
      { title: '4. Buy the features you will use', body: 'USB-C, extra speed modes and very wide length ranges can be useful, but they should not decide the purchase by themselves. Match the features to your actual grooming routine.' },
    ],
    keySpecs: [
      { name: 'Length range', why: 'Determines how much style flexibility you have.', typical: 'Short fixed combs to 0.5–20 mm depending on model' },
      { name: 'Adjustment precision', why: 'Smaller steps make it easier to keep a repeatable length.', typical: '1 mm steps to 0.5 mm precision' },
      { name: 'Runtime + charge time', why: 'Shows whether the trimmer fits your charging routine.', typical: 'About 30–160 min runtime in this shortlist' },
      { name: 'Water/cleaning', why: 'Changes how easy the device is to maintain.', typical: 'Rinseable/washable parts; some models add an IP rating' },
      { name: 'Warranty', why: 'Important for a small appliance you may use regularly.', typical: '1–2 years among these three models' },
    ],
    productSlugs: ['philips-bt1232-18', 'xiaomi-beard-trimmer-2c', 'vega-smartone-s3'],
    picks: [
      { productSlug: 'philips-bt1232-18', label: 'Good for a simple short-beard routine', why: 'The simplest setup of the three: 3 mm and 7 mm combs, 30-minute runtime and a 2-year warranty.', watchOuts: ['Skip it if you need a broad 0.5–20 mm range or faster full charging.'] },
      { productSlug: 'xiaomi-beard-trimmer-2c', label: 'Good for wide length control', why: '40 settings, 0.5 mm precision, Type-C charging and up to 90 minutes of stated runtime.', watchOuts: ['The full 0.5–20 mm range uses two combs, and the adapter is not included.'] },
      { productSlug: 'vega-smartone-s3', label: 'Good for feature-heavy trimming', why: '40 settings, three speed modes, Type-C, cord/cordless operation and up to 160 minutes stated runtime.', watchOuts: ['Extra features are useful only if you actually need them; the AI/SmartTrim claims are manufacturer claims, not our test results.'] },
    ],
    thingsToAvoid: [
      'Choosing a trimmer just because it has the most settings.',
      'Treating a washable attachment as proof that the whole device is shower-safe.',
      'Publishing a price without checking the live Amazon.in listing on the day it is shown.',
      'Calling a product “tested” or “best” when SmartBuyIndia has not actually tested it.',
    ],
    faqs: [
      { question: 'Is 0.5 mm better than 1 mm?', answer: 'Not automatically. A 0.5 mm option gives finer control for very short styles, while a 1 mm step may be perfectly adequate for a buyer who keeps a consistent beard length.' },
      { question: 'Is USB-C important on a beard trimmer?', answer: 'It is mainly a convenience feature. Check charging time and runtime as well; USB-C by itself does not prove faster charging.' },
      { question: 'Do I need a waterproof trimmer?', answer: 'Only if that feature matches your routine. A washable head can already make maintenance easier; check the manufacturer’s exact water-resistance claim before using a trimmer around water.' },
    ],
    finalThoughts: ['For most buyers, the decision is simple: choose the length range first, then battery/charging, then cleaning and warranty. Everything else is secondary.'],
    updatedAt: '2026-10-08',
    author: 'SmartBuyIndia Editorial',
    isDemo: false,
    status: 'draft',
  },
];

/* -------------------------------------------------------------------------- */
/* Lookups                                                                    */
/* -------------------------------------------------------------------------- */

export const buyingGuides = IS_DEMO_CONTENT
  ? guideData
  : guideData.filter((g) => g.status === 'published' && !g.isDemo);

export const publishedGuides = buyingGuides;

export const getGuideBySlug = (slug) => buyingGuides.find((g) => g.slug === slug) || null;
export const getGuidesByCategory = (categorySlug) =>
  buyingGuides.filter((g) => g.categorySlug === categorySlug);

export const guidesByRecency = [...buyingGuides].sort((a, b) =>
  String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')),
);

/** Featured guides for the homepage: most recently updated first. */
export const featuredGuides = guidesByRecency;
