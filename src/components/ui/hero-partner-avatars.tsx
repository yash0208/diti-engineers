import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { partnerCompanies } from "@/data/partner-companies";
import { cn } from "@/lib/utils";

type HeroPartnerAvatarsProps = {
  className?: string;
};

export function HeroPartnerAvatars({ className }: HeroPartnerAvatarsProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col items-center gap-3 lg:items-start", className)}>
      <TooltipProvider delayDuration={200}>
        <div
          className="flex -space-x-3"
          role="list"
          aria-label={t("hero.partnersAriaLabel")}
        >
          {partnerCompanies.map((company) => (
            <Tooltip key={company.id}>
              <TooltipTrigger asChild>
                <div role="listitem">
                  <Avatar className="size-10 ring-2 ring-canvas">
                    <AvatarImage
                      src={company.image}
                      alt={t(`hero.partners.${company.id}`)}
                    />
                    <AvatarFallback className="bg-accent-muted text-accent-primary">
                      {company.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t(`hero.partners.${company.id}`)}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      <p className="max-w-sm text-sm text-text-muted">{t("hero.partnersLabel")}</p>
    </div>
  );
}
