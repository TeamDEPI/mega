import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaStethoscope,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaEye,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config.json";

const APPOINTMENTS_URL = API_BASE_URL + "/Appointments";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const token = localStorage.getItem("token");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const fetchDoctorAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${APPOINTMENTS_URL}/doctor-appointments`, {
        headers: authHeaders,
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        setAppointments(data.value || []);
      } else {
        setAppointments([]);
        console.error("Failed to fetch appointments:", data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    }
    setLoading(false);
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    setUpdatingStatus(appointmentId);
    try {
      const response = await fetch(`${APPOINTMENTS_URL}/update-status`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({
          appointmentId: appointmentId,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        // Update local state
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.appointmentid === appointmentId
              ? { ...apt, status: newStatus }
              : apt
          )
        );

        if (selectedAppointment?.appointmentid === appointmentId) {
          setSelectedAppointment((prev) => ({ ...prev, status: newStatus }));
        }

        alert(`Appointment marked as ${newStatus}`);
      } else {
        alert("Failed to update appointment status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating appointment status");
    }
    setUpdatingStatus(null);
  };

  const openAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      case "upcoming":
        return <FaHourglassHalf className="text-blue-500" />;
      default:
        return <FaHourglassHalf className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: timeString?.slice(0, 5) || "N/A",
    };
  };

  const isUpcomingAppointment = (appointment) => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      appointmentDate >= today &&
      appointment.status?.toLowerCase() === "upcoming"
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "upcoming") {
      return isUpcomingAppointment(appointment);
    } else {
      return !isUpcomingAppointment(appointment);
    }
  });

  const sortedAppointments = filteredAppointments.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
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
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaCalendarAlt className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Appointments
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage and view all your patient appointments
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-4 px-6 text-center font-medium text-lg border-b-2 transition ${
              activeTab === "upcoming"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming Appointments
          </button>
          <button
            onClick={() => setActiveTab("previous")}
            className={`flex-1 py-4 px-6 text-center font-medium text-lg border-b-2 transition ${
              activeTab === "previous"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Previous Appointments
          </button>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {sortedAppointments.length === 0 ? (
            <div className="text-center py-12">
              <FaCalendarAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} appointments
              </h3>
              <p className="text-gray-500">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming appointments scheduled."
                  : "No previous appointments found."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedAppointments.map((appointment) => {
                const { date, time } = formatDateTime(
                  appointment.date,
                  appointment.starttime
                );

                return (
                  <div
                    key={appointment.appointmentid}
                    className="p-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Appointment Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {appointment.patientname || "Patient"}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {getStatusIcon(appointment.status)}
                            {appointment.status || "Scheduled"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaClock className="w-4 h-4 text-blue-500" />
                            <span>
                              {date} at {time}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaUser className="w-4 h-4 text-green-500" />
                            <span>
                              Phone: {appointment.patientphone || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaStethoscope className="w-4 h-4 text-purple-500" />
                            <span>
                              Reason: {appointment.reason || "General Checkup"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaBuilding className="w-4 h-4 text-orange-500" />
                            <span>
                              Clinic: {appointment.clinicname || "Main Clinic"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => openAppointmentDetails(appointment)}
                          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          <FaEye className="w-4 h-4" />
                          View Details
                        </button>

                        {isUpcomingAppointment(appointment) && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.appointmentid,
                                  "completed"
                                )
                              }
                              disabled={
                                updatingStatus === appointment.appointmentid
                              }
                              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                            >
                              {updatingStatus === appointment.appointmentid ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              ) : (
                                <FaCheckCircle className="w-4 h-4" />
                              )}
                              Complete
                            </button>

                            <button
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.appointmentid,
                                  "cancelled"
                                )
                              }
                              disabled={
                                updatingStatus === appointment.appointmentid
                              }
                              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                            >
                              {updatingStatus === appointment.appointmentid ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              ) : (
                                <FaTimesCircle className="w-4 h-4" />
                              )}
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.length}
                </p>
              </div>
              <FaCalendarAlt className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(isUpcomingAppointment).length}
                </p>
              </div>
              <FaHourglassHalf className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    appointments.filter(
                      (a) => a.status?.toLowerCase() === "completed"
                    ).length
                  }
                </p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Appointment Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Patient Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Full Name
                    </label>
                    <p className="mt-1 text-gray-900 font-medium">
                      {selectedAppointment.patientname || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">
                      {selectedAppointment.patientemail || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <p className="mt-1 text-gray-900">
                      {selectedAppointment.patientphone || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Age & Gender
                    </label>
                    <p className="mt-1 text-gray-900">
                      {selectedAppointment.patientage
                        ? `${selectedAppointment.patientage} years`
                        : "Not specified"}
                      {selectedAppointment.patientgender
                        ? `, ${selectedAppointment.patientgender}`
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Appointment Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Appointment Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Date & Time
                    </label>
                    <p className="mt-1 text-gray-900 font-medium">
                      {
                        formatDateTime(
                          selectedAppointment.date,
                          selectedAppointment.starttime
                        ).date
                      }{" "}
                      at{" "}
                      {
                        formatDateTime(
                          selectedAppointment.date,
                          selectedAppointment.starttime
                        ).time
                      }
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <span
                      className={`mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedAppointment.status
                      )}`}
                    >
                      {getStatusIcon(selectedAppointment.status)}
                      {selectedAppointment.status || "Scheduled"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Clinic
                    </label>
                    <p className="mt-1 text-gray-900">
                      {selectedAppointment.clinicname || "Main Clinic"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Reason for Visit
                    </label>
                    <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedAppointment.reason ||
                        "General medical consultation"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Notes Section */}
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Medical Notes
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {selectedAppointment.notes ? (
                    <p className="text-gray-700">{selectedAppointment.notes}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      No medical notes recorded for this appointment.
                    </p>
                  )}
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

              {isUpcomingAppointment(selectedAppointment) && (
                <>
                  <button
                    onClick={() => {
                      updateAppointmentStatus(
                        selectedAppointment.appointmentid,
                        "completed"
                      );
                      setShowModal(false);
                    }}
                    disabled={
                      updatingStatus === selectedAppointment.appointmentid
                    }
                    className="flex-1 bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 transition disabled:opacity-50"
                  >
                    Mark as Completed
                  </button>

                  <button
                    onClick={() => {
                      updateAppointmentStatus(
                        selectedAppointment.appointmentid,
                        "cancelled"
                      );
                      setShowModal(false);
                    }}
                    disabled={
                      updatingStatus === selectedAppointment.appointmentid
                    }
                    className="flex-1 bg-red-600 text-white rounded-lg py-3 hover:bg-red-700 transition disabled:opacity-50"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
