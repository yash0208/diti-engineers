import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type ShowcaseCardProps = {
  translationPrefix: string;
  imageSrc: string;
  imageAlt: string;
  learnMoreHref: string;
  learnMoreLabelKey: string;
  className?: string;
};

export function ShowcaseCard({
  translationPrefix,
  imageSrc,
  imageAlt,
  learnMoreHref,
  learnMoreLabelKey,
  className,
}: ShowcaseCardProps) {
  const { t } = useTranslation();

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-md border border-border-light bg-surface-card-light",
        className,
      )}
    >
      <div className="p-5">
        <div className="aspect-[625/298] overflow-hidden rounded-sm bg-surface-muted">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover interactive-transform interactive-transform-hover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <h3 className="text-h3 text-text-heading-light">{t(`${translationPrefix}.title`)}</h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-text-primary-light">
          {t(`${translationPrefix}.body`)}
        </p>
        <div className="mt-6">
          <a
            href={learnMoreHref}
            className="inline-flex items-center gap-2 font-mono-label text-sm text-text-heading-light interactive-opacity"
          >
            {t(learnMoreLabelKey)}
            <span aria-hidden>{">>"}</span>
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-border-light">
        <div className="border-r border-border-light p-6">
          <p className="font-display text-3xl font-bold text-text-heading-light sm:text-4xl md:text-5xl">
            {t(`${translationPrefix}.stat1Value`)}
            <span className="text-accent-primary">{t(`${translationPrefix}.stat1Suffix`)}</span>
          </p>
          <p className="mt-2 text-sm text-text-muted">{t(`${translationPrefix}.stat1Label`)}</p>
        </div>
        <div className="p-6">
          <p className="font-display text-3xl font-bold text-text-heading-light sm:text-4xl md:text-5xl">
            {t(`${translationPrefix}.stat2Value`)}
            <span className="text-accent-primary">{t(`${translationPrefix}.stat2Suffix`)}</span>
          </p>
          <p className="mt-2 text-sm text-text-muted">{t(`${translationPrefix}.stat2Label`)}</p>
        </div>
      </div>
    </article>
  );
}
