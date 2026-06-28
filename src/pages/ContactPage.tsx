import { type FormEvent, useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import { QuoteSheet } from "@/components/contact/QuoteSheet";
import {
  Button,
  ContactCard,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { imageRegistry } from "@/data/images";
import {
  type EmbeddedPageProps,
  viewportPageContainerClassName,
  viewportPageSectionClassName,
} from "@/lib/page-shell";
import { cn } from "@/lib/utils";

const hourKeys = ["weekdays", "saturday", "sunday"] as const;

export function ContactPage({ embedded = false }: EmbeddedPageProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    void video.play().catch(() => undefined);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <section
        id={embedded ? "contact" : undefined}
        className={cn(viewportPageSectionClassName(embedded), "relative isolate overflow-hidden")}
      >
        <video
          ref={videoRef}
          src={imageRegistry.contact.backgroundVideo}
          poster={imageRegistry.contact.backgroundPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={t("pages.contact.card.videoAlt")}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-canvas/40"
        />

        <div
          className={cn(
            viewportPageContainerClassName(embedded),
            "relative z-10 items-center justify-center overflow-y-auto",
          )}
        >
          <ContactCard
            className="w-full max-w-5xl"
            title={t("pages.contact.card.title")}
            description={t("pages.contact.card.description")}
            hoursHeading={t("pages.contact.hours.eyebrow")}
            hoursItems={hourKeys.map((key) => ({
              label: t(`pages.contact.hours.items.${key}.label`),
              value: t(`pages.contact.hours.items.${key}.value`),
            }))}
            contactInfo={[
              {
                icon: Mail,
                label: t("pages.contact.details.emailLabel"),
                value: t("pages.contact.details.emailValue"),
              },
              {
                icon: Phone,
                label: t("pages.contact.details.phoneLabel"),
                value: t("pages.contact.details.phoneValue"),
              },
              {
                icon: MapPin,
                label: t("footer.addressLabel"),
                value: t("footer.addressValue"),
                className: "md:col-span-2 lg:col-span-1",
              },
            ]}
          >
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name">{t("pages.contact.card.nameLabel")}</Label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t("pages.contact.card.namePlaceholder")}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email">{t("pages.contact.card.emailLabel")}</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("pages.contact.card.emailPlaceholder")}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-phone">{t("pages.contact.card.phoneLabel")}</Label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={t("pages.contact.card.phonePlaceholder")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message">{t("pages.contact.card.messageLabel")}</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder={t("pages.contact.card.messagePlaceholder")}
                  rows={3}
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                {t("pages.contact.card.submit")}
              </Button>
              <p className="text-center text-xs text-text-muted">
                {t("pages.contact.card.quoteCta")}{" "}
                <button
                  type="button"
                  className="font-medium text-accent-primary underline-offset-4 hover:underline"
                  onClick={() => setOpen(true)}
                >
                  {t("pages.contact.card.quoteLink")}
                </button>
              </p>
            </form>
          </ContactCard>
        </div>
      </section>

      <QuoteSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
