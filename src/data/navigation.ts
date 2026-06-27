export type NavLink = {
  id: string;
  href: string;
  labelKey: string;
};

export const navLinks: NavLink[] = [
  { id: "capabilities", href: "#capabilities", labelKey: "nav.links.capabilities" },
  { id: "products", href: "#products", labelKey: "nav.links.products" },
  { id: "testimonials", href: "#testimonials", labelKey: "nav.links.testimonials" },
  { id: "contact", href: "#contact", labelKey: "nav.links.contact" },
];

export const sectionIds = [
  "capabilities",
  "products",
  "applications",
  "stats",
  "testimonials",
  "video",
  "contact",
];
