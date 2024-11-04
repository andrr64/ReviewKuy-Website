import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
    return (
      <div>
        <Sidebar />
        <div className="p-10 ml-64 min-h-screen bg-neutral-50"> {/* Tambahkan margin kiri sesuai lebar sidebar */}
          <Outlet />
        </div>
      </div>
    );
  }
  

export default MainLayout;