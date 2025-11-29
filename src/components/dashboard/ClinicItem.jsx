import React from "react";
import { Link } from "react-router-dom";

const ClinicItem = ({ clinic, onToggleStatus }) => {
  return (
    <div
      className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-200"
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800">{clinic.name}</h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            clinic.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {clinic.status === "active" ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Email:</span> {clinic.email}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Phone:</span> {clinic.phone}
      </p>

      <p className="text-gray-600 mb-3">
        <span className="font-semibold">Address:</span> {clinic.addresscity},{" "}
        {clinic.addressgovernrate}
      </p>

      <button
        onClick={() => onToggleStatus(clinic.id, clinic.status)}
        className={`w-full py-2 rounded-xl font-semibold transition-all mb-3 ${
          clinic.status === "active"
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {clinic.status === "active" ? "Deactivate" : "Activate"}
      </button>
      <Link
        to={`/dashboard/clinics/${clinic.id}/admins`}
        className="block w-full text-center py-2 rounded-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white"
      >
        Manage
      </Link>
    </div>
  );
};

export default ClinicItem;
