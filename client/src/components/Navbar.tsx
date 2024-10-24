import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RK_WhiteLogo } from "../assets/import";
import LoginModal from "../pages/login/LoginModal";  // Pastikan jalur import sudah benar
import RegisterModal from "../pages/register/RegisterModal";

function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false); // State untuk modal
    const [isRegModalOpen, setRegModalOpen] = useState(false);

    const handleLoginClick = () => setModalOpen(true); // Buka modal
    const handleRegClick = () => setRegModalOpen(true);

    const closeRegModal = () => setRegModalOpen(false);
    const closeLoginModal = () => {
        setModalOpen(false); // Tutup modal setelah animasi selesai
    };

    return (
        <>
            <nav className="bg-dark-purple text-white py-4">
                <div className="container mx-auto flex items-center justify-between w-4/5 gap-5">

                    {/* Logo */}
                    <a href="/">
                        <img src={RK_WhiteLogo} alt="Logo RK" className="h-10" />
                    </a>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-3xl ml-4">
                        <input
                            type="text"
                            placeholder="Cari gadget loe disini..."
                            className="w-full py-2 px-10 text-sm rounded-full text-black outline-none"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500">
                            <IoIosSearch />
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex text-sm font-medium items-center gap-6">
                        <li>
                            <a href="/" className="font-bold hover:underline">
                                Beranda
                            </a>
                        </li>
                        <li>
                            <a href="/kategori" className="font-bold hover:underline">
                                Kategori
                            </a>
                        </li>
                        <li>
                            <button onClick={handleRegClick} className="px-8 py-2 border border-white rounded-full text-white hover:text-dark-purple transition-300">
                                Daftar
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLoginClick} className="px-8 py-2 bg-white text-primary rounded-full hover:bg-gray-200 transition-300">
                                Login
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Modal untuk Login */}
            {isModalOpen && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
                    <LoginModal callback={closeLoginModal} regCallback={() => {
                        closeLoginModal();
                        handleRegClick();
                    }} />
                </div>
            )}
            {isRegModalOpen && (
                <div className={`fixed inset-0 flex items-center mt-10 justify-center bg-black bg-opacity-50 z-50`}>
                    <RegisterModal callback={closeRegModal} loginCallback={() => {
                        closeRegModal();
                        handleLoginClick();
                    }} />
                </div>
            )}

        </>
    );
}

export default Navbar;
