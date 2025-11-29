import React from "react";

const ClinicCard = ({ clinic, onUpdateStatus }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">{clinic.name}</h2>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              statusColors[clinic.status]
            }`}
          >
            {clinic.status}
          </span>
        </div>

        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Specialty: </span>
          {clinic.medicalspecialtyname}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Email: </span>
          {clinic.email}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Phone: </span>
          {clinic.phone}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Address: </span>
          {`${clinic.addresscountry}, ${clinic.addressgovernrate}, ${clinic.addresscity}, ${clinic.addresslocation}`}
        </p>
      </div>

      {clinic.status === "pending" && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onUpdateStatus(clinic.id, "approve")}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition-all"
          >
            Approve
          </button>
          <button
            onClick={() => onUpdateStatus(clinic.id, "reject")}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition-all"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ClinicCard;
