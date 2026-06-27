import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { useSmoothScroll } from "./SmoothScrollProvider";

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  // Reads the smoothed scroll context so the bar feels coherent with parallax.
  useSmoothScroll();
  const scaleX = useTransform(spring, (v) => v);

  if (reduced) return null;

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-accent-primary"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
