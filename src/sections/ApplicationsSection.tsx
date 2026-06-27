import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { ArrowLink, SectionHeader } from "@/components/ui";
import { ShowcaseCard } from "@/components/pages/ShowcaseCard";
import { imageRegistry } from "@/data/images";

const applicationCards = [
  {
    key: "oem",
    imageSrc: imageRegistry.applications.oem,
    wider: true,
  },
  {
    key: "production",
    imageSrc: imageRegistry.applications.production,
    wider: false,
  },
] as const;

export function ApplicationsSection() {
  const { t } = useTranslation();

  return (
    <section id="applications" className="border-y border-border-light bg-canvas section-padding">
      <div className="container-main">
        <RevealOnScroll>
          <SectionHeader
            eyebrow={t("applications.eyebrow")}
            headlineLine1={t("applications.headlineLine1")}
            headlineLine2={t("applications.headlineLine2")}
            subtitle={t("applications.subtitle")}
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {applicationCards.map(({ key, imageSrc, wider }, index) => (
            <RevealOnScroll
              key={key}
              className={wider ? "lg:col-span-7" : "lg:col-span-5"}
              delay={0.08 + index * 0.06}
            >
              <ShowcaseCard
                translationPrefix={`applications.cards.${key}`}
                imageSrc={imageSrc}
                imageAlt={t(`applications.imageAlt.${key}`)}
                learnMoreHref="#contact"
                learnMoreLabelKey="applications.learnMore"
              />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-10 flex justify-center" delay={0.2}>
          <ArrowLink href="#contact" variant="purple">
            {t("nav.cta")}
          </ArrowLink>
        </RevealOnScroll>
      </div>
    </section>
  );
}
