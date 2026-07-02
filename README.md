# Diti Engineers

Marketing website for **Diti Engineers**, a casting manufacturer in Rajkot, Gujarat. Multi-page React app with English and French localization, industrial design system, and Firebase Hosting deployment.

## Stack

- **Vite 7** + **React 19** + **TypeScript**
- **React Router 7** — multi-page routing
- **Tailwind CSS 4** — design tokens in `@theme`
- **Framer Motion** — scroll progress, section reveals, carousels
- **Radix UI** + **Lucide** — accessible primitives and icons
- **i18next** — English & French (`src/i18n/en.json`, `fr.json`)
- **Firebase Hosting** — production deploy (`firebase.json`)

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
| `/buyers` | Buyer information |
| `/blog` | Articles and updates |
| `/contact` | Contact and quote request |

## Design

- **Typography:** IBM Plex Sans (headings) + Inter (body) — `src/theme/typography.ts`
- **Colors:** Industrial palette (steel blue + copper accent) — `src/theme/colors.ts`
- **Content:** Business copy and metadata — `data/business-profile.json`
- **Media:** Product photos, factory imagery, and process videos under `public/`

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploy

Requires Firebase CLI access to the `diti-engineers` project (configured in `.firebaserc`).

```bash
npm run deploy           # production
npm run deploy:preview   # preview channel
```

## Project structure

```
data/business-profile.json     Business copy, products, contact metadata
public/images/                 Product and factory imagery
public/videos/                 Process and platform videos
src/
  pages/                       Route-level page components
  sections/                    Home and shared page sections
  components/layout/           NavBar, Footer, RootLayout, PageHero
  components/ui/               Reusable UI primitives and blocks
  components/motion/             Scroll, parallax, and animation helpers
  data/                        Typed content modules (machinery, services, etc.)
  theme/                       colors.ts, typography.ts
  i18n/                        en.json, fr.json
docs/client-handoff/           Wireframe, theme, and content references
```

## Client handoff

Design and content references for stakeholders live in [`docs/client-handoff/`](docs/client-handoff/README.md) (wireframe, theme, and content PDFs).
