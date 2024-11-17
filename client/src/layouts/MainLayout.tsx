import { Outlet } from "react-router-dom"; // Ini adalah tempat dimana komponen halaman lain akan dimuat

const MainLayout = () => {
  return (
    <>
      <main className="bg-main py-5 lg:px-20 px-16 xl:px-60 ">
        <Outlet /> {/* Konten halaman spesifik akan muncul di sini */}
      </main>
    </>
  );
};

export default MainLayout;
