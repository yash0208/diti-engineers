import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";

export function TrustStripSection() {
  const { t } = useTranslation();
  return (
    <section
      id="trust-strip"
      className="border-y border-border-dark bg-canvas py-10"
      aria-label={t("trust.headline")}
    >
      <div className="container-main">
        <RevealOnScroll
          as="p"
          className="text-center text-sm font-medium uppercase tracking-[0.18em] text-text-muted md:text-base md:tracking-[0.22em]"
        >
          {t("trust.headline")}
        </RevealOnScroll>
      </div>
    </section>
  );
}
