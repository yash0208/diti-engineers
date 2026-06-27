# Image Generation Prompts — Diti Engineers

> The implementing agent (Claude Code) **does not generate images**. You generate them externally and drop the files into `public/images/`. The agent wires paths and alt text.

Recommended tools (in order):
1. **Midjourney v6 / Flux Pro** — best for photoreal industrial shots
2. **Ideogram** — best when an image needs short on-image text (OG banners)
3. **DALL·E 3** — fast fallback inside ChatGPT
4. **Real IndiaMART factory photos** — ALWAYS preferred over AI when available

Use with **Midjourney**, **DALL·E**, **Ideogram**, **Flux**, or **Cursor Generate Image**.

**Global style suffix** (append to every prompt):
```
, professional industrial photography, realistic, high detail, neutral color grading, no text, no logos, no watermarks, 16:9 or 4:3 aspect ratio, suitable for B2B manufacturing website
```

**Avoid in all prompts:** cartoon, illustration, AI purple glow, futuristic sci-fi, people with visible faces (unless you have rights), fake certification badges, readable text on images.

---

## Platform carousel background videos (required — 3 slots)

The **Capabilities** sticky carousel (`PlatformCarouselSection`, `#capabilities`) uses one full-viewport looping background per slide. Generate all three before shipping that section with real media.

Recommended tools: **Runway Gen-3**, **Kling**, **Pika**, **Luma Dream Machine**, or licensed **Pexels / Artgrid** factory B-roll.

**Global video suffix** (append to every prompt):
```
, cinematic industrial B2B footage, slow smooth camera movement, realistic foundry lighting, slightly desaturated for dark website overlay, no text, no logos, no watermarks, no identifiable faces, 16:9 landscape, 5–8 second seamless loop, suitable for muted autoplay website background
```

**Avoid in all video prompts:** handheld shaky cam, fast cuts, sci-fi UI, purple neon, cartoon CGI, stock “happy workers” waving at camera, readable signage or brand names.

| Slot key | File path | Aspect / size | Duration |
|----------|-----------|---------------|----------|
| `platformVideo.ci` | `public/videos/platform-ci-casting.mp4` | 16:9 / 1920×1080 min | 5–8 s loop |
| `platformVideo.aluminum` | `public/videos/platform-aluminum-die-casting.mp4` | 16:9 / 1920×1080 min | 5–8 s loop |
| `platformVideo.die` | `public/videos/platform-pressure-die-casting.mp4` | 16:9 / 1920×1080 min | 5–8 s loop |

Optional poster frames (fallback while video loads): reuse the matching product still from the sections below at `public/images/platform-ci-casting.webp`, `platform-aluminum-die-casting.webp`, `platform-pressure-die-casting.webp`.

### 01 CI casting (`platformVideo.ci`)
```
Slow dolly through a cast iron foundry floor, gray CI motor body frames and pump housings cooling on steel racks, warm furnace glow in background, sand casting molds and molten metal pour silhouette in soft focus, editorial industrial cinematography, dark graphite and orange accent lighting
```

### 02 Aluminum die casting (`platformVideo.aluminum`)
```
Close tracking shot along a high-pressure aluminum die casting line, shiny silver motor end brackets and housings ejected from the die, hydraulic press cycle in slow motion, cool steel-blue factory lighting with metallic reflections, OEM precision manufacturing atmosphere
```

### 03 Pressure die casting (`platformVideo.die`)
```
Macro-to-wide reveal of pressure die casting for intricate aluminum parts, molten aluminum injected into a steel mold, complex thin-wall component released and inspected on conveyor, tight tolerances and clean factory environment, restrained cinematic motion for engineering audience
```

**After generation:** Export H.264 MP4 (≤ 8 MB per clip if possible). Place in `public/videos/`, register paths in `src/data/images.ts` under `platformVideo`, and add `platform.videoAlt.*` keys to `en.json` and `fr.json`.

---

## Hero & background

### Dark hero ambient (abstract, no product)
```
Abstract industrial atmosphere for a casting manufacturer website hero background, dark graphite and charcoal tones with subtle warm orange light reflections like molten metal glow, soft depth of field, minimal geometric shapes, premium B2B aesthetic, cinematic but restrained
```

### Hero factory wide (subtle, for overlay)
```
Wide angle modern foundry interior Rajkot India style, sand casting and die casting equipment, clean organized factory floor, warm industrial lighting, shot from elevated angle, slightly desaturated for dark website overlay at 30% opacity
```

---

## Product category cards (portfolio style)

### CI casting
```
Close-up of gray cast iron industrial components freshly cast, motor frame parts and pump housings on steel table, sharp focus on surface texture and precision edges, workshop background blurred, professional product photography
```

### Aluminum pressure die casting
```
Shiny aluminum die cast parts array, electric motor end brackets and housings, silver metallic finish, studio lighting with soft shadows, white to light gray background, OEM component photography
```

### Induction motor casting
```
Cast iron electric motor body frames stacked in factory, induction motor stator housings, industrial green and gray factory environment, detail on casting grain and machining marks
```

### Submersible pump parts
```
Cast iron submersible pump volutes and impeller housings, water pump components for OEM manufacturing, wet-surface metallic texture, blue-gray industrial tone, product lineup on factory bench
```

### Auto parts casting
```
Automotive cast iron and aluminum components, bracket and housing parts for automobile OEM, organized on inspection table, caliper and gauge visible suggesting quality control, no brand logos
```

