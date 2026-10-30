# Identity v3 — audit, decisions and results

Branch `identity-v3`, October 2026. This records what was found, what changed, why, and what is
still open, so future work starts from facts instead of re-auditing.

## 1. Audit (baseline: `main` at 32451d6)

**Architecture.** React 19 + Vite 8 single-page app in `frontend/`, deployed on Vercel. No router;
one component per section (`Hero`, `About`, `Stack`, `Work`, `Journey`, `Contact`) plus two
navigation layers (`Header`, `Dock`). All copy lives in `src/content/site.js` (EN/AR). Plain CSS
with design tokens (`src/styles/tokens.css`). Framer Motion via `LazyMotion` (async features),
lucide icons. Three.js / React Three Fiber are only used by the maintenance screen, which is
disabled and code-split — they never reach visitors. `backend/` (Express + .NET) is not deployed.

**Measured on the live site** (Lighthouse 12, simulated throttling):

| | Mobile | Desktop |
|---|---|---|
| Performance / A11y / Best practices / SEO | 93 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| FCP · LCP | 2.1 s · 2.4 s | 0.4 s · 0.5 s |
| TBT · CLS · Speed Index | 80 ms · 0 · 4.3 s | 0 ms · 0.007 · 0.6 s |

The mobile LCP element is the splash screen. Speed Index (4.3 s) is dominated by the ~3.7 s
splash that plays on every load. INP cannot be measured in the lab; it needs field data.

**What already worked (kept):** the CSS-3D brand mark as a process diagram, the handwritten
splash, the theme/language transitions themed after the two disciplines, real RTL, the "never fake
success" contact form, the strict content rule, the blueprint backdrop, the Journey scroll rail,
no percentage skill bars, solid keyboard and reduced-motion support.

**Problems found:**

1. **Critical — dead domain.** Canonical, `og:url`, `og:image`, sitemap, robots and JSON-LD all
   pointed at `anas-portfolio-rose-nine.vercel.app`, which returns 404. Shared links had no
   preview image and search engines were told the canonical page is a 404. The web CV's
   "Portfolio" link pointed there too.
2. **The contact form did not send.** The live build has no `VITE_WEB3FORMS_ACCESS_KEY`, so the
   form always falls back to opening the visitor's email app (honestly labelled, but not a form).
3. Theme and language were not remembered; switching language lost the reader's place.
4. The language toggle failed WCAG 2.5.3 (accessible name did not contain the visible "EN AR").
5. Three publicly reachable placeholder PDFs (`*_terms.pdf`, ~600 bytes, text "Placeholder").
6. Project details could not be linked to — a recruiter could not be sent one case study.
7. No analytics, so no way to know whether the site produces opportunities.
8. `npm install <new package>` fails with ERESOLVE (peer ranges around `@react-three/*`);
   `npm ci` works. `node_modules` was also partially missing (OneDrive sync), fixed by `npm ci`.
9. `backend/server.js` *simulates* sending email (logs "successfully dispatched" without sending).
   It is not deployed, but it is in a public repository recruiters may read.

## 2. Decisions

