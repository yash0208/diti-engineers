import { type ReactNode } from "react";
import { RevealOnScroll } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

type PageSectionProps = {
  eyebrow?: string;
  headlineLine1: string;
  headlineLine2?: string;
  subtitle?: string;
  align?: "center" | "left";
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  bordered?: boolean;
};

export function PageSection({
  eyebrow,
  headlineLine1,
  headlineLine2,
  subtitle,
  align = "center",
  children,
  className,
  contentClassName,
  bordered = false,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        "section-padding",
        bordered && "border-t border-border-light",
        className,
      )}
    >
      <div className={cn("container-main", contentClassName)}>
        <RevealOnScroll>
          <SectionHeader
            align={align}
            eyebrow={eyebrow}
            headlineLine1={headlineLine1}
            headlineLine2={headlineLine2}
            subtitle={subtitle}
          />
        </RevealOnScroll>
        <div className={cn("mt-12 md:mt-16", align === "center" && "mx-auto")}>
          {children}
        </div>
      </div>
    </section>
  );
}
