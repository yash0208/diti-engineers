export type ServiceItem = {
  id: string;
  slug: string;
  nameKey: string;
  bodyKey: string;
};

export const serviceItems: ServiceItem[] = [
  {
    id: "ciCasting",
    slug: "ci-casting",
    nameKey: "pages.services.items.ciCasting.name",
    bodyKey: "pages.services.items.ciCasting.body",
  },
  {
    id: "aluminumDie",
    slug: "aluminum-die-casting",
    nameKey: "pages.services.items.aluminumDie.name",
    bodyKey: "pages.services.items.aluminumDie.body",
  },
  {
    id: "pressureDie",
    slug: "pressure-die-casting",
    nameKey: "pages.services.items.pressureDie.name",
    bodyKey: "pages.services.items.pressureDie.body",
  },
  {
    id: "motorParts",
    slug: "motor-parts",
    nameKey: "pages.services.items.motorParts.name",
    bodyKey: "pages.services.items.motorParts.body",
  },
  {
    id: "pumpParts",
    slug: "pump-parts",
    nameKey: "pages.services.items.pumpParts.name",
    bodyKey: "pages.services.items.pumpParts.body",
  },
  {
    id: "autoParts",
    slug: "auto-parts",
    nameKey: "pages.services.items.autoParts.name",
    bodyKey: "pages.services.items.autoParts.body",
  },
];
