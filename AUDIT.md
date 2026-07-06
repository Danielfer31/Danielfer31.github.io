# AUDIT.md

## Scope

Reference URL: https://madarplatform.com/en

Audit method:
- Opened the public page in the in-app browser.
- Captured reference screenshots for desktop, tablet, mobile, menu states, hero states, chapter states, form, case study, stats, and footer.
- The in-app DOM snapshot API failed on this page, so DOM and computed-style data were extracted with bounded read-only browser evaluation and visual screenshots.

Primary reference artifacts are in `reference/`.

## Detected Stack

No local project stack was present in this directory before implementation:
- No `package.json`.
- No Git repository metadata.
- Empty workspace contents except generated audit artifacts.

Implementation stack selected:
- Next.js
- TypeScript
- React components
- Global CSS design system with safe placeholder SVG/CSS assets

## Page Structure Observed

The reference is not a classic static landing page. It uses a highly animated, scroll-driven composition:
- Fixed compact header.
- Hero with full-screen dark navy background.
- Neon logistics road/truck visual.
- Typewriter-like hero title animation.
- Cookie banner centered at bottom.
- A custom scroll journey with four major platform chapters.
- Partner/client logo rail on white.
- Key figures section on a container/building image background.
- Case study section over an industrial overhead photo.
- Request a Demo form.
- Footer over a cargo/ship style image.

## Header and Navigation

Desktop header:
- Fixed at `20px` from top and left.
- Logo tile around `127px x 40px`.
- Menu tile around `81px x 40px`.
- CTA dropdown around `182px x 40px`.
- Tiles use translucent navy/white panels with small radius.
- CTA is vivid orange.

Menu state:
- Left overlay panel about `440px` wide.
- Large white navigation labels.
- Main content darkens and blurs behind the panel.
- Bottom area includes an app login tile and language link.

CTA state:
- Orange "Get Started" button.
- Dropdown items: transport market, demo, app download.
- Items are large white text over the hero scene.

## Hero

Visual pattern:
- Dark navy gradient background.
- Neon blue/red/yellow road lines.
- Wireframe truck with metric hotspots.
- Hero heading at top-right with orange first word and white remaining words.
- Intro copy card at bottom-left around `414px x 260px`.
- Small arrow tile inside the copy card.

Typography:
- Reference uses `Suisse, Helvetica, Arial, sans-serif`.
- Large hero heading around `90px` on desktop.
- Body copy around `18px`.

Colors sampled/approximated:
- Deep navy: `#03073b`, `#070d55`.
- Ink blue: `#172e64`.
- Orange CTA/accent: `#ff5a3d` / `#fb441a`.
- Neon cyan: `#18b7ff`.
- Neon red: `#ff3e48`.
- White text: `#ffffff`.

## Scroll Journey

Observed chapters:
- Real-Time Intelligence.
- Instant Online Payments.
- Effective Marketplace.
- Frictionless Integration.

Reference behavior:
- Custom scroll does not map cleanly to `window.scrollY`.
- Keyboard `PageDown` advances the animated scenes.
- Four-part progress indicator appears bottom-left.
- Detail cards and feature text slide through the same journey.

Implemented equivalent:
- Full-screen neon chapter stage.
- Functional chapter tabs.
- Feature card rail with Read More actions.
- Safe SVG/CSS placeholders for graphs, wallet, marketplace, integration and truck visuals.

## Partners, Stats, Case, Form, Footer

Partners:
- White background.
- Large heading.
- Horizontal logo/card rail with light grey tiles.

Stats:
- Photo-like logistics/container background.
- Three metric panels.
- First metric panel is orange.
- Values: `16k`, `800`, `1.1m`.

Case study:
- Full bleed industrial image in reference.
- Right glass panel with title, logo, body, and Learn More CTA.
- Implemented with safe CSS placeholder scene and generic client label.

Request a Demo:
- White section.
- Huge dark-blue heading.
- Two-column form.
- Inputs are underline style.
- Region and shipment volume are custom selects.
- Submit is dark-blue, disabled until required fields are present.

Footer:
- Dark cargo/ship style image background.
- Two large cards: Platform and Marketplace.
- CTA and login tiles.
- Compact nav and legal links.

## Responsive Behavior

Desktop:
- Full hero and chapter scenes.
- Fixed header remains visible through the scroll.

Tablet portrait reference:
- Shows a black rotation notice.
- Logo remains top-left.
- Implemented equivalent at `700px-900px` portrait.

Mobile portrait:
- Header rearranges with orange CTA left and logo right.
- Menu tile hidden.
- Hero typography and copy card hidden to prioritize the visual scene.
- No horizontal overflow detected in local QA.

## Asset Policy Decisions

The reference uses proprietary images, logo marks, client logos, and branded case-study imagery. These were not copied.

Safe replacements:
- Placeholder brand: `M-ROUTE Logistics Platform`.
- CSS/SVG neon truck and logistics visuals.
- Generic partner tiles.
- CSS-generated industrial/cargo backgrounds.
- Paraphrased long-form marketing copy.

