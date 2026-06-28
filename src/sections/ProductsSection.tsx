import { useEffect, useRef, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { getMotionTransition, useReducedMotion } from "@/lib/motion";
import { RevealOnScroll } from "@/components/motion";
import { SectionHeader, SlideControls } from "@/components/ui";
import { businessProfile } from "@/data/profile";
import { imageRegistry, type ProductImageKey } from "@/data/images";

const MAX_CARD_WIDTH = 347;
const CARD_GAP = 64;

function ProductCarouselCard({
  id,
  measureRef,
}: {
  id: ProductImageKey;
  measureRef?: RefObject<HTMLElement | null>;
}) {
  const { t } = useTranslation();

  return (
    <article
      ref={measureRef}
      className="w-[min(347px,calc(100vw-2rem))] shrink-0"
    >
      <div className="relative aspect-[347/359] overflow-hidden rounded-md bg-surface-muted">
        <img
          src={imageRegistry.product[id]}
          alt={t(`products.items.${id}.name`)}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm border border-border-light bg-surface-card-light/90 px-4 py-1.5 font-mono-label text-xs text-text-muted">
          {t("products.tag")}
        </span>
      </div>
      <h3 className="mt-4 text-h3 text-text-heading-light">
        {t(`products.items.${id}.name`)}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-primary-light">
        {t(`products.items.${id}.description`)}
      </p>
      <a
        href="#contact"
        className="mt-6 inline-flex items-center gap-2 font-mono-label text-sm text-text-heading-light interactive-opacity"
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
  const firstCardRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [cardWidth, setCardWidth] = useState(MAX_CARD_WIDTH);

  const productIds = businessProfile.productsAndServices.featuredProductIds.filter(
    (id): id is ProductImageKey => id in imageRegistry.product,
  );
  const extras: ProductImageKey[] = ["aluminum-motor-body-parts"];
  const ids = Array.from(new Set([...productIds, ...extras])) as ProductImageKey[];

  const maxOffset = Math.max(0, ids.length - 1);
  const step = cardWidth + CARD_GAP;

  useEffect(() => {
    const element = firstCardRef.current;
    if (!element) {
      return;
    }

    const updateWidth = () => {
      setCardWidth(element.getBoundingClientRect().width);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ids.length]);

  const goPrev = () => setOffset((o) => Math.max(0, o - 1));
  const goNext = () => setOffset((o) => Math.min(maxOffset, o + 1));

  const slideTransition = getMotionTransition(reduced, "normal", "out");

  return (
    <section id="products" className="overflow-hidden border-y border-border-light bg-canvas section-padding">
      <div className="container-main">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealOnScroll>
            <SectionHeader
              align="left"
              eyebrow={t("products.eyebrow")}
              headlineLine1={t("products.headlineLine1")}
              headlineLine2={t("products.headlineLine2")}
              className="max-w-3xl"
            />
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
              {ids.map((id, index) => (
                <ProductCarouselCard
                  key={id}
                  id={id}
                  measureRef={index === 0 ? firstCardRef : undefined}
                />
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
