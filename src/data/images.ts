export const imageRegistry = {
  placeholder: "/images/placeholder.svg",
  heroAmbient: "/images/placeholder.svg",
  heroVideo:
    "https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4",
  platform: {
    ci: "/images/placeholder.svg",
    aluminum: "/images/placeholder.svg",
    die: "/images/placeholder.svg",
  },
  applications: {
    oem: "/images/placeholder.svg",
    production: "/images/placeholder.svg",
  },
  video: {
    poster: "/images/placeholder.svg",
  },
  testimonial: {
    bg: "/images/placeholder.svg",
  },
  product: {
    "ci-casting": "/images/placeholder.svg",
    "aluminum-pressure-die-casting": "/images/placeholder.svg",
    "induction-motor-casting": "/images/placeholder.svg",
    "submersible-pump-parts-casting": "/images/placeholder.svg",
    "auto-parts-casting": "/images/placeholder.svg",
    "aluminum-motor-body-parts": "/images/placeholder.svg",
  },
  showcase: {
    factory: "/images/placeholder.svg",
  },
} as const;

export const PLACEHOLDER_IMAGE = imageRegistry.placeholder;

export function isPlaceholderImage(src: string): boolean {
  return src === PLACEHOLDER_IMAGE;
}

export type ImageKey = keyof typeof imageRegistry;
export type ProductImageKey = keyof typeof imageRegistry.product;
export type PlatformImageKey = keyof typeof imageRegistry.platform;

export const marqueeLogoKeys = [
  "gst",
  "indiamart",
  "rajkot",
  "proprietorship",
  "turnover",
  "manufacturer",
] as const;

export type MarqueeLogoKey = (typeof marqueeLogoKeys)[number];
