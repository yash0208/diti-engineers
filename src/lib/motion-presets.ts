import { motionTokens, type DurationKey, type EaseKey } from "@/lib/motion";

export const fadeUpEnter = {
  opacity: 0,
  y: 8,
  scale: 0.98,
} as const;

export const fadeUpExit = {
  opacity: 0,
  y: -6,
  scale: 0.99,
} as const;

export const fadeSlideEnter = (offset: number) => ({
  opacity: 0,
  x: offset,
  scale: 0.99,
});

export const fadeSlideExit = (offset: number) => ({
  opacity: 0,
  x: -offset,
  scale: 0.99,
});

export function enterTransition(
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

export function exitTransition(reduced: boolean) {
  if (reduced) return { duration: 0 };
  return {
    duration: motionTokens.duration.exit,
    ease: [...motionTokens.ease.out],
  };
}

export function panelTransition(reduced: boolean, entering: boolean) {
  if (reduced) return { duration: 0 };
  return {
    duration: entering
      ? motionTokens.duration.slow
      : motionTokens.duration.exit,
    ease: [...motionTokens.ease.out],
  };
}
