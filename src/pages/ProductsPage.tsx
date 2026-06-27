import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/motion";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { businessProfile } from "@/data/profile";
import { imageRegistry, type ProductImageKey } from "@/data/images";

function ProductGridCard({ id }: { id: string }) {
  const { t } = useTranslation();
  const imageSrc =
    id in imageRegistry.product
      ? imageRegistry.product[id as ProductImageKey]
      : imageRegistry.placeholder;
  const nameKey = `products.items.${id}.name`;
  const descKey = `products.items.${id}.description`;
  const hasTranslation =
    t(nameKey) !== nameKey && t(descKey) !== descKey;

  if (!hasTranslation) {
    const category = businessProfile.productsAndServices.categories.find(
      (item) => item.id === id,
    );
    if (!category) return null;

    return (
      <RevealOnScroll className="h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-xs border border-border-light bg-surface-card-light shadow-elevation">
          <div className="aspect-[4/3] bg-surface-muted">
            <img
              src={imageSrc}
              alt={category.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-h3 text-text-heading-light">{category.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-primary-light">
              {category.shortDescription}
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 font-mono-label text-sm text-text-heading-light interactive-opacity"
            >
              {t("products.learnMore")}
              <span aria-hidden>{">>"}</span>
            </Link>
          </div>
        </article>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xs border border-border-light bg-surface-card-light shadow-elevation">
        <div className="aspect-[4/3] bg-surface-muted">
          <img
            src={imageSrc}
            alt={t(nameKey)}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-h3 text-text-heading-light">{t(nameKey)}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-primary-light">
            {t(descKey)}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 font-mono-label text-sm text-text-heading-light interactive-opacity"
          >
            {t("products.learnMore")}
            <span aria-hidden>{">>"}</span>
          </Link>
        </div>
      </article>
    </RevealOnScroll>
  );
}

export function ProductsPage() {
  const { t } = useTranslation();
  const featuredIds = businessProfile.productsAndServices.featuredProductIds;
  const allIds = businessProfile.productsAndServices.categories.map(
    (category) => category.id,
  );
  const displayIds = Array.from(new Set([...featuredIds, ...allIds]));

  return (
    <>
      <PageHero
        eyebrow={t("pages.products.hero.eyebrow")}
        headlineLine1={t("pages.products.hero.headlineLine1")}
        headlineLine2={t("pages.products.hero.headlineLine2")}
        subtitle={t("pages.products.hero.subtitle")}
      />

      <PageSection
        align="left"
        eyebrow={t("pages.products.featured.eyebrow")}
        headlineLine1={t("pages.products.featured.headlineLine1")}
        headlineLine2={t("pages.products.featured.headlineLine2")}
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredIds.map((id) => (
            <ProductGridCard key={id} id={id} />
          ))}
        </div>
      </PageSection>

      <PageSection
        bordered
        align="left"
        eyebrow={t("pages.products.catalog.eyebrow")}
        headlineLine1={t("pages.products.catalog.headlineLine1")}
        headlineLine2={t("pages.products.catalog.headlineLine2")}
        subtitle={t("pages.products.catalog.subtitle")}
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {displayIds.map((id) => (
            <ProductGridCard key={id} id={id} />
          ))}
        </div>
      </PageSection>
    </>
  );
}
