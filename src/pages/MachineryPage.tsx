import { Cpu, Hammer, ScanLine, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureCard } from "@/components/pages/FeatureCard";
import { PageSection } from "@/components/pages/PageSection";
import { imageRegistry } from "@/data/images";

const machineryKeys = ["ciLine", "dieCasting", "machining", "inspection"] as const;
const machineryIcons = [Hammer, Zap, Cpu, ScanLine] as const;

export function MachineryPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("pages.machinery.hero.eyebrow")}
        headlineLine1={t("pages.machinery.hero.headlineLine1")}
        headlineLine2={t("pages.machinery.hero.headlineLine2")}
        subtitle={t("pages.machinery.hero.subtitle")}
      />

      <section className="section-padding">
        <div className="container-main grid gap-12 lg:grid-cols-2 lg:items-center">
          <RevealOnScroll>
            <div className="overflow-hidden rounded-xs border border-border-light">
              <img
                src={imageRegistry.showcase.factory}
                alt={t("pages.machinery.intro.imageAlt")}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-eyebrow text-text-muted">
              {t("pages.machinery.intro.eyebrow")}
            </p>
            <h2 className="mt-4 text-section-title text-text-heading-light">
              <span className="text-accent-primary">
                {t("pages.machinery.intro.headlineLine1")}
              </span>
              <br />
              {t("pages.machinery.intro.headlineLine2")}
            </h2>
            <p className="mt-6 text-body-lg text-text-primary-light">
              {t("pages.machinery.intro.body")}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <PageSection
        bordered
        eyebrow={t("pages.machinery.equipment.eyebrow")}
        headlineLine1={t("pages.machinery.equipment.headlineLine1")}
        headlineLine2={t("pages.machinery.equipment.headlineLine2")}
        subtitle={t("pages.machinery.equipment.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {machineryKeys.map((key, index) => (
            <FeatureCard
              key={key}
              icon={machineryIcons[index]}
              title={t(`pages.machinery.equipment.items.${key}.title`)}
              body={t(`pages.machinery.equipment.items.${key}.body`)}
              delay={index * 0.06}
            />
          ))}
        </div>
      </PageSection>
    </>
  );
}
