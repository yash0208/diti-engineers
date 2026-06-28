import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  type HTMLMotionProps,
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

const bentoGridVariants = cva(
  "relative grid gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
  {
    variants: {
      variant: {
        default: `
          grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]
          [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3
          [&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block
          [&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block
          [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
          [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
        `,
        threeCells: `
          grid-cols-2 grid-rows-2
          [&>*:first-child]:col-span-2
        `,
        fourCells: `
          grid-cols-3 grid-rows-2
          [&>*:first-child]:col-span-1
          [&>*:nth-child(2)]:col-span-2
          [&>*:nth-child(3)]:col-span-2
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface HeroGalleryScrollContextValue {
  scrollYProgress: MotionValue<number>;
  containInSection: boolean;
}

const HeroGalleryScrollContext = React.createContext<
  HeroGalleryScrollContextValue | undefined
>(undefined);

function useHeroGalleryScrollContext() {
  const context = React.useContext(HeroGalleryScrollContext);
  if (!context) {
    throw new Error(
      "useHeroGalleryScrollContext must be used within HeroGalleryScroll",
    );
  }
  return context;
}

const HeroGalleryScroll = ({
  children,
  className,
  containInSection = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  containInSection?: boolean;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });

  return (
    <HeroGalleryScrollContext.Provider value={{ scrollYProgress, containInSection }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </HeroGalleryScrollContext.Provider>
  );
};

const HeroGalleryGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  );
});
HeroGalleryGrid.displayName = "HeroGalleryGrid";

const HeroGalleryCell = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useHeroGalleryScrollContext();
    const translateY = useTransform(scrollYProgress, [0.1, 0.9], ["-35%", "0%"]);
    const scale = useTransform(scrollYProgress, [0, 0.9], [0.5, 1]);

    return (
      <motion.div
        ref={ref}
        className={cn("h-full min-h-0 w-full", className)}
        style={{ y: translateY, scale, ...style }}
        {...props}
      />
    );
  },
);
HeroGalleryCell.displayName = "HeroGalleryCell";

const HeroGalleryContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, style, ...props }, ref) => {
  const { scrollYProgress, containInSection } = useHeroGalleryScrollContext();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 0.6 ? "absolute" : "fixed",
  );

  if (containInSection) {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center px-4 text-center",
          className,
        )}
        style={{ opacity, scale, ...style }}
        {...props}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("left-1/2 top-1/2 size-fit", className)}
      style={{
        x: "-50%",
        y: "-50%",
        scale,
        position,
        opacity,
        ...style,
      }}
      {...props}
    />
  );
});
HeroGalleryContent.displayName = "HeroGalleryContent";

const HeroGalleryBackdrop = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, style, ...props }, ref) => {
  const { scrollYProgress, containInSection } = useHeroGalleryScrollContext();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 0.6 ? "absolute" : "fixed",
  );

  if (containInSection) {
    return (
      <motion.div
        ref={ref}
        className={cn("absolute inset-0 z-0", className)}
        style={{ opacity, ...style }}
        {...props}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "inset-x-0 top-16 z-[5] h-[calc(100svh-4rem)] w-full lg:top-[4.25rem] lg:h-[calc(100svh-4.25rem)]",
        className,
      )}
      style={{ position, opacity, ...style }}
      {...props}
    />
  );
});
HeroGalleryBackdrop.displayName = "HeroGalleryBackdrop";

const HeroGalleryScrollFade = ({
  children,
  className,
  enabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}) => {
  const { scrollYProgress } = useHeroGalleryScrollContext();
  const opacity = useTransform(scrollYProgress, [0.8, 0.98], [1, 0]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <motion.div className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
};

export {
  HeroGalleryScroll,
  HeroGalleryGrid,
  HeroGalleryCell,
  HeroGalleryContent,
  HeroGalleryBackdrop,
  HeroGalleryScrollFade,
};
