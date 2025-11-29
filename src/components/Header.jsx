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

            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="text-[#1CBCCF]"
              >
                <path
                  fill="currentColor"
                  d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
          absolute top-20 left-1/2 md:hidden -translate-x-1/2 rounded-b-xl w-[90%] z-20 
          bg-white text-[#1CBCCF] py-4 space-y-4 shadow-lg
          transition-all duration-300 origin-top
          ${
            menuOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="flex flex-col gap-2 text-center">
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
            className={`transition duration-300  ${
              isActive("/clinics") ? "text-[#1CBCCF]" : "hover:text-[#1CBCCF]"
            }`}
          >
            Clinics
          </Link>
        </div>

        <div className="flex justify-center gap-4 pt-3 border-t border-gray-200 flex-wrap">
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
      </div>
    </header>
  );
}

export default Header;
