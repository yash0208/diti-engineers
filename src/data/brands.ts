import {
  BadgeCheck,
  Car,
  Droplets,
  Factory,
  Globe2,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const brandKeys = [
  "motors",
  "pumps",
  "automotive",
  "gst",
  "indiamart",
  "manufacturer",
] as const;

export type BrandKey = (typeof brandKeys)[number];

export const brandIcons: Record<BrandKey, LucideIcon> = {
  motors: Zap,
  pumps: Droplets,
  automotive: Car,
  gst: BadgeCheck,
  indiamart: Globe2,
  manufacturer: Factory,
};