---

## About & showcase sections

### Factory exterior
```
Mid-size manufacturing unit exterior Rajkot Gujarat industrial area, concrete and metal facade, factory sign area blank, clear sky, professional corporate photography, trustworthy SME manufacturer look
```

### Factory floor — melting/casting
```
Foundry worker silhouette pouring molten metal into sand mold, safety gear, dramatic warm orange light from furnace, dark surroundings, editorial industrial photo, face not identifiable
```

### Quality inspection
```
Quality inspector hands measuring cast component with vernier caliper on inspection table, cast iron part in focus, clean QC station, professional manufacturing documentation style photo
```

### CNC / machining (optional)
```
CNC machining of cast component after casting, metal shavings, precision finishing stage, modern machine shop, cool blue-steel color palette
```

---

## Stats & trust section backgrounds (subtle textures)

```
Dark brushed metal texture background, subtle horizontal grain, charcoal gray, minimal, seamless tileable pattern for website section divider
```

```
Abstract steel mesh or industrial grid pattern, very subtle, low contrast, dark mode UI background texture
```

---

## Open Graph / social share (1200×630)

```
Professional banner for casting manufacturer Diti Engineers, dark graphite background, abstract cast metal components composition, warm orange accent line, premium B2B industrial design, large negative space center for text overlay, no readable text in image
```

---

## Logo concepts (if generating mark)

```
Minimal geometric logo mark for industrial casting company, abstract letter D formed by molten metal pour shape, orange and steel blue on dark background, flat vector style, scalable icon, no text
```

```
Wordmark logo Diti Engineers, modern sans serif, strong industrial feel, orange accent on Engineers word, dark background mockup, clean professional
```

---

## Image specs for web

| Use | Aspect | Min size | Format |
|-----|--------|----------|--------|
| Hero bg | 16:9 | 1920×1080 | WebP |
| Product card | 4:3 or 16:10 | 800×600 | WebP |
| About split | 4:3 | 1200×900 | WebP |
| Factory gallery | 1:1 or 4:3 | 800×800 | WebP |
| OG image | 1200:630 | 1200×630 | PNG/WebP |

**After generation:** Place in `public/images/`, register paths in `src/data/images.ts`, add alt keys to `en.json` and `fr.json`.

---

## Real photos (preferred when possible)

AI images work for launch; **real factory photos from IndiaMART album** will outperform generated assets for trust. Use AI for:
- Hero ambient backgrounds
- Missing product category thumbnails until real shots exist
- OG/social graphics

Replace with authentic photos as they become available.

---

## Phase-by-phase image slot map

This matches the phase plan in `claude-implementation-prompt.md`. Generate the images for a phase BEFORE the agent runs that phase, or accept that the agent will wire `/images/placeholder.svg` and list the missing slot in its output.

| Phase | Slot key | File path | Aspect / size | Prompt section |
|-------|----------|-----------|---------------|----------------|
| 2 | `platformVideo.ci` | `public/videos/platform-ci-casting.mp4` | 16:9 / 1920×1080 | "01 CI casting" (video) |
| 2 | `platformVideo.aluminum` | `public/videos/platform-aluminum-die-casting.mp4` | 16:9 / 1920×1080 | "02 Aluminum die casting" (video) |
| 2 | `platformVideo.die` | `public/videos/platform-pressure-die-casting.mp4` | 16:9 / 1920×1080 | "03 Pressure die casting" (video) |
| 2 | `hero.ambient` | `public/images/hero-ambient.webp` | 16:9 / 1920×1080 | "Dark hero ambient" |
| 2 | `hero.factoryOverlay` *(optional)* | `public/images/hero-factory.webp` | 16:9 / 1920×1080 | "Hero factory wide" |
| 3 | `products.ciCasting` | `public/images/product-ci-casting.webp` | 4:3 / 1200×900 | "CI casting" |
| 3 | `products.aluminumDie` | `public/images/product-aluminum-die.webp` | 4:3 / 1200×900 | "Aluminum pressure die casting" |
| 3 | `products.motorBody` | `public/images/product-motor-body.webp` | 4:3 / 1200×900 | "Induction motor casting" |
| 3 | `products.pumpParts` | `public/images/product-pump-parts.webp` | 4:3 / 1200×900 | "Submersible pump parts" |
| 3 | `products.autoParts` | `public/images/product-auto-parts.webp` | 4:3 / 1200×900 | "Auto parts casting" |
| 4 | `showcase.factoryFloor` | `public/images/factory-floor.webp` | 16:9 / 1600×900 | "Factory floor — melting/casting" |
| 4 | `showcase.inspection` | `public/images/quality-inspection.webp` | 4:3 / 1200×900 | "Quality inspection" |
| 4 | `showcase.cnc` *(optional)* | `public/images/cnc-machining.webp` | 4:3 / 1200×900 | "CNC / machining" |
| 5 | `social.og` | `public/images/og-banner.png` | 1200×630 | "Open Graph / social share" |
| any | `texture.darkMetal` *(optional)* | `public/images/texture-dark-metal.webp` | tileable | "Stats & trust section backgrounds" |

**Naming rule:** kebab-case files in `public/images/`. The agent reads `src/data/images.ts` for the registry — never reference paths directly in components.

**Placeholder file:** create `public/images/placeholder.svg` once (a 4:3 dark graphite rectangle with a thin orange diagonal stripe) so missing slots have a neutral fallback rather than broken thumbnails.
