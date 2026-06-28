import { HeroSection } from "@/sections/HeroSection";
import { HomeEmbeddedPagesSection } from "@/sections/HomeEmbeddedPagesSection";
import { PlatformCarouselSection } from "@/sections/PlatformCarouselSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PlatformCarouselSection />
      <HomeEmbeddedPagesSection />
    </>
  );
}
