import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type ScrollDirection = "left" | "right";

/** Repeat the source set within each track segment so wide viewports stay filled. */
const TRACK_SEGMENT_COPIES = 2;

function buildSegmentImages(images: readonly string[]): string[] {
  return Array.from({ length: TRACK_SEGMENT_COPIES }, () => images).flat();
}

type StripCardsProps = {
  images: readonly string[];
  sourceCount: number;
  imageAlt: string;
  cardClassName?: string;
  segmentKey: string;
};

function StripCards({
  images,
  sourceCount,
  imageAlt,
  cardClassName,
  segmentKey,
}: StripCardsProps) {
  return images.map((src, index) => (
    <div
      key={`${segmentKey}-${src}-${index}`}
      className={cn(
        "hero-strip-card shrink-0 overflow-hidden rounded-md bg-surface-muted shadow-card",
        cardClassName,
      )}
    >
      <img
        src={src}
        alt={`${imageAlt} ${(index % sourceCount) + 1}`}
        className="size-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="low"
      />
    </div>
  ));
}

type ImageAutoSliderProps = {
  images: readonly string[];
  direction?: ScrollDirection;
  duration?: number;
  imageAlt: string;
  className?: string;
  cardClassName?: string;
};

export function ImageAutoSlider({
  images,
  direction = "left",
  duration = 28,
  imageAlt,
  className,
  cardClassName,
}: ImageAutoSliderProps) {
  const segmentImages = buildSegmentImages(images);
  const segmentClassName = "flex shrink-0 gap-4 md:gap-5";

  return (
    <div className={cn("hero-strip-mask overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-4 md:gap-5",
          direction === "left" ? "hero-strip-scroll-left" : "hero-strip-scroll-right",
        )}
        style={{ "--hero-strip-duration": `${duration}s` } as CSSProperties}
      >
        <div className={segmentClassName}>
          <StripCards
            images={segmentImages}
            sourceCount={images.length}
            imageAlt={imageAlt}
            cardClassName={cardClassName}
            segmentKey="primary"
          />
        </div>
        <div aria-hidden className={segmentClassName}>
          <StripCards
            images={segmentImages}
            sourceCount={images.length}
            imageAlt={imageAlt}
            cardClassName={cardClassName}
            segmentKey="loop"
          />
        </div>
      </div>
    </div>
  );
}

type HeroImageStripsProps = {
  topImages: readonly string[];
  bottomImages: readonly string[];
  imageAlt: string;
  className?: string;
};

export function HeroImageStrips({
  topImages,
  bottomImages,
  imageAlt,
  className,
}: HeroImageStripsProps) {
  return (
    <div className={cn("mx-auto flex w-full max-w-4xl flex-col items-center gap-4 md:gap-5", className)}>
      <ImageAutoSlider
        images={topImages}
        direction="left"
        duration={32}
        imageAlt={imageAlt}
        cardClassName="h-[9.9rem] w-[7.7rem] sm:h-[12.1rem] sm:w-[8.8rem] md:h-[14.3rem] md:w-[11rem] lg:h-[16.5rem] lg:w-[12.1rem]"
      />
      <ImageAutoSlider
        images={bottomImages}
        direction="right"
        duration={36}
        imageAlt={imageAlt}
        cardClassName="h-[8.8rem] w-[6.6rem] sm:h-[11rem] sm:w-[7.7rem] md:h-[13.2rem] md:w-[9.9rem] lg:h-[15.4rem] lg:w-[11rem]"
      />
    </div>
  );
}
