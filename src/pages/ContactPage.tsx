import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuoteSheet } from "@/components/contact/QuoteSheet";
import { RevealOnScroll } from "@/components/motion";
import { ArrowLink } from "@/components/ui";
import { businessProfile } from "@/data/profile";

const faqKeys = ["quote", "materials", "leadTime", "certifications"] as const;
const hourKeys = ["weekdays", "saturday", "sunday"] as const;

export function ContactPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHero
        eyebrow={t("pages.contact.hero.eyebrow")}
        headlineLine1={t("pages.contact.hero.headlineLine1")}
        headlineLine2={t("pages.contact.hero.headlineLine2")}
        subtitle={t("pages.contact.hero.subtitle")}
      />

      <section className="section-padding">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="rounded-xs border border-border-light bg-surface-card-light p-8 shadow-elevation">
              <h2 className="text-h2 text-text-heading-light">
                {t("pages.contact.details.heading")}
              </h2>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent-primary" aria-hidden />
                  <div>
                    <p className="text-eyebrow text-text-muted">
                      {t("footer.addressLabel")}
                    </p>
                    <p className="mt-1 text-sm text-text-primary-light">
                      {t("footer.addressValue")}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 size-5 shrink-0 text-accent-primary" aria-hidden />
                  <div>
                    <p className="text-eyebrow text-text-muted">
                      {t("pages.contact.details.emailLabel")}
                    </p>
                    <p className="mt-1 text-sm text-text-primary-light">
                      {t("pages.contact.details.emailValue")}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-accent-primary" aria-hidden />
                  <div>
                    <p className="text-eyebrow text-text-muted">
                      {t("pages.contact.details.phoneLabel")}
                    </p>
                    <p className="mt-1 text-sm text-text-primary-light">
                      {t("pages.contact.details.phoneValue")}
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-8 border-t border-border-light pt-6">
                <p className="text-eyebrow text-text-muted">
                  {businessProfile.company.proprietor.title}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-text-heading-light">
                  {businessProfile.company.proprietor.name}
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <div className="rounded-xs border border-border-light bg-surface-card-light p-8 shadow-elevation">
              <h2 className="text-h2 text-text-heading-light">
                {t("pages.contact.quote.heading")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-primary-light">
                {t("pages.contact.quote.body")}
              </p>
              <ArrowLink
                variant="purple"
                className="mt-8"
                onClick={() => setOpen(true)}
              >
                {t("contact.openCta")}
              </ArrowLink>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <PageSection
        bordered
        align="left"
        eyebrow={t("pages.contact.hours.eyebrow")}
        headlineLine1={t("pages.contact.hours.headlineLine1")}
        headlineLine2={t("pages.contact.hours.headlineLine2")}
      >
        <dl className="grid gap-4 sm:grid-cols-3">
          {hourKeys.map((key) => (
            <div
              key={key}
              className="rounded-xs border border-border-light bg-surface-card-light p-5"
            >
              <dt className="text-eyebrow text-text-muted">
                {t(`pages.contact.hours.items.${key}.label`)}
              </dt>
              <dd className="mt-2 text-sm font-medium text-text-heading-light">
                {t(`pages.contact.hours.items.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection
        bordered
        align="left"
        eyebrow={t("pages.contact.faq.eyebrow")}
        headlineLine1={t("pages.contact.faq.headlineLine1")}
        headlineLine2={t("pages.contact.faq.headlineLine2")}
      >
        <div className="space-y-4">
          {faqKeys.map((key, index) => (
            <RevealOnScroll key={key} delay={index * 0.05}>
              <article className="rounded-xs border border-border-light bg-surface-card-light p-6">
                <h3 className="text-h3 text-text-heading-light">
                  {t(`pages.contact.faq.items.${key}.question`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-primary-light">
                  {t(`pages.contact.faq.items.${key}.answer`)}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </PageSection>

      <QuoteSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
