import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/motion";
import { footerNavLinks, navLinks } from "@/data/navigation";
import { serviceItems } from "@/data/services";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const contactLink = navLinks.find((link) => link.id === "contact");

  return (
    <footer className="border-t border-border-light bg-canvas">
      <div className="container-main py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
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
              {footerNavLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  className="text-sm text-text-heading-light interactive-opacity"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              {contactLink ? (
                <Link
                  to={contactLink.href}
                  className="text-sm text-text-heading-light interactive-opacity"
                >
                  {t(contactLink.labelKey)}
                </Link>
              ) : null}
            </nav>
          </RevealOnScroll>

          <RevealOnScroll delay={0.12}>
            <p className="text-eyebrow text-text-muted">
              {t("footer.servicesHeading")}
            </p>
            <nav className="mt-4 flex flex-col gap-3" aria-label={t("footer.servicesHeading")}>
              {serviceItems.map((service) => (
                <Link
                  key={service.id}
                  to={`/services#${service.slug}`}
                  className="text-sm text-text-heading-light interactive-opacity"
                >
                  {t(service.nameKey)}
                </Link>
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
              <p>
                <span className="text-text-muted">{t("footer.hoursLabel")}: </span>
                {t("footer.hoursValue")}
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
