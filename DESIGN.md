# Design Document — ck0xdev Portfolio

> Architecture decisions, component hierarchy, performance strategy, and design rationale.

---

## 1. Architecture Overview

### Single-Page Application (SPA)

The portfolio is a single-page React application with section-based navigation instead of URL routing. This decision was made because:

- **Simplicity**: A portfolio is a single document — routes would add complexity without value.
- **Performance**: No route transitions; sections lazy-load as the user scrolls.
- **SEO**: Structured data and meta tags cover all content; Google indexes SPAs well with pre-rendering.

### Component Architecture

```
App
├── BackgroundShader (fixed, z: -1)     ← WebGL canvas
├── Sidebar (fixed, z: 10)              ← Rotary dial nav
├── main.main-content (z: 1)
│   ├── Hero                            ← Eager load
│   └── ErrorBoundary
│       └── Suspense (LoadingSpinner)
│           ├── About                   ← Lazy
│           ├── Experience              ← Lazy
│           ├── Projects                ← Lazy
│           └── Contact                 ← Lazy
└── ErrorBoundary
    └── Suspense
        └── Footer                      ← Lazy
```

### Separation of Concerns

| Layer | Directory | Responsibility |
|-------|-----------|---------------|
| **Sections** | `src/sections/` | Page-level content blocks (one per scroll section) |
| **Layout** | `src/layout/` | Persistent UI that wraps/surrounds sections |
| **Components** | `src/components/` | Reusable, context-free UI building blocks |
| **Data** | `src/data/` | Static content arrays — editable without touching components |
| **Constants** | `src/constants/` | Magic numbers and app-wide config |

---

## 2. Data Flow

```
src/data/*.js  →  imported by  →  src/sections/*.jsx / src/layout/*.jsx
                                         ↓
                                    Renders JSX
```

- **No state management library** (Redux, Zustand, etc.) — unnecessary for a static portfolio.
- **Local state only** in `Sidebar.jsx` for dial angle and active section tracking.
- Data files are plain ES module exports — easy to edit, easy to test.

---

## 3. CSS Architecture

### Design Tokens

All colors, fonts, and shared values are defined as CSS Custom Properties in `:root`:

```css
:root {
    --bg-center: #1a1a1a;
    --bg-edge: #000000;
    --text-primary: #ffffff;
    --text-muted: #52525b;
    --accent: #818cf8;
}
```

### Naming Convention

- **BEM-inspired** but simplified: `.component-element` (e.g., `.social-card-icon`)
- **Section-specific** prefixes: `.hero-*`, `.timeline-*`, `.reach-out-*`
- **Utility classes**: `.glass-card`, `.btn-solid`, `.btn-outline`, `.pill`

### File Organization

Single `index.css` file organized into numbered sections:
1. Design Tokens → 2. Reset & Base → 3. Layout → 4. Sidebar → 5–9. Sections → 10. Footer → 11. Shared Components → 12. Animations → 13. Responsive

---

## 4. Performance Strategy

### Code Splitting

- **Hero** and **Sidebar** load eagerly (above-the-fold).
- **About**, **Experience**, **Projects**, **Contact**, and **Footer** are `React.lazy()` — loaded only when needed.
- **Vendor chunk** (`react`, `react-dom`) is separated via Vite's `manualChunks` for better caching.

### WebGL Background

- Runs a fragment shader with 40 procedural particles.
- Mouse-reactive parallax via `u_mouse` uniform.
- Gracefully degrades: if WebGL is unavailable, renders nothing (no crash, no error).
- Full resource cleanup on unmount (shaders, program, buffer deleted).

### Fonts

- **Preconnect** to `fonts.googleapis.com` and `fonts.gstatic.com` before any font requests.
- **Preload** the CSS file for faster discovery.
- `display=swap` prevents FOIT (Flash of Invisible Text).

### Images

- Hero image uses `fetchpriority="high"` and `loading="eager"`.
- Explicit `width` and `height` attributes prevent layout shift (CLS).

---

## 5. SEO Strategy

### On-Page SEO

| Element | Implementation |
|---------|---------------|
| `<title>` | Includes name, role, location, and brand |
| `meta description` | 160-character summary with keywords |
| `meta keywords` | 25+ targeted search terms |
| `meta robots` | `index, follow` with snippet/image maximums |
| Canonical URL | `https://www.ck0x.me/` |

### Structured Data

Three JSON-LD schemas:
1. **Person** — name, job title, skills (`knowsAbout`), social profiles, location
2. **WebSite** — site name, URL, language
3. **ProfilePage** — creation/modification dates

### Technical SEO

- Sitemap with all section anchors
- robots.txt allowing all pages, blocking `/assets/`
- Domain redirects (bare domain → `www.`, Vercel → custom domain)
- Security headers that improve trust signals

---

## 6. Security Posture

### HTTP Headers (via Vercel)

| Header | Purpose |
|--------|---------|
| HSTS | Forces HTTPS for 1 year, preload eligible |
| X-Content-Type-Options | Prevents MIME sniffing |
| X-Frame-Options | Prevents clickjacking |
| X-XSS-Protection | Legacy XSS filter |
| Referrer-Policy | Limits referrer leakage |
| Permissions-Policy | Blocks camera, mic, geolocation, FLoC |
| Content-Security-Policy | Restricts script/style/font/image sources |

### Code-Level Security

- All `target="_blank"` links use `rel="noopener noreferrer"`
- No `dangerouslySetInnerHTML` or `eval()` anywhere
- No user input is rendered without React's built-in escaping
- Console output is gated behind `import.meta.env.DEV`

---

## 7. Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 80+ |
| Firefox | 78+ |
| Safari | 14+ |
| Edge | 80+ |
| Mobile Safari | 14+ |
| Chrome Android | 80+ |

WebGL fallback: if WebGL is not available, the background simply doesn't render.

---

## 8. Accessibility

- Semantic HTML: `<main>`, `<section>`, `<footer>`, `<nav>`, `<aside>`
- `aria-label` on navigation and interactive elements
- `aria-current` on active nav item
- Keyboard-accessible logo (tabIndex, onKeyDown)
- `aria-hidden="true"` on decorative elements (footer logo)
- Colour contrast meets WCAG AA for primary text on dark background

---

## 9. Error Handling

- **ErrorBoundary** wraps all lazy-loaded content — prevents white screen crashes
- **WebGL errors** are caught and logged (dev only), with graceful degradation
- **Shader compilation** errors are detected and reported
- **Network failures** during lazy loading show the ErrorBoundary fallback with a "Try Again" button
