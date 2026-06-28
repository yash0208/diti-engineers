<div class="cover">

<div class="cover-top">
<span class="cover-accent"></span>
<p class="cover-brand">Diti Engineers</p>
<p class="cover-doc-type">Theme Guide</p>
<p class="cover-tagline">Visual identity, colour system, typography, spacing, and interaction standards for the Diti Engineers website.</p>
</div>

<div class="cover-bottom">
<table class="cover-meta">
<tr><td>Document</td><td>Theme & Design System</td></tr>
<tr><td>Version</td><td>1.0</td></tr>
<tr><td>Date</td><td>June 2026</td></tr>
<tr><td>Prepared by</td><td>Diti Engineers Web Team</td></tr>
<tr><td>Source files</td><td>src/theme/colors.ts · typography.ts · index.css</td></tr>
</table>
</div>

</div>

## Brand positioning

### One-line positioning

**Trusted Rajkot casting manufacturer for OEM buyers — precision-first, factory-backed, no fluff.**

### Perception pillars

| Pillar | Buyers should feel | Avoid |
|--------|-------------------|-------|
| Precision | Engineering-grade quality, repeatability | Generic quality claims without proof |
| Reliability | 13+ years, GST registered, repeat orders | Startup hype, casual tone |
| Capability | CI + aluminum + die casting under one roof | Single-product shop vibe |
| Local strength | Rajkot manufacturing hub, fast lead times | Generic template site |
| Premium craft | Modern site reflects modern factory | Dated brochure aesthetic |

### Audience

| Segment | Profile |
|---------|---------|
| Primary | Procurement managers, OEM engineering heads (motors, pumps, automotive) |
| Secondary | Export buyers, distributors, replacement parts buyers |

### Voice & tone

Professional · Reliable · Industry-focused · Straightforward

**Keywords:** casting, manufacturing, precision, motor parts, pump parts, OEM, Rajkot

---

## Visual direction

### Design read

B2B manufacturing site for procurement and OEM buyers. Light canvas with deep hero sections, steel-blue accent, editorial layouts, and purposeful scroll motion.

### Design dials

| Dial | Level | Application |
|------|-------|-------------|
| Layout variance | 7 / 10 | Editorial sections, not rigid 3-column grids |
| Motion intensity | 6 / 10 | Scroll reveals, carousels, marquees — no cinematic overload |
| Visual density | 4 / 10 | Airy hero, structured product grids, readable facts |

### Mood

