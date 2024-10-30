import { useState } from "react";
import { RK_FullLogo } from "../assets/import";
import { LuLogOut, LuMonitorSmartphone } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { showPrompt } from "../util/alert";

const Sidebar = () => {
  const [dashboardExpanded, setDashboardExpanded] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const confirm = await showPrompt('Logout', 'Apakah anda yakin ingin keluar?');
      if (!confirm) {
        return;
      }
      const response = await axios.post('/api/admin/logout');
      if (response.status === 200) {
        navigate('/login')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error.message,
        confirmButtonColor: '#F44336'
      });
    }
  };

  const menuItems = [
    { name: "Home", icon: <IoHomeOutline />, path: "/" },
    { name: "Products", icon: <LuMonitorSmartphone />, path: "/product" },
  ];

  const dashboardSubItems = [
    { name: "Overview", path: "/" },
    { name: "Stats", path: "/" },
    { name: "Reports", path: "/" },
  ];

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen shadow-lg"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="my-10">
          <img className="h-16 mx-auto" src={RK_FullLogo} alt="Logo" />
        </div>
        <h1 className="text-xl font-bold my-2 text-center text-gray-900 dark:text-white">Admin Tools</h1>

        {/* Divider */}
        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <ul className="space-y-2 font-medium">
          {/* Dashboard Menu with Sub-menu */}
          <li>
            <button
              onClick={() => setDashboardExpanded(!dashboardExpanded)}
              className="flex items-center p-2 w-full text-left rounded-lg transition duration-300 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IoHomeOutline />
              <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              <span className="text-sm">
                {dashboardExpanded ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            {/* Animated Sub-menu */}
            <ul
              className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-500 ease-in-out ${dashboardExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              {dashboardSubItems.map((subItem, index) => (
                <li key={index}>
                  <Link
                    to={subItem.path}
                    className="flex items-center p-2 rounded-lg transition duration-300 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="flex-1">{subItem.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Main Menu Items */}
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center p-2 w-full text-left rounded-lg transition duration-300 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        {/* Logout Button */}
        <button
          onClick={logoutHandler}
          className="flex items-center p-2 w-full text-left rounded-lg transition duration-300 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <LuLogOut />
          <span className="flex-1 ms-3 font-medium whitespace-nowrap">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
