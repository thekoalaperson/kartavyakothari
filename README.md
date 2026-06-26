# 🐨 kartavyakothari.github.io — personal site

A fun, fast, single-page personal website / résumé alternative for **Kartavya Kothari** —
Senior Machine Learning Scientist at Dream11, IIT Bombay alum, and self-appointed
*friendly neighborhood koala IITian*.

Built as a zero-dependency static site (plain HTML / CSS / vanilla JS) so it deploys
straight to **GitHub Pages** — no build step, no framework, no npm.

## ✨ Features

- **Eucalyptus-aurora** theme with animated gradient hero and floating leaves 🌿
- **Light / dark** toggle (remembers your choice)
- Typewriter role tagline, scroll-reveal animations, and animated stat counters
- Timeline of experience, publication cards (KDD · ECML-PKDD · AI-ML Systems), skills & education
- Fully **responsive** + respects `prefers-reduced-motion`
- Two easter eggs 🥚 — click the koala for koala facts, and try the Konami code
  (`↑ ↑ ↓ ↓ ← → ← → B A`) for party mode
- Downloadable résumé PDF

## 📁 Structure

```
.
├── index.html              # all the markup
├── assets/
│   ├── css/style.css       # the eucalyptus-aurora theme
│   ├── js/main.js          # interactions (vanilla JS)
│   ├── img/og.svg          # social share image
│   └── Kartavya_Kothari_Resume.pdf
├── .github/workflows/pages.yml   # auto-deploy to GitHub Pages
└── .nojekyll               # serve assets as-is
```

## 🚀 Deploy / publish

This repo ships with a GitHub Actions workflow that publishes the site automatically.

1. Push this branch (or merge it into `main`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. The `Deploy to GitHub Pages` workflow runs and gives you the live URL.

Prefer the classic flow instead? Settings → Pages → *Deploy from a branch* → pick the
branch and `/ (root)` — it works the same because everything is static.

## 🛠️ Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## ✏️ Editing content

Everything lives in `index.html`. Update the timeline cards, publication links, skills
tags, and the typewriter roles array near the top of `assets/js/main.js`. Colors and the
whole vibe are CSS variables at the top of `assets/css/style.css`.

---

Handcrafted in the koala den 🐨
