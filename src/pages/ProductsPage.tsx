import { GalleryGridBlock } from "@/components/ui/gallery-grid-block-shadcnui";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  viewportPageContainerClassName,
  viewportPageSectionClassName,
  type EmbeddedPageProps,
} from "@/lib/page-shell";

export function ProductsPage({ embedded = false }: EmbeddedPageProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <section
      id={embedded ? "products" : undefined}
      className={viewportPageSectionClassName(embedded)}
    >
      <div className={viewportPageContainerClassName(embedded)}>
        <GalleryGridBlock fillViewport={embedded && !isMobile} />
      </div>
    </section>
  );
}
