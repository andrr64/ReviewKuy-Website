// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/not-found/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HalamanKategori from "./pages/kategori/HalamanKategori";
import ScrollToTop from "./components/ScrollToTop"; // Import komponen ScrollToTop
import ProductByBrandPage from "./pages/product-by-brand/ProductByBrandPage";
import ProductPage from "./pages/product/ProductPage";
import { routes } from "./route";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Letakkan di sini */}
      <Navbar /> {/* Navbar tidak di dalam Routes agar tidak re-render */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path={routes.productBy.category} element={<HalamanKategori />} />
          <Route path={routes.productBy.brand} element={<ProductByBrandPage />} />
          <Route path={routes.product} element={<ProductPage />} />
        </Route>
      </Routes>
      <Footer /> {/* Footer di luar Routes agar tetap di setiap halaman */}
    </BrowserRouter>
  );
}

export default App;
