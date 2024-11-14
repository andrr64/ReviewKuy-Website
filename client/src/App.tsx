// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/not-found/NotFound";
import Navbar from "./components/Navbar"; // Pastikan Navbar terimport
import Footer from "./components/Footer"; // Pastikan Footer terimport

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar /> {/* Navbar tidak di dalam Routes agar tidak re-render */}
        <Routes>
          {/* Rute dengan MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer /> {/* Footer di luar Routes agar tetap di setiap halaman */}
      </BrowserRouter>
    </>
  );
}

export default App;
