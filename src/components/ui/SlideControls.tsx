import { cn } from "@/lib/utils";

type SlideControlsProps = {
  onPrev: () => void;
  onNext: () => void;
  ariaLabelPrev: string;
  ariaLabelNext: string;
  className?: string;
  light?: boolean;
};

function ChevronPair({ direction }: { direction: "prev" | "next" }) {
  const rotate = direction === "prev" ? "rotate-180" : "";
  return (
    <span className={cn("inline-flex items-center gap-0.5", rotate)} aria-hidden>
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path
          d="M1 4H8M8 4L5.5 1.5M8 4L5.5 6.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="-ml-1">
        <path
          d="M1 4H8M8 4L5.5 1.5M8 4L5.5 6.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function SlideControls({
  onPrev,
  onNext,
  ariaLabelPrev,
  ariaLabelNext,
  className,
  light = true,
}: SlideControlsProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        type="button"
        onClick={onPrev}
        aria-label={ariaLabelPrev}
        className={cn(
          "flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-current/20 interactive-press interactive-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
          light ? "text-text-on-dark" : "text-text-heading-light",
        )}
      >
        <ChevronPair direction="prev" />
      </button>
      <span
        aria-hidden
        className={cn(
          "block h-1.5 w-1.5",
          light ? "bg-text-on-dark" : "bg-accent-gradient",
        )}
      />
      <button
        type="button"
        onClick={onNext}
        aria-label={ariaLabelNext}
        className={cn(
          "flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-current/20 interactive-press interactive-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
          light ? "text-text-on-dark" : "text-text-heading-light",
        )}
      >
        <ChevronPair direction="next" />
      </button>
    </div>
  );
}
