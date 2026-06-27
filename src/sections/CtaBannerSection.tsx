import { useTranslation } from "react-i18next";
import { HeroGalleryLayout } from "@/components/ui/hero-gallery-layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { heroGalleryImages } from "@/data/images";

export function CtaBannerSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate z-0 w-full border-y border-border-light bg-canvas">
      <HeroGalleryLayout
        containInSection
        images={heroGalleryImages}
        galleryAlt={t("ctaBanner.galleryAlt")}
      >
        <div className="pointer-events-none mx-auto w-full max-w-2xl px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">
          <SectionHeader
            eyebrow={t("ctaBanner.eyebrow")}
            headlineLine1={t("ctaBanner.headlineLine1")}
            headlineLine2={t("ctaBanner.headlineLine2")}
            subtitle={t("ctaBanner.subtitle")}
            size="display"
          />
        </div>
      </HeroGalleryLayout>
    </section>
  );
}
