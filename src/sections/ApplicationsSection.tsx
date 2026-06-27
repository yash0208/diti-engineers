import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { ArrowLink, SectionHeader } from "@/components/ui";
import { imageRegistry } from "@/data/images";

type ApplicationCardProps = {
  cardKey: "oem" | "production";
  imageSrc: string;
  imageAlt: string;
  wider?: boolean;
};

function ApplicationCard({
  cardKey,
  imageSrc,
  imageAlt,
  wider,
}: ApplicationCardProps) {
  const { t } = useTranslation();
  const prefix = `applications.cards.${cardKey}`;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xs border border-border-light bg-surface-card-light ${
        wider ? "lg:col-span-7" : "lg:col-span-5"
      }`}
    >
      <div className="p-5">
        <div className="aspect-[625/298] overflow-hidden rounded-xs bg-surface-muted">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover interactive-transform interactive-transform-hover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <h3 className="text-h3 text-text-heading-light">
          {t(`${prefix}.title`)}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-text-primary-light">
          {t(`${prefix}.body`)}
        </p>
        <div className="mt-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-mono-label text-sm text-text-heading-light interactive-opacity"
          >
            {t("applications.learnMore")}
            <span aria-hidden>{">>"}</span>
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-border-light">
        <div className="border-r border-border-light p-6">
          <p className="font-display text-4xl font-bold text-text-heading-light md:text-5xl">
            {t(`${prefix}.stat1Value`)}
            <span className="text-accent-primary">{t(`${prefix}.stat1Suffix`)}</span>
          </p>
          <p className="mt-2 text-sm text-text-muted">{t(`${prefix}.stat1Label`)}</p>
        </div>
        <div className="p-6">
          <p className="font-display text-4xl font-bold text-text-heading-light md:text-5xl">
            {t(`${prefix}.stat2Value`)}
            <span className="text-accent-primary">{t(`${prefix}.stat2Suffix`)}</span>
          </p>
          <p className="mt-2 text-sm text-text-muted">{t(`${prefix}.stat2Label`)}</p>
        </div>
      </div>
    </article>
  );
}

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
          <RevealOnScroll className="lg:col-span-7" delay={0.08}>
            <ApplicationCard
              cardKey="oem"
              imageSrc={imageRegistry.applications.oem}
              imageAlt={t("applications.imageAlt.oem")}
              wider
            />
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-5" delay={0.14}>
            <ApplicationCard
              cardKey="production"
              imageSrc={imageRegistry.applications.production}
              imageAlt={t("applications.imageAlt.production")}
            />
          </RevealOnScroll>
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
