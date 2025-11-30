import React, { useState, useMemo } from "react";

// Simple Tailwind Button Component
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Simple Card wrapper
const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      type: "coming",
      clinic: "Zahra Clinic",
      doctor: "Dr. Ahmed Ali",
      date: "2025-12-10",
      time: "3:00 PM",
      details: "Follow‑up consultation — bring latest test results.",
    },
    {
      id: 2,
      type: "old",
      clinic: "Care Plus",
      doctor: "Dr. Mona Hassan",
      date: "2025-07-14",
      time: "11:30 AM",
      details: "Routine check-up.",
    },
    {
      id: 3,
      type: "coming",
      clinic: "Nile Health",
      doctor: "Dr. Karim Salah",
      date: "2025-12-22",
      time: "9:00 AM",
      details: "Initial consultation — bring medical history.",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(null);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      if (filter !== "all" && app.type !== filter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        app.clinic.toLowerCase().includes(q) ||
        app.doctor.toLowerCase().includes(q) ||
        app.date.toLowerCase().includes(q) ||
        (app.time && app.time.toLowerCase().includes(q))
      );
    });
  }, [appointments, filter, query]);

  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, cancelled: true } : a))
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Appointments</h1>
          <p className="text-sm text-gray-500">
            View, search and manage your appointments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by clinic, doctor, date or time"
            className="px-3 py-2 border rounded-xl text-sm w-64"
          />

          <div className="flex rounded-xl overflow-hidden border">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm ${
                filter === "all" ? "bg-gray-100 font-medium" : "bg-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("coming")}
              className={`px-4 py-2 text-sm ${
                filter === "coming"
                  ? "bg-blue-500 text-white font-medium"
                  : "bg-white"
              }`}
            >
              Coming
            </button>
            <button
              onClick={() => setFilter("old")}
              className={`px-4 py-2 text-sm ${
                filter === "old"
                  ? "bg-green-500 text-white font-medium"
                  : "bg-white"
              }`}
            >
              Old
            </button>
          </div>
        </div>
      </header>

      {/* Appointment Cards */}
      <div className="grid gap-4">
        {filteredAppointments.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No appointments found.
          </div>
        )}

        {filteredAppointments.map((app) => (
          <Card
            key={app.id}
            className="shadow-xl rounded-2xl hover:shadow-2xl transition"
          >
            <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold capitalize">
                    {app.clinic}
                  </h2>
                  <div className="text-sm text-gray-500">{app.date}</div>
                </div>

                <p className="text-sm text-gray-700 mt-1">
                  <strong>Doctor:</strong> {app.doctor}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Time:</strong> {app.time}
                </p>

                <div className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {app.details}
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <button
                  onClick={() => setOpenModal(app.id)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm shadow-sm"
                >
                  More Details
                </button>

                {app.type === "coming" && !app.cancelled && (
                  <Button
                    onClick={() => handleCancel(app.id)}
                    className="rounded-xl bg-red-500 hover:bg-red-600"
                  >
                    Cancel
                  </Button>
                )}

                {app.cancelled && (
                  <span className="text-red-500 text-sm font-medium">
                    Cancelled
                  </span>
                )}
              </div>
            </CardContent>

            {/* ✨ Cute Modal */}
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
                      <strong>Clinic:</strong> {app.clinic}
                    </p>
                    <p>
                      <strong>Doctor:</strong> {app.doctor}
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
                    <button
                      onClick={() => setOpenModal(null)}
                      className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-md"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Modal Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