| Use | Avoid |
|-----|-------|
| Warm off-white canvas (#F8F8F7) | AI purple gradients |
| Deep steel blue accent (#1B4FD8) | Neon cyberpunk palettes |
| Graphite dark sections (#0D0D0D) | Pure black #000 backgrounds |
| Industrial photography | Unrelated stock factory images |

---

## Colour system

All colours are defined in `src/theme/colors.ts` and exposed as CSS variables in `src/index.css`. **Do not hardcode hex values in components.**

### Primary palette

| Token | Hex | Usage |
|-------|-----|-------|
| `accentPrimary` | `#1B4FD8` | CTAs, active links, stats highlights, focus rings |
| `accentGradientStart` | `#1B4FD8` | Gradient start |
| `accentGradientEnd` | `#2563EB` | Gradient end |
| `accentMuted` | `#EEF2FF` | Badge backgrounds, subtle highlights |
| `accentSteel` | `#5B6B84` | Decorative mid-tones, secondary UI |

### Backgrounds & surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `canvas` | `#F8F8F7` | Default page background |
| `canvasDark` | `#0D0D0D` | Dark sections, video areas |
| `canvasDeep` | `#0B1929` | Hero depth, gradient bases |
| `surfaceCardLight` | `#FFFFFF` | Cards on light background |
| `surfaceCardDark` | `#181818` | Cards on dark background |
| `surfaceMuted` | `#F1F1F0` | Muted panels, input backgrounds |
| `surfaceElevated` | `#FFFFFF` | Elevated cards, modals |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `textHeadingLight` | `#141414` | Headlines on light sections |
| `textHeadingDark` | `#F5F5F5` | Headlines on dark sections |
| `textPrimaryLight` | `#3D4B5C` | Body copy on light sections |
| `textPrimaryDark` | `#D1D5DB` | Body copy on dark sections |
| `textMuted` | `#7A8696` | Captions, labels, eyebrows |
| `textOnDark` | `#FFFFFF` | Text on dark buttons / overlays |
| `textOnLight` | `#141414` | Text on light buttons |

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `borderLight` | `#E2E4E8` | Dividers, card borders |
| `borderDark` | `rgba(255,255,255,0.08)` | Dividers on dark sections |
| `borderGlass` | `rgba(255,255,255,0.18)` | Glass panels, overlays |

---

## Typography

Defined in `src/theme/typography.ts`. Loaded via Google Fonts in the site.

### Font families

| Role | Font | Character |
|------|------|-----------|
| Display | **Outfit** | Geometric, industrial, precise — headlines |
| Body | **DM Sans** | Clean, legible — paragraphs and UI |
| Mono | **IBM Plex Mono** | Engineering labels, badges, stats |

### Type scale

| Token | Size | Typical use |
|-------|------|-------------|
| `heroDisplay` | 6.125rem (98px) | Large hero display |
| `h1` | 3.5rem (56px) | Page headlines |
| `h2` | 2.25rem (36px) | Section titles |
| `sectionTitle` | 1.92rem (~31px) | Section headers |
| `h3` | 1.25rem (20px) | Card titles |
| `bodyLg` | 1.0625rem (17px) | Lead paragraphs |
| `body` | 1rem (16px) | Standard body |
| `eyebrow` | 0.6875rem (11px) | Section labels, uppercase |
| `caption` | 0.75rem (12px) | Meta text, footnotes |

### Weights & tracking

| Weight | Value | Use |
|--------|-------|-----|
| Regular | 400 | Body text |
| Medium | 500 | Eyebrows, labels |
| Semibold | 600 | Subheadings, buttons |
| Bold | 700 | Headlines, stats |
| Extrabold | 800 | Display emphasis |

Eyebrow tracking: `0.1em` uppercase. Display tracking: `-0.02em` to `-0.03em`.

---

## Spacing & layout

### Spacing tokens

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 8px | Tight gaps |
| `sm` | 12px | Icon gaps |
| `md` | 16px | Default inner padding |
| `lg` | 20px | Card padding |
| `xl` | 24px | Section inner gaps |
| `xxl` | 40px | Block separation |
| `xxxl` | 48px | Large section gaps |
| `xxxxl` | 64px | Hero padding |
| `nav` | 4rem | Nav offset (mobile) |
| `navLg` | 4.25rem | Nav offset (desktop) |

### Border radius

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 3px | Badges |
| `sm` | 5px | Small chips |
| `md` | 8px | Inputs |
| `base` | 10px | Cards (default) |
| `lg` | 14px | Large cards |
| `xl` | 18px | Modals, panels |
| `full` | 9999px | Pills, avatars |

### Elevation (shadows)

| Token | Use |
|-------|-----|
| `default` | Subtle resting state |
| `active` | Pressed / focused elements |
| `card` | Standard card shadow |
| `cardHover` | Card hover lift with blue tint |

### Layout conventions

| Pattern | Specification |
|---------|---------------|
| Max content width | `max-w-7xl` (`.container-main`) |
| Section padding | `py-12 md:py-16 lg:py-20` |
| Nav behaviour | Fixed top · blur backdrop · shadow on scroll |
| Grid | Responsive 1 → 2 → 3/4 columns |

---

## Components

### Navigation

Fixed header with logo left, mega menus centre, language toggle and Contact CTA right. Active route uses accent colour.

### Buttons

| Variant | Appearance |
|---------|------------|
| Primary | Steel blue fill, white text |
| Outline | Border + transparent, accent on hover |
| Ghost | Text only, accent on hover |

Minimum tap target: 44px on mobile.

### Cards

White surface on light canvas · 10px radius · card shadow · hover lift with `cardHover` shadow. Product and service cards include image, title, description, and optional tags.

### Forms

Inputs: muted surface background, light border, accent focus ring. Contact uses quick form + multi-step quote sheet (slide-over).

### Glass panel

Used on capabilities carousel — frosted overlay with border-glass, readable over video backgrounds.

### Tags & badges

Eyebrow style: uppercase, wide tracking, muted or accent-muted background.

---

## Motion & interaction

Stack: Framer Motion (`src/lib/motion.ts`, `src/components/motion/`)

| Pattern | Where | Spec |
|---------|-------|------|
| Stagger fade-up | Hero, section headers | ~0.2s stagger, 0.5s duration |
| Scroll reveal | Section entry | Fade + translate, viewport once |
| Carousel | Services, machinery, capabilities | Swipe + controls |
| Marquee | Trust strip, buyers | Linear infinite scroll |
| Nav transition | Header | Backdrop blur + shadow after 80px scroll |
| Form steps | Quote sheet | Slide transition between steps |

### Timing tokens

| Token | Value |
|-------|-------|
| `--duration-fast` | 160ms |
| `--duration-normal` | 250ms |
| `--duration-slow` | 400ms |
| `--ease-out` | cubic-bezier(0.23, 1, 0.32, 1) |

**Accessibility:** All motion respects `prefers-reduced-motion`.

---

## Imagery & content rules

| Asset type | Direction |
|------------|-----------|
| Hero | Real factory floor, casting lines, QC — not generic stock |
| Products | One photo per product line, consistent lighting |
| Machinery | Equipment nameplate visible where possible |
| Certificates | Scanned credentials, inspection stations |
| Video | Factory walkthrough, muted autoplay on web |

**i18n rule:** All user-facing strings live in `src/i18n/en.json` and `src/i18n/fr.json` — not inline in components.

---

## Do & don't

| Do | Don't |
|----|-------|
| Use theme tokens for colour and type | Hardcode hex or font sizes in components |
| Show GST, IndiaMART tenure, Rajkot location | Claim unverified ISO or certifications |
| Keep copy professional and specific | Use casual or hype language |
| Use real factory photography | Use unrelated stock images |
| Maintain 24-hour quote response promise | Over-promise lead times without qualification |
| Support EN and FR equally | Leave French strings missing |

---

*End of theme guide · Version 1.0 · June 2026*
