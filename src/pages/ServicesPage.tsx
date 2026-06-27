import { Cog, Droplets, Gauge, Layers, Settings, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/motion";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureCard } from "@/components/pages/FeatureCard";
import { PageSection } from "@/components/pages/PageSection";
import { Button } from "@/components/ui/button";
import { serviceItems } from "@/data/services";
import { imageRegistry } from "@/data/images";

const serviceIcons = [Layers, Gauge, Settings, Cog, Droplets, Truck] as const;

export function ServicesPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("pages.services.hero.eyebrow")}
        headlineLine1={t("pages.services.hero.headlineLine1")}
        headlineLine2={t("pages.services.hero.headlineLine2")}
        subtitle={t("pages.services.hero.subtitle")}
      />

      <section className="section-padding">
        <div className="container-main grid gap-12 lg:grid-cols-2 lg:items-center">
          <RevealOnScroll>
            <p className="text-eyebrow text-text-muted">
              {t("pages.services.intro.eyebrow")}
            </p>
            <h2 className="mt-4 text-section-title text-text-heading-light">
              <span className="text-accent-primary">
                {t("pages.services.intro.headlineLine1")}
              </span>
              <br />
              {t("pages.services.intro.headlineLine2")}
            </h2>
            <p className="mt-6 text-body-lg text-text-primary-light">
              {t("pages.services.intro.body")}
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link to="/contact">{t("pages.services.intro.cta")}</Link>
            </Button>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="overflow-hidden rounded-xs border border-border-light">
              <img
                src={imageRegistry.applications.oem}
                alt={t("pages.services.intro.imageAlt")}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

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
