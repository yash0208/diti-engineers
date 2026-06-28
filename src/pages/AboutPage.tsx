import { AboutSection } from "@/components/ui/about-section";
import type { EmbeddedPageProps } from "@/lib/page-shell";

export function AboutPage({ embedded = false }: EmbeddedPageProps) {
  return <AboutSection embedded={embedded} id={embedded ? "about" : undefined} />;
}
