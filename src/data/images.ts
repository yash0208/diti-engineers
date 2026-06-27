export const heroGalleryImages = [
  "/images/factory-floor.png",
  "/images/hero-factory.png",
  "/images/product-ci-casting.png",
  "/images/product-motor-body.png",
  "/images/quality-inspection.png",
] as const;

export const heroStripImagesTop = [
  "/images/hero-strip-01.png",
  "/images/hero-strip-02.png",
  "/images/hero-strip-03.png",
  "/images/hero-strip-04.png",
  "/images/hero-strip-05.png",
  "/images/hero-strip-06.png",
] as const;

export const heroStripImagesBottom = [
  "/images/hero-strip-04.png",
  "/images/hero-strip-05.png",
  "/images/hero-strip-06.png",
  "/images/hero-strip-01.png",
  "/images/hero-strip-02.png",
  "/images/hero-strip-03.png",
] as const;

export const imageRegistry = {
  placeholder: "/images/placeholder.svg",
  heroAmbient: "/images/hero-ambient.png",
  heroVideo:
    "https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4",
  platform: {
    ci: "/videos/platform-ci-casting-poster.jpg",
    aluminum: "/videos/platform-aluminium-die-poster.jpg",
    die: "/videos/platform-pressure-die-poster.jpg",
  },
  platformVideo: {
    ci: "/videos/platform-ci-casting.mp4",
    aluminum: "/videos/platform-aluminium-die.mp4",
    die: "/videos/platform-pressure-die.mp4",
  },
  applications: {
    oem: "/images/applications-oem.png",
    production: "/images/applications-production.png",
  },
  video: {
    poster: "/images/factory-floor.png",
  },
  testimonial: {
    bg: "/images/texture-dark-metal.png",
  },
  product: {
    "ci-casting": "/images/product-ci-casting.png",
    "aluminum-pressure-die-casting": "/images/product-aluminum-die.png",
    "induction-motor-casting": "/images/product-motor-body.png",
    "submersible-pump-parts-casting": "/images/product-pump-parts.png",
    "auto-parts-casting": "/images/product-auto-parts.png",
    "aluminum-motor-body-parts": "/images/product-aluminum-motor-body.png",
  },
  showcase: {
    factory: "/images/factory-floor.png",
  },
  social: {
    og: "/images/og-banner.png",
  },
} as const;

export const PLACEHOLDER_IMAGE = imageRegistry.placeholder;
export const PLACEHOLDER_VIDEO = "";

export function isPlaceholderImage(src: string): boolean {
  return src === PLACEHOLDER_IMAGE;
}

export function isPlaceholderVideo(src: string): boolean {
  return src === PLACEHOLDER_VIDEO || src.length === 0;
}

export type ImageKey = keyof typeof imageRegistry;
export type ProductImageKey = keyof typeof imageRegistry.product;
export type PlatformImageKey = keyof typeof imageRegistry.platform;
export type PlatformVideoKey = keyof typeof imageRegistry.platformVideo;

export const marqueeLogoKeys = [
  "gst",
  "indiamart",
  "rajkot",
  "proprietorship",
  "turnover",
  "manufacturer",
] as const;

export type MarqueeLogoKey = (typeof marqueeLogoKeys)[number];
