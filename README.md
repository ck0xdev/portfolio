# ck0x Portfolio — Vite + React (JSX)

A retro-modern developer portfolio built with **Vite**, **React 18**, and **Tailwind CSS v3**.

## Tech Stack

| Tool | Version |
|------|---------|
| Vite | ^5.4 |
| React | ^18.3 |
| Tailwind CSS | **v3** |
| EmailJS | ^4.4 |

## Project Structure

```
ck0x-portfolio/
├── .env                      ← YOUR secrets (gitignored — never commit)
├── .env.example              ← Template to share safely
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── hooks/
    │   └── useReveal.js
    └── components/
        ├── Loader.jsx
        ├── CustomCursor.jsx
        ├── Navbar.jsx
        ├── Terminal.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Work.jsx
        ├── Contact.jsx       ← EmailJS wired here
        └── Footer.jsx
```

---

## Getting Started

```bash
npm install
npm run dev
```

---

## ⚙ EmailJS Setup (your email stays 100% private)

Your actual email address is configured **only inside the EmailJS dashboard** — it never appears in any code or `.env` file.

### Step 1 — Create a free EmailJS account
Go to https://www.emailjs.com and sign up (free tier = 200 emails/month).

### Step 2 — Add an Email Service
1. Dashboard → **Email Services** → **Add New Service**
2. Pick Gmail (or any provider) and connect your account
3. Copy the **Service ID** (e.g. `service_abc123`)

### Step 3 — Create an Email Template
1. Dashboard → **Email Templates** → **Create New Template**
2. Set **To Email** to your address — this is the ONLY place your email appears
3. Use these exact variable names in the template body:

```
From: {{from_name}} <{{from_email}}>

{{message}}
```

4. Copy the **Template ID** (e.g. `template_xyz789`)

### Step 4 — Get your Public Key
Dashboard → **Account** → **General** → copy your **Public Key**

### Step 5 — Fill in your .env
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 6 — Done
Run `npm run dev` and test the form. Messages land in your inbox.
Your email address is **never** in the source code or git history.

---

## Anti-Spam Measures

| Layer | How it works |
|-------|-------------|
| Honeypot field | Hidden `website` input — bots fill it, humans don't. Submission silently blocked. |
| Client rate limit | Max 1 submission per 60 seconds per browser session |
| EmailJS daily quota | Free tier caps at 200/month — acts as a natural ceiling |
| Checkbox | "Certified Human™" required before submit |

