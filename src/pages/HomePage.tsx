import { HeroSection } from "@/sections/HeroSection";
import { PlatformCarouselSection } from "@/sections/PlatformCarouselSection";
import { ApplicationsSection } from "@/sections/ApplicationsSection";
import { StatsSection } from "@/sections/StatsSection";
import { ProductsSection } from "@/sections/ProductsSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { CtaBannerSection } from "@/sections/CtaBannerSection";
import { ContactSection } from "@/sections/ContactSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PlatformCarouselSection />
      <ApplicationsSection />
      <StatsSection />
      <ProductsSection />
      <TestimonialsSection />
      <CtaBannerSection />
      <ContactSection />
    </>
  );
}
