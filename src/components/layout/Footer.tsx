import { useTranslation } from "react-i18next";
import { navLinks } from "@/data/navigation";
import { RevealOnScroll } from "@/components/motion";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-light bg-canvas">
      <div className="container-main py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <RevealOnScroll>
            <p className="font-display text-xl font-bold text-text-heading-light">
              {t("brand.name")}
            </p>
            <p className="mt-3 max-w-xs text-sm text-text-primary-light">
              {t("footer.tagline")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <p className="text-eyebrow text-text-muted">
              {t("footer.navHeading")}
            </p>
            <nav className="mt-4 flex flex-col gap-3" aria-label={t("footer.navHeading")}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-sm text-text-heading-light interactive-opacity"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
          </RevealOnScroll>

          <RevealOnScroll delay={0.14}>
            <p className="text-eyebrow text-text-muted">
              {t("footer.contactHeading")}
            </p>
            <div className="mt-4 space-y-2 text-sm text-text-primary-light">
              <p>
                <span className="text-text-muted">{t("footer.addressLabel")}: </span>
                {t("footer.addressValue")}
              </p>
              <p>
                <span className="text-text-muted">{t("footer.gstLabel")}: </span>
                {t("footer.gstValue")}
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-12 border-t border-border-light pt-6">
          <p className="text-sm text-text-muted">
            {t("footer.rights", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
