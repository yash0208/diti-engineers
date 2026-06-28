import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { ArrowLink, SectionHeader } from "@/components/ui";
import { QuoteSheet } from "@/components/contact/QuoteSheet";
import { businessProfile } from "@/data/profile";

export function ContactSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <section
      id="contact"
      className="border-t border-border-light bg-canvas section-padding"
    >
      <div className="container-main">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <RevealOnScroll>
              <SectionHeader
                align="left"
                eyebrow={t("contact.eyebrow")}
                headlineLine1={t("contact.headlineLine1")}
                headlineLine2={t("contact.headlineLine2")}
              />
            </RevealOnScroll>
            <RevealOnScroll
              as="p"
              className="mt-5 max-w-md text-body-lg text-text-primary-light"
              delay={0.14}
            >
              {t("contact.subtitle")}
            </RevealOnScroll>
            <RevealOnScroll className="mt-8" delay={0.2}>
              <ArrowLink variant="purple" onClick={() => setOpen(true)}>
                {t("contact.openCta")}
              </ArrowLink>
            </RevealOnScroll>
          </div>
          <RevealOnScroll
            className="rounded-md border border-border-light bg-surface-card-light p-7 shadow-card"
            delay={0.18}
          >
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-eyebrow text-text-muted">
                  {t("footer.addressLabel")}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-text-heading-light">
                  {t("footer.addressValue")}
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-text-muted">
                  {t("footer.gstLabel")}
                </dt>
                <dd className="mt-1.5 font-mono text-sm text-text-primary-light">
                  {businessProfile.company.gst.number}
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-text-muted">
                  {businessProfile.company.proprietor.title}
                </dt>
                <dd className="mt-1.5 text-sm text-text-primary-light">
                  {businessProfile.company.proprietor.name}
                </dd>
              </div>
            </dl>
          </RevealOnScroll>
        </div>
      </div>
      <QuoteSheet open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
