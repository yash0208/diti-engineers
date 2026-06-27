import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-xs border border-border-glass bg-surface-glass p-6 md:p-8",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -left-1 -top-1 block h-2.5 w-2.5 border-l border-t border-border-glass"
      />
      {children}
    </div>
  );
}
