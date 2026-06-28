import { GalleryGridBlock } from "@/components/ui/gallery-grid-block-shadcnui";
import {
  viewportPageContainerClassName,
  viewportPageSectionClassName,
  type EmbeddedPageProps,
} from "@/lib/page-shell";

export function ProductsPage({ embedded = false }: EmbeddedPageProps) {
  return (
    <section
      id={embedded ? "products" : undefined}
      className={viewportPageSectionClassName(embedded)}
    >
      <div className={viewportPageContainerClassName(embedded)}>
        <GalleryGridBlock fillViewport />
      </div>
    </section>
  );
}
