# Product images

**This folder is intentionally empty.**

While a product record has no real photograph, `src/components/ProductImage.jsx`
renders an original, clearly-labelled placeholder illustration instead of
requesting a file from here — so there are no broken images and no layout
shift.

## Adding a real image later

1. Obtain a photograph you are legally allowed to use (your own photo, or one
   with an explicit licence that permits this use). **Never** download product
   photography from Amazon.in or any retailer listing — it is copyrighted.
2. Save it here as `public/images/products/<product-slug>.webp`
   (recommended size 800 × 600, quality ~80, roughly 40–80 KB).
3. In `src/data/products.js`, set:

   ```js
   image: '/images/products/<product-slug>.webp',
   imageAlt: 'What the photograph actually shows.',
   imagePlaceholder: false,
   ```

4. `ProductImage` then renders an `<img loading="lazy">` with a fixed aspect
   ratio, so nothing shifts while it loads.

## Open-license / generated artwork

Generated or illustrated artwork is also fine as long as it does not imitate a
specific brand's product or trademark. Keep the `Placeholder artwork` caption in
the image's `alt` text until a genuine photograph replaces it.
