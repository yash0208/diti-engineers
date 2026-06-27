import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { enterTransition, exitTransition } from "@/lib/motion-presets";

type KeywordSwapProps = {
  words: string[];
  interval?: number;
  className?: string;
};

export function KeywordSwap({
  words,
  interval = 2800,
  className,
}: KeywordSwapProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduced, interval, words.length]);

  const longest = words.reduce(
    (acc, w) => (w.length > acc.length ? w : acc),
    "",
  );

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span
      className={className}
      style={{
        display: "inline-grid",
        gridTemplateAreas: '"stack"',
        verticalAlign: "baseline",
      }}
    >
      <span
        aria-hidden
        style={{
          gridArea: "stack",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {longest}
      </span>
      <span
        style={{
          gridArea: "stack",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: 12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{
              y: -8,
              opacity: 0,
              scale: 0.99,
              transition: exitTransition(false),
            }}
            transition={enterTransition(false)}
            style={{ display: "inline-block" }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
