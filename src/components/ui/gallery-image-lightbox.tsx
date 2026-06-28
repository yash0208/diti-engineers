import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export type GalleryImageLightboxItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type GalleryImageLightboxProps = {
  items: readonly GalleryImageLightboxItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
};

export function GalleryImageLightbox({
  items,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
  closeLabel,
  prevLabel,
  nextLabel,
}: GalleryImageLightboxProps) {
  const selectedItem = selectedIndex === null ? null : items[selectedIndex];

  return (
    <AnimatePresence>
      {selectedItem ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-canvas-dark/90 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          aria-describedby="gallery-lightbox-description"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute -right-2 top-0 text-text-on-dark hover:bg-surface-card-dark/40 md:-right-12"
              onClick={onClose}
              aria-label={closeLabel}
            >
              <X className="h-6 w-6" />
            </Button>

            {items.length > 1 ? (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-text-on-dark hover:bg-surface-card-dark/40 md:left-4"
                  onClick={(event) => {
                    event.stopPropagation();
                    onPrev();
                  }}
                  aria-label={prevLabel}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-text-on-dark hover:bg-surface-card-dark/40 md:right-4"
                  onClick={(event) => {
                    event.stopPropagation();
                    onNext();
                  }}
                  aria-label={nextLabel}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            ) : null}

            <img
              src={selectedItem.src}
              alt={selectedItem.alt}
              className="mx-auto max-h-[70vh] w-auto rounded-md object-contain"
            />

            <div
              id="gallery-lightbox-description"
              className="mt-4 text-center text-text-on-dark"
            >
              <h3 className="text-h3" id="gallery-lightbox-title">
                {selectedItem.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-text-primary-dark">
                {selectedItem.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
