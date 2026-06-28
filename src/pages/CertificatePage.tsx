import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  HeroGalleryLayout,
  type HeroGalleryItem,
} from "@/components/ui/hero-gallery-layout";
import {
  certificateGalleryImages,
  certificateGalleryKeys,
  certificateGallerySources,
} from "@/data/images";
import type { EmbeddedPageProps } from "@/lib/page-shell";
import { cn } from "@/lib/utils";

export function CertificatePage({ embedded = false }: EmbeddedPageProps) {
  const { t } = useTranslation();

  const galleryItems = useMemo<readonly HeroGalleryItem[]>(
    () =>
      certificateGalleryKeys.map((key) => {
        const title = t(`pages.certificate.gallery.items.${key}.title`);

        return {
          src: certificateGallerySources[key],
          alt: title,
          title,
          description: t(`pages.certificate.gallery.items.${key}.description`),
          viewAriaLabel: t("pages.certificate.gallery.viewImageAria", { title }),
        };
      }),
    [t],
  );

  return (
    <section
      id={embedded ? "certificate" : undefined}
      className={cn(
        "relative isolate w-full border-y border-border-light bg-canvas",
      )}
    >
      <HeroGalleryLayout
        containInSection
        fadeGalleryOnExit={embedded}
        contentClassName="pointer-events-none items-start justify-start text-left"
        images={certificateGalleryImages}
        galleryItems={galleryItems}
        galleryAlt={t("pages.certificate.galleryAlt")}
        lightboxCloseLabel={t("pages.certificate.gallery.closeDialog")}
        lightboxPrevLabel={t("pages.certificate.gallery.prevImage")}
        lightboxNextLabel={t("pages.certificate.gallery.nextImage")}
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
