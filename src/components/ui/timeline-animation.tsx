import {
  motion,
  useInView,
  type UseInViewOptions,
  type Variants,
} from "framer-motion";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type RefObject,
} from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TimelineContentProps<T extends ElementType> = {
  as?: T;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  viewport?: UseInViewOptions;
  className?: string;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

const motionTags = {
  div: motion.div,
  span: motion.span,
  a: motion.a,
  figure: motion.figure,
  button: motion.button,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  section: motion.section,
} as const;

type MotionTag = keyof typeof motionTags;

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
};

export function TimelineContent<T extends ElementType = "div">({
  as = "div" as T,
  animationNum,
  timelineRef,
  customVariants,
  viewport = { amount: 0.3, margin: "0px 0px -120px 0px", once: true },
  className,
  children,
  ...props
}: TimelineContentProps<T>) {
  const reduced = useReducedMotion();
  const isInView = useInView(timelineRef, viewport);
  const MotionComponent =
    typeof as === "string" && as in motionTags
      ? motionTags[as as MotionTag]
      : motion.create(as);
  const variants = customVariants ?? defaultVariants;

  const sharedProps = {
    className: cn(className),
    ...props,
  };

  if (reduced) {
    const StaticComponent = as as ElementType;
    return <StaticComponent {...sharedProps}>{children}</StaticComponent>;
  }

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={variants}
      {...sharedProps}
    >
      {children}
    </MotionComponent>
  );
}
