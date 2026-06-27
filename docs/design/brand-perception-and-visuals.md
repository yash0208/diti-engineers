# Diti Engineers — Brand Perception & Visual System

> Reference doc for design, copy, and implementation.  
> Design direction inspired by [Dipa Inhouse](https://www.dipainhouse.com/) — adapted for B2B manufacturing, not copied.

---

## 1. Brand Perception (How we should feel)

### One-line positioning
**Trusted Rajkot casting manufacturer for OEM buyers — precision-first, factory-backed, no fluff.**

### Perception pillars

| Pillar | What buyers should feel | What to avoid |
|--------|-------------------------|---------------|
| **Precision** | Engineering-grade quality, dimensional accuracy, repeatability | Generic “best quality” claims without proof |
| **Reliability** | 13+ years, GST registered, mid-scale turnover, repeat orders | Startup hype, casual tone |
| **Capability** | CI + aluminum + die casting under one roof | Single-product shop vibe |
| **Local strength** | Rajkot/Gujarat manufacturing hub, fast lead times | Looking like a foreign template site |
| **Premium craft** | Modern site = modern factory (Dipa-level polish) | Dated IndiaMART brochure aesthetic |

### Target audience
- **Primary:** Procurement managers, OEM engineering heads (motors, pumps, automotive)
- **Secondary:** Export buyers, distributors, replacement parts buyers
- **Decision drivers:** Price per kg/unit, material consistency, lead time, specialization

### Brand voice
- **Tone:** Professional, reliable, industry-focused, straightforward
- **Keywords:** casting, manufacturing, precision, motor parts, pump parts, OEM, Rajkot
- **Avoid:** Overly casual language, unverified certification claims

### Trust signals (use visibly on site)
- 13+ years on IndiaMART
- GST registered since July 2017
- Annual turnover: 5–25 Cr INR
- Factory / manufacturing facility in Rajkot
- Proprietor: H Rangani

---

## 2. Visual Direction (Dipa-inspired, Diti-adapted)

### Design read
**B2B manufacturing landing for procurement/OEM buyers, with a premium agency-scroll language (Dipa Inhouse), leaning toward dark hero + light sections + purposeful Framer Motion.**

### Three dials (from design-taste-frontend)
- **DESIGN_VARIANCE:** 7 — editorial layouts, not rigid 3-column grids everywhere
- **MOTION_INTENSITY:** 6 — scroll reveals, counters, marquees; no cinematic overload
- **VISUAL_DENSITY:** 4 — airy hero, structured stats/products, readable factsheet

### Reference vs. adaptation

| Dipa Inhouse | Diti Engineers adaptation |
|--------------|---------------------------|
| Dark agency hero | Dark industrial hero (steel/graphite, warm accent) |
| “aesthetically” keyword swap | “motors / pumps / automotive” keyword swap |
| UI/UX case study cards | Product category cards with material tags |
| Client testimonials | Buyer trust quotes / IndiaMART credibility |
| Lighthouse metrics | Quality metrics (grades, lead time, capacity) |
| Awards marquee | Certifications + GST + IndiaMART tenure |
| Multi-step “Start Project” | Multi-step “Get Best Price” quote form |

---

## 3. Color System

**Rule:** All colors live in `src/theme/colors.ts` and `src/index.css` — never hardcode hex in components.

### Proposed tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `canvas` | `#0f1114` | Hero background, dark sections |
| `canvasLight` | `#f7f8fa` | Alternating light sections |
| `surfaceCard` | `#ffffff` / `#1a1d21` | Cards on light / dark |
| `surfaceDefault` | `#eef1f5` | Muted panels |
| `accentPrimary` | `#e07a20` | CTAs, stats, active nav (warm industrial orange) |
| `accentSecondary` | `#2a5f8f` | Eyebrows, links, steel blue |
| `accentSteel` | `#8fa8bc` | Decorative elements, borders on dark |
| `textHeading` | `#111827` light / `#ffffff` dark | Headlines |
| `textPrimary` | `#374151` light / `#e5e7eb` dark | Body |
| `textMuted` | `#9ba3af` | Captions, labels |
| `borderDefault` | `#e4e7eb` light / `rgba(255,255,255,0.08)` dark | Dividers |

### Color mood
- **Not:** AI purple gradients, neon cyberpunk, pure black #000
- **Yes:** Graphite base, warm orange accent (molten metal / heat), steel blue secondary

---

## 4. Typography

| Role | Font | Size / weight | Notes |
|------|------|---------------|-------|
| Display | Plus Jakarta Sans or DM Sans | 56–72px / 700 | Hero H1, section titles |
| Body | Inter | 16–18px / 400 | Paragraphs, forms |
| Eyebrow | Inter | 14px / 500, uppercase, 0.08em tracking | Section labels |

**Tokens:** `src/theme/typography.ts`  
**Utilities:** `.text-body-lg`, `.text-eyebrow` in `src/index.css`

---

## 5. Layout & Section Flow

```
[Optional top marquee — brand line]
[Sticky nav — transparent → blur on scroll]
[Hero — full viewport, dark, animated headline]
[Trust strip — “Serving OEM buyers…”]
[Stats — 4 metrics with count-up]
[Products — portfolio cards, hover reveal]
[Testimonials — carousel]
[Production showcase — factory + quality metrics]
[Trust / awards marquee]
[CTA banner — full width]
[Contact — multi-step quote form]
[Footer]
```

### Spacing
- Section padding: `py-12 md:py-16 lg:py-20` (`.section-padding`)
- Container: `max-w-7xl` (`.container-main`)
- Card radius: `15px` (`rounded-base`)

---

## 6. Motion Language

**Stack:** Framer Motion (`src/lib/motion.ts`, `src/components/motion/`)

| Pattern | Where | Spec |
|---------|-------|------|
| Stagger fade-up | Hero text, section headers | 0.2s stagger, 0.5s duration |
| Keyword vertical swap | Hero H1 | 3 words, 3s interval, ease out |
| Scroll fade-in | All sections | `FadeIn`, viewport once, -50px margin |
| Count-up | Stats bar | 0 → target over 1.2s on view |
| Card hover | Product cards | scale 1.03 image, -translate-y-1, tag fade-in |
| Marquee | Trust logos, awards | 30–40s linear infinite |
| Nav transition | Header | bg opacity 0 → 0.95 + backdrop-blur on scroll |
| Form steps | Contact drawer | AnimatePresence slide left/right |

**Always:** Respect `prefers-reduced-motion` (already implemented).

### Motion tokens
```ts
duration: { fast: 0.15, normal: 0.35, slow: 0.6, hero: 0.8 }
ease: { default: [0.25, 0.1, 0.25, 1], out: [0.16, 1, 0.3, 1] }
stagger: 0.08
```

---

## 7. Component Patterns

### Nav
- Logo + name left, links center, “Get Quote” pill right
- Mobile: Sheet drawer (existing)
- Active link: accent color + optional layoutId underline

### Hero
- Full viewport min-height
- Eyebrow: “Manufacturer · Rajkot, Gujarat”
- Headline with rotating keyword
- Two CTAs: “Get Best Price” (primary), “Contact Supplier” (outline)
- Optional: subtle parallax grain or factory photo at 20% opacity

### Product card (portfolio style)
- 16:10 image top
- Title + short description
- Tags: `CI Casting`, `Aluminum`, `Die Casting`, etc.
- Hover: “View details” or scroll to contact

### Stats
- 13+ years | 5–25 Cr turnover | GST 2017 | 15+ product lines

### Contact form (multi-step)
1. Product / application
2. Volume / material
3. Email + company
4. Submit → “We respond within 24 hours”

---

## 8. Content Sources

| Content | Source file |
|---------|-------------|
| Business data | `data/business-profile.json` |
| English copy | `src/i18n/en.json` |
| French copy | `src/i18n/fr.json` |
| Images | `src/data/images.ts` (populate from IndiaMART / generated assets) |

**Rule:** All user-facing strings in i18n JSON — never inline in TSX.

---

## 9. SEO

- **Title:** Diti Engineers | CI & Aluminum Casting Manufacturer in Rajkot
- **Description:** Manufacturer of CI casting, aluminum pressure die casting, motor body castings, pump parts, and auto component castings. Based in Rajkot, Gujarat.

---

## 10. Anti-patterns (do not do)

- Generic three equal feature cards with icon + title + blurb
- Purple/blue AI SaaS gradient hero
- Stock photos of random factories unrelated to casting
- Hardcoded English strings in components
- Hardcoded colors outside theme files
- Over-animation (everything bouncing at once)
- Unverified “ISO certified” unless documented in profile

---

*Last updated: 2026-06-26*
