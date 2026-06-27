import { motion, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";
import { useScrollProgress } from "./useScrollProgress";

type ParallaxProps = {
  y?: [number, number];
  x?: [number, number];
  className?: string;
  children: ReactNode;
};

export function Parallax({
  y = [-40, 40],
  x,
  className,
  children,
}: ParallaxProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);

  const ty = useTransform(progress, [0, 1], y);
  const tx = useTransform(progress, [0, 1], x ?? [0, 0]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y: ty, x: tx }}>
      {children}
    </motion.div>
  );
}
