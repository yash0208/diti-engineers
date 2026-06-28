import { cn } from "@/lib/utils";

export type EmbeddedPageProps = {
  embedded?: boolean;
};

export function viewportPageSectionClassName(embedded: boolean) {
  return cn(
    "bg-canvas",
    embedded
      ? "border-y border-border-light md:h-[100svh] md:overflow-hidden"
      : "h-[100svh] overflow-y-auto pt-nav md:overflow-hidden lg:pt-nav-lg",
  );
}

export function viewportPageContainerClassName(embedded: boolean) {
  return cn(
    "container-main flex flex-col py-6 md:h-full md:min-h-0 md:py-8 lg:py-10",
    embedded && "md:flex",
  );
}
