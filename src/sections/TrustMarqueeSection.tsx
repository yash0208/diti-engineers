import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { Sparkles } from "@/components/ui/sparkles";
import { TestimonialV2 } from "@/components/ui/testimonial-v2";
import { colors } from "@/theme/colors";

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

      <div
        aria-hidden
        className="pointer-events-none relative -mt-8 h-40 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] md:h-48"
      >
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--color-gradient-accent),transparent_70%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 z-10 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-border-light bg-canvas" />
        <Sparkles
          density={56}
          color={colors.sparklesOnLight}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </section>
  );
}
