import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
    return (
      <div>
        <Sidebar />
        <div className="p-4 ml-64"> {/* Tambahkan margin kiri sesuai lebar sidebar */}
          <Outlet />
        </div>
      </div>
    );
  }
  

export default MainLayout;