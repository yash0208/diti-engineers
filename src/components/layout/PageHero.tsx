import { RevealOnScroll } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  headlineLine1: string;
  headlineLine2?: string;
  subtitle?: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  headlineLine1,
  headlineLine2,
  subtitle,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-border-light bg-canvas pt-nav lg:pt-nav-lg",
        className,
      )}
    >
      <div className="container-main section-padding pb-12 md:pb-16">
        <RevealOnScroll>
          <SectionHeader
            as="h1"
            size="hero"
            align="left"
            eyebrow={eyebrow}
            headlineLine1={headlineLine1}
            headlineLine2={headlineLine2}
            subtitle={subtitle}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
