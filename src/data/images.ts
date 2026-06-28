export const heroGalleryImages = [
  "/images/factory-floor.png",
  "/images/hero-factory.png",
  "/images/product-ci-casting.png",
  "/images/product-motor-body.png",
  "/images/quality-inspection.png",
] as const;

export const certificateGalleryImages = [
  "/images/quality-inspection.png",
  "/images/factory-floor.png",
  "/images/hero-factory.png",
  "/images/product-ci-casting.png",
  "/images/cnc-machining.png",
] as const;

export {
  certificateGalleryKeys,
  certificateGallerySources,
  type CertificateGalleryKey,
} from "./certificateGallery";

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
  machinery: {
    ciLine: "/images/product-ci-casting.png",
    dieCasting: "/images/product-aluminum-die.png",
    machining: "/images/cnc-machining.png",
    inspection: "/images/quality-inspection.png",
  },
  machineryPoster: {
    ciLine: "/videos/platform-ci-casting-poster.jpg",
    dieCasting: "/videos/platform-aluminium-die-poster.jpg",
    machining: "/images/cnc-machining.png",
    inspection: "/images/quality-inspection.png",
  },
  machineryVideo: {
    ciLine: "/videos/platform-ci-casting.mp4",
    dieCasting: "/videos/platform-aluminium-die.mp4",
    machining: "/videos/CNC.mp4",
    inspection: "/videos/Quality.mp4",
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
    "automobile-casting": "/images/product-auto-parts.png",
    "aluminum-casting": "/images/product-aluminum-die.png",
    "electric-motor-parts": "/images/product-motor-body.png",
    "motorbody-casting": "/images/product-motor-body.png",
    "electric-motor-body-casting": "/images/product-aluminum-motor-body.png",
    "pump-parts-casting": "/images/product-pump-parts.png",
    "grill-design-casting": "/images/product-ci-casting.png",
    "casting": "/images/product-ci-casting.png",
    "electric-motor-parts-casting": "/images/product-motor-body.png",
  },
  showcase: {
    factory: "/images/factory-floor.png",
    aboutHero: "/videos/about-hero.mp4",
    aboutHeroPoster: "/videos/about-hero-poster.jpg",
  },
  blog: {
    featuredVideo: "/videos/platform-ci-casting.mp4",
    featuredPoster: "/videos/platform-ci-casting-poster.jpg",
    post3Image: "/images/quality-inspection.png",
  },
  contact: {
    backgroundVideo: "/videos/platform-aluminium-die.mp4",
    backgroundPoster: "/videos/platform-aluminium-die-poster.jpg",
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
export type MachineryVideoKey = keyof typeof imageRegistry.machineryVideo;
export type MachineryPosterKey = keyof typeof imageRegistry.machineryPoster;

export const marqueeLogoKeys = [
  "gst",
  "indiamart",
  "rajkot",
  "proprietorship",
  "turnover",
  "manufacturer",
] as const;

export type MarqueeLogoKey = (typeof marqueeLogoKeys)[number];
