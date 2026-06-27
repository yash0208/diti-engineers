import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import {
  enterTransition,
  exitTransition,
  fadeUpEnter,
  fadeUpExit,
} from "@/lib/motion-presets";
import { useScrollCarousel } from "@/components/motion/useScrollCarousel";
import { ArrowLink, GlassPanel, SlideControls } from "@/components/ui";
import {
  imageRegistry,
  isPlaceholderImage,
  type PlatformImageKey,
} from "@/data/images";
import { cn } from "@/lib/utils";

const slideKeys = ["ci", "aluminum", "die"] as const;
type SlideKey = (typeof slideKeys)[number];

const slideImages: Record<SlideKey, PlatformImageKey> = {
  ci: "ci",
  aluminum: "aluminum",
  die: "die",
};

function SlideBackground({ slideKey }: { slideKey: SlideKey }) {
  const { t } = useTranslation();
  const src = imageRegistry.platform[slideImages[slideKey]];
  const useMedia = !isPlaceholderImage(src);

  return (
    <div className="relative h-full w-screen shrink-0 bg-canvas-dark">
      {useMedia ? (
        <img
          src={src}
          alt={t(`platform.imageAlt.${slideKey}`)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-hero-ambient" />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-canvas-dark/80 via-canvas-dark/25 to-canvas-dark/10"
      />
    </div>
  );
}

type ActiveSlideContentProps = {
  slideKey: SlideKey;
  onPrev: () => void;
  onNext: () => void;
};

function ActiveSlideContent({
  slideKey,
  onPrev,
  onNext,
}: ActiveSlideContentProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        initial={reduced ? false : fadeUpEnter}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={
          reduced
            ? undefined
            : { ...fadeUpExit, transition: exitTransition(reduced) }
        }
        transition={enterTransition(reduced)}
      >
        <p className="text-eyebrow text-text-on-dark">
          {t(`platform.slides.${slideKey}.eyebrow`)}
        </p>
        <h2 className="mt-10 text-section-title text-text-on-dark md:mt-12">
          {t(`platform.slides.${slideKey}.title`)}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-text-on-dark md:text-base">
          {t(`platform.slides.${slideKey}.body`)}
        </p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <ArrowLink href="#products" variant="purple">
            {t(`platform.slides.${slideKey}.cta`)}
          </ArrowLink>
          <SlideControls
            onPrev={onPrev}
            onNext={onNext}
            ariaLabelPrev={t("controls.prev")}
            ariaLabelNext={t("controls.next")}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function PlatformCarouselSection() {
  const { t } = useTranslation();
  const {
    scrollRef,
    index,
    backgroundX,
    scrollToSlide,
    enabled,
    wrapperHeightVh,
  } = useScrollCarousel({ slideCount: slideKeys.length });

  const activeKey = slideKeys[index];

  const goPrev = () => scrollToSlide(index - 1);
  const goNext = () => scrollToSlide(index + 1);

  const section = (
    <section
      id="capabilities"
      className="relative h-[100svh] min-h-[828px] max-h-[100svh] overflow-hidden bg-canvas-dark"
    >
      <motion.div
        className="absolute inset-0 flex"
        style={enabled ? { x: backgroundX } : undefined}
      >
        {(enabled ? slideKeys : [activeKey]).map((key) => (
          <SlideBackground key={key} slideKey={key} />
        ))}
      </motion.div>

      <div className="container-main relative z-10 flex h-full flex-col pt-24 md:pt-28">
        <div className="flex max-w-[800px] flex-wrap gap-x-12 gap-y-2">
          {slideKeys.map((key, i) => (
            <button
              key={key}
              type="button"
              onClick={() => scrollToSlide(i)}
              className={cn(
                "font-mono-label interactive-opacity interactive-press px-1 text-sm uppercase",
                i === index
                  ? "text-text-on-dark opacity-100"
                  : "text-text-on-dark opacity-20 hover:opacity-40",
              )}
            >
              {t(`platform.tabs.${key}`)}
            </button>
          ))}
        </div>

        <div className="mt-auto pb-16 md:pb-20">
          <GlassPanel className="max-w-[452px]">
            <ActiveSlideContent
              slideKey={activeKey}
              onPrev={goPrev}
              onNext={goNext}
            />
          </GlassPanel>
        </div>
      </div>
    </section>
  );

  if (!enabled) {
    return section;
  }

  return (
    <div
      ref={scrollRef}
      style={{ height: `${wrapperHeightVh}svh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {section}
      </div>
    </div>
  );
}
