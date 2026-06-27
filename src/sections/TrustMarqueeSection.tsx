import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { TestimonialV2 } from "@/components/ui/testimonial-v2";

export function TrustMarqueeSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden border-y border-border-light bg-canvas py-12 md:py-16"
      aria-label={t("brands.ariaLabel")}
    >
      <div className="container-main relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-text-muted">{t("brands.eyebrow")}</p>
          <h2 className="mt-4 text-section-title text-text-heading-light">
            <span className="text-accent-primary">{t("brands.headlineLine1")}</span>
            <br />
            <span>{t("brands.headlineLine2")}</span>
          </h2>
        </div>

        <RevealOnScroll delay={0.08}>
          <TestimonialV2 />
        </RevealOnScroll>
      </div>
    </section>
  );
}
