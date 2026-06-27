import { useScroll } from "framer-motion";
import type { RefObject } from "react";

type Offset =
  | "start end"
  | "start center"
  | "start start"
  | "center end"
  | "center center"
  | "center start"
  | "end end"
  | "end center"
  | "end start"
  | string;

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  offset: [Offset, Offset] = ["start end", "end start"],
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    // framer-motion accepts string tuples here
    offset: offset as never,
  });
  return scrollYProgress;
}
