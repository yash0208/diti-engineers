<div class="cover">

<div class="cover-top">
<span class="cover-accent"></span>
<p class="cover-brand">Diti Engineers</p>
<p class="cover-doc-type">Website Wireframe</p>
<p class="cover-tagline">Layout, page structure, navigation, and scroll behaviour for the Diti Engineers manufacturing website.</p>
</div>

<div class="cover-bottom">
<table class="cover-meta">
<tr><td>Document</td><td>Wireframe Reference</td></tr>
<tr><td>Version</td><td>1.0</td></tr>
<tr><td>Date</td><td>June 2026</td></tr>
<tr><td>Prepared by</td><td>Diti Engineers Web Team</td></tr>
<tr><td>Companion docs</td><td>Theme Guide · Content Guide</td></tr>
</table>
</div>

</div>

## Purpose & scope

This document defines **where content sits on each page**, how users move through the site, and how the homepage scroll experience connects to standalone routes.

| Use this doc for | Use the Content Guide for | Use the Theme Guide for |
|------------------|----------------------------|-------------------------|
| Page layout & blocks | Headlines, copy, labels | Colours, fonts, spacing |
| Navigation structure | Product names & descriptions | Buttons, cards, motion |
| Section order | Placeholder flags | Visual tone & brand rules |

**Languages:** English and French (toggle in navigation).

---

## Site map

| Route | Page | Primary goal |
|-------|------|--------------|
| `/` | Home | Convert visitors; preview full site in one scroll |
| `/about` | About | Company credibility and factory positioning |
| `/products` | Products | Browse cast components by category |
| `/services` | Services | Explain casting processes |
| `/blog` | Blog | Manufacturing insights |
| `/buyers` | Buyers | Testimonials and trust signals |
| `/factory` | Factory Tour | Video proof of production |
| `/machinery` | Machinery | Equipment and production lines |
| `/certificate` | Certificates | Compliance and vendor onboarding |
| `/contact` | Contact | Lead capture and quote requests |

**Homepage scroll order** (embedded full-screen previews):

Products → Services → About → Blog → Machinery → Certificates → Buyers → Factory Tour → Contact → Footer

---

## Global layout

Every page shares a fixed top navigation bar and (on Home) a footer at the end of the scroll stack.

### Navigation bar

```
┌────────────────────────────────────────────────────────────────────────┐
│  Diti Engineers   Home  Products  [Capabilities ▼]  [Company ▼]  EN  [Contact us] │
└────────────────────────────────────────────────────────────────────────┘
```

| Zone | Elements |
|------|----------|
| Brand | Logo / name → Home |
| Primary links | Home · Products |
| Capabilities menu | 6 services → `/services#[slug]` |
| Company menu | About · Blog · Machinery · Certificate · Buyers · Factory Tour |
| Utilities | Language toggle (EN / FR) · Contact CTA |

**Mobile:** Hamburger sheet with grouped links, language toggle, and Contact button.

### Footer (Home)

Four columns: Newsletter signup · Quick links · Contact details · Social & legal links.

---

## Home page

### Section A — Hero

| Block | Placement | Notes |
|-------|-----------|-------|
| Location badge | Top-left content column | Links to capabilities section |
| Headline (2 lines) | Centre-left | Primary value proposition |
| Subheading | Below headline | CI, aluminum, pressure die |
| CTAs | Below subheading | Contact us · Learn more |
| Email capture | Below CTAs | Routes to Contact |
| Image strips | Right / background (desktop) | Decorative factory imagery |

### Section B — Capabilities carousel

| Block | Placement | Notes |
|-------|-----------|-------|
| Full-bleed media | Background | Video or image per tab |
| Glass panel | Overlay, lower area | Tab content |
| 3 tabs | Inside panel | CI · Aluminum · Pressure Die |
| Slide controls | Panel footer | Prev / dots / next |

### Section C — Embedded page previews

Each block fills approximately one viewport height and scroll-reveals into view.

