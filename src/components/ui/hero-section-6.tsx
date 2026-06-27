import { ArrowRight, Mail, SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { HeroImageStrips } from "@/components/ui/image-auto-slider";
import {
  heroStripImagesBottom,
  heroStripImagesTop,
} from "@/data/images";
import { cn } from "@/lib/utils";

type HeroSection6Props = {
  className?: string;
};

export function HeroSection6({ className }: HeroSection6Props) {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      className={cn("relative isolate overflow-hidden bg-canvas pt-nav lg:pt-nav-lg", className)}
    >
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center sm:flex"
        >
          <HeroImageStrips
            topImages={heroStripImagesTop}
            bottomImages={heroStripImagesBottom}
            imageAlt={t("hero.stripImageAlt")}
            className="w-full max-w-4xl px-6"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-canvas from-0% via-canvas/95 via-[28%] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-28 pt-24 lg:pb-20 lg:pt-28">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="relative mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
            <a
              href="#capabilities"
              className="mx-auto flex w-fit items-center gap-2 rounded-base border border-border-light bg-surface-card-light p-1 pr-3 interactive-colors lg:ml-0"
            >
              <span className="rounded-sm bg-surface-muted px-2 py-1 font-mono-label text-xs text-text-muted">
                {t("hero.badgeLabel")}
              </span>
              <span className="text-sm text-text-primary-light">{t("hero.badgeText")}</span>
              <span className="block h-4 w-px bg-border-light" aria-hidden />
              <ArrowRight className="size-4 text-text-muted" aria-hidden />
            </a>

            <h1 className="mt-10 text-balance text-h1 text-text-heading-light">
              <span className="block text-accent-primary">{t("hero.titleLine1")}</span>
              <span className="block">{t("hero.titleLine2")}</span>
            </h1>

            <p className="mt-8 text-body-lg text-text-primary-light">
              <span className="block">{t("hero.subtitleLine1")}</span>
              <span className="block">{t("hero.subtitleLine2")}</span>
            </p>

            <div>
              <form
                action="#contact"
                className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="relative grid grid-cols-[1fr_auto] items-center rounded-base border border-border-light bg-surface-card-light pr-2 shadow-elevation has-[input:focus]:ring-2 has-[input:focus]:ring-accent-primary/30">
                  <Mail
                    className="pointer-events-none absolute inset-y-0 left-5 my-auto size-5 text-text-muted"
                    aria-hidden
                  />

                  <input
                    placeholder={t("hero.emailPlaceholder")}
                    className="h-14 w-full bg-transparent pl-12 text-sm text-text-heading-light placeholder:text-text-muted focus:outline-none"
                    type="email"
                    name="email"
                    aria-label={t("hero.emailPlaceholder")}
                  />

                  <Button asChild aria-label={t("hero.submitAria")}>
                    <a href="#contact">
                      <span className="hidden md:block">{t("hero.submitLabel")}</span>
                      <SendHorizonal
                        className="relative mx-auto size-5 md:hidden"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </a>
                  </Button>
                </div>
              </form>

              <ul className="list-inside list-disc space-y-2 text-sm text-text-muted">
                <li>{t("hero.bullet1")}</li>
                <li>{t("hero.bullet2")}</li>
                <li>{t("hero.bullet3")}</li>
              </ul>
            </div>
            </div>
          </div>

          <div className="mt-10 sm:hidden">
            <HeroImageStrips
              topImages={heroStripImagesTop}
              bottomImages={heroStripImagesBottom}
              imageAlt={t("hero.stripImageAlt")}
              className="px-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
