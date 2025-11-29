import { useContext, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

  return (
    <header className="relative">
      <div className="sm:px-16 lg:px-40 xl:px-52 2xl:px-60 pb-2">
        <div className="flex justify-between py-6 items-center">
          <Link to="/">
            <img src={logo} className="w-36" alt="Logo" />
          </Link>

          <div className="hidden md:block space-x-5">
            {!user ? (
              <>
                <Link
                  to="/clinic-register"
                  className="cursor-pointer border-2 border-[#1CBCCF] hover:bg-[#d4fbff] transition duration-300 rounded-full px-7 py-2"
                >
                  Apply as A clinic
                </Link>
                <Link
                  to="/login"
                  className="cursor-pointer border-2 border-[#1CBCCF] hover:bg-[#d4fbff] transition duration-300 rounded-full px-7 py-2"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="cursor-pointer border-2 border-[#1CBCCF] hover:bg-[#d4fbff] transition duration-300 rounded-full px-7 py-2"
                >
                  REGISTER
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="cursor-pointer border-2 border-[#1CBCCF] hover:bg-[#d4fbff] transition duration-300 rounded-full px-7 py-2"
                >
                  DASHBOARD
                </Link>
                <Link
                  onClick={logout}
                  className="cursor-pointer border-2 border-[#1CBCCF] hover:bg-[#d4fbff] transition duration-300 rounded-full px-7 py-2"
                >
                  LOGOUT
                </Link>
              </>
            )}
          </div>

          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden bg-white text-[#1CBCCF] py-2 px-3 justify-center items-center border border-[#1CBCCF] hover:border-[#038c9b] active:scale-90 cursor-pointer rounded-full transition duration-200"
          >
            <i
              className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} w-4`}
            ></i>
          </div>
        </div>

        <div className="relative hidden md:block z-10 border bg-white border-gray-100 rounded-md px-10 py-3 shadow-xl">
          <div className="flex items-center justify-between gap-10 text-[#808080]">
            <div className="flex gap-10">
              <Link
                to="/"
                className={`transition duration-300 ${
                  isActive("/") ? "text-[#1CBCCF]" : "hover:text-[#1CBCCF]"
                } `}
              >
                Home
              </Link>
              <Link
                to="/clinics"
                className={`transition duration-300 ${
                  isActive("/clinics")
                    ? "text-[#1CBCCF]"
                    : "hover:text-[#1CBCCF]"
                }`}
              >
                Clinics
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
          fixed top-0 left-0 md:hidden w-full h-full z-50 
          bg-white py-6 shadow-lg
          transition-all duration-300 ease-in-out
          ${
            menuOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full pointer-events-none"
          }
        `}
      >
        <div className="flex justify-between items-center px-5 pb-4 border-b border-gray-200">
          <Link to="/">
            <img src={logo} className="w-32" alt="Logo" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
          >
            <i className="fa-solid fa-xmark text-[#1CBCCF] text-xl"></i>
          </button>
        </div>

        {/* قائمة التنقل */}
        <div className="px-5 py-6">
          <div className="flex flex-col gap-4 mb-6">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`py-3 px-4 text-lg font-medium transition duration-300 ${
                isActive("/")
                  ? "text-[#1CBCCF] bg-blue-50 rounded-lg"
                  : "text-gray-700 hover:text-[#1CBCCF] hover:bg-gray-50 rounded-lg"
              }`}
            >
              Home
            </Link>
            <Link
              to="/clinics"
              onClick={() => setMenuOpen(false)}
              className={`py-3 px-4 text-lg font-medium transition duration-300 ${
                isActive("/clinics")
                  ? "text-[#1CBCCF] bg-blue-50 rounded-lg"
                  : "text-gray-700 hover:text-[#1CBCCF] hover:bg-gray-50 rounded-lg"
              }`}
            >
              Clinics
            </Link>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            {!user ? (
              <>
                <Link
                  to="/clinic-register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center cursor-pointer border-2 border-[#1CBCCF] text-[#1CBCCF] hover:bg-[#1CBCCF] hover:text-white transition duration-300 rounded-full px-6 py-3 font-medium"
                >
                  Apply as A clinic
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center cursor-pointer border-2 border-[#1CBCCF] text-[#1CBCCF] hover:bg-[#1CBCCF] hover:text-white transition duration-300 rounded-full px-6 py-3 font-medium"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center cursor-pointer border-2 border-[#1CBCCF] text-[#1CBCCF] hover:bg-[#1CBCCF] hover:text-white transition duration-300 rounded-full px-6 py-3 font-medium"
                >
                  REGISTER
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center cursor-pointer border-2 border-[#1CBCCF] text-[#1CBCCF] hover:bg-[#1CBCCF] hover:text-white transition duration-300 rounded-full px-6 py-3 font-medium"
                >
                  DASHBOARD
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-center cursor-pointer border-2 border-[#1CBCCF] text-[#1CBCCF] hover:bg-[#1CBCCF] hover:text-white transition duration-300 rounded-full px-6 py-3 font-medium"
                >
                  LOGOUT
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
