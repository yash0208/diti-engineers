# Phase 1 Foundation — Design Spec (REVISED)

**Date:** 2026-06-26
**Scope:** Nuke current sections + components/ui. Stand up foundation (tokens, typography, motion primitives, skeletal app).
**Parent doc:** `docs/design/claude-implementation-prompt.md`
**Brand reference:** `docs/design/brand-perception-and-visuals.md`

## Decision: scorched earth on the current UI

User direction: "delete everything we don't need anything from current state and make sure things are centralized and tokenized." Phase 1 now does both jobs — wipe the bad foundation AND lay the new one — so subsequent phases are pure greenfield.

After Phase 1 the running site will show a **minimal dark holding page** (logo + tagline + "Site rebuilding — Phase 1 complete") so the dev preview isn't broken while Phases 2–5 land. No half-rebuilt sections sitting around.

## What gets deleted

```
src/sections/AboutSection.tsx
src/sections/ContactSection.tsx
src/sections/CtaBannerSection.tsx
src/sections/FactsheetSection.tsx
src/sections/HeroSection.tsx
src/sections/ProductsSection.tsx
src/components/ui/button.tsx
src/components/ui/footer.tsx
src/components/ui/hero-section-9.tsx
src/components/ui/sheet.tsx
src/components/layout/Footer.tsx
src/components/layout/NavBar.tsx
src/components/layout/SectionWrapper.tsx
src/components/shared/LanguageToggle.tsx   (rebuilt in a later phase as part of Nav)
src/components/motion/FadeIn.tsx
```

Empty directories `src/components/sections/`, `src/styles/`, `src/i18n/locales/` also removed.

`src/data/images.ts` → kept as the registry contract but emptied to a single `placeholder` entry. Real slots are added back per-phase as components consume them.

`src/i18n/en.json` and `src/i18n/fr.json` → reduced to a minimal `app.placeholder` namespace for the holding page. Old keys removed. Each phase reintroduces only the keys it actually uses. This is the only way to enforce "no orphan keys."

## What gets kept

- `src/main.tsx`, `src/index.css` (rewritten), `src/App.tsx` (rewritten)
- `src/theme/*` (rewritten — see below)
- `src/lib/utils.ts` if present (untouched)
- `src/lib/motion.ts` (rewritten)
- `src/components/motion/ScrollProgress.tsx` (kept, minor update to consume smoothed scroll)
- `src/i18n/index.ts` (config kept; resources rewired to the trimmed JSON)
- `src/hooks/useScrollSpy.ts` (kept; used by future Nav)
- `src/data/profile.ts` + `data/business-profile.json` (untouched — source of truth)
- `docs/`, `public/`, build config, lockfile — untouched

## Token system — `src/theme/colors.ts` + `src/index.css`

Final color tokens (camelCase TS / kebab-case CSS):

```
canvas              #0f1114
canvasLight         #f7f8fa
surfaceCardLight    #ffffff
surfaceCardDark     #1a1d21
surfaceMuted        #eef1f5
accentPrimary       #e07a20
accentSecondary     #2a5f8f
accentSteel         #8fa8bc
textHeadingLight    #111827
textHeadingDark     #ffffff
textPrimaryLight    #374151
textPrimaryDark     #e5e7eb
textMuted           #9ba3af
borderLight         #e4e7eb
borderDark          rgba(255,255,255,0.08)
```

No legacy tokens. `src/index.css` `@theme` block lists exactly these names. Tailwind v4 utilities: `bg-canvas`, `text-accent-primary`, `border-border-light`, etc.

`src/theme/index.ts` re-exports `colors`, `typography`, and (new) `motionTokens` for one-stop import.

## Typography — `src/theme/typography.ts` + `index.html` + `src/index.css`

- `index.html`: add `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`, and a single `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`.
- `src/theme/typography.ts`:
  ```ts
  export const typography = {
    display: '"Plus Jakarta Sans", "DM Sans", system-ui, sans-serif',
    body:    'Inter, system-ui, sans-serif',
    size:    { display: '4.5rem', h1: '3.5rem', h2: '2.25rem', h3: '1.5rem', body: '1rem', bodyLg: '1.125rem', eyebrow: '0.875rem', caption: '0.75rem' },
    weight:  { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
    leading: { tight: 1.1, snug: 1.25, normal: 1.5, relaxed: 1.625 },
    tracking:{ tight: '-0.02em', normal: '0', wide: '0.02em', eyebrow: '0.08em' },
  } as const;
  ```
- `src/index.css`:
  - CSS variables `--font-display` and `--font-body` set from the typography object.
  - `body { font-family: var(--font-body); background: var(--color-canvas); color: var(--color-text-primary-dark); }`
  - Utility classes: `.font-display`, `.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-body-lg`, `.text-eyebrow` (uppercase + 0.08em tracking + 500 weight), `.section-padding` (`py-16 md:py-24 lg:py-28`), `.container-main` (`mx-auto max-w-7xl px-6 md:px-10`), `.rounded-base` (15px).

## Motion tokens — `src/lib/motion.ts`

```ts
export const motionTokens = {
  duration: { fast: 0.18, normal: 0.4, slow: 0.7, hero: 1.0 },
  ease: {
    default: [0.25, 0.1, 0.25, 1] as const,
    out:     [0.16, 1, 0.3, 1]    as const,
    inOut:   [0.65, 0, 0.35, 1]   as const,
  },
  stagger: { tight: 0.06, default: 0.09, loose: 0.14 },
} as const;
```

