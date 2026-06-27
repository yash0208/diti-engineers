import { BadgeCheck, FileCheck, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureCard } from "@/components/pages/FeatureCard";
import { PageSection } from "@/components/pages/PageSection";
import { businessProfile } from "@/data/profile";

const certKeys = ["gst", "quality", "compliance"] as const;
const certIcons = [BadgeCheck, ShieldCheck, FileCheck] as const;

export function CertificatePage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("pages.certificate.hero.eyebrow")}
        headlineLine1={t("pages.certificate.hero.headlineLine1")}
        headlineLine2={t("pages.certificate.hero.headlineLine2")}
        subtitle={t("pages.certificate.hero.subtitle")}
      />

      <PageSection
        align="left"
        eyebrow={t("pages.certificate.credentials.eyebrow")}
        headlineLine1={t("pages.certificate.credentials.headlineLine1")}
        headlineLine2={t("pages.certificate.credentials.headlineLine2")}
        subtitle={t("pages.certificate.credentials.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {certKeys.map((key, index) => (
            <FeatureCard
              key={key}
              icon={certIcons[index]}
              title={t(`pages.certificate.credentials.items.${key}.title`)}
              body={t(`pages.certificate.credentials.items.${key}.body`)}
              delay={index * 0.06}
            />
          ))}
        </div>
      </PageSection>

      <section className="border-t border-border-light bg-surface-muted section-padding">
        <div className="container-main">
          <RevealOnScroll>
            <p className="text-eyebrow text-text-muted">
              {t("pages.certificate.factsheet.eyebrow")}
            </p>
            <h2 className="mt-4 text-section-title text-text-heading-light">
              <span className="text-accent-primary">
                {t("pages.certificate.factsheet.headlineLine1")}
              </span>
              <br />
              {t("pages.certificate.factsheet.headlineLine2")}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  ["nature", businessProfile.factsheet.basicInformation.natureOfBusiness],
                  ["ceo", businessProfile.factsheet.basicInformation.companyCeo],
                  ["gstDate", businessProfile.factsheet.basicInformation.gstRegistrationDate],
                  ["legal", businessProfile.factsheet.basicInformation.legalStatusOfFirm],
                  ["turnover", businessProfile.factsheet.basicInformation.annualTurnover],
                  ["gstNo", businessProfile.factsheet.statutoryProfile.gstNo],
                ] as const
              ).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-xs border border-border-light bg-surface-card-light p-6"
                >
                  <dt className="text-eyebrow text-text-muted">
                    {t(`pages.certificate.factsheet.fields.${key}`)}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-semibold text-text-heading-light">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
