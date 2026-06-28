export type NavLink = {
  id: string;
  href: string;
  labelKey: string;
};

export type RouteNavLink = NavLink & {
  path: string;
};

export const navLinks: RouteNavLink[] = [
  { id: "home", path: "/", href: "/", labelKey: "nav.links.home" },
  { id: "about", path: "/about", href: "/about", labelKey: "nav.links.about" },
  { id: "products", path: "/products", href: "/products", labelKey: "nav.links.products" },
  { id: "services", path: "/services", href: "/services", labelKey: "nav.links.services" },
  { id: "blog", path: "/blog", href: "/blog", labelKey: "nav.links.blog" },
  { id: "buyers", path: "/buyers", href: "/buyers", labelKey: "nav.links.testimonials" },
  { id: "factory", path: "/factory", href: "/factory", labelKey: "nav.links.factoryTour" },
  { id: "machinery", path: "/machinery", href: "/machinery", labelKey: "nav.links.machinery" },
  { id: "certificate", path: "/certificate", href: "/certificate", labelKey: "nav.links.certificate" },
  { id: "contact", path: "/contact", href: "/contact", labelKey: "nav.links.contact" },
];

export const footerNavLinks = navLinks.filter(
  (link) => link.id !== "home" && link.id !== "contact",
);

export const sectionIds = [
  "capabilities",
  "products",
  "applications",
  "stats",
  "testimonials",
  "contact",
];
