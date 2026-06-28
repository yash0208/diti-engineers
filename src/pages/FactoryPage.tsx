import { VideoSection } from "@/sections/VideoSection";
import type { EmbeddedPageProps } from "@/lib/page-shell";

export function FactoryPage({ embedded = false }: EmbeddedPageProps) {
  return <VideoSection standalone embedded={embedded} id={embedded ? "factory" : undefined} />;
}
