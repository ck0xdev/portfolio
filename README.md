# ck0xdev — Portfolio

> Personal portfolio site for **ck0xdev** — deployed on [ck0xdev.vercel.app](https://ck0xdev.vercel.app)

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v3** (dark mode via `class` strategy)
- **EmailJS** (contact form)

---

## Project Structure

```
ck0x-portfolio/
├── public/                         # Static files — all copied to dist/ on build
│   ├── favicon.ico                 # Browser tab icon
│   ├── favicon.png                 # OG image / apple-touch-icon
│   ├── robots.txt                  # Crawler rules + sitemap pointer
│   ├── sitemap.xml                 # Google Search Console sitemap
│   ├── google765c5857a2901b01.html # Google Search Console verification
│   └── documents/                  # Resumé / PDFs (place files here)
├── src/
│   ├── App.jsx                     # Main component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + Tailwind directives
├── index.html                      # Root HTML (meta, OG, fonts)
├── vite.config.js                  # Vite config (publicDir + build settings)
├── tailwind.config.js              # Tailwind dark mode + content paths
├── postcss.config.js               # PostCSS (autoprefixer)
├── vercel.json                     # Vercel headers (Content-Type for sitemap)
├── package.json
└── .gitignore                      # Excludes node_modules/, dist/, .env
```

---

## Development

```bash
npm install
npm run dev       # starts dev server at http://localhost:5173
```

## Deploy (Vercel)

Push to `main` — Vercel auto-deploys using:

```
Build Command:  npm run build   (→ vite build)
Output Dir:     dist/
```

Everything inside `public/` is automatically copied into `dist/` during build — no manual steps needed.

---

## SEO Files

| File | Purpose |
|------|---------|
| `public/robots.txt` | Tells crawlers they can index everything, points to sitemap |
| `public/sitemap.xml` | Submitted to Google Search Console |
| `public/google765c5857a2901b01.html` | Search Console ownership verification |
| `index.html` `<meta name="google-site-verification">` | Alternate verification method |
| `vercel.json` | Forces `Content-Type: application/xml` on sitemap for GSC compatibility |

---

## Adding a Resumé / PDF

Drop any file into `public/documents/` and reference it as:

```
https://ck0xdev.vercel.app/documents/resume.pdf
```

No rebuild needed — it goes live on next deploy.
