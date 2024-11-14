import { Outlet } from "react-router-dom"; // Ini adalah tempat dimana komponen halaman lain akan dimuat

const MainLayout = () => {
  return (
    <>
      <main>
        <Outlet /> {/* Konten halaman spesifik akan muncul di sini */}
      </main>
    </>
  );
};

export default MainLayout;
