import { useTranslation } from "react-i18next";
import { HeroGalleryLayout } from "@/components/ui/hero-gallery-layout";
import { heroGalleryImages } from "@/data/images";

export function CtaBannerSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate z-0 w-full bg-canvas">
      <HeroGalleryLayout
        containInSection
        images={heroGalleryImages}
        galleryAlt={t("ctaBanner.galleryAlt")}
      >
        <div className="pointer-events-none mx-auto w-full max-w-2xl px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">
          <h2 className="text-hero-gallery-title mx-auto max-w-xl text-text-heading-light">
            {t("ctaBanner.headline")}
          </h2>
        </div>
      </HeroGalleryLayout>
    </section>
  );
}
