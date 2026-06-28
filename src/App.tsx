import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { AboutPage } from "@/pages/AboutPage";
import { BlogPage } from "@/pages/BlogPage";
import { BuyersPage } from "@/pages/BuyersPage";
import { CertificatePage } from "@/pages/CertificatePage";
import { ContactPage } from "@/pages/ContactPage";
import { FactoryPage } from "@/pages/FactoryPage";
import { HomePage } from "@/pages/HomePage";
import { MachineryPage } from "@/pages/MachineryPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ServicesPage } from "@/pages/ServicesPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="buyers" element={<BuyersPage />} />
          <Route path="factory" element={<FactoryPage />} />
          <Route path="machinery" element={<MachineryPage />} />
          <Route path="certificate" element={<CertificatePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
