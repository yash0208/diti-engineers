import { Outlet, useLocation } from "react-router-dom";
import { ScrollProgress, SmoothScrollProvider } from "@/components/motion";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { cn } from "@/lib/utils";

export function RootLayout() {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/about" || pathname === "/machinery";

  return (
    <SmoothScrollProvider>
      <ScrollToTop />
      <ScrollProgress />
      <NavBar />
      <main
        id="main-content"
        className={cn(
          "w-full min-w-0 bg-canvas",
          pathname === "/machinery" && "h-[100svh] overflow-hidden",
        )}
      >
        <Outlet />
      </main>
      {hideFooter ? null : <Footer />}
    </SmoothScrollProvider>
  );
}
