import * as React from "react";
import {
  type HTMLMotionProps,
  type MotionValue,
  type UseScrollOptions,
  type Variants,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

interface ContainerInsetProps extends HTMLMotionProps<"div"> {
  insetYRange?: [number, number];
  insetXRange?: [number, number];
  roundednessRange?: [number, number];
  progressRange?: [number, number];
  roundednessProgressRange?: [number, number];
}

const SPRING_TRANSITION_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const variants: Variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
  },
};

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component",
    );
  }
  return context;
}

export const ContainerScroll: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    scrollOffset?: NonNullable<UseScrollOptions["offset"]>;
  }
> = ({
  children,
  className,
  scrollOffset = ["start start", "end start"],
  ...props
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: scrollOffset,
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};
ContainerScroll.displayName = "ContainerScroll";

interface ContainerAnimatedProps extends HTMLMotionProps<"div"> {
  inputRange?: number[];
  outputRange?: number[];
}

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  ContainerAnimatedProps
>(
  (
    {
      className,
      transition,
      style,
      inputRange = [0.2, 0.8],
      outputRange = [80, 0],
      ...props
    },
    ref,
  ) => {
    const { scrollYProgress } = useContainerScrollContext();
    const y = useTransform(scrollYProgress, inputRange, outputRange);
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ y, ...style }}
        transition={{ ...SPRING_TRANSITION_CONFIG, ...transition }}
        {...props}
      />
    );
  },
);
ContainerAnimated.displayName = "ContainerAnimated";

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("sticky top-0 h-svh w-full", className)}
      {...props}
    />
  );
});
ContainerSticky.displayName = "ContainerSticky";

export const HeroVideo = React.forwardRef<
  HTMLVideoElement,
  HTMLMotionProps<"video"> & {
    progressRange?: [number, number];
    scaleRange?: [number, number];
  }
>(
  (
    {
      style,
      className,
      progressRange = [0, 0.8],
      scaleRange = [0.7, 1],
      autoPlay = true,
      muted = true,
      loop = true,
      playsInline = true,
      controls = false,
      ...props
    },
    ref,
  ) => {
    const { scrollYProgress } = useContainerScrollContext();
    const scale = useTransform(scrollYProgress, progressRange, scaleRange);

    return (
      <motion.video
        ref={ref}
        className={cn(
          "relative z-10 h-full w-full object-cover",
          className,
        )}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        style={{ scale, ...style }}
        {...props}
      />
    );
  },
);
HeroVideo.displayName = "HeroVideo";

type VideoPlayOverlayProps = {
  label: string;
  onPlay: () => void;
  className?: string;
  revealAt?: number;
  hideAt?: number;
};

export function VideoPlayOverlay({
  label,
  onPlay,
  className,
  revealAt = 0.48,
  hideAt = 0.78,
}: VideoPlayOverlayProps) {
  const { scrollYProgress } = useContainerScrollContext();
  const opacity = useTransform(
    scrollYProgress,
    [0, revealAt - 0.06, revealAt, hideAt, hideAt + 0.08],
    [0, 0, 1, 1, 0],
  );
  const scale = useTransform(scrollYProgress, [revealAt, revealAt + 0.12], [0.92, 1]);

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onPlay}
      style={{ opacity, scale }}
      className={cn(
        "pointer-events-auto absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 text-text-on-dark interactive-press interactive-opacity",
        className,
      )}
    >
      <span
        aria-hidden
        className="flex h-14 w-14 items-center justify-center rounded-full border border-border-glass bg-surface-glass"
      >
        <svg width="16" height="18" viewBox="0 0 14 16" fill="none" aria-hidden>
          <path d="M1 1L13 8L1 15V1Z" fill="currentColor" />
        </svg>
      </span>
      <span className="font-mono-label normal-case">{label}</span>
    </motion.button>
  );
}
VideoPlayOverlay.displayName = "VideoPlayOverlay";

type HeroButtonProps = HTMLMotionProps<"button"> & {
  href?: string;
};

export const HeroButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  HeroButtonProps
>(({ className, href, children, ...props }, ref) => {
  const sharedClass = cn(
    "group relative flex w-fit items-center rounded-full border border-accent-primary bg-canvas-dark/10 px-4 py-2 text-text-on-dark shadow-[0px_4px_24px_color-mix(in_srgb,var(--color-accent-primary)_45%,transparent)] transition-colors hover:bg-canvas-dark/50",
    className,
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={sharedClass}
        {...(props as HTMLMotionProps<"a">)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      ref={ref as React.Ref<HTMLButtonElement>}
      className={sharedClass}
      {...props}
    >
      {children}
    </motion.button>
  );
});
HeroButton.displayName = "HeroButton";

export const ContainerInset = React.forwardRef<
  HTMLDivElement,
  ContainerInsetProps
>(
  (
    {
      className,
      style,
      insetYRange = [45, 0],
      insetXRange = [45, 0],
      roundednessRange = [1000, 16],
      progressRange = [0, 0.8],
      roundednessProgressRange = [0, 1],
      ...props
    },
    ref,
  ) => {
    const { scrollYProgress } = useContainerScrollContext();

    const insetY = useTransform(scrollYProgress, progressRange, insetYRange);
    const insetX = useTransform(scrollYProgress, progressRange, insetXRange);
    const roundedness = useTransform(
      scrollYProgress,
      roundednessProgressRange,
      roundednessRange,
    );

    const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;

    return (
      <motion.div
        ref={ref}
        className={cn("relative mx-auto w-full overflow-hidden", className)}
        style={{
          clipPath,
          ...style,
        }}
        {...props}
      />
    );
  },
);
ContainerInset.displayName = "ContainerInset";
