import profileImage from "../../assets/images/dashboard/logo.png";
import { useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header({ className, onToggleSidebar }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedYear = searchParams.get("year") || "2024";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const years = ["2024", "2023", "2022", "2021", "2020"];

  const handleYearChange = (year) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("year", year);
    setSearchParams(newParams);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`bg-[#FEFEFE] p-2 sm:p-3 lg:p-4 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0">
        {/* TITLE SECTION */}
        <div className="flex items-center justify-between lg:flex-1">
          {/* HAMBURGER MENU - Mobile only */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* PAGE TITLE */}
          <div className="text-right md:text-left flex-1 px-4">
            <h1 className=" text-xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-400 font-medium text-xs sm:text-sm lg:text-base mt-1">
              12:15 PM at 19th November 2020
            </p>
          </div>
        </div>

        {/* PROFILE SECTION - بدون سيرش بار وبدون أيقونة الهوم */}
        <div className="flex items-center lg:justify-end gap-4 w-full lg:w-auto">
          {/* YEAR DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-all duration-200 whitespace-nowrap"
            >
              <span className="text-sm font-medium text-gray-700">
                {selectedYear}
              </span>
              <svg
                className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-24 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {years.map((year) => (
                  <div
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`px-3 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                      selectedYear === year
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PROFILE IMAGE */}
          <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden cursor-pointer shrink-0 border-2 border-white shadow-sm hover:border-blue-200 hover:scale-105 transition-all duration-200 group">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
