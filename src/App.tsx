import { ScrollProgress, SmoothScrollProvider } from "@/components/motion";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
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

export function App() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <NavBar />
      <main id="main-content" className="w-full min-w-0 bg-canvas">
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
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
