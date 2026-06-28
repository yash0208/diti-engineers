import { useState, type ReactNode } from "react";
import {
  HeroGalleryBackdrop,
  HeroGalleryCell,
  HeroGalleryContent,
  HeroGalleryGrid,
  HeroGalleryScroll,
  HeroGalleryScrollFade,
} from "@/components/ui/hero-gallery-scroll-animation";
import {
  GalleryImageLightbox,
  type GalleryImageLightboxItem,
} from "@/components/ui/gallery-image-lightbox";
import { Threads } from "@/components/ui/threads";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { effectColors } from "@/theme/colors";
import { cn } from "@/lib/utils";

export type HeroGalleryItem = GalleryImageLightboxItem & {
  viewAriaLabel?: string;
};

type HeroGalleryLayoutProps = {
  images: readonly string[];
  galleryAlt: string;
  galleryItems?: readonly HeroGalleryItem[];
  children: ReactNode;
  className?: string;
  containInSection?: boolean;
  fadeGalleryOnExit?: boolean;
  contentClassName?: string;
  lightboxCloseLabel?: string;
  lightboxPrevLabel?: string;
  lightboxNextLabel?: string;
};

const navAwareStickyStageClassName =
  "sticky top-16 z-0 h-[calc(100svh-4rem)] w-full lg:top-[4.25rem] lg:h-[calc(100svh-4.25rem)]";

function GalleryImages({
  images,
  galleryAlt,
  galleryItems,
  gridClassName,
  onSelectImage,
}: {
  images: readonly string[];
  galleryAlt: string;
  galleryItems?: readonly HeroGalleryItem[];
  gridClassName: string;
  onSelectImage?: (index: number) => void;
}) {
  const isInteractive = galleryItems !== undefined && onSelectImage !== undefined;

  return (
    <HeroGalleryGrid className={gridClassName}>
      {images.map((imageUrl, index) => {
        const item = galleryItems?.[index];
        const imageAlt = item?.alt ?? galleryAlt;

        return (
          <HeroGalleryCell
            key={imageUrl}
            className={cn(
              "overflow-hidden rounded-md shadow-card",
              isInteractive && "pointer-events-auto",
            )}
          >
            {isInteractive ? (
              <button
                type="button"
                onClick={() => onSelectImage(index)}
                aria-label={item?.viewAriaLabel ?? item?.title ?? imageAlt}
                className="group size-full cursor-pointer overflow-hidden"
              >
                <img
                  className="size-full object-cover object-center interactive-transform group-hover:scale-[1.04]"
                  src={imageUrl}
                  alt={imageAlt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </button>
            ) : (
              <img
                className="size-full object-cover object-center"
                src={imageUrl}
                alt={imageAlt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            )}
          </HeroGalleryCell>
        );
      })}
    </HeroGalleryGrid>
  );
}

function MobileContainedGallery({
  images,
  galleryAlt,
  galleryItems,
  onSelectImage,
}: {
  images: readonly string[];
  galleryAlt: string;
  galleryItems?: readonly HeroGalleryItem[];
  onSelectImage?: (index: number) => void;
}) {
  const isInteractive = galleryItems !== undefined && onSelectImage !== undefined;
  const [featured, ...rest] = images;

  const renderImage = (imageUrl: string, index: number, className?: string) => {
    const item = galleryItems?.[index];
    const imageAlt = item?.alt ?? galleryAlt;

    const image = (
      <img
        className="size-full object-cover object-center"
        src={imageUrl}
        alt={imageAlt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
      />
    );

    if (isInteractive) {
      return (
        <button
          type="button"
          onClick={() => onSelectImage(index)}
          aria-label={item?.viewAriaLabel ?? item?.title ?? imageAlt}
          className={cn("group block size-full overflow-hidden", className)}
        >
          {image}
        </button>
      );
    }

    return <div className={cn("size-full overflow-hidden", className)}>{image}</div>;
  };

  return (
    <div className="container-main pb-8 pt-2">
      <div className="grid gap-3">
        {featured ? (
          <div className="aspect-[16/10] overflow-hidden rounded-md shadow-card">
            {renderImage(featured, 0)}
          </div>
        ) : null}
        {rest.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {rest.map((imageUrl, index) => (
              <div
                key={imageUrl}
                className="aspect-[4/3] overflow-hidden rounded-md shadow-card"
              >
                {renderImage(imageUrl, index + 1)}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
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
  galleryItems,
  children,
  className,
  containInSection = false,
  fadeGalleryOnExit = false,
  contentClassName,
  lightboxCloseLabel,
  lightboxPrevLabel,
  lightboxNextLabel,
}: HeroGalleryLayoutProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isInteractive = galleryItems !== undefined && galleryItems.length > 0;
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handlePrev = () => {
    if (!galleryItems?.length || selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = () => {
    if (!galleryItems?.length || selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryItems.length);
  };

  const lightbox =
    isInteractive && lightboxCloseLabel && lightboxPrevLabel && lightboxNextLabel ? (
      <GalleryImageLightbox
        items={galleryItems}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        closeLabel={lightboxCloseLabel}
        prevLabel={lightboxPrevLabel}
        nextLabel={lightboxNextLabel}
      />
    ) : null;

  if (containInSection && isMobile) {
    return (
      <>
        <div className={cn("relative w-full", className)}>
          {children}
          <MobileContainedGallery
            images={images}
            galleryAlt={galleryAlt}
            galleryItems={galleryItems}
            onSelectImage={isInteractive ? setSelectedIndex : undefined}
          />
        </div>
        {lightbox}
      </>
    );
  }

  const galleryGridClassName = containInSection
    ? "absolute inset-0 z-[5] p-4"
    : cn(navAwareStickyStageClassName, "p-4");

  const galleryImages = (
    <GalleryImages
      images={images}
      galleryAlt={galleryAlt}
      galleryItems={galleryItems}
      onSelectImage={isInteractive ? setSelectedIndex : undefined}
      gridClassName={containInSection && fadeGalleryOnExit ? "size-full" : galleryGridClassName}
    />
  );

  const layers = (
    <>
      {containInSection && fadeGalleryOnExit ? (
        <HeroGalleryScrollFade enabled className={galleryGridClassName}>
          {galleryImages}
        </HeroGalleryScrollFade>
      ) : (
        galleryImages
      )}
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
    <>
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

      {lightbox}
    </>
  );
}
