import { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { RK_WhiteLogo } from "../assets/import";
import LoginModal from "../pages/login/LoginModal";
import RegisterModal from "../pages/register/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate, useLocation } from "react-router-dom";
import { showPrompt, showSuccess } from "../util/alert/show_alert";
import { logout } from "../state/user/userState";

function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Referensi untuk dropdown menu
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => setModalOpen(true);
    const handleRegClick = () => setRegModalOpen(true);
    const closeRegModal = () => setRegModalOpen(false);
    const closeLoginModal = () => setModalOpen(false);

    const userData = useSelector((state: RootState) => state.user.data);
    const dispatch = useDispatch();

    // Fungsi untuk menangani klik Beranda
    const handleHomeClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };
    const handleLogout = async() => {
        if (userData !== null){
            if (await showPrompt('Logout', 'Anda yakin ingin keluar?')){
                dispatch(logout());
                showSuccess('Berhasil', 'Logout berhasil!');
            }
        }
    }
    
    // Fungsi untuk toggle dropdown menu
    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    // Menutup dropdown jika klik di luar dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        // Menambahkan event listener untuk klik luar
        document.addEventListener('mousedown', handleClickOutside);

        // Menghapus event listener saat komponen unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="bg-dark-purple text-white py-4">
                <div className="container mx-auto flex items-center justify-between w-4/5 gap-5">

                    <a href="#" onClick={handleHomeClick}>
                        <img src={RK_WhiteLogo} alt="Logo RK" className="h-10" />
                    </a>

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

                    <ul className="flex text-sm font-medium items-center gap-4">
                        <li>
                            <button onClick={handleHomeClick} className="font-bold hover:underline">
                                Beranda
                            </button>
                        </li>
                        <li>
                            <a href="/kategori" className="font-bold hover:underline">
                                Kategori
                            </a>
                        </li>
                        {userData === null ? (
                            <>
                                <li>
                                    <button onClick={handleRegClick} className="px-8 font-semibold py-2 border-2 border-white rounded-full hover:text-dark-purple text-white hover:bg-white hover:text-dark-purple transition-300">
                                        Daftar
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleLoginClick} className="px-8 font-semibold py-2 bg-white text-primary rounded-full hover:bg-gray-500 hover:text-white transition-300">
                                        Login
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="border-l-2 border-white"></li>
                                <li className="relative" ref={dropdownRef}>
                                    <div className="border-l-2 border-white h-full flex items-center pl-3 gap-2 cursor-pointer" onClick={toggleDropdown}>
                                        <img className="h-8 w-8 rounded-full" src={userData.avatar} alt="" />
                                        <p className="font-semibold">{userData.name}</p>
                                    </div>

                                    {/* Dropdown menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
                                            <ul className="p-2">
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                                                <li onClick={handleLogout} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Modal untuk Login */}
            {isModalOpen && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
                    <LoginModal closeCallback={closeLoginModal} callback={closeLoginModal} regCallback={() => {
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
