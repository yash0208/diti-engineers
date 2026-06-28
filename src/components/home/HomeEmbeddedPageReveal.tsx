import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const slideFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

const slideFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

const blurRevealVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] },
  },
};

const scaleRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const transformRevealVariants = [
  slideFromLeftVariants,
  slideFromRightVariants,
  blurRevealVariants,
  scaleRevealVariants,
] as const;

export type HomeEmbeddedRevealMode = "transform" | "fade" | "none";

type HomeEmbeddedPageRevealProps = {
  animationIndex: number;
  layerIndex: number;
  revealMode?: HomeEmbeddedRevealMode;
  children: ReactNode;
};

export function HomeEmbeddedPageReveal({
  animationIndex,
  layerIndex,
  revealMode = "transform",
  children,
}: HomeEmbeddedPageRevealProps) {
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const layerClassName = cn("relative isolate bg-canvas");

  if (reduced || revealMode === "none" || isMobile) {
    return <div className={layerClassName}>{children}</div>;
  }

  const variants =
    revealMode === "fade"
      ? fadeVariants
      : transformRevealVariants[animationIndex % transformRevealVariants.length];

  return (
    <motion.div
      className={layerClassName}
      style={{ zIndex: layerIndex }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -5% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
