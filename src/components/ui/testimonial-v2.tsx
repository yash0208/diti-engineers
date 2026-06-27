import { Fragment } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  trustCardColumnGroups,
  trustCardImages,
  type TrustCardKey,
} from "@/data/trust-cards";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { elevation } from "@/theme/typography";

type TrustCard = {
  key: TrustCardKey;
  quote: string;
  author: string;
  role: string;
  image: string;
};

type TestimonialsColumnProps = {
  cards: TrustCard[];
  duration?: number;
  className?: string;
};

const cardLift = {
  scale: 1.03,
  y: -8,
  boxShadow: elevation.cardHover,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

function TestimonialsColumn({
  cards,
  duration = 15,
  className,
}: TestimonialsColumnProps) {
  const reduced = useReducedMotion();
  const loopSets = reduced ? 1 : 2;

  return (
    <div className={className}>
      <motion.ul
        animate={reduced ? undefined : { translateY: "-50%" }}
        transition={
          reduced
            ? undefined
            : {
                duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }
        }
        className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6"
      >
        {Array.from({ length: loopSets }, (_, setIndex) => (
          <Fragment key={setIndex}>
            {cards.map((card) => (
              <motion.li
                key={`${setIndex}-${card.key}`}
                aria-hidden={setIndex === 1 ? true : undefined}
                tabIndex={setIndex === 1 ? -1 : 0}
                whileHover={reduced ? undefined : cardLift}
                whileFocus={reduced ? undefined : cardLift}
                className="group w-full max-w-xs cursor-default select-none rounded-xl border border-border-light bg-surface-card-light p-8 shadow-elevation transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 md:p-10"
              >
                <blockquote className="m-0 p-0">
                  <p className="m-0 font-normal leading-relaxed text-text-primary-light">
                    {card.quote}
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={card.image}
                      alt={card.author}
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-border-light transition-all duration-300 group-hover:ring-accent-primary/30"
                    />
                    <div className="flex flex-col">
                      <cite className="font-display text-sm font-semibold not-italic leading-5 tracking-tight text-text-heading-light">
                        {card.author}
                      </cite>
                      <span className="mt-0.5 text-sm leading-5 text-text-muted">
                        {card.role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

type TestimonialV2Props = {
  className?: string;
};

export function TestimonialV2({ className }: TestimonialV2Props) {
  const { t } = useTranslation();

  const columns = trustCardColumnGroups.map((keys) =>
    keys.map((key) => ({
      key,
      quote: t(`brands.cards.${key}.quote`),
      author: t(`brands.cards.${key}.author`),
      role: t(`brands.cards.${key}.role`),
      image: trustCardImages[key],
    })),
  );

  const columnDurations = [15, 19, 17] as const;
  const columnVisibility = [
    undefined,
    "hidden md:block",
    "hidden lg:block",
  ] as const;

  return (
    <div
      className={cn(
        "mx-auto mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
      role="region"
      aria-label={t("brands.columnsAriaLabel")}
    >
      {columns.map((cards, index) => (
        <TestimonialsColumn
          key={index}
          cards={cards}
          duration={columnDurations[index]}
          className={columnVisibility[index]}
        />
      ))}
    </div>
  );
}
