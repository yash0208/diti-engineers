import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, sectionIds } from "@/data/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavBar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const activeId = useScrollSpy(sectionIds, 120);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleLang = () => {
    const next = i18n.language.startsWith("fr") ? "en" : "fr";
    void i18n.changeLanguage(next);
    localStorage.setItem("diti-engineers-lang", next);
  };

  return (
    <header
      className={cn(
        "group fixed inset-x-0 top-0 z-50 w-full border-b border-dashed border-border-light bg-nav-bar backdrop-blur-md interactive-colors",
        scrolled && "shadow-elevation-active",
      )}
    >
      <div className="container-main py-3 lg:py-4">
        <div className="flex flex-wrap items-center justify-between gap-6 lg:gap-0">
          <div className="flex w-full justify-between lg:w-auto">
            <a
              href="#top"
              aria-label={t("brand.name")}
              className="flex items-center font-display text-lg font-bold tracking-tight text-text-heading-light md:text-xl"
            >
              {t("brand.name")}
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t("nav.close") : t("nav.open")}
              aria-expanded={mobileOpen}
              data-state={mobileOpen ? "active" : undefined}
              className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
            >
              <Menu
                className={cn(
                  "m-auto size-6 duration-200",
                  mobileOpen && "rotate-180 scale-0 opacity-0",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 m-auto size-6 duration-200",
                  mobileOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-180 scale-0 opacity-0",
                )}
              />
            </button>
          </div>

          <div
            data-state={mobileOpen ? "active" : undefined}
            className={cn(
              "mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border-light bg-surface-card-light p-6 shadow-elevation-active md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none",
              mobileOpen && "block",
            )}
          >
            <div className="lg:pr-4">
              <nav aria-label={t("nav.primary")}>
                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block text-sm duration-150 interactive-opacity",
                          activeId === link.id
                            ? "text-text-heading-light"
                            : "text-text-muted hover:text-text-heading-light",
                        )}
                      >
                        {t(link.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:border-border-light lg:pl-6">
              <Button type="button" variant="outline" size="sm" onClick={toggleLang}>
                {i18n.language.startsWith("fr") ? "EN" : "FR"}
              </Button>

              <Button asChild size="sm">
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  {t("nav.cta")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
