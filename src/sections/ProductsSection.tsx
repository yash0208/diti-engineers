import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { getMotionTransition, useReducedMotion } from "@/lib/motion";
import { RevealOnScroll } from "@/components/motion";
import { SlideControls } from "@/components/ui";
import { businessProfile } from "@/data/profile";
import { imageRegistry, type ProductImageKey } from "@/data/images";

const CARD_WIDTH = 347;
const CARD_GAP = 64;

function ProductCarouselCard({ id }: { id: ProductImageKey }) {
  const { t } = useTranslation();

  return (
    <article className="w-[347px] shrink-0">
      <div className="relative aspect-[347/359] overflow-hidden rounded-xs bg-surface-muted">
        <img
          src={imageRegistry.product[id]}
          alt={t(`products.items.${id}.name`)}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-card-light/90 px-4 py-1.5 text-xs uppercase tracking-wider text-text-heading-light">
          <span aria-hidden className="h-2 w-2 rounded-full bg-accent-primary" />
          {t("products.tag")}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-text-heading-light">
        {t(`products.items.${id}.name`)}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-primary-light">
        {t(`products.items.${id}.description`)}
      </p>
      <a
        href="#contact"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-heading-light interactive-opacity"
      >
        {t("products.learnMore")}
        <span aria-hidden>{">>"}</span>
      </a>
    </article>
  );
}

export function ProductsSection() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const productIds = businessProfile.productsAndServices.featuredProductIds.filter(
    (id): id is ProductImageKey => id in imageRegistry.product,
  );
  const extras: ProductImageKey[] = ["aluminum-motor-body-parts"];
  const ids = Array.from(new Set([...productIds, ...extras])) as ProductImageKey[];

  const maxOffset = Math.max(0, ids.length - 1);
  const step = CARD_WIDTH + CARD_GAP;

  const goPrev = () => setOffset((o) => Math.max(0, o - 1));
  const goNext = () => setOffset((o) => Math.min(maxOffset, o + 1));

  const slideTransition = getMotionTransition(reduced, "normal", "out");

  return (
    <section id="products" className="overflow-hidden bg-canvas section-padding">
      <div className="container-main">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealOnScroll>
            <h2 className="max-w-3xl text-h1 text-text-heading-light">
              {t("products.headline")}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <p className="max-w-md text-body-lg text-text-primary-light">
              {t("products.subtitle")}
            </p>
          </RevealOnScroll>
          <SlideControls
            light={false}
            onPrev={goPrev}
            onNext={goNext}
            ariaLabelPrev={t("controls.prev")}
            ariaLabelNext={t("controls.next")}
            className="hidden md:flex"
          />
        </div>

        <RevealOnScroll className="mt-12" delay={0.12}>
          <div ref={trackRef} className="overflow-hidden">
            <motion.div
              className="flex gap-16"
              animate={{ x: -offset * step }}
              transition={slideTransition}
              drag={reduced ? false : "x"}
              dragConstraints={trackRef}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (reduced) return;
                if (info.offset.x < -80 && offset < maxOffset) goNext();
                else if (info.offset.x > 80 && offset > 0) goPrev();
              }}
            >
              {ids.map((id) => (
                <ProductCarouselCard key={id} id={id} />
              ))}
            </motion.div>
          </div>
          <SlideControls
            light={false}
            onPrev={goPrev}
            onNext={goNext}
            ariaLabelPrev={t("controls.prev")}
            ariaLabelNext={t("controls.next")}
            className="mt-8 flex md:hidden"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
