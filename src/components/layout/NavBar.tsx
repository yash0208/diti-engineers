import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, sectionIds } from "@/data/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ArrowLink } from "@/components/ui";
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

  const onDark = false;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b border-border-light bg-nav-bar backdrop-blur-md interactive-colors",
        scrolled && "shadow-elevation-active",
      )}
    >
      <div className="container-main flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className={cn(
            "font-display text-lg font-bold tracking-tight md:text-xl",
            onDark ? "text-text-on-dark" : "text-text-heading-light",
          )}
        >
          {t("brand.name")}
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label={t("nav.primary")}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                "relative text-sm interactive-opacity",
                onDark ? "text-text-on-dark" : "text-text-heading-light",
                activeId === link.id && "opacity-100",
              )}
            >
              {t(link.labelKey)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleLang}
            className={cn(
              "text-xs font-medium uppercase tracking-wider interactive-opacity",
              onDark ? "text-text-on-dark/70" : "text-text-muted",
            )}
            aria-label={t("nav.toggleLang")}
          >
            {i18n.language.startsWith("fr") ? "EN" : "FR"}
          </button>
          <ArrowLink href="#contact" variant="purple">
            {t("nav.cta")}
          </ArrowLink>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xs interactive-press md:hidden",
            onDark ? "text-text-on-dark" : "text-text-heading-light",
          )}
          aria-label={mobileOpen ? t("nav.close") : t("nav.open")}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 block h-px w-5 bg-current interactive-transform",
                mobileOpen && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[6px] block h-px w-5 bg-current transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                mobileOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[12px] block h-px w-5 bg-current interactive-transform",
                mobileOpen && "-translate-y-[6px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border-light bg-canvas md:hidden">
          <nav className="container-main flex flex-col gap-2 py-6" aria-label={t("nav.primary")}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-xs px-3 py-3 text-base font-medium",
                  activeId === link.id
                    ? "bg-surface-muted text-accent-primary"
                    : "text-text-heading-light",
                )}
              >
                {t(link.labelKey)}
              </a>
            ))}
            <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
              <button
                type="button"
                onClick={toggleLang}
                className="text-xs font-medium uppercase tracking-wider text-text-muted"
              >
                {i18n.language.startsWith("fr") ? "EN" : "FR"}
              </button>
              <ArrowLink href="#contact" variant="purple">
                {t("nav.cta")}
              </ArrowLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
