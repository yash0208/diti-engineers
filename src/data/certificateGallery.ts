export const certificateGalleryKeys = [
  "qualityInspection",
  "factoryFloor",
  "productionFloor",
  "ciCasting",
  "cncMachining",
] as const;

export type CertificateGalleryKey = (typeof certificateGalleryKeys)[number];

export const certificateGallerySources: Record<CertificateGalleryKey, string> = {
  qualityInspection: "/images/quality-inspection.png",
  factoryFloor: "/images/factory-floor.png",
  productionFloor: "/images/hero-factory.png",
  ciCasting: "/images/product-ci-casting.png",
  cncMachining: "/images/cnc-machining.png",
};
