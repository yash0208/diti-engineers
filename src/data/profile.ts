import rawProfile from "@data/business-profile.json";
import type { BusinessProfile } from "@/types/business-profile";

export const businessProfile = rawProfile as BusinessProfile;

export function getFeaturedProducts() {
  const { categories, featuredProductIds } = businessProfile.productsAndServices;

  return featuredProductIds
    .map((id) => categories.find((category) => category.id === id))
    .filter((category): category is NonNullable<typeof category> => category !== undefined);
}
