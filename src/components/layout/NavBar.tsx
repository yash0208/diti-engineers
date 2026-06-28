import {
  Award,
  Car,
  Cog,
  Droplets,
  Factory,
  Gauge,
  Home,
  Layers,
  MenuIcon,
  Newspaper,
  Package,
  Play,
  Star,
  Users,
  XIcon,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavGridCard,
  NavItemMobile,
  NavLargeItem,
  NavSmallItem,
  type NavItemType,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { serviceItems } from "@/data/services";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, LucideIcon> = {
  ciCasting: Factory,
  aluminumDie: Layers,
  pressureDie: Gauge,
  motorParts: Zap,
  pumpParts: Droplets,
  autoParts: Car,
};

const companyIconById: Record<string, LucideIcon> = {
  about: Users,
  blog: Newspaper,
  machinery: Cog,
  certificate: Award,
};

export function NavBar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const toggleLang = () => {
    const next = i18n.language.startsWith("fr") ? "en" : "fr";
    void i18n.changeLanguage(next);
    localStorage.setItem("diti-engineers-lang", next);
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const serviceLinks = useMemo<NavItemType[]>(
    () =>
      serviceItems.map((service) => ({
        title: t(service.nameKey),
        href: `/services#${service.slug}`,
        description: t(service.bodyKey),
        icon: serviceIcons[service.id] ?? Factory,
      })),
    [t],
  );

  const companyLinks = useMemo<NavItemType[]>(
    () => [
      {
        title: t("nav.links.about"),
        href: "/about",
        description: t("nav.megaMenu.descriptions.about"),
        icon: companyIconById.about,
      },
      {
        title: t("nav.links.blog"),
        href: "/blog",
        description: t("nav.megaMenu.descriptions.blog"),
        icon: companyIconById.blog,
      },
      {
        title: t("nav.links.machinery"),
        href: "/machinery",
        description: t("nav.megaMenu.descriptions.machinery"),
        icon: companyIconById.machinery,
      },
    ],
    [t],
  );

  const companySidebarLinks = useMemo<NavItemType[]>(
    () => [
      {
        title: t("nav.links.certificate"),
        href: "/certificate",
        icon: companyIconById.certificate,
      },
      {
        title: t("nav.links.testimonials"),
        href: "/buyers",
        icon: Star,
      },
      {
        title: t("nav.links.factoryTour"),
        href: "/factory",
        icon: Play,
      },
    ],
    [t],
  );

  const simpleLinks = useMemo<NavItemType[]>(
    () => [
      {
        title: t("nav.links.home"),
        href: "/",
        icon: Home,
      },
      {
        title: t("nav.links.products"),
        href: "/products",
        icon: Package,
      },
    ],
    [t],
  );

  return (
    <header
      className={cn(
        "group fixed inset-x-0 top-0 z-50 w-full border-b border-dashed border-border-light bg-nav-bar backdrop-blur-md interactive-colors",
        scrolled && "shadow-card",
      )}
    >
      <div className="container-main py-3 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label={t("brand.name")}
            className="flex shrink-0 items-center font-display text-lg font-bold tracking-tight text-text-heading-light md:text-xl"
          >
            {t("brand.name")}
          </Link>

          <DesktopMenu
            simpleLinks={simpleLinks}
            serviceLinks={serviceLinks}
            companyLinks={companyLinks}
            companySidebarLinks={companySidebarLinks}
            isActive={isActive}
          />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleLang}
              className="hidden sm:inline-flex"
            >
              {i18n.language.startsWith("fr") ? "EN" : "FR"}
            </Button>

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/contact">{t("nav.cta")}</Link>
            </Button>

            <MobileNav
              simpleLinks={simpleLinks}
              serviceLinks={serviceLinks}
              companyLinks={companyLinks}
              companySidebarLinks={companySidebarLinks}
              isActive={isActive}
              onToggleLang={toggleLang}
              langLabel={i18n.language.startsWith("fr") ? "EN" : "FR"}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

type MenuProps = {
  simpleLinks: NavItemType[];
  serviceLinks: NavItemType[];
  companyLinks: NavItemType[];
  companySidebarLinks: NavItemType[];
  isActive: (path: string) => boolean;
};

function DesktopMenu({
  simpleLinks,
  serviceLinks,
  companyLinks,
  companySidebarLinks,
  isActive,
}: MenuProps) {
  const { t } = useTranslation();

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {simpleLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild active={isActive(link.href)}>
              <Link
                to={link.href}
                className="cursor-pointer text-text-muted hover:text-text-heading-light data-[active=true]:text-text-heading-light"
              >
                {link.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("nav.links.services")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-full gap-4 p-4 md:w-3xl">
              <ul className="grid grid-cols-2 gap-4">
                {serviceLinks.slice(0, 2).map((link) => (
                  <li key={link.href}>
                    <NavGridCard link={link} className="min-h-36" />
                  </li>
                ))}
              </ul>
              <ul className="grid grid-cols-2 gap-4">
                {serviceLinks.slice(2).map((link) => (
                  <li key={link.href}>
                    <NavLargeItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("nav.megaMenu.company")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-full md:w-4xl md:grid-cols-[minmax(0,3fr)_220px]">
              <ul className="grid gap-4 border-border-light p-4 md:grid-cols-3 md:border-r">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <NavGridCard link={link} />
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col justify-center gap-0.5 p-3">
                {companySidebarLinks.map((link) => (
                  <li key={link.href}>
                    <NavSmallItem item={link} />
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type MobileNavProps = MenuProps & {
  onToggleLang: () => void;
  langLabel: string;
};

function MobileNav({
  simpleLinks,
  serviceLinks,
  companyLinks,
  companySidebarLinks,
  isActive: _isActive,
  onToggleLang,
  langLabel,
}: MobileNavProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const sections = [
    {
      id: "services",
      name: t("nav.links.services"),
      list: [
        {
          title: t("nav.servicesOverview"),
          href: "/services",
          description: t("nav.megaMenu.descriptions.servicesOverview"),
          icon: Factory,
        },
        ...serviceLinks,
      ],
    },
    {
      id: "company",
      name: t("nav.megaMenu.company"),
      list: [...companyLinks, ...companySidebarLinks],
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full lg:hidden"
          aria-label={t("nav.open")}
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full gap-0 overflow-hidden bg-surface-card-light/95 backdrop-blur-lg supports-[backdrop-filter]:bg-surface-card-light/80"
        showClose={false}
      >
        <div className="flex h-14 shrink-0 items-center justify-end border-b border-border-light px-4">
          <SheetClose asChild>
            <Button size="icon" variant="ghost" className="rounded-full">
              <XIcon className="size-5" />
              <span className="sr-only">{t("nav.close")}</span>
            </Button>
          </SheetClose>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-y-2 overflow-y-auto px-4 pt-5">
          <ul className="mb-2 grid gap-1 border-b border-border-light pb-4">
            {simpleLinks.map((link) => (
              <li key={link.href}>
                <SheetClose asChild>
                  <NavItemMobile item={link} />
                </SheetClose>
              </li>
            ))}
          </ul>

          <Accordion type="single" collapsible>
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="capitalize hover:no-underline">
                  {section.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-1">
                  <ul className="grid gap-1">
                    {section.list.map((link) => (
                      <li key={link.href}>
                        <SheetClose asChild>
                          <NavItemMobile item={link} />
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-border-light px-4 py-4">
          <Button type="button" variant="outline" onClick={onToggleLang}>
            {langLabel}
          </Button>
          <SheetClose asChild>
            <Button asChild>
              <Link to="/contact">{t("nav.cta")}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
