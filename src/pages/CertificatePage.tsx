import { useTranslation } from "react-i18next";
import { HeroGalleryLayout } from "@/components/ui/hero-gallery-layout";
import { certificateGalleryImages } from "@/data/images";

export function CertificatePage() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate z-0 w-full border-y border-border-light bg-canvas">
      <HeroGalleryLayout
        containInSection
        contentClassName="items-start justify-start text-left"
        images={certificateGalleryImages}
        galleryAlt={t("pages.certificate.galleryAlt")}
      >
        <div className="container-main w-full py-6 md:py-8 lg:py-10">
          <div className="max-w-2xl shrink-0 text-left">
            <h1 className="text-section-title text-text-heading-light">
              <span className="text-accent-primary">
                {t("pages.certificate.hero.headlineLine1")}
              </span>
              <br />
              <span>{t("pages.certificate.hero.headlineLine2")}</span>
            </h1>
          </div>
        </div>
      </HeroGalleryLayout>
    </section>
  );
}
