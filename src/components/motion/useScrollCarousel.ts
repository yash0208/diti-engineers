import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "@/lib/motion";

type ScrollCarouselOptions = {
  slideCount: number;
  slideHeightVh?: number;
};

type ScrollCarouselResult = {
  scrollRef: RefObject<HTMLDivElement | null>;
  index: number;
  backgroundX: MotionValue<string>;
  scrollToSlide: (targetIndex: number) => void;
  enabled: boolean;
  wrapperHeightVh: number;
};

function clampIndex(index: number, slideCount: number): number {
  return Math.max(0, Math.min(slideCount - 1, index));
}

function progressToIndex(progress: number, slideCount: number): number {
  if (slideCount <= 1) return 0;
  return clampIndex(Math.round(progress * (slideCount - 1)), slideCount);
}

export function useScrollCarousel({
  slideCount,
  slideHeightVh = 100,
}: ScrollCarouselOptions): ScrollCarouselResult {
  const reduced = useReducedMotion();
  const enabled = !reduced && slideCount > 1;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const backgroundX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(slideCount - 1) * 100}vw`],
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!enabled) return;
    setIndex(progressToIndex(progress, slideCount));
  });

  const scrollToSlide = useCallback(
    (targetIndex: number) => {
      const clamped = clampIndex(targetIndex, slideCount);

      if (!enabled) {
        setIndex(clamped);
        return;
      }

      const el = scrollRef.current;
      if (!el || slideCount <= 1) return;

      const sectionTop = el.offsetTop;
      const scrollableDistance = el.offsetHeight - window.innerHeight;
      const targetTop =
        sectionTop +
        (scrollableDistance * clamped) / (slideCount - 1);

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    },
    [enabled, slideCount],
  );

  return {
    scrollRef,
    index,
    backgroundX,
    scrollToSlide,
    enabled,
    wrapperHeightVh: slideCount * slideHeightVh,
  };
}
