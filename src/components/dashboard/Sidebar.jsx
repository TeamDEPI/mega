import { MdDashboard } from "react-icons/md";
import { FaCalendarAlt, FaUserMd } from "react-icons/fa";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import logoImage from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { dashboardRoutes } from "../../config/routesConfig";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";

const Sidebar = ({ className = "" }) => {
  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const menuItems = dashboardRoutes.filter(
    (route) => route.roles.includes(user.usertype) && route.sidebar !== false
  );
  const handleLogout = async () => {
    console.log("Logging out...");
    await logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`h-screen overflow-y-auto w-64 flex flex-col fixed left-0 top-0 bg-white z-40 ${className}`}
    >
      <div className="m-4 flex mb-8">
        <Link className="w-32 cursor-pointer" to="/">
          <img
            src={logoImage}
            alt="Company Logo"
            className="w-full h-auto hover:opacity-80 transition-opacity duration-200"
          />
        </Link>
      </div>

      {/* NAVIGATION MENU SECTION */}
      <nav className="mt-4 flex-1">
        <ul className="px-2 space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="w-full flex items-center text-left px-3 py-3 text-sm font-medium text-gray-500 hover:bg-[#3178d5d4] hover:text-white rounded-lg transition-all duration-200 cursor-pointer"
                style={{ color: "inherit" }}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* إضافة: LOGOUT BUTTON */}
      <div className="p-3 mt-auto border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-2xl text-gray-500 hover:text-red-600 transition-all duration-200 cursor-pointer group"
        >
          <span className="mr-3">
            <IoLogOutOutline className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          </span>
          <span className="group-hover:font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
