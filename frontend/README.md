# Anas Tarayra — Portfolio

Personal site of Anas Tarayra: Software Engineering student, full-stack developer and UI/UX designer.
Built with React 19 + Vite, designed from the brand guide in `../Brand_Identity_and_CV/`.

## Scripts

```bash
npm install
npm run dev       # local development
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/content/site.js` | **All copy (EN/AR), links and project data.** Edit content here. |
| `src/styles/tokens.css` | Design tokens: brand palette, type scale, spacing, radius, motion, themes. |
| `src/styles/base.css` | Reset, typography, layout primitives, buttons, tags, links. |
| `src/components/` | One component per section, each with its own CSS file. `Header` (identity + actions) and `Dock` (section navigation) are the two navigation layers; `ProcessMark` is the interactive brand mark in the hero; `Splash` is the “Hello” intro shown on every load except deep links (skippable); `SwitchFx` hosts the theme/language transitions (scenes in `SwitchFxScenes`, loaded when idle); `Backdrop` is the site-wide blueprint grid, pointer spotlight, ambient light and grain. |
| `src/components/ui/` | Shared primitives: `BrandMark`, `Reveal`, `Magnetic`, `SectionHead`, icons. |
| `src/prefs.js` | Theme / language persistence. The inline script in `index.html` applies saved values before first paint — keep the keys in sync. |
| `src/analytics.js` | Optional cookieless Vercel Web Analytics and the tracked events. |
| `src/config/maintenanceConfig.js` | Maintenance screen toggle. |
| `public/` | Fonts (WOFF2), CV files, favicon/OG image, robots.txt, sitemap.xml. |

## Content rule

Only publish facts that can be verified (CV, brand guide, this repo). To add a case study, append an
object to `work.projects` in both `en` and `ar` in `src/content/site.js`, and add a preview component
in `src/components/ProjectPreviews.jsx`.

## Maintenance mode

`maintenanceConfig.enabled = true` shows the 3D maintenance screen to visitors. The live site can be
previewed with `?preview=true` or **Ctrl + Shift + M**. Set it to `false` to publish the site.

## Contact form

Set `VITE_WEB3FORMS_ACCESS_KEY` (see `.env.example`) to deliver messages through Web3Forms. Without a
key, the form opens the visitor's email app with the message pre-filled — it never reports a fake success.

## Links, preferences and analytics

- Every case study has its own address: `/#work/<project id>` (e.g. `/#work/portfolio`).
- `/?lang=ar` opens the Arabic site; an explicit language or theme choice is remembered per visitor.
- Analytics are off unless `VITE_ANALYTICS=vercel` is set (enable Web Analytics in Vercel first).

The October 2026 audit, design decisions, measurements and open items are in
[`../docs/identity-v3.md`](../docs/identity-v3.md).