Keep `useReducedMotion`. `getMotionTransition(reduced, durationKey?, easeKey?)` updated to accept token keys.

## Motion primitives — `src/components/motion/`

All new files. Named exports. All short-circuit on `useReducedMotion() === true`. Animate `transform`/`opacity` only.

| File | Export | Purpose |
|------|--------|---------|
| `SmoothScrollProvider.tsx` | `SmoothScrollProvider`, `useSmoothScroll` | Mounted once at App root. `useScroll` + `useSpring` (stiffness 80, damping 20, mass 0.4) → smoothed `scrollY` motion-value via React context. Falls back to raw `useScroll()` if no provider. |
| `useScrollProgress.ts` | `useScrollProgress(ref, offset?)` | Thin wrapper over framer-motion `useScroll({ target, offset })`. Default offset `['start end', 'end start']`. |
| `Parallax.tsx` | `Parallax` | `y?: [n,n]` default `[-40,40]`, `x?`, `className?`. Internal ref + `useScrollProgress` + `useTransform`. |
| `RevealOnScroll.tsx` | `RevealOnScroll` | Props: `as?`, `delay?`, `y?` (24), `duration?` token key (`normal`), `easeKey?` (`out`), `once?` (true). `useInView` margin `0px 0px -10% 0px`. |
| `KeywordSwap.tsx` | `KeywordSwap` | `words: string[]`, `interval?` (2800). `AnimatePresence mode="popLayout"`. Stable width via hidden longest-word grid trick. |
| `CountUp.tsx` | `CountUp` | `to`, `from?` (0), `duration?` (1.2), `format?: (n)=>string`. `useInView` once + animated `useMotionValue` written to ref. |
| `Marquee.tsx` | `Marquee` | `speed?` px/s (60), `pauseOnHover?` (true). CSS-only animation (cheaper than JS rAF for a continuous loop). |
| `MagneticButton.tsx` | `MagneticButton` | `as?: 'a' \| 'button'`, `strength?` (0.3), capped at 8px. `useMotionValue` + `useSpring` (stiffness 200, damping 20). Disabled on `(pointer: coarse)`. |
| `ScrollProgress.tsx` | `ScrollProgress` | EXISTING. Update to read smoothed scrollY from context. |
| `index.ts` | barrel | Re-exports all above. **No FadeIn.** |

## App skeleton — `src/App.tsx`

```tsx
import { SmoothScrollProvider, ScrollProgress } from "@/components/motion";
import { useTranslation } from "react-i18next";

export function App() {
  const { t } = useTranslation();
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <main id="main-content" className="min-h-screen bg-canvas text-text-primary-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-eyebrow text-accent-primary">{t("app.placeholder.eyebrow")}</p>
          <h1 className="font-display text-h1 text-text-heading-dark mt-4">{t("app.placeholder.title")}</h1>
          <p className="text-body-lg text-text-muted mt-4">{t("app.placeholder.subtitle")}</p>
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
```

Holding page text:
- eyebrow: `"Diti Engineers"`
- title: `"Rebuilding."`
- subtitle: `"Premium foundry site shipping soon — Phase 1 of 5 complete."`

(All in `en.json` + `fr.json`, both languages.)

## i18n — minimal `en.json` + `fr.json`

Both files reduced to:

```json
{
  "app": {
    "placeholder": {
      "eyebrow": "Diti Engineers",
      "title": "Rebuilding.",
      "subtitle": "Premium foundry site shipping soon — Phase 1 of 5 complete."
    }
  }
}
```

(French versions translated.) Every later phase adds the keys it needs. No orphan keys ever.

## `src/data/images.ts` — emptied

```ts
export const imageRegistry = {
  placeholder: "/images/placeholder.svg",
} as const;

export type ImageKey = keyof typeof imageRegistry;
```

A `public/images/placeholder.svg` is added — a 4:3 dark graphite rectangle (`#1a1d21`) with a thin orange (`#e07a20`) diagonal stripe.

## index.html

- Title: `"Diti Engineers — Casting Manufacturer · Rajkot"`
- Meta description from brand doc.
- Theme color `#0f1114`.
- Font preconnect + stylesheet link.
- No favicon change in Phase 1.

## Verification checklist (run before declaring done)

- [ ] `grep -rn '#[0-9a-fA-F]\{3,8\}' src/ --include='*.tsx' --include='*.ts'` returns ZERO results outside `src/theme/colors.ts`
- [ ] `grep -rn 'FadeIn' src/` returns ZERO results
- [ ] `grep -rn '"[A-Z][a-z].*"' src/App.tsx src/components/` shows no hardcoded English strings in JSX text positions (false positives in className strings are OK and can be ignored)
- [ ] `en.json` and `fr.json` have identical key structure (`diff <(jq 'paths' en.json) <(jq 'paths' fr.json)` is empty)
- [ ] All motion primitives import `useReducedMotion` and have an early-return branch
- [ ] App renders the holding page with the dark canvas, orange eyebrow, white title
- [ ] No TS errors (read each file end-to-end after writing; user runs `npm run build` if they want CI confidence)

## Out of scope for Phase 1

- Real hero, nav, products, etc. — those are Phases 2–5
- Lenis (locked: framer-motion-only smooth scroll for now)
- Favicon, OG image, manifest
- Image generation (user-supplied externally)

## Phase 1 done = ready for Phase 2

Definition of done: deletions complete, foundation files written, holding page renders, build type-checks, no orphan keys, no hex outside theme.

---
