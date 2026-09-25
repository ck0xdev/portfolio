# ck0x — Developer Portfolio

A modern, high-performance developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **GSAP**, **Anime.js**, and **Lenis**. Designed with an Apple-inspired minimalist aesthetic, glassmorphic bento cards, tactile micro-interactions, and buttery-smooth 60fps animations.

🌐 **Live Demo:** [https://ck0x.me](https://ck0x.me)

---

## ✨ Features

- **Cinematic Preloader & Enter Interaction:** Multilingual typographic greeting sequence with outline path drawing and interactive entry trigger.
- **Glassmorphic Bento Grid:** Clean modular layout with mouse-tracking radial glow and subtle 3D parallax tilt.
- **Buttery Smooth Scroll:** Powered by **Lenis** with velocity-based dynamics, scrubbable timeline progression, and scroll parallax.
- **Interactive Particle Background:** Hardware-accelerated HTML5 Canvas particle network reacting to scroll speed and mouse movement.
- **Magnetic Buttons & Custom Cursor:** Custom cursor with lagging outline and spring physics on interactive elements.
- **Fully Responsive Architecture:** Optimized for mobile, tablet, and desktop viewports with zero layout shift (CLS) and smooth touch interactions.
- **Optimized Performance:** Fast load times with Next.js Turbopack, optimized assets, and zero redundant dependencies.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
- **Core Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animation Engines:**
  - [GSAP (GreenSock)](https://greensock.com/gsap/) — Hero sequencing, 3D tilts, magnetic physics
  - [Anime.js](https://animejs.com/) — Scroll reveals, micro-animations, ripple effects
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **Styling:** Vanilla CSS design tokens with [Tailwind CSS](https://tailwindcss.com/) utilities

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18+ or 20+
- **npm**, **yarn**, or **pnpm**

### Zero-Config Local Setup

```bash
# 1. Clone repository
git clone https://github.com/ck0xdev/ck0x-portfolio.git
cd ck0x-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` — Launches development server with Turbopack on port 3000
- `npm run build` — Compiles and optimizes production bundle
- `npm run start` — Starts production server
- `npm run lint` — Runs ESLint code quality checks

---

## 🔐 Environment Variables

This portfolio is statically generated for optimal edge performance and requires no private secrets.

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Optional | `https://ck0x.me` | Canonical domain used for OpenGraph and Twitter card metadata resolution |

---

## 📁 Project Structure

```text
ck0x-portfolio/
├── public/
│   └── assets/              # Optimized static images and logo icons
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, variables & responsive styling
│   │   ├── layout.tsx       # Root layout, metadata & font definitions
│   │   └── page.tsx         # Page composition and section hierarchy
│   └── components/
│       ├── About.tsx        # Bio, core tech stack & stats bento grid
│       ├── Animations.tsx   # GSAP timelines, custom cursor & 3D tilt engine
│       ├── CanvasBackground.tsx # Interactive canvas particle mesh
│       ├── Contact.tsx      # Contact cards & social touchpoints
│       ├── Experience.tsx   # Career timeline with dynamic progress line
│       ├── Footer.tsx       # Typographic footer with navigation links
│       ├── Hero.tsx         # Hero section with animated typography
│       ├── Interactivity.tsx # Magnetic buttons & ripple interactions
│       ├── LiquidScrollbar.tsx # Liquid indicator custom scrollbar
│       ├── Navigation.tsx   # Floating pill navigation dock
│       ├── Preloader.tsx    # Multilingual intro overlay
│       ├── Projects.tsx     # 3-column project showcase grid
│       └── ScrollMotion.tsx # Lenis smooth scroll & Anime.js reveals
├── AGENTS.md                # Agent guidelines & animation architecture
├── CLAUDE.md                # Claude developer cheat sheet
├── README.md                # Project overview and documentation
└── package.json
```

---

## 👤 Author

**Chintan Kukadiya (ck0x)**
- Website: [ck0x.me](https://ck0x.me)
- GitHub: [@ck0xdev](https://github.com/ck0xdev)
- LinkedIn: [@ck0x](https://linkedin.com/in/ck0x)
- Discord: [@ck0x](https://discord.com/users/1389525213376544768)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).