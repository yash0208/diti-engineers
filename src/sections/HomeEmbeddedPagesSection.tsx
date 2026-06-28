import type { ComponentType } from "react";

import { FooterSection } from "@/components/ui/footer-section";

import {
  HomeEmbeddedPageReveal,
  type HomeEmbeddedRevealMode,
} from "@/components/home/HomeEmbeddedPageReveal";
import { AboutPage } from "@/pages/AboutPage";
import { BlogPage } from "@/pages/BlogPage";
import { BuyersPage } from "@/pages/BuyersPage";
import { CertificatePage } from "@/pages/CertificatePage";
import { ContactPage } from "@/pages/ContactPage";
import { FactoryPage } from "@/pages/FactoryPage";
import { MachineryPage } from "@/pages/MachineryPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ServicesPage } from "@/pages/ServicesPage";

const embeddedNavPages: readonly {
  id: string;
  Page: ComponentType<{ embedded?: boolean }>;
  revealMode?: HomeEmbeddedRevealMode;
  layerIndex?: number;
}[] = [
  { id: "products", Page: ProductsPage },
  { id: "services", Page: ServicesPage },
  { id: "about", Page: AboutPage },
  { id: "blog", Page: BlogPage },
  { id: "machinery", Page: MachineryPage, layerIndex: 6 },
  { id: "certificate", Page: CertificatePage, revealMode: "none", layerIndex: 5 },
  { id: "buyers", Page: BuyersPage },
  { id: "factory", Page: FactoryPage, revealMode: "none" },
  { id: "contact", Page: ContactPage, revealMode: "fade" },
];

export function HomeEmbeddedPagesSection() {
  return (
    <>
      {embeddedNavPages.map(({ id, Page, revealMode, layerIndex }, index) => (
        <HomeEmbeddedPageReveal
          key={id}
          animationIndex={index}
          layerIndex={layerIndex ?? index + 1}
          revealMode={revealMode}
        >
          <Page embedded />
        </HomeEmbeddedPageReveal>
      ))}
      <FooterSection />
    </>
  );
}
