import React, { useState, useMemo } from "react";

// Simple Tailwind Button Component
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Card wrapper like patient version
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default function ReceptionAppointments() {
  const [appointments] = useState([
    {
      id: 1,
      clinic: "Zahra Clinic",
      patient: "Manar Daef",
      doctor: "Dr. Ahmed Ali",
      date: "2025-12-10",
      time: "3:00 PM",
      status: "coming",
      details: "Follow‑up consultation — bring latest test results.",
    },
    {
      id: 2,
      clinic: "Care Plus",
      patient: "Omar Samir",
      doctor: "Dr. Mona Hassan",
      date: "2025-11-28",
      time: "1:00 PM",
      status: "completed",
      details: "Routine check-up.",
    },
    {
      id: 3,
      clinic: "Nile Health",
      patient: "Sara Mohamed",
      doctor: "Dr. Karim Salah",
      date: "2025-12-15",
      time: "10:00 AM",
      status: "coming",
      details: "Initial consultation — bring medical history.",
    },
  ]);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(null);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      const q = query.toLowerCase();
      return (
        a.clinic.toLowerCase().includes(q) ||
        a.patient.toLowerCase().includes(q) ||
        a.doctor.toLowerCase().includes(q) ||
        a.date.toLowerCase().includes(q) ||
        (a.time && a.time.toLowerCase().includes(q))
      );
    });
  }, [appointments, query, filter]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Clinic Appointments</h1>
      <p className="text-gray-500 text-sm mb-6">
        Reception view of all scheduled appointments
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patient, doctor, clinic, or date..."
          className="px-3 py-2 border rounded-xl text-sm w-full sm:w-72"
        />

        <div className="flex rounded-xl overflow-hidden border text-sm">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 ${
              filter === "all" ? "bg-gray-100 font-medium" : "bg-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("coming")}
            className={`px-4 py-2 ${
              filter === "coming"
                ? "bg-blue-500 text-white font-medium"
                : "bg-white"
            }`}
          >
            Coming
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 ${
              filter === "completed"
                ? "bg-green-500 text-white font-medium"
                : "bg-white"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid gap-4">
        {filteredAppointments.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No appointments found.
          </div>
        )}

        {filteredAppointments.map((app) => (
          <Card key={app.id}>
            <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold capitalize">
                    {app.clinic}
                  </h2>
                  <div className="text-sm text-gray-500">{app.date}</div>
                </div>

                <p className="text-sm text-gray-700 mt-1">
                  <strong>Patient:</strong> {app.patient}
                </p>
                <p className="text-sm text-gray-700">
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
                <div
                  className={`text-sm font-medium px-3 py-1 rounded-lg shadow-sm text-white ${
                    app.status === "coming" ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {app.status === "coming" ? "Coming" : "Completed"}
                </div>
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
                      <strong>Clinic:</strong> {app.clinic}
                    </p>
                    <p>
                      <strong>Patient:</strong> {app.patient}
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
