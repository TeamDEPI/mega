/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-100 ${className}`}>
    {children}
  </div>
);
import { API_BASE_URL } from "../../config.json";

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export default function PatientAppointments() {
  const TOKEN = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(null);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/Appointments/patient/upcomingappointments`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      const data = await res.json();
      if (data?.value) {
        const mapped = data.value.map((item) => ({
          id: item.appointmentid,
          clinic: item.clinic,
          doctor: item.doctor,
          date: item.date,
          time: `${item.starttime} - ${item.endtime}`,
          details: item.reason,
          type: "coming",
        }));
        setAppointments(mapped);
      }
    } catch (err) {
      console.log("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      if (filter !== "all" && app.type !== filter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        app.clinic.toLowerCase().includes(q) ||
        app.doctor.toLowerCase().includes(q) ||
        app.date.toLowerCase().includes(q) ||
        app.time.toLowerCase().includes(q)
      );
    });
  }, [appointments, filter, query]);

  const openDetailsModal = async (id) => {
    setLoadingDetails(true);
    setOpenModal(id);

    try {
      const res = await fetch(`${API_BASE_URL}/Appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const data = await res.json();
      setDetails(data);
    } catch (err) {
      console.log("Error fetching details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };
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

                <div className="mt-3 text-sm text-gray-600">{app.details}</div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <button
                  onClick={() => openDetailsModal(app.id)}
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

            {/* Details Modal */}
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

                  {loadingDetails ? (
                    <p className="text-center text-gray-500">Loading...</p>
                  ) : (
                    details && (
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Patient:</strong> {details.patientname}
                        </p>
                        <p>
                          <strong>Email:</strong> {details.patientemail}
                        </p>
                        <p>
                          <strong>Phone:</strong> {details.patientphone}
                        </p>
                        <p>
                          <strong>Date:</strong> {details.date}
                        </p>
                        <p>
                          <strong>Start:</strong> {details.starttime}
                        </p>
                        <p>
                          <strong>End:</strong> {details.endtime}
                        </p>
                        <p className="mt-3 text-gray-700">{details.reason}</p>
                      </div>
                    )
                  )}

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
    </div>
  );
}
