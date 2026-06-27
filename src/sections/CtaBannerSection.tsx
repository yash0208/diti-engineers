import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { ArrowLink } from "@/components/ui";

export function CtaBannerSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-canvas section-padding">
      <div aria-hidden className="absolute inset-0 bg-cta-glow" />
      <div className="container-main relative">
        <div className="mx-auto max-w-[720px] text-center">
          <RevealOnScroll as="div" className="text-display text-text-heading-light">
            {t("ctaBanner.headline")}
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            className="mx-auto mt-6 max-w-xl text-body-lg text-text-primary-light"
            delay={0.1}
          >
            {t("ctaBanner.subtitle")}
          </RevealOnScroll>
          <RevealOnScroll className="mt-10 flex justify-center" delay={0.18}>
            <ArrowLink href="#contact" variant="purple">
              {t("ctaBanner.cta")}
            </ArrowLink>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
