# ck0xdev — Portfolio

> Personal portfolio site for **Chintan Kukadiya** (**ck0xdev**) — Frontend Developer & Web Designer based in Surat, India.
>
> 🌐 Live at [ck0x.me](https://www.ck0x.me)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Styling** | Vanilla CSS (design tokens + custom properties) |
| **Icons** | Phosphor Icons (CDN) |
| **Fonts** | Inter + Outfit (Google Fonts) |
| **Deployment** | Vercel (auto-deploy on push) |

---

## Project Structure

```
ck0x-portfolio/
├── public/                         # Static assets — copied to dist/ on build
│   ├── documents/                  # Downloadable files (resume, etc.)
│   │   └── Chintan Kukadiya.pdf
│   ├── favicon.ico
│   ├── favicon.png
│   ├── hero.png                    # Hero section image & OG image
│   ├── robots.txt                  # Crawler rules + sitemap pointer
│   └── sitemap.xml                 # Google Search Console sitemap
│
├── src/
│   ├── components/                 # Shared / reusable UI components
│   │   ├── ErrorBoundary.jsx       # Catches render errors gracefully
│   │   └── ui/
│   │       ├── BackgroundShader.jsx # WebGL animated background
│   │       └── LoadingSpinner.jsx   # Suspense fallback spinner
│   │
│   ├── sections/                   # Page sections (one per scroll section)
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   │
│   ├── layout/                     # Layout components (persistent UI)
│   │   ├── Sidebar.jsx             # Rotary dial navigation
│   │   └── Footer.jsx
│   │
│   ├── data/                       # Static data (separated from components)
│   │   ├── navigation.js           # Nav links used by Sidebar + Footer
│   │   ├── experiences.js          # Timeline entries
│   │   ├── projects.js             # Project cards data
│   │   └── socials.js              # Social links + contact info
│   │
│   ├── constants/                  # App-wide constants
│   │   └── index.js
│   │
│   ├── App.jsx                     # Root component with lazy loading
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + design tokens
│
├── index.html                      # Root HTML (SEO, meta, fonts, JSON-LD)
├── vite.config.js                  # Vite build & dev server config
├── vercel.json                     # Vercel redirects, security headers, rewrites
├── package.json
├── .gitignore
│
├── DESIGN.md                       # Architecture & design decisions
├── CONTRIBUTING.md                 # Contribution guidelines
└── CHANGELOG.md                    # Version history
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18.0.0
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build
# → Output in dist/
```

### Preview Build Locally

```bash
npm run preview
```

---

## Deployment (Vercel)

The site auto-deploys on push to `main`.

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist/` |
| Node.js Version | 18.x |

Domain redirects (`ck0xdev.vercel.app` → `www.ck0x.me` and `ck0x.me` → `www.ck0x.me`) are configured in `vercel.json`.

---

## SEO

| File | Purpose |
|------|---------|
| `index.html` | Title, meta description, keywords, OG tags, Twitter Cards, JSON-LD structured data |
| `public/robots.txt` | Crawler rules + sitemap pointer |
| `public/sitemap.xml` | Submitted to Google Search Console |
| `vercel.json` | Security headers, XML content type for sitemap |

### Structured Data

Three JSON-LD schemas are embedded:
1. **Person** — name, job title, skills, social links
2. **WebSite** — site name and URL
3. **ProfilePage** — creation and modification dates

---

## Security

Security headers configured in `vercel.json`:
- `Strict-Transport-Security` (HSTS with preload)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (blocks camera, mic, geolocation, FLoC)
- `Content-Security-Policy` (restricts script/style/font sources)

---

## Architecture

See [DESIGN.md](./DESIGN.md) for detailed architecture decisions, component hierarchy, and performance strategy.

---

## License

MIT © Chintan Kukadiya
