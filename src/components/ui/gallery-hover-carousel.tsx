import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  carouselDefaultTransition,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { isPlaceholderVideo } from "@/data/images";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type GalleryMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string }
  | { type: "gif"; src: string };

export type GalleryHoverCarouselItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  media: GalleryMedia;
  imageAlt: string;
  learnMoreLabel: string;
  stat1Value: string;
  stat1Suffix: string;
  stat1Label: string;
  stat2Value: string;
  stat2Suffix: string;
  stat2Label: string;
};

type GalleryHoverCarouselProps = {
  eyebrow?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subtitle?: string;
  items: GalleryHoverCarouselItem[];
  fillViewport?: boolean;
  className?: string;
};

const AUTOPLAY_MS = 7500;

function useCarouselAutoplay(paused: boolean) {
  const { index, setIndex, itemsCount } = useCarousel();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || paused || itemsCount <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setIndex((index + 1) % itemsCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [reduced, paused, itemsCount, index, setIndex]);
}

function GalleryCarouselProgress({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { index, setIndex, itemsCount } = useCarousel();
  const counterCurrent = String(index + 1).padStart(2, "0");
  const counterTotal = String(itemsCount).padStart(2, "0");

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between gap-4 border-t border-border-light pt-4",
        className,
      )}
    >
      <p className="font-mono-label text-sm text-text-muted">
        {t("pages.machinery.slideCounter", {
          current: counterCurrent,
          total: counterTotal,
        })}
      </p>
      <div className="flex items-center gap-2" role="tablist" aria-label={t("pages.machinery.slidesAriaLabel")}>
        {Array.from({ length: itemsCount }, (_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            role="tab"
            aria-selected={slideIndex === index}
            aria-label={t("pages.machinery.slideGoTo", { number: slideIndex + 1 })}
            onClick={() => setIndex(slideIndex)}
            className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center"
          >
            <span
              aria-hidden
              className={cn(
                "block h-3 rounded-full transition-all duration-300",
                slideIndex === index
                  ? "w-8 bg-accent-primary"
                  : "w-3 bg-text-muted/40 hover:bg-text-muted/60",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function GalleryCarouselControls({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { index, setIndex, itemsCount } = useCarousel();

  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={t("controls.prev")}
        onClick={() => setIndex(Math.max(index - 1, 0))}
        disabled={index === 0}
        className="h-10 w-10 rounded-full"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={t("controls.next")}
        onClick={() => setIndex(Math.min(index + 1, itemsCount - 1))}
        disabled={index + 1 >= itemsCount}
        className="h-10 w-10 rounded-full"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

type GalleryCarouselMediaProps = {
  media: GalleryMedia;
  alt: string;
  isHovered: boolean;
};

function GalleryCarouselMedia({ media, alt, isHovered }: GalleryCarouselMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || media.type !== "video") {
      return;
    }

    if (isHovered) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isHovered, media.type]);

  if (media.type === "video" && !isPlaceholderVideo(media.src)) {
    return (
      <>
        <img
          src={media.poster}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500",
            isReady && isHovered ? "opacity-0" : "opacity-100",
          )}
        />
        <video
          ref={videoRef}
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setIsReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500",
            isReady && isHovered ? "opacity-100" : "opacity-0",
          )}
          aria-label={alt}
        />
      </>
    );
  }

  if (media.type === "gif") {
    return (
      <img
        src={media.src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
    );
  }

  return (
    <img
      src={media.src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover object-center interactive-transform interactive-transform-hover"
      loading="lazy"
    />
  );
}

function GalleryCarouselCard({ item }: { item: GalleryHoverCarouselItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const showExpanded = isExpanded || isHovered;

  return (
    <article
      className={cn(
        "flex h-full max-h-full flex-col overflow-hidden rounded-md border border-border-light bg-surface-card-light transition-[overflow] duration-500",
        showExpanded && "overflow-y-auto",
      )}
      onClick={() => setIsExpanded((previous) => !previous)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsExpanded((previous) => !previous);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={showExpanded}
    >
      <div
        className={cn(
          "relative flex min-h-[220px] flex-1 flex-col overflow-hidden transition-all duration-500 ease-out",
          showExpanded && "shrink-0 flex-none p-5",
        )}
      >
        <div
          className={cn(
            "relative h-full min-h-[220px] w-full overflow-hidden bg-surface-muted transition-all duration-500 ease-out",
            showExpanded && "aspect-[4/3] h-auto max-h-[240px] rounded-sm",
          )}
        >
          <GalleryCarouselMedia media={item.media} alt={item.imageAlt} isHovered={isHovered || isExpanded} />

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas-deep/90 via-canvas-deep/55 to-transparent px-5 pb-5 pt-20 transition-opacity duration-500",
              showExpanded && "opacity-0",
            )}
          >
            <h3 className="text-h3 text-text-on-dark">{item.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-on-dark/90">
              {item.summary}
            </p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid shrink-0 border-t border-border-light transition-[grid-template-rows] duration-500 ease-out",
          showExpanded ? "grid-rows-[0fr] border-transparent" : "grid-rows-[1fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <dl
            className={cn(
              "grid grid-cols-2 transition-opacity duration-500",
              showExpanded ? "opacity-0" : "opacity-100",
            )}
          >
            <div className="border-r border-border-light p-4 md:p-5">
              <dt className="sr-only">{item.stat1Label}</dt>
              <dd className="font-display text-3xl font-bold text-text-heading-light md:text-4xl">
                {item.stat1Value}
                <span className="text-accent-primary">{item.stat1Suffix}</span>
              </dd>
              <dd className="mt-1 text-sm text-text-muted">{item.stat1Label}</dd>
            </div>
            <div className="p-4 md:p-5">
              <dt className="sr-only">{item.stat2Label}</dt>
              <dd className="font-display text-3xl font-bold text-text-heading-light md:text-4xl">
                {item.stat2Value}
                <span className="text-accent-primary">{item.stat2Suffix}</span>
              </dd>
              <dd className="mt-1 text-sm text-text-muted">{item.stat2Label}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        className={cn(
          "grid min-h-0 transition-[grid-template-rows] duration-500 ease-out",
          showExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "flex flex-col px-5 pb-5 transition-opacity duration-500 ease-out",
              showExpanded ? "opacity-100" : "opacity-0",
            )}
          >
            <h3 className="text-h3 text-text-heading-light">{item.title}</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-text-primary-light">
              {item.summary}
            </p>
            <div className="mt-6">
              <Link
                to={item.url}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-2 font-mono-label text-sm text-text-heading-light interactive-opacity"
              >
                {item.learnMoreLabel}
                <span aria-hidden>{">>"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid shrink-0 transition-[grid-template-rows] duration-500 ease-out",
          showExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "grid grid-cols-2 overflow-hidden border-t border-border-light transition-opacity duration-500 ease-out",
              showExpanded ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="border-r border-border-light p-6">
              <p className="font-display text-4xl font-bold text-text-heading-light md:text-5xl">
                {item.stat1Value}
                <span className="text-accent-primary">{item.stat1Suffix}</span>
              </p>
              <p className="mt-2 text-sm text-text-muted">{item.stat1Label}</p>
            </div>
            <div className="p-6">
              <p className="font-display text-4xl font-bold text-text-heading-light md:text-5xl">
                {item.stat2Value}
                <span className="text-accent-primary">{item.stat2Suffix}</span>
              </p>
              <p className="mt-2 text-sm text-text-muted">{item.stat2Label}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function GalleryCarouselTrack({
  items,
  fillViewport,
}: {
  items: GalleryHoverCarouselItem[];
  fillViewport: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useCarouselAutoplay(isHovered || isDragging);

  return (
    <div
      className={cn("mt-6", fillViewport && "min-h-0 flex-1 overflow-y-auto overflow-x-hidden")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CarouselContent
        className={cn(
          "hide-scrollbar -ml-4 w-full max-w-full md:-mr-4",
          fillViewport && "h-full items-stretch",
        )}
        transition={carouselDefaultTransition}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className={cn(
              "basis-[88vw] pl-4 sm:basis-[380px] md:basis-[460px] lg:basis-[508px]",
              fillViewport && "h-full",
            )}
          >
            <GalleryCarouselCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </div>
  );
}

export function GalleryHoverCarousel({
  eyebrow,
  headlineLine1,
  headlineLine2,
  subtitle,
  items,
  fillViewport = false,
  className,
}: GalleryHoverCarouselProps) {
  const hasHeader = eyebrow || headlineLine1 || headlineLine2 || subtitle;

  const headerBlock = hasHeader ? (
    <div
      className={cn(
        "flex shrink-0 flex-col justify-between gap-6 md:flex-row md:items-start",
        !fillViewport && "mb-8 md:mb-10",
      )}
    >
      <div className="max-w-2xl text-left">
        {eyebrow ? <p className="text-eyebrow text-text-muted">{eyebrow}</p> : null}
        {headlineLine1 || headlineLine2 ? (
          <h2 className="mt-4 text-section-title text-text-heading-light">
            <span className="text-accent-primary">{headlineLine1}</span>
            {headlineLine2 ? (
              <>
                <br />
                <span>{headlineLine2}</span>
              </>
            ) : null}
          </h2>
        ) : null}
      </div>
      <div className="flex flex-col items-start gap-4 md:max-w-md md:items-end md:text-right">
        {subtitle ? (
          <p className="text-body-lg text-text-primary-light">{subtitle}</p>
        ) : null}
        <GalleryCarouselControls className="shrink-0" />
      </div>
    </div>
  ) : (
    <div className={cn("flex shrink-0 justify-end", !fillViewport && "mb-6")}>
      <GalleryCarouselControls />
    </div>
  );

  return (
    <div
      className={cn(
        "w-full",
        fillViewport && "flex min-h-0 flex-1 flex-col",
        className,
      )}
    >
      <Carousel
        className={cn(
          "relative w-full max-w-full",
          fillViewport && "flex min-h-0 flex-1 flex-col",
        )}
      >
        {headerBlock}
        <GalleryCarouselTrack items={items} fillViewport={fillViewport} />
        {fillViewport ? <GalleryCarouselProgress className="mt-4 shrink-0" /> : null}
      </Carousel>
    </div>
  );
}
