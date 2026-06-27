import { HeroSection } from "@/sections/HeroSection";
import { PlatformCarouselSection } from "@/sections/PlatformCarouselSection";
import { TrustMarqueeSection } from "@/sections/TrustMarqueeSection";
import { ApplicationsSection } from "@/sections/ApplicationsSection";
import { StatsSection } from "@/sections/StatsSection";
import { ProductsSection } from "@/sections/ProductsSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { VideoSection } from "@/sections/VideoSection";
import { CtaBannerSection } from "@/sections/CtaBannerSection";
import { ContactSection } from "@/sections/ContactSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PlatformCarouselSection />
      <TrustMarqueeSection />
      <ApplicationsSection />
      <StatsSection />
      <ProductsSection />
      <TestimonialsSection />
      <VideoSection />
      <CtaBannerSection />
      <ContactSection />
    </>
  );
}
