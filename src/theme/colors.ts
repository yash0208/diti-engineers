export const colors = {
  canvas: "#fafafa",
  canvasDark: "#0a0a0a",
  canvasLight: "#fafafa",
  surfaceCardLight: "#ffffff",
  surfaceCardDark: "#171717",
  surfaceMuted: "#f0f0f0",
  accentPrimary: "#4d00e5",
  accentCtaLight: "#ffffff",
  accentSecondary: "#4d00e5",
  accentSteel: "#677489",
  textHeadingLight: "#1b1b1b",
  textHeadingDark: "#ffffff",
  textOnDark: "#ffffff",
  textOnLight: "#1b1b1b",
  textPrimaryLight: "#374151",
  textPrimaryDark: "#e5e7eb",
  textMuted: "#677489",
  borderLight: "#e4e7eb",
  borderDark: "rgba(255,255,255,0.08)",
  borderGlass: "rgba(255,255,255,0.2)",
  canvasDeep: "#1a1028",
  sparklesOnLight: "#677489",
  gradientAccent: "#4d00e5",
} as const;

export type ColorToken = keyof typeof colors;

export const cssVariables = Object.entries(colors)
  .map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    return `--color-${cssKey}: ${value};`;
  })
  .join("\n  ");
