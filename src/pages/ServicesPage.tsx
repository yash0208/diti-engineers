import { Cog, Droplets, Gauge, Layers, Settings, Truck } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  FeatureCarousel,
  type FeatureCarouselItem,
} from "@/components/ui/feature-carousel";
import { serviceItems, type ServiceItem } from "@/data/services";
import {
  viewportPageContainerClassName,
  viewportPageSectionClassName,
  type EmbeddedPageProps,
} from "@/lib/page-shell";

const serviceIcons: Record<ServiceItem["id"], typeof Layers> = {
  ciCasting: Layers,
  aluminumDie: Gauge,
  pressureDie: Settings,
  motorParts: Cog,
  pumpParts: Droplets,
  autoParts: Truck,
};

export function ServicesPage({ embedded = false }: EmbeddedPageProps) {
  const { t } = useTranslation();

  const carouselItems = useMemo<FeatureCarouselItem[]>(
    () =>
      serviceItems.map((service) => ({
        id: service.id,
        anchorId: service.slug,
        label: t(service.nameKey),
        description: t(service.bodyKey),
        image: service.imageSrc,
        imageAlt: t(service.imageAltKey),
        icon: serviceIcons[service.id],
      })),
    [t],
  );

  return (
    <section
      id={embedded ? "services" : undefined}
      className={viewportPageSectionClassName(embedded)}
    >
      <div className={viewportPageContainerClassName(embedded)}>
        <div className="mx-auto max-w-2xl shrink-0 text-center">
          <p className="text-eyebrow text-text-muted">{t("pages.services.list.eyebrow")}</p>
          <h1 className="mt-4 text-section-title text-text-heading-light">
            <span className="text-accent-primary">{t("pages.services.list.headlineLine1")}</span>
            <br />
            <span>{t("pages.services.list.headlineLine2")}</span>
          </h1>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col md:mt-8">
          <FeatureCarousel
            className="flex min-h-0 flex-1 flex-col md:p-4 lg:p-6"
            items={carouselItems}
            liveBadgeLabel={t("pages.services.carousel.liveBadge")}
          />
        </div>
      </div>
    </section>
  );
}
