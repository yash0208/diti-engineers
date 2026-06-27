import { motion } from "framer-motion";
import { useState, type MouseEventHandler } from "react";
import { motionTokens, useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ArrowLinkVariant = "light" | "purple";

type ArrowLinkBaseProps = {
  children: string;
  variant?: ArrowLinkVariant;
  className?: string;
};

type ArrowLinkAnchorProps = ArrowLinkBaseProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ArrowLinkButtonProps = ArrowLinkBaseProps & {
  href?: undefined;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type ArrowLinkProps = ArrowLinkAnchorProps | ArrowLinkButtonProps;

function DoubleChevron({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center overflow-hidden", className)} aria-hidden>
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" className="shrink-0">
        <path
          d="M1 4H9M9 4L6 1M9 4L6 7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" className="-ml-1 shrink-0">
        <path
          d="M1 4H9M9 4L6 1M9 4L6 7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ArrowLinkContent({
  children,
  hovered,
  reduced,
}: {
  children: string;
  hovered: boolean;
  reduced: boolean;
}) {
  return (
    <>
      <span className="font-mono-label text-base normal-case">{children}</span>
      <motion.span
        animate={reduced || !hovered ? { x: 0 } : { x: 6 }}
        transition={{
          duration: motionTokens.duration.fast,
          ease: [...motionTokens.ease.out],
        }}
        className="flex items-center"
      >
        <DoubleChevron />
      </motion.span>
    </>
  );
}

export function ArrowLink({
  href,
  children,
  variant = "light",
  className,
  onClick,
}: ArrowLinkProps) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const isLight = variant === "light";
  const sharedClass = cn(
    "inline-flex h-10 max-h-10 items-center justify-center gap-2 overflow-hidden rounded-xs px-4 text-base interactive-press interactive-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",
    isLight
      ? "bg-accent-cta-light text-text-on-light focus-visible:ring-offset-canvas-dark"
      : "bg-accent-primary text-text-on-dark focus-visible:ring-offset-canvas-dark",
    className,
  );

  if (!href) {
    return (
      <button
        type="button"
        onClick={onClick as MouseEventHandler<HTMLButtonElement>}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={sharedClass}
      >
        <ArrowLinkContent hovered={hovered} reduced={reduced}>
          {children}
        </ArrowLinkContent>
      </button>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={sharedClass}
    >
      <ArrowLinkContent hovered={hovered} reduced={reduced}>
        {children}
      </ArrowLinkContent>
    </a>
  );
}
