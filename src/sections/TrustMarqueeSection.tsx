import { useTranslation } from "react-i18next";
import { brandIcons, brandKeys } from "@/data/brands";
import { colors } from "@/theme/colors";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Sparkles } from "@/components/ui/sparkles";

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

        <div className="relative mx-auto mt-8 h-[72px] max-w-4xl md:mt-10 md:h-[88px]">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={32}
            gap={40}
            durationOnHover={48}
          >
            {brandKeys.map((key) => {
              const Icon = brandIcons[key];
              return (
                <div
                  key={key}
                  className="flex w-40 shrink-0 items-center gap-3 text-text-muted md:w-44"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-base border border-border-light bg-surface-card-light">
                    <Icon className="h-4 w-4 text-accent-primary" aria-hidden />
                  </span>
                  <span className="font-mono-label text-xs md:text-sm">
                    {t(`brands.items.${key}`)}
                  </span>
                </div>
              );
            })}
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24"
            direction="right"
            blurIntensity={1}
          />
        </div>
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
