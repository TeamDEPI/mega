// import React, { useState, useEffect } from "react";
// import ClinicItem from "../../components/dashboard/ClinicItem";
// import { API_BASE_URL } from "../../config.json";

// const ClinicsPage = () => {
//   const [clinics, setClinics] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const clinicsPerPage = 6;
//   const TOKEN = localStorage.getItem("token");
//   const fetchClinics = async () => {
//     try {
//       const res = await fetch(API_BASE_URL + "/clinic/system-clinics", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();
//       setClinics(data?.list || []);
//     } catch (err) {
//       console.error("Error fetching clinics:", err);
//     }
//   };

//   useEffect(() => {
//     fetchClinics();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleToggleStatus = async (id, currentStatus) => {
//     const endpoint =
//       API_BASE_URL +
//       `/clinic/${
//         currentStatus === "active" ? "deactivate" : "activate"
//       }-clinic?clinicId=${id}`;

//     try {
//       const res = await fetch(endpoint, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.ok) {
//         setClinics((prev) =>
//           prev.map((clinic) =>
//             clinic.id === id
//               ? {
//                   ...clinic,
//                   status: clinic.status === "active" ? "inactive" : "active",
//                 }
//               : clinic
//           )
//         );
//       } else {
//         console.error("Failed to toggle clinic status");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredClinics = clinics.filter((clinic) =>
//     clinic.name.toLowerCase().includes(search.trim().toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredClinics.length / clinicsPerPage);
//   const startIndex = (currentPage - 1) * clinicsPerPage;
//   const currentClinics = filteredClinics.slice(
//     startIndex,
//     startIndex + clinicsPerPage
//   );

//   const handleNext = () =>
//     currentPage < totalPages && setCurrentPage(currentPage + 1);

//   const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//         Clinics Management
//       </h1>

//       {/* Search bar */}
//       <div className="flex justify-center mb-8">
//         <input
//           type="text"
//           placeholder="Search clinics..."
//           className="w-full sm:w-1/2 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       {/* Clinics list */}
//       {currentClinics.length > 0 ? (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentClinics.map((clinic) => (
//             <ClinicItem
//               key={clinic.id}
//               clinic={clinic}
//               onToggleStatus={handleToggleStatus}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No clinics found.
//         </p>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-center items-center mt-10 gap-3">
//         <button
//           onClick={handlePrev}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             currentPage === 1
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : "bg-blue-500 text-white hover:bg-blue-600"
//           }`}
//         >
//           Previous
//         </button>

//         <span className="font-semibold text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             currentPage === totalPages
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : "bg-blue-500 text-white hover:bg-blue-600"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClinicsPage;

import React, { useState, useEffect } from "react";
import ClinicItem from "../../components/dashboard/ClinicItem";
import { API_BASE_URL } from "../../config.json";

const ClinicsPage = () => {
  const [clinics, setClinics] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 6;

  const TOKEN = localStorage.getItem("token");

  const fetchClinics = async (page = 1, value = "") => {
    try {
      const url =
        API_BASE_URL +
        `/clinic/system-clinics?searchType=name&valueToSearch=${value}&pageIndex=${page}&pageSize=${pageSize}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setClinics(data?.list || []);
      setTotalCount(data?.count || 0);
    } catch (err) {
      console.error("Error fetching clinics:", err);
    }
  };

  // Run on first load + page change + search change
  useEffect(() => {
    fetchClinics(currentPage, search.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1); // Reset to first page
    fetchClinics(1, value.trim());
  };

  const handleNext = () => {
    const totalPages = Math.ceil(totalCount / pageSize);
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const endpoint =
      API_BASE_URL +
      `/clinic/${
        currentStatus === "active" ? "deactivate" : "activate"
      }-clinic?clinicId=${id}`;

    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        fetchClinics(currentPage, search.trim()); // Reload page
      } else {
        console.error("Failed to toggle clinic status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Clinics Management
      </h1>

      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search clinics..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Clinics list */}
      {clinics.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map((clinic) => (
            <ClinicItem
              key={clinic.id}
              clinic={clinic}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No clinics found.
        </p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-3">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        <span className="font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClinicsPage;
