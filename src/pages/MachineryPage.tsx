import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { GalleryHoverCarousel } from "@/components/ui";
import { machineryCards } from "@/data/machinery";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  viewportPageContainerClassName,
  viewportPageSectionClassName,
  type EmbeddedPageProps,
} from "@/lib/page-shell";

export function MachineryPage({ embedded = false }: EmbeddedPageProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const carouselItems = useMemo(
    () =>
      machineryCards.map(({ key, media }) => ({
        id: key,
        title: t(`pages.machinery.cards.${key}.title`),
        summary: t(`pages.machinery.cards.${key}.body`),
        url: "/contact",
        media,
        imageAlt: t(`pages.machinery.imageAlt.${key}`),
        learnMoreLabel: t("pages.machinery.learnMore"),
        stat1Value: t(`pages.machinery.cards.${key}.stat1Value`),
        stat1Suffix: t(`pages.machinery.cards.${key}.stat1Suffix`),
        stat1Label: t(`pages.machinery.cards.${key}.stat1Label`),
        stat2Value: t(`pages.machinery.cards.${key}.stat2Value`),
        stat2Suffix: t(`pages.machinery.cards.${key}.stat2Suffix`),
        stat2Label: t(`pages.machinery.cards.${key}.stat2Label`),
      })),
    [t],
  );

  return (
    <section
      id={embedded ? "machinery" : undefined}
      className={viewportPageSectionClassName(embedded)}
    >
      <div className={viewportPageContainerClassName(embedded)}>
        <GalleryHoverCarousel
          fillViewport={embedded && !isMobile}
          eyebrow={t("pages.machinery.eyebrow")}
          headlineLine1={t("pages.machinery.headlineLine1")}
          headlineLine2={t("pages.machinery.headlineLine2")}
          subtitle={t("pages.machinery.subtitle")}
          items={carouselItems}
        />
      </div>
    </section>
  );
}
