import { useTranslation } from "react-i18next";
import {
  HeroGalleryBackdrop,
  HeroGalleryCell,
  HeroGalleryContent,
  HeroGalleryGrid,
  HeroGalleryScroll,
} from "@/components/ui/hero-gallery-scroll-animation";
import { Threads } from "@/components/ui/threads";
import { heroGalleryImages } from "@/data/images";
import { effectColors } from "@/theme/colors";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative isolate w-full bg-canvas">
      <HeroGalleryScroll className="h-[350vh]">
        <HeroGalleryGrid className="sticky top-16 z-0 h-[calc(100svh-4rem)] w-full p-4 md:top-20 md:h-[calc(100svh-5rem)]">
          {heroGalleryImages.map((imageUrl, index) => (
            <HeroGalleryCell
              key={imageUrl}
              className="overflow-hidden rounded-xl shadow-elevation"
            >
              <img
                className="size-full object-cover object-center"
                src={imageUrl}
                alt={t("hero.galleryAlt")}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </HeroGalleryCell>
          ))}
        </HeroGalleryGrid>

        <HeroGalleryBackdrop aria-hidden>
          <Threads
            className="pointer-events-auto size-full"
            color={effectColors.threadsLineRgb}
            amplitude={0.85}
            distance={0.08}
            enableMouseInteraction
          />
        </HeroGalleryBackdrop>

        <HeroGalleryContent className="z-10 px-4 text-center">
          <div className="pointer-events-none mx-auto w-full max-w-2xl px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">
            <h1 className="text-hero-gallery-title mx-auto max-w-xl text-text-heading-light">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="block">{t("hero.titleLine2")}</span>
            </h1>
            <p className="text-hero-gallery-subtitle mx-auto mt-4 max-w-md text-text-primary-light">
              <span className="block">{t("hero.subtitleLine1")}</span>
              <span className="block">{t("hero.subtitleLine2")}</span>
            </p>
          </div>
        </HeroGalleryContent>
      </HeroGalleryScroll>
    </section>
  );
}
