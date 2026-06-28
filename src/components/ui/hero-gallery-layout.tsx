import type { ReactNode } from "react";
import {
  HeroGalleryBackdrop,
  HeroGalleryCell,
  HeroGalleryContent,
  HeroGalleryGrid,
  HeroGalleryScroll,
} from "@/components/ui/hero-gallery-scroll-animation";
import { Threads } from "@/components/ui/threads";
import { effectColors } from "@/theme/colors";
import { cn } from "@/lib/utils";

type HeroGalleryLayoutProps = {
  images: readonly string[];
  galleryAlt: string;
  children: ReactNode;
  className?: string;
  containInSection?: boolean;
  contentClassName?: string;
};

const navAwareStickyStageClassName =
  "sticky top-16 z-0 h-[calc(100svh-4rem)] w-full md:top-20 md:h-[calc(100svh-5rem)]";

function GalleryImages({
  images,
  galleryAlt,
  gridClassName,
}: {
  images: readonly string[];
  galleryAlt: string;
  gridClassName: string;
}) {
  return (
    <HeroGalleryGrid className={gridClassName}>
      {images.map((imageUrl, index) => (
        <HeroGalleryCell
          key={imageUrl}
          className="overflow-hidden rounded-xl shadow-elevation"
        >
          <img
            className="size-full object-cover object-center"
            src={imageUrl}
            alt={galleryAlt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </HeroGalleryCell>
      ))}
    </HeroGalleryGrid>
  );
}

function GalleryThreads({ containInSection }: { containInSection: boolean }) {
  return (
    <HeroGalleryBackdrop aria-hidden>
      <Threads
        className={cn(
          "size-full",
          containInSection ? "pointer-events-none" : "pointer-events-auto",
        )}
        color={effectColors.threadsLineRgb}
        amplitude={0.85}
        distance={0.08}
        enableMouseInteraction
      />
    </HeroGalleryBackdrop>
  );
}

export function HeroGalleryLayout({
  images,
  galleryAlt,
  children,
  className,
  containInSection = false,
  contentClassName,
}: HeroGalleryLayoutProps) {
  const layers = (
    <>
      <GalleryImages
        images={images}
        galleryAlt={galleryAlt}
        gridClassName={
          containInSection
            ? "absolute inset-0 z-[5] p-4"
            : cn(navAwareStickyStageClassName, "p-4")
        }
      />
      <GalleryThreads containInSection={containInSection} />
      <HeroGalleryContent
        className={cn(
          containInSection ? undefined : "z-10 px-4 text-center",
          contentClassName,
        )}
      >
        {children}
      </HeroGalleryContent>
    </>
  );

  return (
    <HeroGalleryScroll
      containInSection={containInSection}
      className={cn("h-[350vh]", className)}
    >
      {containInSection ? (
        <div className={navAwareStickyStageClassName}>{layers}</div>
      ) : (
        layers
      )}
    </HeroGalleryScroll>
  );
}
