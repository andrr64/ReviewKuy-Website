import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import LoadingModal from "../components/modal/LoadingModal";

function MainLayout() {
  const loading = useSelector((state: RootState) => state.ui.loading); // pada dasarnya ini ngambil data

  return (
    <div>
      <LoadingModal loading={loading}/>
      <Sidebar />
      <div className="p-10 ml-64 min-h-screen bg-neutral-50"> {/* Tambahkan margin kiri sesuai lebar sidebar */}
        <Outlet />
      </div>
    </div>
  );
}


export default MainLayout;