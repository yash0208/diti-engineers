import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  CutoutCard,
  CutoutCardAction,
  CutoutCardContent,
  CutoutCardImage,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCorner,
  cutoutCardSurfaceClassName,
  useCutoutContentStaggerVariants,
} from "@/components/ui/cutout-card";
import { cn } from "@/lib/utils";

export type ProductCard12Props = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryBadge: string;
  expandAriaLabel: string;
  onExpand?: () => void;
  className?: string;
};

export function ProductCard12({
  title,
  description,
  imageSrc,
  imageAlt,
  primaryBadge,
  expandAriaLabel,
  onExpand,
  className,
}: ProductCard12Props) {
  const stagger = useCutoutContentStaggerVariants();

  return (
    <CutoutCard
      className={cn(
        cutoutCardSurfaceClassName,
        "flex h-full flex-col",
        className,
      )}
    >
      <CutoutCardMedia className="aspect-[4/3]">
        <CutoutCardImage alt={imageAlt} src={imageSrc} />
        <CutoutCardOverlay />

        <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-surface-card-light px-4 py-2.5">
          <span className="font-mono-label text-xs text-text-muted">
            {primaryBadge}
          </span>
          <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-surface-card-light" />
          <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-surface-card-light" />
        </CutoutCardInsetLabel>

        {onExpand ? (
          <CutoutCardAction revealOnHover={false} className="top-3 right-3">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={(event) => {
                event.stopPropagation();
                onExpand();
              }}
              className="rounded-full border border-border-light bg-surface-card-light/90 text-text-heading-light shadow-sm backdrop-blur-sm hover:bg-surface-card-light"
              aria-label={expandAriaLabel}
            >
              <ZoomIn className="size-4" />
            </Button>
          </CutoutCardAction>
        ) : null}
      </CutoutCardMedia>

      <CutoutCardContent className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <motion.div
          animate="show"
          className="flex min-h-[5.25rem] flex-col gap-2"
          initial="hidden"
          variants={stagger.container}
        >
          <motion.h3
            className="line-clamp-1 min-h-[1.375rem] text-base font-semibold leading-snug text-text-heading-light"
            variants={stagger.item}
          >
            {title}
          </motion.h3>
          <motion.p
            className="line-clamp-2 min-h-[2.875rem] text-sm leading-relaxed text-text-muted"
            variants={stagger.item}
          >
            {description}
          </motion.p>
        </motion.div>
      </CutoutCardContent>
    </CutoutCard>
  );
}

export default ProductCard12;
