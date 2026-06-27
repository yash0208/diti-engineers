# Diti Engineers — Landing Page

React + TypeScript landing page for **Diti Engineers**, a casting manufacturer in Rajkot, Gujarat.

Built following the [Landing Page Planner](file:///Users/I770238/cursor-planners/landing%20page%20planner/LANDING_PAGE_PLANNER.md) design system (Souvenir / Cavada pattern).

## Stack

- **Vite 7** + **React 19** + **TypeScript**
- **Tailwind CSS 4** — design tokens in `@theme`
- **Framer Motion** — hero collage, scroll progress, section fades
- **i18next** — English & French (`src/i18n/en.json`, `fr.json`)
- **Business data** — `data/business-profile.json`

## Design

- **Typography:** IBM Plex Sans (headings) + Inter (body)
- **Colors:** `src/theme/colors.ts` — industrial palette (steel blue + copper accent)
- **Layout:** Sticky nav, hero collage, split about, product cards, CTA banner, factsheet, contact form

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
data/business-profile.json
public/images/              Placeholder SVGs (replace with real photos)
src/
  sections/                 Hero, About, Products, CTA, Factsheet, Contact
  components/layout/        NavBar, Footer, SectionWrapper
  components/ui/            Button, Sheet, Hero collage, Footer
  theme/                    colors.ts, typography.ts
  i18n/                     en.json, fr.json
```

## Next steps

- Replace placeholder SVGs with factory/product photos
- Add mobile number and email to `business-profile.json`
- Wire contact form to email/API
- Optional: Business Manager CMS integration per planner Phase 5
