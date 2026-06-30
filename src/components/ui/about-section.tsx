import { ArrowRight, Factory, Mail, Package, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Link } from "react-router-dom";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { imageRegistry } from "@/data/images";
import { cn } from "@/lib/utils";

type AboutSectionProps = {
  className?: string;
  variant?: "about" | "services";
  embedded?: boolean;
  id?: string;
};

type HeroVariantConfig = {
  translationPrefix: string;
  videoSrc: string;
  videoPoster: string;
  quickLinks: readonly {
    icon: typeof Factory;
    href: string;
    labelKey: string;
  }[];
};

const heroVariants = {
  about: {
    translationPrefix: "pages.about.heroSection",
    videoSrc: imageRegistry.showcase.aboutHero,
    videoPoster: imageRegistry.showcase.aboutHeroPoster,
    quickLinks: [
      { icon: Factory, href: "/services", labelKey: "pages.about.heroSection.links.services" },
      { icon: ShieldCheck, href: "/certificate", labelKey: "pages.about.heroSection.links.certificate" },
      { icon: Mail, href: "/contact", labelKey: "pages.about.heroSection.links.contact" },
    ],
  },
  services: {
    translationPrefix: "pages.services.heroSection",
    videoSrc: imageRegistry.platformVideo.ci,
    videoPoster: imageRegistry.platform.ci,
    quickLinks: [
      { icon: Package, href: "/products", labelKey: "pages.services.heroSection.links.products" },
      { icon: Factory, href: "/machinery", labelKey: "pages.services.heroSection.links.machinery" },
      { icon: Mail, href: "/contact", labelKey: "pages.services.heroSection.links.contact" },
    ],
  },
} as const satisfies Record<NonNullable<AboutSectionProps["variant"]>, HeroVariantConfig>;

const revealVariants = {
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.12,
      duration: 0.4,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: -20,
    opacity: 0,
  },
};

const scaleVariants = {
  visible: (index: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.12,
      duration: 0.4,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
};

function QuoteResponseLabel({
  highlightClassName,
  restClassName,
  wrapperClassName,
  translationPrefix,
}: {
  highlightClassName: string;
  restClassName: string;
  wrapperClassName?: string;
  translationPrefix: string;
}) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col uppercase leading-[0.95]", wrapperClassName)}>
      <span className={highlightClassName}>
        {t(`${translationPrefix}.stats.quoteResponse.labelHighlight`)}
      </span>
      <span className={restClassName}>
        {t(`${translationPrefix}.stats.quoteResponse.labelRest`)}
      </span>
    </div>
  );
}

