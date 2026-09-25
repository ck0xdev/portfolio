# Claude Developer Guide

Reference: @AGENTS.md

## Development Commands
- `npm run dev` — Start the local Next.js Turbopack development server on port 3000
- `npm run build` — Build production bundle
- `npm run lint` — Run ESLint checks

## Core Conventions
- **Framework:** Next.js 16 App Router with React 19 and TypeScript.
- **Styling:** Design tokens and responsive layouts in `src/app/globals.css`.
- **Animations:**
  - `Animations.tsx`: GSAP hero timelines, custom cursor, 3D bento card tilt and glow.
  - `ScrollMotion.tsx`: Lenis smooth scrolling with Anime.js intersection reveals.
  - `Interactivity.tsx`: Magnetic buttons, ripple interactions, and soft hover effects.
  - `CanvasBackground.tsx`: Interactive HTML5 Canvas particle background.
- **Responsiveness:** Maintain fluid, responsive layouts on mobile (`< 768px`), tablet (`768px - 1024px`), and desktop (`> 1024px`).
