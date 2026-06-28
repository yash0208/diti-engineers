import { TrustMarqueeSection } from "@/sections/TrustMarqueeSection";
import type { EmbeddedPageProps } from "@/lib/page-shell";

export function BuyersPage({ embedded = false }: EmbeddedPageProps) {
  return <TrustMarqueeSection fillViewport embedded={embedded} id={embedded ? "buyers" : undefined} />;
}