export function AboutSection({
  className,
  variant = "about",
  embedded = false,
  id,
}: AboutSectionProps) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const config = heroVariants[variant];
  const translationPrefix = config.translationPrefix;
  const clipPathId = `${variant}-hero-clip`;
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    void video.play().catch(() => undefined);
  }, []);

  return (
    <section
      id={id}
      className={cn(
        "border-border-light bg-canvas",
        embedded ? "border-y" : "border-b pt-nav lg:pt-nav-lg",
        className,
      )}
      ref={heroRef}
    >
      <div className="container-main pt-4 pb-12 md:pt-6 md:pb-16">
        <div className="relative">
          <div className="relative z-10 mb-4 flex w-full items-center justify-between md:absolute md:-top-3 md:mb-8 md:w-[85%] md:top-0 lg:top-4">
            <div className="flex items-center gap-2 text-xl">
              <span className="animate-spin text-accent-primary" aria-hidden>
                ✱
              </span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-eyebrow text-text-muted"
              >
                {t(`${translationPrefix}.eyebrow`)}
              </TimelineContent>
            </div>

            <div className="flex gap-3 sm:gap-4">
              {config.quickLinks.map(({ icon: Icon, href, labelKey }, index) => (
                <TimelineContent
                  key={href}
                  as={Link}
                  animationNum={index}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  to={href}
                  aria-label={t(labelKey)}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-border-light bg-surface-card-light text-text-muted transition-[transform,border-color,color] duration-[160ms] ease-out hover:border-accent-primary/30 hover:text-accent-primary active:scale-[0.97] sm:h-9 sm:w-9 md:h-10 md:w-10"
                >
                  <Icon className="size-3.5 sm:size-4" aria-hidden />
                </TimelineContent>
              ))}
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="group relative"
          >
            {isMobile ? (
              <img
                src={config.videoPoster}
                alt={t(`${translationPrefix}.imageAlt`)}
                className="w-full rounded-md object-cover"
                style={{ aspectRatio: "5/2" }}
              />
            ) : (
              <svg className="aspect-[5/2] w-full" viewBox="0 0 100 40">
                <defs>
                  <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                    <path
                      d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                      fill="#D9D9D9"
                    />
                  </clipPath>
                </defs>
                <g clipPath={`url(#${clipPathId})`}>
                  <foreignObject width="100%" height="100%">
                    <video
                      ref={videoRef}
                      src={config.videoSrc}
                      poster={config.videoPoster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                      aria-label={t(`${translationPrefix}.imageAlt`)}
                    />
                  </foreignObject>
                </g>
              </svg>
            )}

            {/* Keep the existing QuoteResponseLabel overlay block below — do not change it */}
            <div className="absolute bottom-[4%] right-[1.5%] z-10 hidden max-w-[24%] flex-col items-end md:flex lg:max-w-[22%]">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
              >
                <QuoteResponseLabel
                  translationPrefix={translationPrefix}
                  highlightClassName="text-right text-3xl font-semibold text-accent-primary lg:text-4xl xl:text-[2.75rem]"
                  restClassName="text-right text-2xl text-text-primary-light lg:text-3xl xl:text-4xl"
                  wrapperClassName="items-end text-right"
                />
              </TimelineContent>
            </div>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={6}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="mt-4 md:hidden"
          >
            <QuoteResponseLabel
              translationPrefix={translationPrefix}
              highlightClassName="text-2xl font-semibold text-accent-primary"
              restClassName="text-xl text-text-primary-light"
              wrapperClassName="flex-row items-baseline gap-2"
            />
          </TimelineContent>

          <div className="flex flex-col gap-2 py-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <span className="font-bold text-accent-primary">
                  {t(`${translationPrefix}.stats.experience.value`)}
                </span>
                <span className="text-text-primary-light">
                  {t(`${translationPrefix}.stats.experience.label`)}
                </span>
              </div>
              <div className="hidden h-4 w-px bg-border-light sm:block" aria-hidden />
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <span className="font-bold text-accent-primary">
                  {t(`${translationPrefix}.stats.turnover.value`)}
                </span>
                <span className="text-text-primary-light">
                  {t(`${translationPrefix}.stats.turnover.label`)}
                </span>
              </div>
            </TimelineContent>
          </div>
        </div>

        <div className="mt-6 grid gap-8 md:mt-0 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-6 text-2xl font-semibold !leading-[110%] text-text-heading-light sm:mb-8 sm:text-4xl md:text-5xl">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.25,
                }}
              >
                {t(`${translationPrefix}.headline`)}
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid gap-6 text-text-primary-light sm:gap-8 md:grid-cols-2"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm sm:text-base"
              >
                <p className="leading-relaxed sm:text-justify">
                  {t(`${translationPrefix}.body1`)}
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm sm:text-base"
              >
                <p className="leading-relaxed sm:text-justify">
                  {t(`${translationPrefix}.body2`)}
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="border-t border-border-light pt-6 text-left md:border-t-0 md:pt-0 md:text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 font-display text-2xl font-bold text-accent-primary"
              >
                {t(`${translationPrefix}.companyName`)}
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-8 text-sm text-text-muted"
              >
                {t(`${translationPrefix}.role`)}
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="font-medium text-text-heading-light">
                  {t(`${translationPrefix}.ctaPrompt`)}
                </p>
              </TimelineContent>

              <TimelineContent
                as={Link}
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                to="/contact"
                className="mb-6 flex w-full items-center justify-center gap-2 rounded-sm border border-border-light bg-text-heading-light px-5 py-3 font-semibold text-text-on-dark shadow-card transition-[transform,background-color,gap] duration-[160ms] ease-out hover:gap-3 hover:bg-canvas-dark active:scale-[0.97] md:ml-auto md:w-fit"
              >
                {t(`${translationPrefix}.ctaButton`)}
                <ArrowRight aria-hidden />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
