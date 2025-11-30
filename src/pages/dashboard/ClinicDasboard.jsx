import React, { useState, useMemo } from "react";
import { FaUserMd, FaUser, FaCheckCircle, FaClock } from "react-icons/fa";

// Simple Card component
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition p-6 flex items-center gap-4 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div
    className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ${className}`}
  >
    {children}
  </div>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function ClinicDashboard() {
  // Sample data
  const [doctors] = useState([
    "Dr. Ahmed Ali",
    "Dr. Mona Hassan",
    "Dr. Karim Salah",
  ]);
  const [patients] = useState([
    "Manar Daef",
    "Omar Samir",
    "Sara Mohamed",
    "Ali Hassan",
    "Mona Sami",
  ]);
  const [appointments] = useState([
    {
      id: 1,
      patient: "Manar Daef",
      doctor: "Dr. Ahmed Ali",
      status: "coming",
      date: "2025-12-10",
      time: "3:00 PM",
      details: "Follow-up consultation.",
    },
    {
      id: 2,
      patient: "Omar Samir",
      doctor: "Dr. Mona Hassan",
      status: "completed",
      date: "2025-11-28",
      time: "1:00 PM",
      details: "Routine check-up.",
    },
    {
      id: 3,
      patient: "Sara Mohamed",
      doctor: "Dr. Karim Salah",
      status: "coming",
      date: "2025-12-15",
      time: "10:00 AM",
      details: "Initial consultation.",
    },
    {
      id: 4,
      patient: "Ali Hassan",
      doctor: "Dr. Mona Hassan",
      status: "completed",
      date: "2025-11-20",
      time: "11:00 AM",
      details: "Follow-up.",
    },
    {
      id: 5,
      patient: "Mona Sami",
      doctor: "Dr. Ahmed Ali",
      status: "coming",
      date: "2025-12-18",
      time: "2:00 PM",
      details: "Consultation.",
    },
  ]);

  const [openModal, setOpenModal] = useState(null);

  const totalDoctors = doctors.length;
  const totalPatients = patients.length;
  const completedAppointments = useMemo(
    () => appointments.filter((a) => a.status === "completed").length,
    [appointments]
  );
  const upcomingAppointments = useMemo(
    () => appointments.filter((a) => a.status === "coming").length,
    [appointments]
  );

  const stats = [
    {
      label: "Doctors",
      value: totalDoctors,
      icon: <FaUserMd className="text-2xl text-blue-500" />,
    },
    {
      label: "Patients",
      value: totalPatients,
      icon: <FaUser className="text-2xl text-purple-500" />,
    },
    {
      label: "Completed Appointments",
      value: completedAppointments,
      icon: <FaCheckCircle className="text-2xl text-green-500" />,
    },
    {
      label: "Upcoming Appointments",
      value: upcomingAppointments,
      icon: <FaClock className="text-2xl text-yellow-500" />,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Clinic Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <div className="flex-shrink-0">{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                {stat.label}
              </h2>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Appointments List */}
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>
      <div className="grid gap-4">
        {appointments.map((app) => (
          <Card key={app.id}>
            <CardContent>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{app.patient}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Doctor:</strong> {app.doctor}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      app.status === "coming"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {app.date} — {app.time}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {app.details}
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2">
                <Button onClick={() => setOpenModal(app.id)}>
                  More Details
                </Button>
              </div>
            </CardContent>

            {/* Modal */}
            {openModal === app.id && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
                  <button
                    onClick={() => setOpenModal(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    Appointment Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Patient:</strong> {app.patient}
                    </p>
                    <p>
                      <strong>Doctor:</strong> {app.doctor}
                    </p>
                    <p>
                      <strong>Status:</strong> {app.status}
                    </p>
                    <p>
                      <strong>Date:</strong> {app.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {app.time}
                    </p>
                    <p className="mt-3 text-gray-700">{app.details}</p>
                  </div>
                  <div className="flex justify-center mt-6">
                    <Button onClick={() => setOpenModal(null)}>Close</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
