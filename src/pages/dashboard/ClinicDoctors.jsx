import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaEdit,
  FaTrash,
  FaEye,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaStethoscope,
} from "react-icons/fa";
import Mimage from "../../assets/images/dashboard/M.jpg";
import Fimage from "../../assets/images/dashboard/F.jpg";
import { API_BASE_URL } from "../../config.json";

const API_URL = API_BASE_URL + "/ClinicManagement/doctors";

const ClinicDoctors = () => {
  const TOKEN = localStorage.getItem("token");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        const formatted =
          data?.value?.map((doc, index) => ({
            id: doc.userid,
            name: doc.fullname,
            email: doc.email,
            specialty: "General Doctor",
            phone: doc.phonenumber || "01000000000",
            rating: 4.5,
            status: doc.status,
            image: index % 2 === 0 ? Mimage : Fimage,
            joinDate: "2024-01-01",
            patientsCount: 120,
          })) || [];

        setDoctors(formatted);
      } catch (error) {
        console.log("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [TOKEN]);

  const openDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const deleteDoctor = (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
    }
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">({rating})</span>
    </div>
  );

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6 justify-center">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FaUserMd className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Clinic Doctors</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and view all clinic doctors
          </p>
        </div>
      </div>

      {/* Doctors List */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="
              bg-white rounded-xl shadow-sm border border-gray-200 
              p-5 hover:shadow-md transition duration-200
              w-full sm:w-[calc(50%-12px)] 
              lg:w-[calc(33.333%-16px)] 
              xl:w-[calc(25%-18px)] 
              max-w-sm
              shrink
            "
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-lg truncate">
                  {doctor.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <FaStethoscope className="w-4 h-4 text-blue-500 shrink" />
                  <span className="text-sm text-gray-600 truncate">
                    {doctor.specialty}
                  </span>
                </div>
                {renderStars(doctor.rating)}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaPhone className="w-4 h-4 text-green-500 shrink" />
                <span className="truncate">{doctor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaEnvelope className="w-4 h-4 text-blue-500 shrink" />
                <span className="truncate">{doctor.email}</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {doctor.status}
              </span>
              <span className="text-sm text-gray-500">
                {doctor.patientsCount} patients
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openDoctorDetails(doctor)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition"
              >
                <FaEye className="w-4 h-4" /> Details
              </button>

              {/* MOCK EDIT */}
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <FaEdit className="w-4 h-4" />
              </button>

              {/* MOCK DELETE */}
              <button
                onClick={() => deleteDoctor(doctor.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                Doctor Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-3"
                />
                <h3 className="font-bold text-gray-800 text-xl">
                  {selectedDoctor.name}
                </h3>
                <p className="text-blue-600 font-medium">
                  {selectedDoctor.specialty}
                </p>
                {renderStars(selectedDoctor.rating)}
              </div>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium truncate">
                      {selectedDoctor.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{selectedDoctor.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500">Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedDoctor.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedDoctor.status}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500">Join Date</p>
                    <p className="font-medium">{selectedDoctor.joinDate}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-gray-500">Total Patients</p>
                  <p className="font-semibold text-xl">
                    {selectedDoctor.patientsCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
                Edit Data (mock)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicDoctors;
