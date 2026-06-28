export const typography = {
  display: '"Outfit", system-ui, sans-serif',
  body: '"DM Sans", system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
  size: {
    heroDisplay: "6.125rem",
    heroGalleryTitle: "3.3rem",
    heroGallerySubtitle: "0.9375rem",
    display: "4rem",
    sectionTitle: "1.92rem",
    h1: "3.5rem",
    h2: "2.25rem",
    h3: "1.25rem",
    body: "1rem",
    bodyLg: "1.0625rem",
    eyebrow: "0.6875rem",
    monoLabel: "0.6875rem",
    caption: "0.75rem",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  leading: {
    tight: 1.0,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.65,
  },
  tracking: {
    tight: "-0.03em",
    display: "-0.02em",
    normal: "0",
    wide: "0.04em",
    eyebrow: "0.1em",
  },
} as const;

export const spacing = {
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  xxl: "40px",
  xxxl: "48px",
  xxxxl: "64px",
  nav: "4rem",
  navLg: "4.25rem",
} as const;

export const rounded = {
  xs: "3px",
  sm: "5px",
  md: "8px",
  base: "10px",
  lg: "14px",
  xl: "18px",
  full: "9999px",
} as const;

export const elevation = {
  default:
    "0 1px 3px 0 rgba(27, 79, 216, 0.06), 0 1px 2px -1px rgba(27, 79, 216, 0.04)",
  active:
    "0 4px 16px -2px rgba(27, 79, 216, 0.12), 0 2px 6px -2px rgba(0, 0, 0, 0.08)",
  card:
    "0 1px 3px 0 rgba(20, 20, 20, 0.08), 0 1px 2px -1px rgba(20, 20, 20, 0.04)",
  cardHover:
    "0 8px 24px -4px rgba(27, 79, 216, 0.10), 0 2px 6px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(27, 79, 216, 0.06)",
} as const;
