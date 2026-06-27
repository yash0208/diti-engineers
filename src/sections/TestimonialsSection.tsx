import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import {
  enterTransition,
  exitTransition,
  fadeSlideEnter,
  fadeSlideExit,
} from "@/lib/motion-presets";
import { RevealOnScroll } from "@/components/motion";
import { SlideControls } from "@/components/ui";
import { imageRegistry } from "@/data/images";

const testimonialKeys = ["placeholder1", "placeholder2"] as const;
const ROTATION_MS = 7000;

export function TestimonialsSection() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonialKeys.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const goPrev = () => {
    setIndex((i) => (i - 1 + testimonialKeys.length) % testimonialKeys.length);
  };

  const goNext = () => {
    setIndex((i) => (i + 1) % testimonialKeys.length);
  };

  const key = testimonialKeys[index];
  const counterCurrent = String(index + 1).padStart(2, "0");
  const counterTotal = String(testimonialKeys.length).padStart(2, "0");

  return (
    <section id="testimonials" className="relative overflow-hidden bg-canvas">
      <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
        <img
          src={imageRegistry.testimonial.bg}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container-main relative grid min-h-[544px] grid-cols-1 items-stretch lg:grid-cols-2">
        <RevealOnScroll className="flex flex-col justify-between py-16 md:py-24 lg:pr-12">
          <div>
            <h2 className="max-w-[580px] text-h1 text-text-heading-light">
              {t("testimonials.headline")}
            </h2>
          </div>
          <div className="mt-12 flex items-center justify-between lg:mt-0">
            <p className="font-mono-label text-sm text-text-muted">
              {t("testimonials.counter", {
                current: counterCurrent,
                total: counterTotal,
              })}
            </p>
            <SlideControls
              light={false}
              onPrev={goPrev}
              onNext={goNext}
              ariaLabelPrev={t("controls.prev")}
              ariaLabelNext={t("controls.next")}
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          className="relative flex items-center bg-surface-muted px-6 py-16 lg:bg-transparent lg:px-12 lg:py-24"
          delay={0.1}
        >
          <div className="relative min-h-[280px] w-full max-w-[525px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={reduced ? false : fadeSlideEnter(16)}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={
                  reduced
                    ? undefined
                    : { ...fadeSlideExit(16), transition: exitTransition(reduced) }
                }
                transition={enterTransition(reduced)}
              >
                <blockquote className="font-display text-2xl leading-snug text-text-heading-light md:text-3xl">
                  "{t(`testimonials.items.${key}.quote`)}"
                </blockquote>
                <div className="mt-10 flex items-center gap-5">
                  <div
                    aria-hidden
                    className="h-14 w-14 shrink-0 rounded-full bg-surface-muted"
                  />
                  <div>
                    <p className="font-semibold text-text-heading-light">
                      {t(`testimonials.items.${key}.author`)}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">
                      {t(`testimonials.items.${key}.role`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
