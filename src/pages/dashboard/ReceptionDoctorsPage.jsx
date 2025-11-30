import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaPhone,
  FaEnvelope,
  FaStethoscope,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config.json";

const CLINIC_URL = API_BASE_URL + "/ClinicManagement";
const APPOINTMENTS_URL = API_BASE_URL + "/Appointments";

export default function ReceptionDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [doctorSchedules, setDoctorSchedules] = useState({});
  const [loadingSchedules, setLoadingSchedules] = useState({});

  const token = localStorage.getItem("token");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchClinicDoctors();
  }, []);

  const fetchClinicDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${CLINIC_URL}/doctors`, {
        headers: authHeaders,
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        const formattedDoctors =
          data.value?.map((doctor) => ({
            id: doctor.userid,
            name: doctor.fullname,
            email: doctor.email,
            phone: doctor.phonenumber || "Not provided",
            specialty: doctor.specialization || "General Doctor",
            status: doctor.status || "Available",
            image: doctor.image || null,
            clinic: doctor.clinicname || "Main Clinic",
          })) || [];

        setDoctors(formattedDoctors);

        // Fetch schedules for all doctors
        formattedDoctors.forEach((doctor) => {
          fetchDoctorSchedules(doctor.id);
        });
      } else {
        setDoctors([]);
        console.error("Failed to fetch doctors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
    setLoading(false);
  };

  const fetchDoctorSchedules = async (doctorId) => {
    setLoadingSchedules((prev) => ({ ...prev, [doctorId]: true }));
    try {
      const response = await fetch(
        `${APPOINTMENTS_URL}/doctor-schedules/${doctorId}`,
        {
          headers: authHeaders,
        }
      );

      const data = await response.json();

      if (data.statusCode === 200) {
        setDoctorSchedules((prev) => ({
          ...prev,
          [doctorId]: data.value || [],
        }));
      }
    } catch (error) {
      console.error(`Error fetching schedules for doctor ${doctorId}:`, error);
      setDoctorSchedules((prev) => ({
        ...prev,
        [doctorId]: [],
      }));
    }
    setLoadingSchedules((prev) => ({ ...prev, [doctorId]: false }));
  };

  const openDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const getScheduleSummary = (schedules) => {
    if (!schedules || schedules.length === 0) {
      return "No schedule available";
    }

    // Group by day
    const scheduleByDay = {};
    schedules.forEach((slot) => {
      const day = new Date(slot.date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!scheduleByDay[day]) {
        scheduleByDay[day] = [];
      }
      scheduleByDay[day].push(slot);
    });

    // Create summary
    const summary = Object.entries(scheduleByDay)
      .map(([day, slots]) => {
        const times = slots
          .map(
            (slot) =>
              `${slot.starttime?.slice(0, 5) || "N/A"} - ${
                slot.endtime?.slice(0, 5) || "N/A"
              }`
          )
          .join(", ");
        return `${day}: ${times}`;
      })
      .join(" | ");

    return summary.length > 100 ? summary.substring(0, 100) + "..." : summary;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "busy":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaUserMd className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Clinic Doctors</h1>
          </div>
          <p className="text-gray-600 text-lg">
            View all doctors details and their availability
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-200"
            >
              {/* Doctor Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {doctor.name?.charAt(0) || "D"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg truncate">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FaStethoscope className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600 truncate">
                        {doctor.specialty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      doctor.status
                    )}`}
                  >
                    {doctor.status}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span>{doctor.clinic}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <FaPhone className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">
                    {doctor.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">
                    {doctor.email}
                  </span>
                </div>
              </div>

              {/* Schedule Summary */}
              <div className="p-6 bg-gray-50 rounded-b-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Availability
                  </span>
                </div>

                {loadingSchedules[doctor.id] ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600"></div>
                    Loading schedule...
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {getScheduleSummary(doctorSchedules[doctor.id])}
                  </p>
                )}
              </div>

              {/* View Details Button */}
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => openDoctorDetails(doctor)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                >
                  <FaUserMd className="w-4 h-4" />
                  View Full Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {doctors.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaUserMd className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Doctors Found
            </h3>
            <p className="text-gray-500">
              There are no doctors currently registered in the clinic.
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Doctors
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctors.length}
                </p>
              </div>
              <FaUserMd className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    doctors.filter(
                      (d) => d.status?.toLowerCase() === "available"
                    ).length
                  }
                </p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Busy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    doctors.filter((d) => d.status?.toLowerCase() === "busy")
                      .length
                  }
                </p>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  With Schedule
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    Object.values(doctorSchedules).filter(
                      (schedules) => schedules && schedules.length > 0
                    ).length
                  }
                </p>
              </div>
              <FaCalendarAlt className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Details Modal */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Doctor Details - {selectedDoctor.name}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Doctor Information */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {selectedDoctor.name?.charAt(0) || "D"}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-blue-100">{selectedDoctor.specialty}</p>
                    <div className="mt-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedDoctor.status === "Available"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {selectedDoctor.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact & Schedule */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaPhone className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedDoctor.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaEnvelope className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium truncate">
                            {selectedDoctor.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaMapMarkerAlt className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-sm text-gray-600">Clinic</p>
                          <p className="font-medium">{selectedDoctor.clinic}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaStethoscope className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-600">Specialty</p>
                          <p className="font-medium">
                            {selectedDoctor.specialty}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Schedule & Availability
                    </h3>

                    {loadingSchedules[selectedDoctor.id] ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">
                          Loading schedule...
                        </p>
                      </div>
                    ) : doctorSchedules[selectedDoctor.id]?.length > 0 ? (
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {doctorSchedules[selectedDoctor.id].map(
                          (slot, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-4">
                                <FaCalendarAlt className="w-4 h-4 text-purple-500" />
                                <span className="font-medium">
                                  {new Date(slot.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "short",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaClock className="w-4 h-4 text-blue-500" />
                                <span>
                                  {slot.starttime?.slice(0, 5) || "N/A"} -{" "}
                                  {slot.endtime?.slice(0, 5) || "N/A"}
                                </span>
                                <span
                                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                    slot.isbooked
                                      ? "bg-red-100 text-red-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {slot.isbooked ? "Booked" : "Available"}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <FaCalendarAlt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">
                          No schedule available for this doctor.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-3 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
