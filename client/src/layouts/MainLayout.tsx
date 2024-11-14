import { Outlet } from "react-router-dom"; // Impor Outlet
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Tempat untuk merender rute anak */}
      <Footer />
    </div>
  );
}
