import * as React from "react";
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { footerNavLinks, navLinks } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const socialLinks = [
  { id: "facebook", icon: Facebook, labelKey: "footer.social.facebook" },
  { id: "twitter", icon: Twitter, labelKey: "footer.social.twitter" },
  { id: "instagram", icon: Instagram, labelKey: "footer.social.instagram" },
  { id: "linkedin", icon: Linkedin, labelKey: "footer.social.linkedin" },
] as const;

function FooterSection() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const contactLink = navLinks.find((link) => link.id === "contact");
  const quickLinks = contactLink ? [...footerNavLinks, contactLink] : footerNavLinks;

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="relative isolate z-10 border-t border-border-light bg-canvas text-text-heading-light transition-colors duration-300">
      <div className="container-main px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-text-heading-light">
              {t("footer.newsletter.heading")}
            </h2>
            <p className="mb-6 text-sm text-text-muted">
              {t("footer.newsletter.description")}
            </p>
            <form className="relative" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                name="newsletter-email"
                autoComplete="email"
                placeholder={t("footer.newsletter.emailPlaceholder")}
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full touch-manipulation"
                aria-label={t("footer.newsletter.subscribe")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div
              aria-hidden
              className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-accent-primary/10 blur-2xl"
            />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-text-heading-light">
              {t("footer.quickLinksHeading")}
            </h3>
            <nav className="space-y-2 text-sm" aria-label={t("footer.quickLinksHeading")}>
              {quickLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  className="block transition-colors hover:text-accent-primary"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-text-heading-light">
              {t("footer.contactHeading")}
            </h3>
            <address className="space-y-2 text-sm not-italic text-text-primary-light">
              <p>{t("footer.addressValue")}</p>
              <p>
                {t("footer.phoneLabel")}: {t("footer.phoneValue")}
              </p>
              <p>
                {t("footer.emailLabel")}: {t("footer.emailValue")}
              </p>
              <p>
                {t("footer.hoursLabel")}: {t("footer.hoursValue")}
              </p>
            </address>
          </div>

          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-text-heading-light">
              {t("footer.followHeading")}
            </h3>
            <TooltipProvider>
              <div className="mb-6 flex space-x-4">
                {socialLinks.map(({ id, icon: Icon, labelKey }) => (
                  <Tooltip key={id}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full" asChild>
                        <a href="#" aria-label={t(labelKey)}>
                          <Icon className="h-4 w-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t(labelKey)}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-light pt-8 text-center md:flex-row">
          <p className="text-sm text-text-muted">{t("footer.rights", { year })}</p>
          <nav className="flex gap-4 text-sm" aria-label={t("footer.legalNavLabel")}>
            <a href="#" className="transition-colors hover:text-accent-primary">
              {t("footer.legal.privacy")}
            </a>
            <a href="#" className="transition-colors hover:text-accent-primary">
              {t("footer.legal.terms")}
            </a>
            <a href="#" className="transition-colors hover:text-accent-primary">
              {t("footer.legal.cookies")}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { FooterSection };
