import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/motion";

type Conflicting =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "ref";

type CommonProps = {
  strength?: number;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & {
  as: "a";
} & Omit<ComponentPropsWithoutRef<"a">, Conflicting | "children" | "className">;

type ButtonProps = CommonProps & {
  as?: "button";
} & Omit<
    ComponentPropsWithoutRef<"button">,
    Conflicting | "children" | "className"
  >;

export type MagneticButtonProps = AnchorProps | ButtonProps;

const MAX_TRANSLATE = 8;

function useCoarsePointer() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);
  return ref;
}

export function MagneticButton(props: MagneticButtonProps) {
  const { strength = 0.3, className, children, as = "button", ...rest } = props;
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced || coarse.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    mx.set(Math.max(-MAX_TRANSLATE, Math.min(MAX_TRANSLATE, dx)));
    my.set(Math.max(-MAX_TRANSLATE, Math.min(MAX_TRANSLATE, dy)));
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const style = reduced || coarse.current ? undefined : { x: sx, y: sy };

  if (as === "a") {
    return (
      <motion.a
        {...(rest as unknown as React.ComponentProps<typeof motion.a>)}
        className={className}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...(rest as unknown as React.ComponentProps<typeof motion.button>)}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.button>
  );
}
