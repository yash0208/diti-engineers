import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type ScrollDirection = "left" | "right";

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
  const loopImages = [...images, ...images];

  return (
    <div className={cn("hero-strip-mask overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-4 md:gap-5",
          direction === "left" ? "hero-strip-scroll-left" : "hero-strip-scroll-right",
        )}
        style={{ "--hero-strip-duration": `${duration}s` } as CSSProperties}
      >
        {loopImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={cn(
              "hero-strip-card shrink-0 overflow-hidden rounded-xl shadow-elevation-active",
              cardClassName,
            )}
          >
            <img
              src={src}
              alt={`${imageAlt} ${(index % images.length) + 1}`}
              className="size-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
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
