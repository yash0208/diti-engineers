import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard12 } from "@/components/ui/card-12";
import { businessProfile } from "@/data/profile";
import { cn } from "@/lib/utils";
import {
  productFilterKeys,
  resolveProductFilterTag,
  type ProductFilterKey,
} from "@/data/product-gallery";
import { imageRegistry, type ProductImageKey } from "@/data/images";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type GalleryProduct = {
  id: string;
  url: string;
  title: string;
  description: string;
  category: ProductFilterKey;
};

type GalleryGridBlockProps = {
  showHeader?: boolean;
  fillViewport?: boolean;
  productIds?: string[];
};

function getProductImage(id: string): string {
  if (id in imageRegistry.product) {
    return imageRegistry.product[id as ProductImageKey];
  }

  return imageRegistry.placeholder;
}

function useGalleryProducts(productIds: string[]): GalleryProduct[] {
  const { t } = useTranslation();

  return useMemo(
    () =>
      productIds
        .map((id) => {
          const category = businessProfile.productsAndServices.categories.find(
            (item) => item.id === id,
          );
          if (!category) {
            return null;
          }

          const nameKey = `products.items.${id}.name`;
          const descKey = `products.items.${id}.description`;
          const title = t(nameKey) !== nameKey ? t(nameKey) : category.name;
          const description =
            t(descKey) !== descKey ? t(descKey) : category.shortDescription;

          return {
            id,
            url: getProductImage(id),
            title,
            description,
            category: resolveProductFilterTag(id),
          };
        })
        .filter((item): item is GalleryProduct => item !== null),
    [productIds, t],
  );
}

