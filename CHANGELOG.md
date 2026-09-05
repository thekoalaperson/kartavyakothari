# Changelog

Development log for **kartavyakothari** — Kartavya Kothari's personal site / résumé
alternative. Newest first. Dates are when the work landed on
`claude/personal-resume-website-nlnvn5`.

---

## Latest update: 2026-09-05

The original eucalyptus-aurora design, koala identity, section layout, light/dark
toggle, animations, and easter eggs are the intended website. Refresh this design;
do not replace it. The 2026-09-03 redesign was rejected and superseded.

Current role: Principal ML Scientist at PlayVisionAI, Mumbai, Aug 2026–Present.
Dream Play ended Jul 2026. The approved résumé source is
`resume/Kartavya_Kothari_Resume.tex`; the approved checkpoint is under
`resume/checkpoints/2026-09-03-approved/`. The website download is that approved PDF.
Newer user-provided facts supersede the historical context below.

This refresh adds PlayVisionAI to the existing timeline, updates video research
and accelerator skills, and adjusts spacing and mobile wrapping. It preserves
the original site's visual identity and interactions.

## Historical context (superseded where noted above)

- **What this is:** a zero-dependency static site (plain HTML/CSS/vanilla JS, no build
  step, no framework, no npm) so it deploys straight to GitHub Pages.
- **Live URL:** https://thekoalaperson.github.io/kartavyakothari/ (project page under the
  `thekoalaperson` account — hence the `/kartavyakothari/` path).
- **Repo:** `thekoalaperson/kartavyakothari`. Working branch:
  `claude/personal-resume-website-nlnvn5`. The repo is **public** (required for free
  GitHub Pages).
- **Deploy:** `.github/workflows/pages.yml` auto-builds + deploys on every push to the
  working branch or `main` (`enablement: true`, so Pages turns itself on). No manual
  Settings toggle needed. `.nojekyll` keeps `assets/` served as-is.
- **Where content lives:** all copy is in `index.html`. Theme tokens (colors, the whole
  vibe) are CSS variables at the top of `assets/css/style.css`. Typewriter roles +
  interactions are in `assets/js/main.js`. The social-preview image is generated from
  `assets/img/og.svg` → `assets/img/og.png` (re-render with headless Chromium after
  editing the SVG; see note below).
- **Persona / brand:** "your friendly neighborhood koala IITian" — eucalyptus-aurora
  theme, floating leaves, two easter eggs (click the 🐨 nav glyph for koala facts; Konami
  code `↑↑↓↓←→←→BA` for party mode). Keep the koala voice; it's intentional.
- **Source of truth for the résumé content:** the LATEST is the user's LinkedIn (see the
  role history below), NOT the bundled `assets/Kartavya_Kothari_Resume.pdf`, which is the
  user's older 2026 PDF and is now behind the site. If asked to "correct everything,"
  trust LinkedIn / what the user provides over that PDF.
- **Regenerating og.png:** `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
  NODE_PATH=/opt/node22/lib/node_modules` then a short Playwright script that
  `setContent`s the SVG at 1200×630 and screenshots to `assets/img/og.png`.
- **Local preview gotcha:** serve with `python3 -m http.server <port> --directory
  /home/user/kartavyakothari` — the shell cwd can reset to `/home/user`, and serving from
  there yields the wrong (empty) site.

---

## Current factual state of the site (keep accurate)

- **Now:** Lead Machine Learning Scientist at **Dream Play** (a Dream Sports venture),
  Nov 2025–Present. Dream Play = global, AI-powered sports video-analytics app (analyzes
  padel court footage → a "Dream Play Rating" from thousands of CV/GenAI signals; live on
  the Apple App Store, id6753293432).
- **Dream11** (Dream Sports), Jun 2021–Oct 2025: Data Scientist → Senior → Lead ML
  Scientist. Scale proof: 30M+ MAU, ~15M peak CCU. Owned personalization,
  experimentation, contest recommendation, smart discounting, fraud detection (FENCE).
- **IIT Bombay:** M.Tech CSE (ML & NLP), RA under Prof. Soumen Chakrabarti. **B.E.:**
  Vidyalankar Institute of Technology, Mumbai.
- **Publications:** ECML-PKDD 2025 (Personalized Contest Recommendation / WiDIR, arXiv
  2508.14065), ACM KDD 2024 (spending-propensity transformers), AI-ML Systems 2023 (FENCE,
  arXiv 2310.05651).
- **Open question left with the user:** whether to refresh/remove the downloadable résumé
  PDF, and whether Dream Play's scope is padel-only vs. multi-sport (copy currently says
  padel, matching the public app).

---

## History

### 2026-06-26 — Experience refreshed to current role + touch-point sweep
- Corrected the résumé from the user's latest LinkedIn: current role is **Lead ML
  Scientist at Dream Play** (not Senior @ Dream11). Added Dream Play as the top,
  live-pulse timeline card with an "Live on the App Store" link.
- Rebuilt the Dream11 entry as the real **Data Scientist → Senior → Lead** progression
  (Jun 2021–Oct 2025) with a nested sub-role list, instead of one conflated role.
- Updated hero tagline, typewriter roles, About copy, "currently" note, skills
  (added Computer Vision), and all meta/OG/Twitter tags + the OG preview image.
- Reworded the two Dream11 scale stats to past tense so they read as proven scale, not
  current Dream Play numbers.

### 2026-06-26 — Published to GitHub Pages
- Repo made public; `configure-pages` set to `enablement: true`; deploy workflow
  dispatched. Site went live at https://thekoalaperson.github.io/kartavyakothari/.

### 2026-06-26 — Accessibility / light-theme / SEO hardening
- Ran a 4-perspective adversarial review (accuracy, a11y/responsive, code, design) and
  applied the triaged fixes:
  - Fixed light-theme contrast (darkened `--grad`, `--brand`, `--brand-2`, `--accent`,
    `--text-faint` so gradient headings/stats/links/labels clear WCAG AA).
  - Added `:focus-visible` rings on all controls + a skip link; `<main>` landmark;
    page-level `<footer>`; aria-labels on social glyph links.
  - Gradient-text solid-color fallback (forced-colors/print/old engines); `color-mix()`
    and `backdrop-filter` fallbacks for older Safari/Firefox.
  - Mobile menu: `visibility:hidden` when closed, Escape-to-close + focus management.
  - Koala easter egg no longer hijacks the brand-link navigation; tap targets bumped to
    44px; restored the canonical FENCE paper title; real 1200×630 PNG OG image.

### 2026-06-26 — Initial site
- Single-page static site, "eucalyptus aurora" koala theme. Hero with typewriter +
  animated stat counters + scroll reveals, experience timeline, publications, skills,
  education, contact. Light/dark toggle, responsive, `prefers-reduced-motion` aware.
  Easter eggs (koala facts, Konami code). GitHub Actions Pages workflow; downloadable
  résumé PDF. Content sourced from the résumé PDF + web research (LinkedIn, old site,
  GitHub, arXiv).
