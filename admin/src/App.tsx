import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecureRoute from "./SecureRoute";
import MainLayout from "./layout/MainLayout";
import LoginController from "./pages/login/LoginController";
import ProductPage from "./pages/data-management/DataManagement";
import ProductRegistrationForm from "./pages/data-management/add-product/AddProduct";
import FormLayout from "./layout/FormLayout";
import BrandForm from "./pages/data-management/add-brand/AddBrand";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginController />} />
        <Route element={<SecureRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/' element={<p>Hello World</p>} />
            <Route path='/data' element={<ProductPage />} />
            <Route path="/data/add-product" element={
              <FormLayout title="Tambah Produk" desc="Silakan masukkan detail produk untuk registrasi.">
                <ProductRegistrationForm />
              </FormLayout>
            } />
            <Route path="/data/add-brand" element={
              <FormLayout title="Tambah Merek" desc="Silakan masukkan detail merek untuk registrasi.">
                <BrandForm />
              </FormLayout>} 
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
