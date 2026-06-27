import type { LucideIcon } from "lucide-react";
import { RevealOnScroll } from "@/components/motion";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  body: string;
  delay?: number;
  className?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  body,
  delay = 0,
  className,
}: FeatureCardProps) {
  return (
    <RevealOnScroll delay={delay} className={cn("h-full", className)}>
      <article className="flex h-full flex-col rounded-xs border border-border-light bg-surface-card-light p-6 shadow-elevation">
        <div className="flex size-11 items-center justify-center rounded-base bg-surface-muted text-accent-primary">
          <Icon className="size-5" aria-hidden />
        </div>
        <h3 className="mt-5 text-h3 text-text-heading-light">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-primary-light">
          {body}
        </p>
      </article>
    </RevealOnScroll>
  );
}
