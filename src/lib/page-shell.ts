import { cn } from "@/lib/utils";

export type EmbeddedPageProps = {
  embedded?: boolean;
};

export function viewportPageSectionClassName(embedded: boolean) {
  return cn(
    "h-[100svh] overflow-hidden bg-canvas",
    embedded ? "border-y border-border-light" : "pt-nav lg:pt-nav-lg",
  );
}

export function viewportPageContainerClassName(_embedded: boolean) {
  return cn(
    "container-main flex h-full min-h-0 flex-col py-6 md:py-8 lg:py-10",
  );
}
