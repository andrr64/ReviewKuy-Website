import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecureRoute from "./SecureRoute";
import MainLayout from "./layout/MainLayout";
import LoginController from "./pages/login/LoginController";
import DataManagementPage from "./pages/data-management/DataManagement";
import ProductRegistrationForm from "./pages/data-management/add-product/AddProduct";
import FormLayout from "./layout/FormLayout";
import AddBrandForm from "./pages/data-management/add-brand/AddBrand";
import ProductEditForm from "./pages/data-management/edit-product/EditProduct";
import EditBrandForm from "./pages/data-management/edit-brand/EditBrand";
import UserManagement from "./pages/user-management/UserManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginController />} />
        <Route element={<SecureRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/' element={<p>Hello World</p>} />
            <Route path='/data' element={<DataManagementPage />} />
            <Route path="/data/add-product" element={
              <FormLayout title="Tambah Produk" desc="Silakan masukkan detail produk untuk registrasi.">
                <ProductRegistrationForm />
              </FormLayout>
            } />
            <Route path="/data/edit-product/:id" element={
              <FormLayout title="Edit Produk" desc="Silakan ubah data produk untuk diperbaharui.">
                <ProductEditForm />
              </FormLayout>
            } />
            <Route path="/data/add-brand" element={
              <FormLayout title="Tambah Merek" desc="Silakan masukkan detail merek untuk registrasi.">
                <AddBrandForm />
              </FormLayout>}
            />
            <Route path="/data/edit-brand/:id" element={
              <FormLayout title="Edit Merek" desc="Silakan masukkan detail merek untuk diperbaharui.">
                <EditBrandForm />
              </FormLayout>}
            />
            <Route path="user" element={<UserManagement/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
