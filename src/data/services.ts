import { imageRegistry } from "./images";

export type ServiceItem = {
  id: string;
  slug: string;
  nameKey: string;
  bodyKey: string;
  imageAltKey: string;
  imageSrc: string;
};

export const serviceItems: ServiceItem[] = [
  {
    id: "ciCasting",
    slug: "ci-casting",
    nameKey: "pages.services.items.ciCasting.name",
    bodyKey: "pages.services.items.ciCasting.body",
    imageAltKey: "pages.services.items.ciCasting.imageAlt",
    imageSrc: imageRegistry.product["ci-casting"],
  },
  {
    id: "aluminumDie",
    slug: "aluminum-die-casting",
    nameKey: "pages.services.items.aluminumDie.name",
    bodyKey: "pages.services.items.aluminumDie.body",
    imageAltKey: "pages.services.items.aluminumDie.imageAlt",
    imageSrc: imageRegistry.product["aluminum-pressure-die-casting"],
  },
  {
    id: "pressureDie",
    slug: "pressure-die-casting",
    nameKey: "pages.services.items.pressureDie.name",
    bodyKey: "pages.services.items.pressureDie.body",
    imageAltKey: "pages.services.items.pressureDie.imageAlt",
    imageSrc: imageRegistry.platform.die,
  },
  {
    id: "motorParts",
    slug: "motor-parts",
    nameKey: "pages.services.items.motorParts.name",
    bodyKey: "pages.services.items.motorParts.body",
    imageAltKey: "pages.services.items.motorParts.imageAlt",
    imageSrc: imageRegistry.product["induction-motor-casting"],
  },
  {
    id: "pumpParts",
    slug: "pump-parts",
    nameKey: "pages.services.items.pumpParts.name",
    bodyKey: "pages.services.items.pumpParts.body",
    imageAltKey: "pages.services.items.pumpParts.imageAlt",
    imageSrc: imageRegistry.product["submersible-pump-parts-casting"],
  },
  {
    id: "autoParts",
    slug: "auto-parts",
    nameKey: "pages.services.items.autoParts.name",
    bodyKey: "pages.services.items.autoParts.body",
    imageAltKey: "pages.services.items.autoParts.imageAlt",
    imageSrc: imageRegistry.product["auto-parts-casting"],
  },
];
