import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecureRoute from "./SecureRoute";
import MainLayout from "./layout/MainLayout";
import LoginController from "./pages/login/LoginController";
import ProductPage from "./pages/product";
import { ProductRegistrationForm } from "./pages/product/add";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginController />} />
        <Route element={<SecureRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/' element={<p>Hello World</p>} />
            <Route path='/product' element={<ProductPage/>} />
            <Route path="/product/add" element={<ProductRegistrationForm/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
