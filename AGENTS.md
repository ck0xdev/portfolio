<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Architecture & Guidelines

## Stack
- **Next.js 16 (Turbopack)** with App Router
- **React 19 & TypeScript**
- **Animation Suite:** GSAP (`gsap`), Anime.js (`animejs`), Lenis (`lenis`)

## Animation Architecture
- `src/components/Animations.tsx`: Handles hero entrance timelines, frame SVG drawing, mouse custom cursor, and GSAP 3D card tilts.
- `src/components/ScrollMotion.tsx`: Initializes Lenis smooth scrolling, intersection-based scroll reveals via Anime.js, and velocity-based card skew.
- `src/components/Interactivity.tsx`: Manages magnetic button physics, click ripples, and subtle hover scale states.
- `src/components/CanvasBackground.tsx`: Self-contained interactive particle background with scroll acceleration.
- `src/components/LiquidScrollbar.tsx`: Interactive custom liquid scrollbar indicator.

## Key Rules
- Avoid transform collisions: Do not attach competing CSS transitions (e.g., `transition: transform` or `transition: all`) to elements animated via GSAP or Anime.js.
- Ensure touch safety: Disable magnetic cursor physics and intense 3D hover tilts on coarse pointer devices (`window.matchMedia('(pointer: coarse)').matches`).
- Keep responsive design clean: Check mobile (`max-width: 768px`) cascade order in `src/app/globals.css`.
