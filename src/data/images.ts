export const heroGalleryImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3",
] as const;

export const heroStripImagesTop = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1581092918056-401a887fb3b9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
] as const;

export const heroStripImagesBottom = [
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c3?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
] as const;

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
