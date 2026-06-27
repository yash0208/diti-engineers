import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
};

const defaultFormat = (n: number) => Math.round(n).toString();

export function CountUp({
  to,
  from = 0,
  duration = 1.2,
  format = defaultFormat,
  className,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const value = useMotionValue(from);
  const [display, setDisplay] = useState(() => format(reduced ? to : from));

  useMotionValueEvent(value, "change", (v) => {
    setDisplay(format(v));
  });

  useEffect(() => {
    if (reduced) {
      setDisplay(format(to));
      return;
    }
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, to, duration, value, format]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
