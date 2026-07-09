# Diti Engineers

Marketing website for **Diti Engineers** — a precision casting manufacturer in Rajkot, Gujarat (CI, aluminum, and pressure die casting for motor, pump, and automotive OEMs).

**Live:** [diti-engineers.web.app](https://diti-engineers.web.app)

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+
- Firebase project access for deploy (`diti-engineers`)

## Stack

- **Vite 7** + **React 19** + **TypeScript**
- **React Router 7** — multi-page routing
- **Tailwind CSS 4** — design tokens in `src/index.css` (`@theme`)
- **Framer Motion** — scroll progress, section reveals, carousels
- **Radix UI** + shadcn-style components in `src/components/ui/`
- **Lucide** — icons
- **i18next** — English & French (`src/i18n/en.json`, `fr.json`)
- **Firebase Hosting** — production deploy to `dist/`

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, platform carousel, embedded page previews |
| `/about` | Company story and capabilities |
| `/products` | Product categories and gallery |
| `/services` | Manufacturing services |
| `/factory` | Factory overview |
| `/machinery` | Equipment and capacity |
| `/certificate` | Quality certificates |
| `/buyers` | Buyer testimonials |
| `/blog` | Articles and updates |
| `/contact` | Contact and quote request |

## Design

- **Typography:** Outfit (display), DM Sans (body), IBM Plex Mono (labels) — `src/theme/typography.ts`
- **Colors:** Steel blue accent on warm off-white canvas — `src/theme/colors.ts`
- **Content:** `data/business-profile.json` + i18n JSON files
- **Media:** Product photos, factory imagery, and process videos under `public/`

Design references and implementation notes:

- [`docs/design/brand-perception-and-visuals.md`](docs/design/brand-perception-and-visuals.md) — brand voice, visual system, layout rules
- [`docs/design/image-generation-prompts.md`](docs/design/image-generation-prompts.md) — asset generation prompts

## Data sources

| Source | Purpose |
|--------|---------|
| `data/business-profile.json` | Company profile, products, contact metadata |
| `src/data/*.ts` | Navigation, services, machinery, certificates, partner companies |
| `src/i18n/en.json` / `fr.json` | All user-facing copy (EN + FR) |
| `public/images/` / `public/videos/` | Static media served at build time |

Partner OEM names in the hero avatar stack are defined in `src/data/partner-companies.ts` with matching i18n keys under `hero.partners.*`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy to Firebase Hosting |
| `npm run deploy:preview` | Deploy to a Firebase preview channel |

### Deploy

Requires Firebase CLI access to the `diti-engineers` project (configured in `.firebaserc`, included as a dev dependency):

```bash
npm install
npx firebase login   # first time only
npm run deploy           # production
npm run deploy:preview   # preview channel
```

### Troubleshooting

| Issue | Fix |
|-------|-----|
| `firebase: command not found` | Run `npm install` — CLI is a dev dependency; scripts use `npx firebase` |
| Deploy auth errors | Run `npx firebase login` and confirm access to the `diti-engineers` project |
| Blank page after deploy | Ensure `firebase.json` rewrites all routes to `/index.html` (SPA) |
| Missing translations | Add keys to both `en.json` and `fr.json` before shipping UI copy |

## Project structure

```
data/business-profile.json     Business copy, products, contact metadata
public/images/                 Product and factory imagery
public/videos/                 Process and platform videos
src/
  pages/                       Route-level page components
  sections/                    Home and shared page sections
  components/
    layout/                    NavBar, Footer, RootLayout, PageHero
    contact/                   Quote sheet and contact helpers
    ui/                        shadcn-style primitives and blocks
    motion/                    Scroll, parallax, and animation helpers
  hooks/                       useMediaQuery, useScrollSpy
  data/                        Navigation, services, images, partner-companies
  theme/                       colors.ts, typography.ts
  i18n/                        en.json, fr.json
docs/
  design/                      Brand perception, theme notes, image prompts
  client-handoff/              Wireframe, theme, and content PDFs for stakeholders
firebase.json                  Hosting config (SPA rewrites → index.html)
```

## Conventions

- **Path aliases** — `@/` → `src/`, `@data/` → `data/` (see `vite.config.ts` and `tsconfig.app.json`)
- **Colors** — add tokens in `src/theme/colors.ts` and mirror in `src/index.css` `@theme`
- **Typography** — font families and scale in `src/theme/typography.ts`; mirror font tokens in `src/index.css`
- **Copy** — all user-facing strings in `src/i18n/en.json` and `fr.json`
- **UI components** — reusable blocks live in `src/components/ui/`

## Responsive design

Mobile behavior uses the shared `useMediaQuery` hook (`src/hooks/useMediaQuery.ts`):

- **Products gallery** — paginates 3 items per page below `639px` (`gallery-grid-block-shadcnui.tsx`)
- **About hero** — static image fallback instead of clipped video on mobile
- **Home embedded pages** — simplified scroll reveal below `767px`
- **Platform carousel** — touch-friendly swipe on small screens

When adding layout changes, prefer `useMediaQuery` over ad-hoc `window.innerWidth` checks so breakpoints stay consistent.

## Internationalization

The site supports **English** and **French**. All user-facing copy lives in:

- `src/i18n/en.json`
- `src/i18n/fr.json`

When adding or changing UI text:

1. Add the key to both `en.json` and `fr.json`
2. Use `useTranslation()` and `t("your.key")` in components
3. Language preference is stored in `localStorage` under `diti-engineers-lang`

## Documentation

| Folder | Purpose |
|--------|---------|
| [`docs/design/`](docs/design/brand-perception-and-visuals.md) | Brand, visual system, and implementation notes for developers |
| [`docs/client-handoff/`](docs/client-handoff/README.md) | Wireframe, theme, and content PDFs for stakeholder review |
| [`docs/superpowers/specs/`](docs/superpowers/specs/2026-06-26-phase-1-foundation-design.md) | Phase 1 foundation design spec |
