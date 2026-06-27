import { useTranslation } from "react-i18next";
import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroVideo,
} from "@/components/ui/animated-video-on-scroll";
import { imageRegistry } from "@/data/images";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative isolate w-full">
      <ContainerScroll className="h-[350vh]">
        <ContainerSticky className="flex h-svh flex-col items-center bg-hero-ambient px-6 pb-8 pt-20 text-text-on-dark md:px-8 md:pt-24">
          <ContainerAnimated className="w-full max-w-3xl shrink-0 space-y-2 text-center">
            <h1 className="text-display text-text-on-dark">{t("hero.title")}</h1>
            <p className="mx-auto max-w-[42ch] text-body-lg text-text-on-dark/80">
              {t("hero.subtitle")}
            </p>
          </ContainerAnimated>

          <ContainerInset
            insetYRange={[18, 0]}
            insetXRange={[18, 0]}
            className="mt-4 h-[min(54svh,520px)] w-full max-w-4xl shrink-0 md:mt-5"
          >
            <HeroVideo
              src={imageRegistry.heroVideo}
              aria-label={t("hero.videoAlt")}
              scaleRange={[0.88, 1]}
            />
          </ContainerInset>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
