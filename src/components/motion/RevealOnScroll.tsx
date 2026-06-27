import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  useReducedMotion,
  type DurationKey,
  type EaseKey,
} from "@/lib/motion";
import { enterTransition } from "@/lib/motion-presets";

type RevealOnScrollProps = {
  as?: "div" | "section" | "header" | "footer" | "article" | "ul" | "li" | "p" | "span";
  delay?: number;
  y?: number;
  duration?: DurationKey;
  easeKey?: EaseKey;
  once?: boolean;
  className?: string;
  children: ReactNode;
};

export function RevealOnScroll({
  as = "div",
  delay = 0,
  y = 8,
  duration = "normal",
  easeKey = "out",
  once = true,
  className,
  children,
}: RevealOnScrollProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    once,
    margin: "0px 0px -10% 0px",
  });

  const Tag = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  if (reduced) {
    return (
      <Tag ref={ref as React.Ref<HTMLDivElement>} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y, scale: 0.98 }}
      animate={
        inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.98 }
      }
      transition={{
        ...enterTransition(false, duration, easeKey),
        delay,
      }}
    >
      {children}
    </Tag>
  );
}
