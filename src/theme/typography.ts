export const typography = {
  display: '"Plus Jakarta Sans", "DM Sans", system-ui, sans-serif',
  body: "Inter, system-ui, sans-serif",
  mono: '"IBM Plex Mono", ui-monospace, monospace',
  size: {
    heroDisplay: "6.125rem",
    heroGalleryTitle: "3.3rem",
    heroGallerySubtitle: "0.9375rem",
    display: "4.5rem",
    sectionTitle: "1.92rem",
    h1: "3.5rem",
    h2: "2.25rem",
    h3: "1.5rem",
    body: "1rem",
    bodyLg: "1.125rem",
    eyebrow: "1rem",
    monoLabel: "1rem",
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
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.6,
  },
  tracking: {
    tight: "-0.03em",
    display: "-0.015em",
    normal: "0",
    wide: "0.02em",
    eyebrow: "0.08em",
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
  sm: "6px",
  md: "8px",
  base: "12px",
  lg: "16px",
  xl: "20px",
  full: "9999px",
} as const;

export const elevation = {
  default:
    "0 2px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 4px -1px rgba(0, 0, 0, 0.04)",
  active:
    "0 0 8px -2px rgba(0, 0, 0, 0.1), 0 6px 20px -3px rgba(0, 0, 0, 0.2)",
  cardHover:
    "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
} as const;