export function GalleryGridBlock({
  showHeader = false,
  fillViewport = false,
  productIds,
}: GalleryGridBlockProps) {
  const { t } = useTranslation();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | ProductFilterKey>("all");

  const MOBILE_PAGE_SIZE = 3;
  const [mobilePage, setMobilePage] = useState(0);
  const isMobileGrid = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    setMobilePage(0);
  }, [filter]);

  const defaultProductIds = useMemo(() => {
    const featuredIds = businessProfile.productsAndServices.featuredProductIds;
    const allIds = businessProfile.productsAndServices.categories.map(
      (category) => category.id,
    );
    return Array.from(new Set([...featuredIds, ...allIds]));
  }, []);

  const galleryProducts = useGalleryProducts(productIds ?? defaultProductIds);

  const filterOptions: Array<"all" | ProductFilterKey> = [
    "all",
    ...productFilterKeys,
  ];

  const filteredProducts =
    filter === "all"
      ? galleryProducts
      : galleryProducts.filter((product) => product.category === filter);

  const activeProducts = filteredProducts.length > 0 ? filteredProducts : galleryProducts;

  const mobilePageCount = Math.ceil(activeProducts.length / MOBILE_PAGE_SIZE);
  const displayedProducts = isMobileGrid
    ? activeProducts.slice(
        mobilePage * MOBILE_PAGE_SIZE,
        mobilePage * MOBILE_PAGE_SIZE + MOBILE_PAGE_SIZE,
      )
    : activeProducts;

  const selectedProduct = galleryProducts.find(
    (product) => product.id === selectedProductId,
  );

  const handleNext = () => {
    if (selectedProductId === null) {
      return;
    }

    const currentIndex = activeProducts.findIndex(
      (product) => product.id === selectedProductId,
    );
    const nextIndex = (currentIndex + 1) % activeProducts.length;
    setSelectedProductId(activeProducts[nextIndex]?.id ?? null);
  };

  const handlePrev = () => {
    if (selectedProductId === null) {
      return;
    }

    const currentIndex = activeProducts.findIndex(
      (product) => product.id === selectedProductId,
    );
    const prevIndex =
      (currentIndex - 1 + activeProducts.length) % activeProducts.length;
    setSelectedProductId(activeProducts[prevIndex]?.id ?? null);
  };

  useEffect(() => {
    if (selectedProductId === null) {
      return;
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProductId(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedProductId]);

  const hasStandaloneHeader = showHeader && !fillViewport;
  const hasHeroHeader = fillViewport || showHeader;

  return (
    <section
      className={cn(
        fillViewport
          ? "flex min-h-0 flex-1 flex-col"
          : "section-padding bg-canvas",
      )}
      aria-labelledby={hasHeroHeader ? "gallery-heading" : undefined}
    >
      <div
        className={cn(
          fillViewport ? "flex min-h-0 flex-1 flex-col" : "container-main",
        )}
      >
        {fillViewport ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex shrink-0 flex-col gap-4 md:mb-6 md:flex-row md:items-start md:justify-between"
            role="region"
            aria-labelledby="gallery-heading"
          >
            <div className="max-w-2xl text-left">
              <p className="text-eyebrow text-text-muted">
                {t("pages.products.hero.eyebrow")}
              </p>
              <h1
                id="gallery-heading"
                className="mt-4 text-h2 text-text-heading-light md:text-h1"
              >
                <span className="text-accent-primary">
                  {t("pages.products.hero.headlineLine1")}
                </span>
                <br />
                <span>{t("pages.products.hero.headlineLine2")}</span>
              </h1>
            </div>
            <p className="max-w-md text-sm text-text-primary-light md:text-right md:text-base">
              {t("pages.products.hero.subtitle")}
            </p>
          </motion.div>
        ) : null}

        {hasStandaloneHeader ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
            role="region"
            aria-labelledby="gallery-heading"
          >
            <Badge className="mb-4" variant="secondary">
              <Grid className="mr-1 h-3 w-3" />
              {t("pages.products.gallery.badge")}
            </Badge>
            <h2
              id="gallery-heading"
              className="mb-4 text-4xl font-bold tracking-tight text-text-heading-light"
            >
              {t("pages.products.gallery.headline")}
            </h2>
            <p className="mx-auto max-w-2xl text-text-muted">
              {t("pages.products.gallery.subtitle")}
            </p>
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: hasHeroHeader ? 0.15 : 0 }}
          className={cn(
            "flex shrink-0 flex-wrap gap-2",
            fillViewport ? "mb-4 justify-start" : "mb-8 justify-center",
          )}
          role="group"
          aria-label={t("pages.products.gallery.filtersAriaLabel")}
        >
          {filterOptions.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
            >
              {category === "all"
                ? t("pages.products.gallery.filterAll")
                : t(`products.tags.${category}`)}
            </Button>
          ))}
        </motion.div>

        <div
          className={cn(
            fillViewport && "min-h-0 flex-1 overflow-x-hidden overflow-y-auto",
          )}
        >
          <motion.div
            layout
            className={cn(
              "grid items-stretch gap-3 md:gap-4",
              fillViewport
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "gap-4 sm:grid-cols-2 lg:grid-cols-3",
            )}
            role="list"
            aria-label={t("pages.products.gallery.itemsAriaLabel")}
          >
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="h-full"
                  role="listitem"
                >
                  <ProductCard12
                    title={product.title}
                    description={product.description}
                    imageSrc={product.url}
                    imageAlt={product.title}
                    primaryBadge={t(`products.tags.${product.category}`)}
                    expandAriaLabel={t("pages.products.gallery.viewDetailsAria", {
                      title: product.title,
                    })}
                    onExpand={() => setSelectedProductId(product.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {isMobileGrid && mobilePageCount > 1 && (
          <div className="mt-4 flex shrink-0 items-center justify-between gap-4 border-t border-border-light pt-4 sm:hidden">
            <p className="font-mono-label text-sm text-text-muted">
              {String(mobilePage + 1).padStart(2, "0")} / {String(mobilePageCount).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              {Array.from({ length: mobilePageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMobilePage(i)}
                  aria-label={`Page ${i + 1}`}
                  className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "block h-3 rounded-full transition-all duration-300",
                      i === mobilePage
                        ? "w-8 bg-accent-primary"
                        : "w-3 bg-text-muted/40 hover:bg-text-muted/60",
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Previous page"
                onClick={() => setMobilePage((p) => Math.max(p - 1, 0))}
                disabled={mobilePage === 0}
                className="h-10 w-10 rounded-full"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Next page"
                onClick={() => setMobilePage((p) => Math.min(p + 1, mobilePageCount - 1))}
                disabled={mobilePage + 1 >= mobilePageCount}
                className="h-10 w-10 rounded-full"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {selectedProductId !== null && selectedProduct ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedProductId(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-dialog-title"
              aria-describedby="gallery-dialog-description"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-[90vh] max-w-5xl"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute -right-2 top-0 text-text-on-dark hover:bg-white/10 md:-right-12"
                  onClick={() => setSelectedProductId(null)}
                  aria-label={t("pages.products.gallery.closeDialog")}
                >
                  <X className="h-6 w-6" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-text-on-dark hover:bg-white/10 md:left-4"
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePrev();
                  }}
                  aria-label={t("pages.products.gallery.prevImage")}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-text-on-dark hover:bg-white/10 md:right-4"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNext();
                  }}
                  aria-label={t("pages.products.gallery.nextImage")}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <motion.img
                  key={selectedProduct.id}
                  src={selectedProduct.url}
                  alt={selectedProduct.title}
                  className="max-h-[80vh] w-auto rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 text-center text-text-on-dark"
                  id="gallery-dialog-description"
                >
                  <h3
                    className="mb-2 text-xl font-semibold"
                    id="gallery-dialog-title"
                  >
                    {selectedProduct.title}
                  </h3>
                  <p className="mx-auto mb-4 max-w-xl text-sm text-text-primary-dark">
                    {selectedProduct.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Badge variant="secondary">
                      {t(`products.tags.${selectedProduct.category}`)}
                    </Badge>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 font-mono-label text-sm text-text-on-dark interactive-opacity"
                    >
                      {t("products.learnMore")}
                      <span aria-hidden>{">>"}</span>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
