# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-07-10

### Added
- **Folder structure**: `src/sections/`, `src/layout/`, `src/data/`, `src/constants/`, `src/components/ui/`
- **ErrorBoundary** component — catches render errors in lazy-loaded sections with "Try Again" fallback
- **LoadingSpinner** component — replaces empty `<div>` Suspense fallbacks
- **Data layer**: `navigation.js`, `experiences.js`, `projects.js`, `socials.js` — static data separated from components
- **Constants file**: `src/constants/index.js` — app-wide magic numbers and site metadata
- **Security headers**: Content-Security-Policy, Permissions-Policy in `vercel.json`
- **SEO**: 25+ targeted keywords, ProfilePage schema, expanded Person schema with `knowsAbout`
- **Documentation**: `DESIGN.md`, `CONTRIBUTING.md`, `CHANGELOG.md`
- WebGL shader compilation error checking and program link validation
- Full WebGL resource cleanup on component unmount
- ARIA attributes on navigation (`aria-label`, `aria-current`)
- Keyboard accessibility on logo element
- Dynamic copyright year in Footer
- `theme-color` meta tag for mobile browsers
- `engines` field in `package.json` (Node ≥ 18)
- Vendor chunk splitting in Vite config

### Changed
- **Restructured** all components into `sections/`, `layout/`, `components/ui/`
- **Refactored** Sidebar — fixed `dialAngle` dependency bug causing observer recreation on every angle change
- **Refactored** BackgroundShader — readable variable names, proper error handling
- **Refactored** Footer — `<h1>` → decorative `<div>` (fixes heading hierarchy), uses shared data
- **Refactored** Hero — inline styles moved to CSS classes
- **Cleaned CSS** — removed ~260 lines of duplicate rules, organized with numbered section headers
- Resume moved from `public/` root to `public/documents/`
- Fixed font preconnect ordering (preconnect before preload)
- Upgraded all external link `rel` to `noopener noreferrer`
- Expanded sitemap with all section anchors
- Updated robots.txt to disallow `/assets/` crawling
- Rewrote README.md with updated structure and documentation

### Removed
- **Tailwind CSS** (`tailwindcss`, `postcss`, `autoprefixer`) — were installed but never used
- `tailwind.config.js` and `postcss.config.js`
- `IDEA.md` (empty file)
- `dist/` directory (build artifact, already gitignored)
- `scroll-smooth` Tailwind class from `<html>` (CSS `scroll-behavior: smooth` handles this)
- Unused `.background` CSS class
- Duplicate CSS blocks (lines 760–801, 895–980 in old `index.css`)

### Fixed
- `.gitignore` typo: `confidenteal.env` → `confidential.env`
- Resume download link path (relative → absolute `/documents/Chintan Kukadiya.pdf`)
- Sidebar `useEffect` dependency array (was including `dialAngle`, causing observer churn)
- Scroll event listener missing `{ passive: true }` flag
- Missing `scrollTimeout` cleanup on unmount (potential memory leak)
