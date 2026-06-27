import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/motion";
import { ArrowLink } from "@/components/ui";
import { imageRegistry } from "@/data/images";

export function VideoSection() {
  const { t } = useTranslation();

  return (
    <section id="video" className="relative overflow-hidden bg-canvas-dark">
      <div className="absolute inset-0">
        <img
          src={imageRegistry.video.poster}
          alt={t("video.imageAlt")}
          className="h-full w-full object-cover opacity-60"
        />
        <div aria-hidden className="absolute inset-0 bg-canvas-dark/50" />
      </div>

      <div className="container-main relative z-10 section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <button
              type="button"
              className="mx-auto mb-10 inline-flex items-center gap-3 font-mono-label text-text-on-dark interactive-press interactive-opacity"
              aria-label={t("video.play")}
            >
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-glass bg-surface-glass"
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
                  <path d="M1 1L13 8L1 15V1Z" fill="currentColor" />
                </svg>
              </span>
              {t("video.play")}
            </button>
          </RevealOnScroll>

          <RevealOnScroll as="div" className="text-display text-text-on-dark" delay={0.08}>
            {t("video.headline")}
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            className="mx-auto mt-6 max-w-2xl text-body-lg text-text-primary-dark"
            delay={0.14}
          >
            {t("video.subtitle")}
          </RevealOnScroll>
          <RevealOnScroll className="mt-10 flex justify-center" delay={0.2}>
            <ArrowLink href="#contact" variant="light">
              {t("video.requestDemo")}
            </ArrowLink>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
