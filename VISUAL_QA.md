# VISUAL_QA.md

## Reference Screenshots

Reference captures are stored in `reference/`, including:
- `original-desktop-viewport-final.png`
- `original-tablet-full.png`
- `original-mobile-full.png`
- `original-menu-open.png`
- `original-state-kbd-01.png`
- `original-state-kbd-08.png`
- `original-state-kbd-12.png`
- `original-state-kbd-21.png`
- `original-state-kbd-22.png`
- `original-state-kbd-23.png`
- `original-state-kbd-25.png`

Local QA captures are stored in `output/`, including:
- `local-desktop-hero-final.png`
- `local-tablet.png`
- `local-mobile.png`
- `local-menu-open.png`
- `local-cta-open.png`
- `local-form-error.png`
- `local-form-success.png`

## Comparison Summary

Desktop hero:
- Header positions, CTA sizing, bottom cookie banner, hero title hierarchy, and bottom-left copy panel were matched closely.
- The truck and road visuals are safe SVG/CSS placeholders, so line detail differs from the original raster/3D artwork.
- Original truck is more photoreal/neon-complex; local version preserves scale, placement, hotspot logic, color palette, and general composition.

Menu:
- Left overlay width, large nav typography, darkened hero background, close icon, bottom app-login tile, and language link are replicated.
- Brand/logo text is intentionally replaced.

CTA dropdown:
- Functional dropdown is implemented with visible menu items and keyboard escape behavior.
- The original exposes some dropdown controls in DOM even when visually subtle; local implementation makes the state explicit on hover/click.

Responsive:
- Tablet portrait rotation notice is implemented and visually close.
- Mobile header placement matches the reference pattern: CTA left, logo right, simplified hero.
- No horizontal overflow detected at 390px or 768px.

Form:
- Underline fields, two-column layout, custom selects, disabled submit, error state, and success state are implemented.
- Data is handled locally only; no network submission.

## Known Differences

- Proprietary assets were not copied. Logos, client marks, hero art, case imagery, and original photos were replaced.
- Long marketing paragraphs were paraphrased.
- The original uses advanced scroll-jacking and typewriter sequencing. The replica provides a functional chapter/tab journey and vertically scrollable sections instead of a one-to-one custom scroll engine.
- Original client/logo imagery and case-study brand marks were replaced by generic safe placeholders.
- The exact commercial font was not used. The replica uses Arial/Helvetica fallback to preserve the clean sans-serif feel.

## Decisions Taken

- Use CSS/SVG placeholders to preserve visual rhythm without redistributing protected assets.
- Keep the header fixed across all sections, with stronger translucent navy panels so it remains readable on white sections.
- Implement a cookie banner as a dismissible local UI state.
- Implement selects as custom accessible controls with listbox behavior.
- Keep visual screenshots in `reference/` and `output/` because they are part of the requested audit and QA workflow.

## Commands Run

- `npm install`
- `npm run build`
- `npm audit --audit-level=moderate`
- Local production browser QA at `http://localhost:3000`

Build and dependency audit status:
- `npm run build` passes.
- `npm audit --audit-level=moderate` reports `found 0 vulnerabilities`.

## Improvement Path With Original Assets

Fidelity could be improved further if original licensed assets are provided:
- Replace CSS/SVG truck with authorized hero media.
- Replace generic partner tiles with authorized logo files.
- Replace case and cargo placeholders with licensed photo/video assets.
- Match the exact commercial font if a valid license is supplied.
- Recreate the custom scroll timeline with measured animation states from the production implementation.
