import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/motion";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { imageRegistry } from "@/data/images";

const postKeys = ["post1", "post2", "post3"] as const;

export function BlogPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("pages.blog.hero.eyebrow")}
        headlineLine1={t("pages.blog.hero.headlineLine1")}
        headlineLine2={t("pages.blog.hero.headlineLine2")}
        subtitle={t("pages.blog.hero.subtitle")}
      />

      <PageSection
        align="left"
        eyebrow={t("pages.blog.latest.eyebrow")}
        headlineLine1={t("pages.blog.latest.headlineLine1")}
        headlineLine2={t("pages.blog.latest.headlineLine2")}
      >
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {postKeys.map((key, index) => (
            <RevealOnScroll key={key} delay={index * 0.06} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-xs border border-border-light bg-surface-card-light shadow-elevation">
                <div className="aspect-[16/10] bg-surface-muted">
                  <img
                    src={
                      index === 0
                        ? imageRegistry.showcase.factory
                        : index === 1
                          ? imageRegistry.product["ci-casting"]
                          : imageRegistry.applications.production
                    }
                    alt={t(`pages.blog.posts.${key}.title`)}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-eyebrow text-text-muted">
                    {t(`pages.blog.posts.${key}.category`)}
                  </p>
                  <h3 className="mt-3 text-h3 text-text-heading-light">
                    {t(`pages.blog.posts.${key}.title`)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-primary-light">
                    {t(`pages.blog.posts.${key}.excerpt`)}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-2 font-mono-label text-sm text-text-heading-light interactive-opacity"
                  >
                    {t("pages.blog.readMore")}
                    <span aria-hidden>{">>"}</span>
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </PageSection>
    </>
  );
}