| Question | Decision | Why |
|---|---|---|
| WebGL / React Three Fiber in the hero? | **No.** Extend the existing CSS-3D mark instead. | The mark is already 6 real layers in 3D space with crisp, accessible text. R3F would add ~240 KB gzip to the critical path and continuous GPU work to draw the same flat layers, and would push mobile LCP past 2.5 s. |
| Where does 3D/scroll add value? | One moment: the **exploded view** of the brand mark on scroll. | It explains the brand (a product is layers of structure, design and build), is on-theme with the blueprint language, runs on mobile (unlike the pointer tilt), and costs only composited transforms. |
| Pinned scroll sections? | No. The mark trails the scroll a little instead. | Pinning adds scroll distance between a recruiter and the content. |
| Theme default | Dark, not the OS setting. Explicit choice remembered. | Black-first brand palette; owner's earlier deliberate choice. |
| Language default | English; explicit choice remembered; `?lang=ar` linkable. | Recruiter audience; Arabic becomes shareable and indexable (hreflang). |
| Splash | Kept on every load (owner's explicit choice), **skipped on deep links**. | Someone opening `/#work/portfolio` came for that project. See §5 for the trade-off. |
| Case-study pages | Deep-linkable dialog (`#work/<id>`), not a router. | Shareable, Back button works, no new dependency. Revisit when there are 4+ real projects. |
| Two contact paths | One form with a "Hiring or internship / A project" choice. | Two forms would duplicate logic and double the visual weight. |
| Analytics | Vercel Web Analytics, without the npm package, behind `VITE_ANALYTICS`. | Cookieless, no consent banner, ~1 KB. The package hit the ERESOLVE issue and is only a script tag anyway. |
| Insights section | **Not shipped yet.** | An empty "coming soon" blog hurts credibility. Build it with the first real article (see §6). |
| Resume center | Not built. | There is one CV. No Arabic CV exists and none was invented. |
| Projects (Ramz, Cache, Qoton, Employee Management System) | **Not added.** | No facts about them exist in the repo or CV ("Projects: SOON"). Inventing details would break the content rule. |

## 3. What changed (commits on `identity-v3`)

1. `33edbf3` Live domain everywhere (incl. web CV), WCAG 2.5.3 fix, placeholder PDFs removed.
2. `447cc2e` Remembered theme/language applied before first paint (inline script in
   `index.html` + `src/prefs.js`); `?lang=ar`, hreflang, per-language canonical; language switch
   keeps the reader's section and loads fonts under cover; both transitions ~25–35% shorter;
   `#work/<id>` case-study links; two-path contact; analytics hooks (`src/analytics.js`).
3. `2e87b4d` Scroll-driven exploded view of the mark (`ProcessMark`); sitemap with alternates.
4. `1adff1e` Transition scenes in an idle-prefetched chunk; no Arabic web font fetched for the
   hidden screen-reader label; lazy geometry for the exploded view.

## 4. Verification

Automated browser QA (Chrome via Puppeteer against the production build), all passing:

- no horizontal overflow at 320, 360, 390, 768, 1024, 1280, 1440, 1920 px, in English and Arabic;
- theme persists and is applied before first paint; `theme-color` follows;
- language switch: RTL applied, reader stays in the same section, `?lang=ar` and canonical
  update, choice persists;
- `/#work/portfolio` opens the case study without the splash; Escape lands on `#work`;
  opening by click updates the URL; Back closes it;
- contact path choice changes the prompt and is keyboard-operable;
- reduced motion: switches apply instantly with no overlay;
- zero console errors across all of the above.

Lint (oxlint) clean for `src/`. Production build passes.

## 5. Performance before / after (same machine, compressed local server, median of 3)

| | `main` | `identity-v3` |
|---|---|---|
| Mobile Performance | 92 | 91 |
| Mobile FCP · LCP | 2.41 s · 2.88 s | 2.41 s · 3.02 s |
| Mobile TBT · CLS | ~30 ms · 0.001 | ~35 ms · 0.001 |
| Desktop Performance · LCP · CLS | 100 · 0.61 s · 0.034 | 100 · 0.61 s · 0.034 |
| A11y / Best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| Main JS (gzip) | 123.9 KB | 124.1 KB |

The +0.14 s lab LCP appears with the exploded-view commit, yet reverting any single part of it
(extra SVG, scroll styling, CSS, copy) does not remove it, and the **unthrottled observed LCP is
identical (~850 ms)**. That pattern is Lighthouse's simulator rounding to whole network round
trips, not added work. Local numbers are higher than live because of the local server; the branch
has not been measured on Vercel yet.

The biggest remaining lever is the splash: it *is* the mobile LCP element and the whole Speed
Index. Showing it once per session (or shortening the hold) would improve both for real visitors.
That is the owner's call — it was deliberately set to "every load".

## 6. Needed from the owner

1. **Web3Forms key** (free, 1 minute at web3forms.com with anastarayra12@gmail.com) → add
   `VITE_WEB3FORMS_ACCESS_KEY` in Vercel → redeploy. Until then the form opens the email app.
2. **Analytics:** enable Web Analytics on the Vercel project, then set `VITE_ANALYTICS=vercel`.
   Page views work on every plan; custom events need a plan that includes them.
3. **Project facts** for Ramz, Cache, Qoton and the Employee Management System: your role, team,
   problem, what you built, stack, outcome, screenshots, live/repo links. Each becomes a case
   study in `site.js` with its own `#work/<id>` link.
4. **CV PDF:** it still links the dead domain and lists Projects as "SOON". Re-export after (3).
   An ATS-friendly variant (single column, no dark background) is recommended.
5. **Availability status** ("Available for work & collaborations"): confirm it is current.
6. Search Console: verify the domain and submit `/sitemap.xml`.
7. Decide on `backend/` (recommended: remove, since it simulates sending).

## 7. Roadmap

1. Case studies for the real projects (blocked on §6.3), then reconsider real routes + prerendered
   HTML per project for SEO.
2. Insights: Markdown files in `src/content/insights/` loaded with `import.meta.glob`, a section
   that renders only when at least one post exists, one URL per post.
3. Splash once per session (pending owner decision).
4. Subset the Arabic display font (Lalezar, 52 KB) — it loads on every first visit for the splash.
5. Resolve the `@react-three/*` peer conflict, or drop Three.js along with the maintenance screen.
