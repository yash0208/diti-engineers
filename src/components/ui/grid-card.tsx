import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export function GridCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const squares = useMemo(() => getRandomPattern(5), []);

  return (
    <div
      className={cn(
        "group relative isolate z-0 flex h-full flex-col justify-between overflow-hidden rounded-sm border border-border-light bg-surface-card-light px-5 py-4 transition-colors duration-75",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0">
        <div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
          <GridPattern
            width={30}
            height={30}
            x={0}
            y={0}
            squares={squares}
            className="absolute inset-0 size-full translate-y-2 fill-border-light/50 stroke-border-light transition-transform duration-150 ease-out group-hover:translate-y-0"
          />
        </div>
        <div
          className={cn(
            "absolute -inset-[10%] opacity-0 blur-[50px] transition-opacity duration-150 group-hover:opacity-10",
            "bg-[conic-gradient(var(--color-accent-gradient-start)_0deg,var(--color-accent-gradient-start)_117deg,var(--color-accent-gradient-end)_180deg,var(--color-accent-primary)_240deg,var(--color-accent-gradient-start)_360deg)]",
          )}
        />
      </div>
      {children}
    </div>
  );
}

function getRandomPattern(length = 5): [x: number, y: number][] {
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}
