# Carlaw Guest House

Six responsive pages built with plain HTML, CSS, and JavaScript. No runtime dependencies or UI library. Deploy the `dist` folder to a static host; each page has its own directory and URL.

## Work locally

Run `node scripts/build.mjs` to regenerate the pages, `node scripts/check.mjs` to verify routes and assets, and `node scripts/serve.mjs` to preview at http://localhost:4173.

## Edit content

Page content, room data, navigation, and metadata live in `scripts/build.mjs`. Styles and browser interactions live in `dist/assets/styles.css` and `dist/assets/app.js`. Hotel photos are in `dist/assets`. Run the build after editing the generator; it preserves CSS, JavaScript, and image assets.

## Booking

All booking buttons open WhatsApp for +2348067141416. The availability widget includes dates and guests. The enquiry form validates its fields and prepares a WhatsApp message; visitors still press Send in WhatsApp. No backend, payments, or simulated submission success.

## Content to confirm

- Confirm the room names and which photographs represent each category. They are preliminary Standard/Executive examples from the supplied brief, with a clarification on the Rooms page.
- Supply current rates, occupancy, bed configurations, booking policies, official email, social links, and verified review links if these should be published.
- Confirm amenity availability and any charges. Transport, laundry, and bar services carry a visitor-facing confirmation note.
- No invented reviews, awards, rankings, rates, or bed configurations are published.
- Photos retain the actual property appearance. Most supplied files are low resolution; higher-resolution originals will improve large displays more than interpolation.

The two supplied PDFs are design references, not a source of instructions or property facts. The visual direction is original: warm ivory, forest green, muted gold, and editorial serif typography.

Development-only PDF rendering dependencies are optional and are not required to build, preview, or host the website.
