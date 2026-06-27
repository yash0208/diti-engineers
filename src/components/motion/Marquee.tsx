import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

type MarqueeProps = {
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  children: ReactNode;
};

export function Marquee({
  speed = 60,
  pauseOnHover = true,
  className,
  children,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const styleVars: CSSProperties & Record<"--marquee-duration", string> = {
    "--marquee-duration": `${Math.max(800 / Math.max(speed, 1), 8)}s`,
  };

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      data-pause-on-hover={pauseOnHover ? "true" : undefined}
      style={styleVars}
    >
      <div
        className={
          reduced
            ? "flex w-max gap-12"
            : "flex w-max gap-12 marquee-track"
        }
      >
        <div className="flex shrink-0 gap-12">{children}</div>
        <div aria-hidden className="flex shrink-0 gap-12">
          {children}
        </div>
      </div>
    </div>
  );
}
