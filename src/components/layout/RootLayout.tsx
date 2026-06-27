import { Outlet, useLocation } from "react-router-dom";
import { ScrollProgress, SmoothScrollProvider } from "@/components/motion";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export function RootLayout() {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/about";

  return (
    <SmoothScrollProvider>
      <ScrollToTop />
      <ScrollProgress />
      <NavBar />
      <main id="main-content" className="w-full min-w-0 bg-canvas">
        <Outlet />
      </main>
      {hideFooter ? null : <Footer />}
    </SmoothScrollProvider>
  );
}
