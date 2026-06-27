import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SplitStatProps = {
  value: ReactNode;
  suffix?: ReactNode;
  label: string;
  className?: string;
  light?: boolean;
};

export function SplitStat({
  value,
  suffix,
  label,
  className,
  light = true,
}: SplitStatProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "flex items-baseline font-display text-5xl font-bold md:text-6xl",
          light ? "text-text-heading-light" : "text-text-on-dark",
        )}
      >
        <span>{value}</span>
        {suffix && (
          <span className="text-accent-primary">{suffix}</span>
        )}
      </div>
      <p className="mt-2 text-sm text-text-muted">{label}</p>
    </div>
  );
}
