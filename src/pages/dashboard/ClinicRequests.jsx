import React, { useState, useEffect } from "react";
import ClinicCard from "../../components/dashboard/ClinicCard";

import { API_BASE_URL } from "../../config.json";

const ClinicRequests = () => {
  const TOKEN = localStorage.getItem("token");
  const [clinics, setClinics] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const clinicsPerPage = 20;

  const fetchClinics = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/clinic/clinics-requests?pageIndex=${currentPage}&pageSize=${clinicsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${TOKEN}`,
            "Accept-Language": "en",
          },
        }
      );

      const json = await res.json();

      setClinics(json?.list || []);
      setTotalCount(json?.count || 0);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchClinics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const filteredClinics = clinics.filter((clinic) => {
    const matchesStatus =
      statusFilter === "all" || clinic.status === statusFilter;

    const matchesSearch =
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(totalCount / clinicsPerPage);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/clinic/approve-clinic-request?clinicId=${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "Accept-Language": "en",
          },
        }
      );

      const data = await res.json();

      if (data.statusCode !== 200) {
        alert(data.message);
        return;
      }

      setClinics((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c))
      );
    } catch (err) {
      console.log(err);
      alert("Approval error");
    }
  };

  const handleReject = async (id) => {
    const res = await fetch(
      `${API_BASE_URL}/clinic/reject-clinic-request?clinicId=${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }
    );

    const data = await res.json();

    if (data.statusCode !== 200) {
      alert(data.message);
      return;
    }
    setClinics((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c))
    );
  };

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Clinic Requests to Join
      </h1>

      {/* 🔎 Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="w-full sm:w-1/4 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* 🏥 Clinic Cards */}
      {filteredClinics.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <ClinicCard
              key={clinic.id}
              clinic={clinic}
              onUpdateStatus={(id, action) => {
                console.log(id, action);
                if (action === "approve") handleApprove(id);
                if (action === "reject") handleReject(id);
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No matching results found
        </p>
      )}

      {/* 📄 Pagination */}
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
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === totalPages
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

export default ClinicRequests;
