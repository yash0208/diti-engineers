import { cn } from "@/lib/utils";

type SectionHeaderSize = "section" | "hero" | "display";
type SectionHeaderTone = "light" | "dark";
type SectionHeaderAlign = "center" | "left";

type SectionHeaderProps = {
  eyebrow?: string;
  headlineLine1: string;
  headlineLine2?: string;
  subtitle?: string;
  align?: SectionHeaderAlign;
  tone?: SectionHeaderTone;
  size?: SectionHeaderSize;
  as?: "h1" | "h2";
  className?: string;
  headlineClassName?: string;
  eyebrowClassName?: string;
  subtitleClassName?: string;
};

const headlineSizeClass: Record<SectionHeaderSize, string> = {
  section: "text-section-title",
  hero: "text-h1",
  display: "text-display",
};

export function SectionHeader({
  eyebrow,
  headlineLine1,
  headlineLine2,
  subtitle,
  align = "center",
  tone = "light",
  size = "section",
  as: Heading = "h2",
  className,
  headlineClassName,
  eyebrowClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-eyebrow",
            isDark ? "text-text-primary-dark" : "text-text-muted",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <Heading
        className={cn(
          headlineSizeClass[size],
          eyebrow ? "mt-4" : undefined,
          isDark ? "text-text-on-dark" : "text-text-heading-light",
          headlineClassName,
        )}
      >
        <span className="text-accent-primary">{headlineLine1}</span>
        {headlineLine2 ? (
          <>
            <br />
            <span>{headlineLine2}</span>
          </>
        ) : null}
      </Heading>

      {subtitle ? (
        <p
          className={cn(
            "mt-6 text-body-lg",
            align === "center" && "mx-auto max-w-[776px]",
            isDark ? "text-text-primary-dark" : "text-text-primary-light",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
