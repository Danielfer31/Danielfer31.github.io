# Sticky Single Video Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the sticky section's chapter-specific background images with one persistent video background while preserving the existing scroll, chapter, tab, metric, and overlay behavior.

**Architecture:** Keep `ChapterScroller` responsible for scroll state and content transitions. Keep `MediaScene` as the visual layer, but make it render the same persistent video for every variant and use the active variant only for overlays.

**Tech Stack:** Next.js 15, React 19, TypeScript, Motion for React, CSS modules through global stylesheet.

---

## File Structure

- Modify `src/components/MediaScene.tsx`: remove chapter image mapping, render the persistent video/poster for all variants, preserve road lines and route waypoints.
- Modify `src/components/ChapterScroller.tsx`: remove `SCENE_IMAGES` import and the image-preload effect that is no longer needed; render `MediaScene` once outside the scene `AnimatePresence` so the video DOM node survives chapter changes.
- Modify `src/app/globals.css`: remove per-image object-position rules and keep the media scene styles compatible with video/poster.

### Task 1: Make `MediaScene` Use One Persistent Video

**Files:**
- Modify: `src/components/MediaScene.tsx`

- [x] **Step 1: Replace chapter image mapping with shared video constants**

Use this top section:

```tsx
"use client";

import { useEffect, useRef } from "react";
import type { SceneVariant } from "@/data/content";

type MediaSceneProps = {
  variant: SceneVariant;
  className?: string;
};

const STICKY_VIDEO = {
  poster: "/assets/landing/hero-poster.webp",
  webm: "/assets/landing/hero-loop.webm",
  mp4: "/assets/landing/hero-loop.mp4"
};
```

Expected result: `SCENE_IMAGES` no longer exists and no chapter-specific image file is selected.

- [x] **Step 2: Start playback when the video mounts**

Add this inside `MediaScene`, before the return:

```tsx
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // The poster remains visible if a browser blocks background autoplay.
    });
  }, []);
```

Expected result: muted background playback starts reliably when supported.

- [x] **Step 3: Render the same media layer for every variant**

Use this `MediaScene` implementation:

```tsx
export function MediaScene({ variant, className = "" }: MediaSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // The poster remains visible if a browser blocks background autoplay.
    });
  }, []);

  return (
    <div className={`media-scene media-scene--${variant} ${className}`} aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={STICKY_VIDEO.poster}
      >
        <source src={STICKY_VIDEO.webm} type="video/webm" />
        <source src={STICKY_VIDEO.mp4} type="video/mp4" />
      </video>

      {variant === "hero" || variant === "rutas" ? <RoadLines /> : null}
      {variant === "rutas" ? <CorridorWaypoints /> : null}
    </div>
  );
}
```

Expected result: the background source stays identical for hero and all chapters.

### Task 2: Keep The Media Layer Mounted Across Chapters

**Files:**
- Modify: `src/components/ChapterScroller.tsx`

- [x] **Step 1: Remove `useEffect` and `SCENE_IMAGES` from imports**

Change the React import to:

```tsx
import { useMemo, useRef, useState } from "react";
```

Change the media import to:

```tsx
import { MediaScene } from "./MediaScene";
```

Expected result: no unused imports remain.

- [x] **Step 2: Delete the preload effect**

Remove this block:

```tsx
  // Pre-carga las fotos de todas las escenas: AnimatePresence desmonta la
  // anterior al cambiar de capítulo y sin esto el crossfade mostraría un flash.
  useEffect(() => {
    Object.values(SCENE_IMAGES).forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
```

Expected result: no image preload happens for chapter scenes.

- [x] **Step 3: Replace the animated scene wrapper with one persistent `MediaScene`**

Replace the whole scene `AnimatePresence` block with this direct render:

```tsx
          <MediaScene
            variant={activeChapter ? activeChapter.visual : "hero"}
            className={
              activeChapter
                ? "chapter-stage__scene"
                : "chapter-stage__scene hero-scene"
            }
          />
```

Expected result: `MediaScene` is no longer keyed by `activeChapter.visual`, so the video element remains mounted while chapter text changes.

### Task 3: Clean Up Per-Image CSS

**Files:**
- Modify: `src/app/globals.css`

- [x] **Step 1: Remove per-variant image positioning rules**

Delete these selectors and declarations:

```css
.media-scene--seguridad > img {
  object-position: 72% 20%;
}

.media-scene--flota > img {
  object-position: 78% center;
}

.media-scene--rutas > img {
  object-position: center 60%;
}

.media-scene--pagos > img {
  object-position: 80% center;
}
```

Expected result: the shared video/poster uses the base `.media-scene > img, .media-scene > video` sizing rules.

### Task 4: Verify

**Files:**
- Test manually in the in-app browser.

- [x] **Step 1: Run a production build**

Run:

```powershell
npm run build
```

Expected: build completes successfully.

- [x] **Step 2: Confirm the dev server responds**

Run:

```powershell
Invoke-WebRequest -Uri 'http://127.0.0.1:3000/' -UseBasicParsing -TimeoutSec 5
```

Expected: HTTP 200.

- [x] **Step 3: Browser smoke check**

Open or reload:

```text
http://127.0.0.1:3000/
```

Expected:

- hero title still appears
- sticky scroll still advances chapter text
- one video remains behind all stages
- route waypoints appear only in the routes stage

### Task 5: Commit Handling

**Files:**
- None.

- [x] **Step 1: Check repository availability**

Run:

```powershell
if (Test-Path -LiteralPath '.git') { git status --short } else { 'NO_GIT_REPOSITORY' }
```

Expected in this workspace: `NO_GIT_REPOSITORY`.

- [x] **Step 2: Skip commit if no Git repository exists**

If the command returns `NO_GIT_REPOSITORY`, do not run commit commands. Report that changes were made locally without a commit.
