# Sticky Single Video Background Design

## Context

The current sticky section is driven by `ChapterScroller.tsx`.
It keeps a scroll progress value, derives the active stage, and renders:

- the hero stage
- four service chapters
- progress bar
- chapter tabs
- optional metrics
- feature cards after the sticky area

The visual background is currently delegated to `MediaScene.tsx`.
`MediaScene` renders the hero video for the hero state, then swaps to
chapter-specific images for `seguridad`, `flota`, `rutas`, and `pagos`.

The approved direction is to replace those changing images with one
continuous video background while preserving the existing sticky behavior.

## Goal

Use one persistent video as the visual foundation for the whole sticky
experience:

- `/assets/landing/hero-loop.webm`
- `/assets/landing/hero-loop.mp4`
- `/assets/landing/hero-poster.webp`

The layout must keep behaving the same:

- scrolling still advances stages
- text still changes per chapter
- tabs still jump to the matching stage
- progress bar still starts after the hero stage
- metrics still appear only where configured
- feature cards remain after the sticky section

## Recommended Architecture

Keep `ChapterScroller` responsible for scroll and content state.
Add one persistent media layer inside the sticky stage, behind all chapter
content. This video layer should not be keyed by active chapter and should not
be mounted inside the existing scene transition.

`MediaScene` will stay as the visual component name. It will no longer own
separate image assets for each chapter. It will receive the active variant, but
the variant will only control overlays such as road lines or route waypoints.
The background video remains stable across every state.

This avoids restarting the video every time the user moves from one chapter to
another.

## Component Boundaries

`ChapterScroller.tsx`

- Keeps current scroll math and active index logic.
- Renders a persistent background video layer once inside
  `.chapter-stage--sticky`.
- Keeps animated transitions for text, metrics, and tabs.
- Stops preloading chapter images because they will no longer be used.

`MediaScene.tsx`

- Provides the persistent video background through the existing `MediaScene`
  component.
- Keeps `hero-poster.webp` as the poster and load fallback while the video is
  unavailable or blocked.
- Shows road-line overlays when `variant === "hero"` or `variant === "rutas"`.
- Shows route waypoint overlays only when `variant === "rutas"`.

`content.ts`

- Keeps the `visual` values for each chapter.
- The values continue to act as scene state for overlays and styling, even
  though they no longer select different image files.

`globals.css`

- Keeps the sticky layout classes.
- Updates media-scene styles so one video fills the sticky background.
- Keeps the green duotone overlay for text contrast.
- Removes or stops relying on object-position rules for per-chapter images.

## Data Flow

1. `ChapterScroller` reads `chapters` and `hero`.
2. Scroll progress updates `activeIndex`.
3. `activeIndex` determines `activeChapter` and the active `visual` variant.
4. The video background stays mounted.
5. The active variant controls only optional overlays and state-specific
   styling.
6. Text and metrics continue to animate through `AnimatePresence`.

## Error Handling And Fallbacks

- If the browser supports WebM, it should use `hero-loop.webm`.
- If not, it should fall back to `hero-loop.mp4`.
- If video playback is unavailable or blocked, keep `hero-poster.webp` visible
  through the video poster frame.
- The video should be `muted`, `loop`, `playsInline`, and `autoPlay` so it can
  play reliably as a background.
- The poster image should remain in place while metadata loads.

## Testing

Manual checks in the in-app browser:

- Open `http://127.0.0.1:3000/`.
- Confirm the video appears behind the hero copy.
- Scroll through all stages and confirm the video does not visibly restart.
- Confirm chapter titles, descriptions, metrics, tabs, and progress still
  update.
- Confirm the route overlay appears only in the route stage.
- Confirm the poster image is available as the video poster/fallback.

Automated or command checks:

- Run the project build if practical.
- Run a focused browser smoke test for title, hero text, and chapter text.

## Non-Goals

- Do not synchronize the video timeline to scroll.
- Do not add new video editing, cropping, or encoding logic.
- Do not change the chapter copy or navigation structure.
- Do not redesign the feature cards after the sticky section.