| Order | Section ID | Key blocks |
|-------|------------|------------|
| 1 | `#products` | Headline · filter tags · 15-item gallery |
| 2 | `#services` | Headline · 6-service feature carousel |
| 3 | `#about` | Video hero · stats · headline · body · CTA |
| 4 | `#blog` | Featured post + 3 post cards |
| 5 | `#machinery` | Headline · 4-card equipment carousel |
| 6 | `#certificate` | Headline · scroll-synced gallery |
| 7 | `#buyers` | Trust marquee · testimonials |
| 8 | `#factory` | Scroll-scaled video · CTAs |
| 9 | `#contact` | Video background · contact card + form |

```
┌ NAV ────────────────────────────────────────────────────────────────┐
│ HERO                                                                │
├─────────────────────────────────────────────────────────────────────┤
│ CAPABILITIES CAROUSEL                                               │
├─────────────────────────────────────────────────────────────────────┤
│ PRODUCTS  │  SERVICES  │  ABOUT  │  BLOG  │  MACHINERY             │
│ CERTIFICATES  │  BUYERS  │  FACTORY  │  CONTACT                     │
├─────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Inner pages

Standalone routes reuse the same components as their Home embed. Layout summaries below.

### About (`/about`)

| Region | Content blocks |
|--------|----------------|
| Header row | Eyebrow · quick-link icons (Services, Certificate, Contact) |
| Hero | Clipped video shape · quote-response stat (desktop) |
| Stats | 13+ years · 5–25 Cr turnover |
| Main grid | Headline + 2 body columns · company name + CTA sidebar |

### Products (`/products`)

| Region | Content blocks |
|--------|----------------|
| Header | Headline · subheading |
| Filters | All · Cast Iron · Aluminum · Pressure Die · Motor · Pump · Automotive |
| Gallery | 15 product cards in responsive grid |

**Layout:** Full viewport height on standalone route.

### Services (`/services`)

| Region | Content blocks |
|--------|----------------|
| Header | Eyebrow · headline (2 lines) |
| Carousel | 6 service cards with image, icon, description |

### Buyers (`/buyers`)

| Region | Content blocks |
|--------|----------------|
| Marquee | GST · IndiaMART · Rajkot · turnover trust strip |
| Header | Eyebrow · headline |
| Grid | 9 testimonial cards |

### Factory Tour (`/factory`)

| Region | Content blocks |
|--------|----------------|
| Video | Scroll-scaled factory footage |
| Copy | Eyebrow · headline · subheading |
| Actions | Play full video · Request a quote |

### Machinery (`/machinery`)

| Region | Content blocks |
|--------|----------------|
| Header | Eyebrow · headline · subtitle |
| Carousel | 4 equipment cards with stats |

### Certificates (`/certificate`)

| Region | Content blocks |
|--------|----------------|
| Header | Headline (2 lines) |
| Gallery | 5 scroll-synced images with lightbox |
| Supporting | Credential cards · company factsheet |

### Blog (`/blog`)

| Region | Content blocks |
|--------|----------------|
| Featured | Full-width post card with video/image |
| Grid | 3 supporting post cards (asymmetric on desktop) |

### Contact (`/contact`)

| Region | Content blocks |
|--------|----------------|
| Background | Looping muted video |
| Card | Quick form (name, email, phone, message) |
| Details | Opening hours · email · phone · address |
| Modal | 4-step quote wizard (slide-over) |

**Quote wizard steps:** Part type → Volume & material → Contact info → Review → Confirmation

---

## User flows

### New visitor → quote

Home hero → Contact us or email capture → Contact page → Quick form or quote wizard → Confirmation

### Procurement research

Products (filter & browse) → Services → Machinery / Factory / Certificates → Contact

### Homepage discovery

Scroll Hero → Capabilities → Embedded previews → Full page or Footer newsletter

---

## Responsive behaviour

| Viewport | Adaptations |
|----------|-------------|
| Mobile | Sheet navigation · stacked hero · single-column grids |
| Tablet | 2-column grids · condensed spacing |
| Desktop | Side-by-side hero · hover interactions · multi-column galleries |

**Full-height pages:** Products, Services carousel context, Blog, Buyers, Machinery, and Contact use viewport-height layouts on standalone routes.

---

*End of wireframe document · Version 1.0 · June 2026*
