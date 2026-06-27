export const productFilterKeys = [
  "ci",
  "aluminum",
  "pressureDie",
  "motor",
  "pump",
  "automotive",
] as const;

export type ProductFilterKey = (typeof productFilterKeys)[number];

export function resolveProductFilterTag(productId: string): ProductFilterKey {
  if (
    productId.includes("pressure-die") ||
    productId.includes("pressure_die")
  ) {
    return "pressureDie";
  }

  if (productId.includes("pump")) {
    return "pump";
  }

  if (productId.includes("motor") || productId.includes("motorbody")) {
    return "motor";
  }

  if (productId.includes("auto") || productId.includes("automobile")) {
    return "automotive";
  }

  if (productId.includes("aluminum") || productId.includes("aluminium")) {
    return "aluminum";
  }

  return "ci";
}
