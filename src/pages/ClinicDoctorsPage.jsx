/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config.json";
const BASE_URL = API_BASE_URL + "/Appointments";

export default function ClinicDoctorsPage() {
  const { id: clinicId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const authHeaders = token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : {};

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  async function fetchDoctors() {
    setLoadingDoctors(true);

    try {
      const res = await fetch(`${BASE_URL}/doctors/${clinicId}`);
      const data = await res.json();

      if (data.statusCode === 200) {
        setDoctors(data.value);
      } else {
        setDoctors([]);
      }
    } catch (err) {
      console.error(err);
    }

    setLoadingDoctors(false);
  }

  async function fetchSlots(doctorId) {
    setLoadingSlots(true);

    try {
      const res = await fetch(`${BASE_URL}/available-slots/${doctorId}`);
      const data = await res.json();

      if (data.statusCode === 200) {
        setSlots(data.value);
      } else {
        setSlots([]);
      }
    } catch (err) {
      console.error(err);
    }

    setLoadingSlots(false);
  }

  useEffect(() => {
    fetchDoctors();
  }, [clinicId]);

  function handleBookClick(doctor) {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setSelectedDoctor(doctor);
    setSelectedSlot("");
    setReason("");
    setSuccessMessage("");
    setShowModal(true);

    fetchSlots(doctor.userid);
  }

  async function handleConfirmBooking() {
    if (!selectedSlot) return;
    if (!reason.trim()) {
      alert("Please enter a reason for the appointment");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/book`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          slotid: selectedSlot,
          reason: reason,
        }),
      });

      const data = await res.json();

      if (data.statusCode !== 201) {
        alert(data.message || "Failed to book appointment");
        setBookingLoading(false);
        return;
      }
      setSuccessMessage("Your appointment has been booked successfully ✔");
    } catch (err) {
      console.error(err);
      alert("Error booking appointment");
    }

    setBookingLoading(false);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto text-center ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Clinic Doctors</h1>
      {loadingDoctors ? (
        <p className="text-gray-600">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-gray-500">No doctors found for this clinic.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.userid}
              className="bg-white border rounded-xl shadow p-5"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {doc.fullname}
              </h2>
              <p className="text-sm text-gray-600">{doc.email}</p>
              <p className="mt-1 text-gray-500">{doc.clinicname}</p>

              <button
                onClick={() => handleBookClick(doc)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ------------------------- MODAL ------------------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Book Appointment With {selectedDoctor.fullname}
            </h2>

            {/* Success message */}
            {successMessage ? (
              <div className="text-green-600 font-medium text-center py-6">
                {successMessage}
              </div>
            ) : (
              <>
                {/* Select slot */}
                <label className="block mb-2 text-gray-700 font-medium">
                  Select an available slot:
                </label>

                {loadingSlots ? (
                  <p className="text-gray-600">Loading slots...</p>
                ) : slots.length === 0 ? (
                  <p className="text-gray-500">No available slots.</p>
                ) : (
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">Select a slot</option>
                    {slots.map((slot) => (
                      <option key={slot.slotid} value={slot.slotid}>
                        {new Date(slot.date).toLocaleDateString()} —{" "}
                        {slot.starttime.slice(0, 5)} to{" "}
                        {slot.endtime.slice(0, 5)}
                      </option>
                    ))}
                  </select>
                )}

                {/* Reason Input */}
                <label className="block mt-4 mb-1 text-gray-700 font-medium">
                  Reason for visit:
                </label>

                <textarea
                  className="w-full border p-2 rounded-lg"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your reason..."
                ></textarea>

                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedSlot || bookingLoading}
                  className={`mt-4 w-full py-2 rounded-lg text-white transition ${
                    selectedSlot
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </>
            )}

            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
