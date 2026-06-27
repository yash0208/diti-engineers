import { useEffect, useState } from "react";

export const motionTokens = {
  duration: {
    fast: 0.16,
    normal: 0.25,
    slow: 0.4,
    exit: 0.18,
    hero: 0.7,
  },
  ease: {
    default: [0.23, 1, 0.32, 1] as const,
    out: [0.23, 1, 0.32, 1] as const,
    inOut: [0.77, 0, 0.175, 1] as const,
  },
  stagger: { tight: 0.05, default: 0.08, loose: 0.12 },
} as const;

export type DurationKey = keyof typeof motionTokens.duration;
export type EaseKey = keyof typeof motionTokens.ease;

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function getMotionTransition(
  reduced: boolean,
  durationKey: DurationKey = "normal",
  easeKey: EaseKey = "out",
) {
  if (reduced) return { duration: 0 };
  return {
    duration: motionTokens.duration[durationKey],
    ease: [...motionTokens.ease[easeKey]],
  };
}
