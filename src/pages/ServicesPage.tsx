import { Cog, Droplets, Gauge, Layers, Settings, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { FeatureCard } from "@/components/pages/FeatureCard";
import { PageSection } from "@/components/pages/PageSection";
import { AboutSection } from "@/components/ui/about-section";
import { serviceItems } from "@/data/services";

const serviceIcons = [Layers, Gauge, Settings, Cog, Droplets, Truck] as const;

export function ServicesPage() {
  const { t } = useTranslation();

  return (
    <>
      <AboutSection variant="services" />

      <PageSection
        bordered
        eyebrow={t("pages.services.list.eyebrow")}
        headlineLine1={t("pages.services.list.headlineLine1")}
        headlineLine2={t("pages.services.list.headlineLine2")}
        subtitle={t("pages.services.list.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceItems.map((service, index) => (
            <div key={service.id} id={service.slug}>
              <FeatureCard
                icon={serviceIcons[index]}
                title={t(service.nameKey)}
                body={t(service.bodyKey)}
                delay={index * 0.05}
              />
            </div>
          ))}
        </div>
      </PageSection>

      <section className="border-t border-border-light bg-surface-muted section-padding">
        <div className="container-main">
          <RevealOnScroll>
            <p className="text-eyebrow text-text-muted">
              {t("pages.services.process.eyebrow")}
            </p>
            <h2 className="mt-4 text-section-title text-text-heading-light">
              <span className="text-accent-primary">
                {t("pages.services.process.headlineLine1")}
              </span>
              <br />
              {t("pages.services.process.headlineLine2")}
            </h2>
          </RevealOnScroll>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(["step1", "step2", "step3", "step4"] as const).map((step, index) => (
              <RevealOnScroll key={step} delay={index * 0.06}>
                <li className="rounded-xs border border-border-light bg-surface-card-light p-6">
                  <span className="font-mono-label text-sm text-accent-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-h3 text-text-heading-light">
                    {t(`pages.services.process.steps.${step}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-text-primary-light">
                    {t(`pages.services.process.steps.${step}.body`)}
                  </p>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
