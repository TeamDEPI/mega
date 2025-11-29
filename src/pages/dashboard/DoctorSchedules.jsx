/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaStethoscope,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import AddScheduleModal from "../../components/dashboard/AddScheduleModal";
import { API_BASE_URL } from "../../config.json";

const DoctorSchedules = () => {
  const TOKEN = localStorage.getItem("token");
  const [groupedSchedules, setGroupedSchedules] = useState({});
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/ClinicManagement/doctors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setDoctors(data.value || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/ClinicManagement/clinic-schedule`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      const arr = data.value || [];

      const grouped = arr.reduce((acc, item) => {
        if (!acc[item.userid]) {
          acc[item.userid] = {
            userid: item.userid,
            fullname: item.fullname,
            shifts: [],
          };
        }

        acc[item.userid].shifts.push({
          day: item.day,
          start: item.starttime,
          end: item.endtime,
        });

        return acc;
      }, {});

      setGroupedSchedules(grouped);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchSchedules();
  }, []);
  const saveSchedule = async (scheduleData) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/ClinicManagement/create-doctor-schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(scheduleData),
        }
      );

      const json = await res.json();

      if (json.statusCode === 200) {
        alert("Schedule added successfully!");
        setShowAddModal(false);
        fetchSchedules();
      } else {
        alert(json.message || "Error adding schedule");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((d) =>
    d.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctor Schedules</h1>
          <p className="text-gray-600">
            Manage doctor appointments and availability
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus size={20} />
          Add Schedule
        </button>
      </div>

      <div className="flex mb-6">
        <div className="flex-1 relative">
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredDoctors.map((doctor) => {
          const shifts = groupedSchedules[doctor.userid]?.shifts || [];

          return (
            <div
              key={doctor.userid}
              className="border rounded-lg p-4 bg-white hover:shadow transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaStethoscope className="text-gray-600" />
                </div>

                <div>
                  <h3 className="font-semibold">{doctor.fullname}</h3>
                  <p className="text-sm text-gray-500">{doctor.email}</p>
                </div>
              </div>

              <div className="text-sm space-y-2">
                {shifts.length > 0 ? (
                  shifts.map((shift, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-600">{shift.day}</span>
                      <span>
                        {shift.start.substring(0, 5)} -{" "}
                        {shift.end.substring(0, 5)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No shifts added yet</p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-gray-100 py-2 rounded text-sm">
                  <FaEdit size={12} className="inline-block mr-1" /> Edit
                </button>
                <button className="flex-1 bg-red-100 text-red-700 py-2 rounded text-sm">
                  <FaTrash size={12} className="inline-block mr-1" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <AddScheduleModal
          onClose={() => setShowAddModal(false)}
          loading={loading}
          onSave={saveSchedule}
          doctors={doctors}
        />
      )}
    </div>
  );
};

export default DoctorSchedules;
