import { useTranslation } from "react-i18next";
import { CountUp, RevealOnScroll } from "@/components/motion";
import { SectionHeader, SplitStat } from "@/components/ui";
import { businessProfile } from "@/data/profile";

type StatKey = "years" | "turnover" | "gstYear" | "products";

type Stat = {
  key: StatKey;
  to: number;
  prefix?: string;
  suffix?: string;
};

export function StatsSection() {
  const { t } = useTranslation();

  const productLines = businessProfile.productsAndServices.categories.length;
  const turnoverMid = 15;

  const stats: Stat[] = [
    { key: "years", to: businessProfile.businessPersona.yearsInBusiness },
    { key: "turnover", to: turnoverMid, prefix: "₹", suffix: " Cr" },
    { key: "gstYear", to: 2017 },
    { key: "products", to: productLines },
  ];

  return (
    <section id="stats" className="border-y border-border-light bg-canvas section-padding">
      <div className="container-main">
        <RevealOnScroll>
          <SectionHeader
            eyebrow={t("stats.eyebrow")}
            headlineLine1={t("stats.headlineLine1")}
            headlineLine2={t("stats.headlineLine2")}
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <RevealOnScroll key={stat.key} delay={0.06 * idx}>
              <SplitStat
                light
                value={
                  <>
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <CountUp
                      to={stat.to}
                      duration={1.4}
                      format={
                        stat.key === "gstYear"
                          ? (n) => Math.round(n).toString()
                          : undefined
                      }
                    />
                    {stat.suffix && (
                      <span className="text-3xl text-text-muted md:text-4xl">
                        {stat.suffix}
                      </span>
                    )}
                  </>
                }
                suffix={t(`stats.items.${stat.key}.suffix`)}
                label={t(`stats.items.${stat.key}.label`)}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
