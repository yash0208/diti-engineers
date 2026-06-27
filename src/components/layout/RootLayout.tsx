import { Outlet, useLocation } from "react-router-dom";
import { ScrollProgress, SmoothScrollProvider } from "@/components/motion";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { cn } from "@/lib/utils";

const FOOTERLESS_ROUTES = ["/about", "/machinery", "/products", "/blog"] as const;
const LOCKED_SCROLL_ROUTES = ["/machinery", "/products", "/blog"] as const;

export function RootLayout() {
  const { pathname } = useLocation();
  const hideFooter = FOOTERLESS_ROUTES.some((route) => pathname === route);
  const lockScroll = LOCKED_SCROLL_ROUTES.some((route) => pathname === route);

  return (
    <SmoothScrollProvider>
      <ScrollToTop />
      <ScrollProgress />
      <NavBar />
      <main
        id="main-content"
        className={cn(
          "w-full min-w-0 bg-canvas",
          lockScroll && "h-[100svh] overflow-hidden",
        )}
      >
        <Outlet />
      </main>
      {hideFooter ? null : <Footer />}
    </SmoothScrollProvider>
  );
}
