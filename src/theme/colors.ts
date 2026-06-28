function hexToRgbNormalized(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}

export const colors = {
  canvas: "#f8f8f7",
  canvasDark: "#0d0d0d",
  canvasLight: "#f8f8f7",
  surfaceCardLight: "#ffffff",
  surfaceCardDark: "#181818",
  surfaceMuted: "#f1f1f0",
  surfaceElevated: "#ffffff",
  accentPrimary: "#1B4FD8",
  accentGradientStart: "#1B4FD8",
  accentGradientEnd: "#2563EB",
  accentCtaLight: "#ffffff",
  accentSecondary: "#1B4FD8",
  accentMuted: "#EEF2FF",
  accentSteel: "#5B6B84",
  textHeadingLight: "#141414",
  textHeadingDark: "#f5f5f5",
  textOnDark: "#ffffff",
  textOnLight: "#141414",
  textPrimaryLight: "#3D4B5C",
  textPrimaryDark: "#d1d5db",
  textMuted: "#7A8696",
  borderLight: "#e2e4e8",
  borderDark: "rgba(255,255,255,0.08)",
  borderGlass: "rgba(255,255,255,0.18)",
  canvasDeep: "#0B1929",
  sparklesOnLight: "#7A8696",
  gradientAccent: "#1B4FD8",
  threadsLine: "#7A8696",
} as const;

export const effectColors = {
  threadsLineRgb: hexToRgbNormalized(colors.threadsLine),
} as const;

export type ColorToken = keyof typeof colors;

export const cssVariables = Object.entries(colors)
  .map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    return `--color-${cssKey}: ${value};`;
  })
  .join("\n  ");
