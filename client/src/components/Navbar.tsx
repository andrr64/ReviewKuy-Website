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
import { CategoryModel } from "../model/category.model";
import { CategoryAPI } from "../api/category.api";
import { showAlertByResponseCode } from "../util/alert/alert";

function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRegModalOpen, setRegModalOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false); // State untuk dropdown kategori
    const dropdownRef = useRef<HTMLLIElement | null>(null);
    const categoryDropdownRef = useRef<HTMLLIElement | null>(null); // Ref untuk dropdown kategori
    const navigate = useNavigate();
    const location = useLocation();
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const fetchCategories = async () => {
        const response = await CategoryAPI.getCategories();
        if (response.status !== 200) {
            setCategories([]);
            showAlertByResponseCode(response.status);
        } else {
            setCategories(response.data.map((val: any) => new CategoryModel(val)));
        }
    }

    const handleLoginClick = () => setModalOpen(true);
    const handleRegClick = () => setRegModalOpen(true);
    const closeRegModal = () => setRegModalOpen(false);
    const closeLoginModal = () => setModalOpen(false);

    const userData = useSelector((state: RootState) => state.user.data);
    const dispatch = useDispatch();

    const handleHomeClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    const handleLogout = async () => {
        if (userData !== null) {
            if (await showPrompt('Logout', 'Anda yakin ingin keluar?')) {
                dispatch(logout());
                showSuccess('Berhasil', 'Logout berhasil!');
            }
        }
    }

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const toggleCategoryDropdown = () => setCategoryDropdownOpen(prev => !prev); // Fungsi untuk toggle dropdown kategori

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setCategoryDropdownOpen(false);
            }
        };
        fetchCategories();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="bg-dark-purple text-white py-2">
                <div className="container mx-auto flex items-center justify-between w-4/5 gap-5">

                    <a href="#" onClick={handleHomeClick}>
                        <img src={RK_WhiteLogo} alt="Logo RK" className="h-16 w-16" />
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

                    <ul className="flex items-center gap-4">
                        <li>
                            <button onClick={handleHomeClick}>
                                Beranda
                            </button>
                        </li>
                        <li className="relative" ref={categoryDropdownRef}>
                            <button onClick={toggleCategoryDropdown}>
                                Kategori
                            </button>
                            {isCategoryDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40 z-50">
                                    <ul className="p-2">
                                        {categories.length !== 0 && (
                                            categories.map((val) => {
                                                return <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                                                    setCategoryDropdownOpen(false);
                                                    navigate(`/kategori/${val.id}`)
                                                }}>
                                                    {val.name}
                                                </li>
                                            })
                                        )}
                                    </ul>
                                </div>
                            )}
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

                                    {isDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40 z-50">
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

            {isModalOpen && (
                <div className="fixed inset-0 pt-16 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <LoginModal closeCallback={closeLoginModal} callback={closeLoginModal} regCallback={() => {
                        closeLoginModal();
                        handleRegClick();
                    }} />
                </div>
            )}
            {isRegModalOpen && (
                <div className="fixed inset-0 pt-16 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
