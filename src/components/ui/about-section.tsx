import { ArrowRight, Factory, Mail, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { imageRegistry } from "@/data/images";
import { cn } from "@/lib/utils";

type AboutSectionProps = {
  className?: string;
};

const revealVariants = {
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.4,
      duration: 0.5,
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
      delay: index * 0.4,
      duration: 0.5,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
};

const quickLinks = [
  { icon: Factory, href: "/services", labelKey: "pages.about.heroSection.links.services" },
  { icon: ShieldCheck, href: "/certificate", labelKey: "pages.about.heroSection.links.certificate" },
  { icon: Mail, href: "/contact", labelKey: "pages.about.heroSection.links.contact" },
] as const;

export function AboutSection({ className }: AboutSectionProps) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className={cn(
        "border-b border-border-light bg-canvas pt-nav lg:pt-nav-lg",
        className,
      )}
      ref={heroRef}
    >
      <div className="container-main pt-4 pb-12 md:pt-6 md:pb-16">
        <div className="relative">
          <div className="absolute -top-3 z-10 mb-8 flex w-[85%] items-center justify-between sm:-top-2 md:top-0 lg:top-4">
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
                {t("pages.about.heroSection.eyebrow")}
              </TimelineContent>
            </div>

            <div className="flex gap-3 sm:gap-4">
              {quickLinks.map(({ icon: Icon, href, labelKey }, index) => (
                <TimelineContent
                  key={href}
                  as={Link}
                  animationNum={index}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  to={href}
                  aria-label={t(labelKey)}
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-base border border-border-light bg-surface-card-light text-text-muted transition-colors hover:border-accent-primary/30 hover:text-accent-primary sm:h-6 sm:w-6 md:h-8 md:w-8"
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
            <svg className="w-full" width="100%" height="100%" viewBox="0 0 100 40">
              <defs>
                <clipPath id="about-hero-clip" clipPathUnits="objectBoundingBox">
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#about-hero-clip)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                href={imageRegistry.showcase.factory}
                aria-label={t("pages.about.heroSection.imageAlt")}
              />
            </svg>

            <div className="absolute bottom-[4%] right-[1.5%] z-10 flex max-w-[28%] flex-col items-end sm:max-w-[26%] lg:max-w-[24%]">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex flex-col items-end text-right uppercase leading-[0.95]"
              >
                <span className="text-2xl font-semibold text-accent-primary sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
                  {t("pages.about.heroSection.stats.quoteResponse.labelHighlight")}
                </span>
                <span className="text-xl text-text-primary-light sm:text-2xl lg:text-3xl xl:text-4xl">
                  {t("pages.about.heroSection.stats.quoteResponse.labelRest")}
                </span>
              </TimelineContent>
            </div>
          </TimelineContent>

          <div className="flex flex-wrap items-center py-3 text-sm">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex flex-wrap gap-4"
            >
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-accent-primary">
                  {t("pages.about.heroSection.stats.experience.value")}
                </span>
                <span className="text-text-primary-light">
                  {t("pages.about.heroSection.stats.experience.label")}
                </span>
                <span className="text-border-light" aria-hidden>
                  |
                </span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-accent-primary">
                  {t("pages.about.heroSection.stats.turnover.value")}
                </span>
                <span className="text-text-primary-light">
                  {t("pages.about.heroSection.stats.turnover.label")}
                </span>
              </div>
            </TimelineContent>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-8 text-2xl font-semibold !leading-[110%] text-text-heading-light sm:text-4xl md:text-5xl">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.8,
                }}
              >
                {t("pages.about.heroSection.headline")}
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid gap-8 text-text-primary-light md:grid-cols-2"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs sm:text-base"
              >
                <p className="text-justify leading-relaxed">
                  {t("pages.about.heroSection.body1")}
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs sm:text-base"
              >
                <p className="text-justify leading-relaxed">
                  {t("pages.about.heroSection.body2")}
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 font-display text-2xl font-bold text-accent-primary"
              >
                {t("pages.about.heroSection.companyName")}
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-8 text-sm text-text-muted"
              >
                {t("pages.about.heroSection.role")}
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="font-medium text-text-heading-light">
                  {t("pages.about.heroSection.ctaPrompt")}
                </p>
              </TimelineContent>

              <TimelineContent
                as={Link}
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                to="/contact"
                className="ml-auto flex w-fit cursor-pointer items-center gap-2 rounded-base border border-border-light bg-text-heading-light px-5 py-3 font-semibold text-text-on-dark shadow-elevation transition-all duration-300 ease-in-out hover:gap-4 hover:bg-canvas-dark"
              >
                {t("pages.about.heroSection.ctaButton")}
                <ArrowRight aria-hidden />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
