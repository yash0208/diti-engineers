import { useTranslation } from "react-i18next";
import { HeroGalleryLayout } from "@/components/ui/hero-gallery-layout";
import { heroGalleryImages } from "@/data/images";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative isolate w-full bg-canvas">
      <HeroGalleryLayout
        images={heroGalleryImages}
        galleryAlt={t("hero.galleryAlt")}
      >
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
      </HeroGalleryLayout>
    </section>
  );
}
