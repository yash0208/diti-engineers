import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useScroll, useSpring, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

type SmoothScrollContextValue = {
  smooth: MotionValue<number>;
  raw: MotionValue<number>;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(
  null,
);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, {
    stiffness: 80,
    damping: 20,
    mass: 0.4,
  });

  const value: SmoothScrollContextValue = {
    smooth: reduced ? scrollY : smooth,
    raw: scrollY,
  };

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

function FallbackSmoothScroll(): SmoothScrollContextValue {
  const { scrollY } = useScroll();
  return { smooth: scrollY, raw: scrollY };
}

export function useSmoothScroll(): SmoothScrollContextValue {
  const ctx = useContext(SmoothScrollContext);
  const fallback = FallbackSmoothScroll();
  return ctx ?? fallback;
}
