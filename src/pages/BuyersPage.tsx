import { TrustMarqueeSection } from "@/sections/TrustMarqueeSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { EmbeddedPageProps } from "@/lib/page-shell";

export function BuyersPage({ embedded = false }: EmbeddedPageProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <TrustMarqueeSection
      fillViewport={embedded && !isMobile}
      embedded={embedded}
      id={embedded ? "buyers" : undefined}
    />
  );
}
