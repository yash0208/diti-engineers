import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { TestimonialV2 } from "@/components/ui/testimonial-v2";
import { cn } from "@/lib/utils";

type TrustMarqueeSectionProps = {
  fillViewport?: boolean;
  embedded?: boolean;
  id?: string;
};

export function TrustMarqueeSection({
  fillViewport = false,
  embedded = false,
  id,
}: TrustMarqueeSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-canvas",
        fillViewport
          ? cn(
              "flex min-h-[100svh] flex-col overflow-y-auto md:h-[100svh] md:overflow-hidden",
              embedded ? "border-y border-border-light" : "pt-nav lg:pt-nav-lg",
            )
          : "border-y border-border-light py-12 md:py-16",
      )}
      aria-label={t("brands.ariaLabel")}
    >
      <div
        className={cn(
          "container-main relative z-10",
          fillViewport && "flex h-full min-h-0 flex-1 flex-col py-6 md:py-8 lg:py-10",
        )}
      >
        <div className="mx-auto max-w-2xl shrink-0 text-center">
          <p className="text-eyebrow text-text-muted">{t("brands.eyebrow")}</p>
          <h2 className="mt-4 text-section-title text-text-heading-light">
            <span className="text-accent-primary">{t("brands.headlineLine1")}</span>
            <br />
            <span>{t("brands.headlineLine2")}</span>
          </h2>
        </div>

        <RevealOnScroll
          delay={0.08}
          className={fillViewport ? "flex min-h-0 flex-1 flex-col" : undefined}
        >
          <TestimonialV2
            className={
              fillViewport ? "mt-6 min-h-0 flex-1 max-h-none md:mt-8" : undefined
            }
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
