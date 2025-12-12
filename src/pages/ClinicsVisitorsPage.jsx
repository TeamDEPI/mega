/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config.json";

export default function ClinicsVisitorsPage() {
  const [clinics, setClinics] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [totalPages, setTotalPages] = useState(1);

  const isFirstRunFilters = useRef(true);
  const isFirstRunPage = useRef(true);

  const fetchSpecialties = async () => {
    const res = await fetch(`${API_BASE_URL}/Appointments/specialties`);
    if (res.status !== 200) return;
    const data = await res.json();
    setSpecialties(data?.value || []);
  };

  const fetchClinics = async () => {
    let url;
    if (selectedSpec) {
      const specId = specialties.find((c) => c.name === selectedSpec)?.id;
      url = `${API_BASE_URL}/Appointments/specialty/clinics?SpecialtyId=${specId}&search=${search}&page=${page}&pageSize=${pageSize}`;
    } else {
      url = `${API_BASE_URL}/Appointments/clinics?search=${search}&page=${page}&pageSize=${pageSize}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setClinics(data?.list || []);
    setTotalPages(Math.ceil((data?.count || 1) / pageSize));
  };

  useEffect(() => {
    fetchSpecialties();
    fetchClinics();
  }, []);

  useEffect(() => {
    if (isFirstRunFilters.current) {
      isFirstRunFilters.current = false;
      return;
    }
    setPage(1);
    fetchClinics();
  }, [selectedSpec, search]);

  useEffect(() => {
    if (isFirstRunPage.current) {
      isFirstRunPage.current = false;
      return;
    }
    fetchClinics();
  }, [page]);
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Clinics</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search clinics..."
          className="border rounded-xl px-4 py-3 w-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSelectedSpec(e.target.value)}
        >
          <option value="">All Specialties</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Clinics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
            style={{ overflowWrap: "anywhere" }}
          >
            <div className="w-full h-32 flex items-center justify-center mb-5">
              <img
                src={clinic.logopath || "https://placehold.co/600x600.png"}
                alt="clinic-logo"
                className="h-full object-contain"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {clinic.name}
            </h2>

            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Email:</span> {clinic.email}
            </p>

            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Address:</span> {clinic.address}
            </p>

            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Phone:</span> {clinic.phone}
            </p>

            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Price:</span> {clinic.price} EGP
            </p>

            <p className="text-gray-600 text-sm mb-4">
              <span className="font-semibold">Specialty:</span>{" "}
              {clinic.medicalspecialty}
            </p>

            <Link
              to={`/clinic/${clinic.id}/doctors`}
              className="block text-center mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
            >
              Show Doctors
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          className="px-4 py-2 border rounded-xl bg-gray-100 disabled:opacity-40"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          className="px-4 py-2 border rounded-xl bg-gray-100 disabled:opacity-40"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
