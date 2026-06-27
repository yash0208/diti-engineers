import { GalleryGridBlock } from "@/components/ui/gallery-grid-block-shadcnui";

export function ProductsPage() {
  return (
    <section className="h-[100svh] overflow-hidden bg-canvas pt-nav lg:pt-nav-lg">
      <div className="container-main flex h-full min-h-0 flex-col py-6 md:py-8 lg:py-10">
        <GalleryGridBlock fillViewport />
      </div>
    </section>
  );
}
