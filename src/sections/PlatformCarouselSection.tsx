import { useEffect, useRef, useState } from "react";
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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  imageRegistry,
  isPlaceholderImage,
  isPlaceholderVideo,
  type PlatformImageKey,
  type PlatformVideoKey,
} from "@/data/images";
import { cn } from "@/lib/utils";

const slideKeys = ["ci", "aluminum", "die"] as const;
type SlideKey = (typeof slideKeys)[number];

const slideImages: Record<SlideKey, PlatformImageKey> = {
  ci: "ci",
  aluminum: "aluminum",
  die: "die",
};

const slideVideos: Record<SlideKey, PlatformVideoKey> = {
  ci: "ci",
  aluminum: "aluminum",
  die: "die",
};

function SlideBackground({
  slideKey,
  isActive,
}: {
  slideKey: SlideKey;
  isActive: boolean;
}) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(isActive);
  const [isReady, setIsReady] = useState(false);

  const posterSrc = imageRegistry.platform[slideImages[slideKey]];
  const videoSrc = imageRegistry.platformVideo[slideVideos[slideKey]];
  const useVideo = !isPlaceholderVideo(videoSrc);
  const usePoster = !isPlaceholderImage(posterSrc);

  useEffect(() => {
    if (isActive) {
      setShouldLoad(true);
    }
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isActive) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isActive, shouldLoad]);

  return (
    <div className="relative h-full w-screen shrink-0 bg-canvas-dark">
      {usePoster ? (
        <img
          src={posterSrc}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            useVideo && isReady ? "opacity-0" : "opacity-100",
          )}
        />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-hero-ambient" />
      )}

      {useVideo && shouldLoad ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={usePoster ? posterSrc : undefined}
          autoPlay={isActive}
          muted
          loop
          playsInline
          preload={isActive ? "auto" : "metadata"}
          onCanPlay={() => setIsReady(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700",
            isReady ? "opacity-100" : "opacity-0",
          )}
          aria-label={t(`platform.videoAlt.${slideKey}`)}
        />
      ) : null}

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
        <p className="text-eyebrow text-text-primary-dark">
          {t(`platform.slides.${slideKey}.eyebrow`)}
        </p>
        <h2 className="mt-10 text-section-title text-text-on-dark md:mt-12">
          {t(`platform.slides.${slideKey}.title`)}
        </h2>
        <p className="mt-6 text-body-lg text-text-primary-dark">
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
  const isMobile = useMediaQuery("(max-width: 767px)");
  const {
    scrollRef,
    index,
    backgroundX,
    scrollToSlide,
    enabled,
    wrapperHeightVh,
  } = useScrollCarousel({
    slideCount: slideKeys.length,
    slideHeightVh: isMobile ? 70 : 100,
  });

  const activeKey = slideKeys[index];

  const goPrev = () => scrollToSlide(index - 1);
  const goNext = () => scrollToSlide(index + 1);

  const section = (
    <section
      id="capabilities"
      className="relative h-[100svh] min-h-0 max-h-[100svh] overflow-hidden bg-canvas-dark md:min-h-[600px]"
    >
      <motion.div
        className="absolute inset-0 flex max-w-full"
        style={enabled ? { x: backgroundX } : undefined}
      >
        {(enabled ? slideKeys : [activeKey]).map((key) => (
          <SlideBackground
            key={key}
            slideKey={key}
            isActive={key === activeKey}
          />
        ))}
      </motion.div>

      <div className="container-main relative z-10 flex h-full flex-col pt-20 md:pt-24 lg:pt-28">
        <div
          className="inline-flex max-w-full flex-wrap items-stretch overflow-hidden rounded-md border border-border-glass bg-surface-glass backdrop-blur-md"
          role="tablist"
          aria-label={t("platform.tabsAriaLabel")}
        >
          {slideKeys.map((key, i) => (
            <div key={key} className="flex items-stretch">
              {i > 0 ? (
                <span
                  aria-hidden
                  className="w-px shrink-0 self-stretch bg-border-glass"
                />
              ) : null}
              <button
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => scrollToSlide(i)}
                className={cn(
                  "font-mono-label interactive-opacity interactive-press px-3 py-2.5 text-xs uppercase transition-colors sm:px-4 sm:text-sm md:px-5",
                  i === index
                    ? "bg-white/10 text-text-on-dark opacity-100"
                    : "text-text-on-dark opacity-20 hover:bg-white/5 hover:opacity-40",
                )}
              >
                {t(`platform.tabs.${key}`)}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-auto mb-8 pb-4 md:mb-24 md:pb-8">
          <GlassPanel className="w-full max-w-[452px]">
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
