# Anas Tarayra — Portfolio website

Personal website of Anas Tarayra, UI/UX Designer & Front-End Developer.
React 19 + Vite, bilingual (English / Arabic with real RTL), dark and light themes.
Live: https://anas-tarayra.vercel.app/

## Run it

```bash
npm install
npm run dev       # local development
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Where to change things

| I want to change… | Edit |
| --- | --- |
| Any text, in either language | `src/content/en.js` · `src/content/ar.js` |
| A project (text, links, colours, tech) | `src/content/projects.js` — screenshots in `public/projects/<id>-desktop|detail|mobile.webp` |
| Skills, tools, certificates | `src/content/skills.js` — certificate images in `public/courses/` |
| The UI/UX case study | `src/content/design.js` — screens cut from the design board in `public/design/soun/` |
| Email, phone, social links, CV file | `src/content/links.js` — the CV itself is `public/Anas_AL-Tarayra-CV.pdf` |
| Colours, fonts, spacing, radius, motion | `src/styles/tokens.css` (brand tokens, dark + light themes) |
| Buttons, labels, section header, tags | `src/styles/base.css` |
| One section's layout | `src/sections/<section>/` — each has its `.jsx` and `.css` side by side |
| Maintenance screen on / off | `src/maintenance/maintenanceConfig.js` |

## Structure

```
src/
├── content/        all copy and data (en, ar, projects, design, skills, links)
├── sections/       one folder per page section
│   ├── hero/       Hero + ProcessMark (the interactive brand mark)
│   ├── about/      About + IdBadge (3D flip card)
│   ├── skills/     "What I Use" — tools tied to their certificates
│   ├── projects/   "What I've Built" — ProjectStage (3D scroll, desktop),
│   │               ProjectList (mobile / reduced motion), ProjectDialog, ProjectDevice
│   ├── design/     "What I've Designed" — UI/UX case study: screens (desktop / mobile /
│   │               components), full-size lightbox, booking journey, foundations
│   ├── journey/    "How I Got Here"
│   └── contact/    "Let's Build Something" — every contact channel, no form
├── components/
│   ├── layout/     Header, Dock (section navigation), Footer, Backdrop
│   ├── controls/   LanguageSwitch, ThemeSwitch
│   ├── effects/    Splash ("hello" intro), SwitchFx (theme / language transitions)
│   ├── brand/      BrandMark (the logo, coloured by --mark-* tokens)
│   └── ui/         Reveal, SectionHead, Magnetic, brand icons
├── context/        Theme, Language and Intro providers
├── hooks/          useActiveSection, useMediaQuery
├── lib/            prefs (saved theme/language), switchFx bridge, analytics, helpers
├── maintenance/    optional 3D maintenance screen (Three.js, loaded only when enabled)
└── styles/         tokens.css, base.css
```

## How the main pieces work

- **Theme & language** — the inline script in `index.html` applies the saved choice before
  first paint (keys must match `src/lib/prefs.js`). Switching plays a transition from
  `components/effects/SwitchFx*`; the page swaps while the screen is covered.
- **3D projects** — `ProjectStage` pins the section and maps scroll progress to a camera
  position along the projects (`d = pos − index`). Shown only on wide, tall-enough screens
  without reduced motion; everyone else gets `ProjectList`. Each project has a shareable URL
  (`#projects/<id>`) that opens its detail dialog.
- **Performance** — animation features load lazily, transition scenes load when idle,
  Three.js is split out for the maintenance screen only, fonts are WOFF2 with preload,
  screenshots are WebP (17–54 KB).

## Content rule

Every fact comes from the CV (`public/Anas_AL-Tarayra-CV.pdf`), the live projects themselves or
this repository. Never add experience, skills, metrics or clients that cannot be verified.

## Versions

See `../CHANGELOG.md`. Releases are tagged `vMAJOR.MINOR.PATCH` (v1.0.0 = this redesign).
