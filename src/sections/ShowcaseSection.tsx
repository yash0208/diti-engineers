import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useTransform } from "framer-motion";
import {
  Parallax,
  RevealOnScroll,
  useScrollProgress,
} from "@/components/motion";
import { imageRegistry } from "@/data/images";

type MetricKey = "materials" | "applications" | "leadTime" | "scale";
const metricKeys: MetricKey[] = ["materials", "applications", "leadTime", "scale"];

export function ShowcaseSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const progress = useScrollProgress(ref);
  const accentOpacity = useTransform(progress, [0, 0.4], [0, 0.3]);

  return (
    <section
      ref={ref}
      id="showcase"
      className="relative overflow-hidden bg-canvas section-padding"
    >
      <motion.div
        aria-hidden
        className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-accent-primary blur-3xl"
        style={{ opacity: accentOpacity }}
      />

      <div className="container-main grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <RevealOnScroll className="text-eyebrow text-accent-secondary">
            {t("showcase.eyebrow")}
          </RevealOnScroll>
          <RevealOnScroll
            as="div"
            className="mt-5 text-h1 text-text-heading-light"
            delay={0.08}
          >
            {t("showcase.headline")}
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            className="mt-6 max-w-xl text-body-lg text-text-primary-light"
            delay={0.14}
          >
            {t("showcase.subtitle")}
          </RevealOnScroll>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {metricKeys.map((key, idx) => (
              <RevealOnScroll
                key={key}
                className="rounded-md border border-border-dark bg-surface-card-dark p-5"
                delay={0.18 + idx * 0.06}
              >
                <p className="font-display text-2xl font-semibold text-text-heading-dark md:text-3xl">
                  {t(`showcase.metrics.${key}.value`)}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-text-muted">
                  {t(`showcase.metrics.${key}.label`)}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="relative">
          <RevealOnScroll duration="hero" delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface-card-dark">
              <Parallax y={[-30, 30]} className="absolute inset-0">
                <img
                  src={imageRegistry.showcase.factory}
                  alt={t("showcase.headline")}
                  loading="lazy"
                  className="absolute inset-0 h-[110%] w-full object-cover"
                />
              </Parallax>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-canvas/70 via-transparent to-transparent"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-eyebrow text-accent-primary">
                  {t("brand.name")}
                </p>
                <p className="mt-2 font-display text-lg font-semibold text-text-heading-dark md:text-xl">
                  {t("brand.tagline")}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
