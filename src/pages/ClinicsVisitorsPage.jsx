/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../config.json";

export default function ClinicsVisitorsPage() {
  const [clinics, setClinics] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [search, setSearch] = useState("");

  const fetchSpecialties = async () => {
    const res = await fetch(`${API_BASE_URL}/Appointments/specialties`);
    if (res.status !== 200) return;
    const data = await res.json();
    setSpecialties(data?.value || []);
  };

  const fetchClinics = async () => {
    const url = `${API_BASE_URL}/Appointments/${
      selectedSpec
        ? `specialty/clinics?SpecialtyId=${
            specialties.find((c) => c.name === selectedSpec)?.id
          }`
        : "clinics"
    }`;
    const res = await fetch(url);
    const data = await res.json();
    setClinics(data?.list || []);
  };

  useEffect(() => {
    fetchSpecialties();
    fetchClinics();
  }, []);

  useEffect(() => {
    fetchClinics();
  }, [selectedSpec]);

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Clinics</h1>

      {/* Search + Filter */}
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
        {filteredClinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
            style={{ overflowWrap: "anywhere" }}
          >
            {/* Logo */}
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
    </div>
  );
}
