import React, { useState } from "react";
import { API_BASE_URL } from "../../config.json";

const AddScheduleModal = ({ doctors, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    DoctorId: "",
    SlotDurationMinutes: 30,
    slots: [],
  });

  const [currentSlot, setCurrentSlot] = useState({
    DayOfWeek: 0,
    StartTime: "",
    EndTime: "",
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const addSlot = () => {
    if (currentSlot.StartTime && currentSlot.EndTime) {
      setFormData((prev) => ({
        ...prev,
        slots: [...prev.slots, { ...currentSlot }],
      }));
      setCurrentSlot({ DayOfWeek: 0, StartTime: "", EndTime: "" });
    }
  };

  const removeSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      slots: prev.slots.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async () => {
    if (!formData.DoctorId || formData.slots.length === 0) {
      alert("Please select a doctor and add at least one slot");
      return;
    }

    const apiPayload = {
      clincid: "1",
      doctorid: formData.DoctorId,
      slotdurationminutes: formData.SlotDurationMinutes,
      slots: formData.slots.map((slot) => ({
        day: daysOfWeek[slot.DayOfWeek],
        starttime: slot.StartTime + ":00",
        endtime: slot.EndTime + ":00",
      })),
    };

    try {
      console.log("📤 Sending to Create Schedule API:", apiPayload);
      onSave(apiPayload);
      onClose();
    } catch (err) {
      console.error("Error saving schedule:", err);
      alert("Network or server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Add New Schedule</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor *
            </label>
            <select
              value={formData.DoctorId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, DoctorId: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Choose a doctor</option>

              {doctors.map((doctor) => (
                <option key={doctor.userid} value={doctor.userid}>
                  {doctor.fullname}
                </option>
              ))}
            </select>
          </div>

          {/* Slot Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Duration (minutes) *
            </label>
            <input
              type="number"
              value={formData.SlotDurationMinutes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  SlotDurationMinutes: parseInt(e.target.value),
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min="15"
              max="120"
              step="15"
            />
          </div>

          {/* Slot Input */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium mb-4">Add Working Hours</h4>

            <div className="flex gap-3 mb-4">
              <select
                value={currentSlot.DayOfWeek}
                onChange={(e) =>
                  setCurrentSlot((prev) => ({
                    ...prev,
                    DayOfWeek: parseInt(e.target.value),
                  }))
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              >
                {daysOfWeek.map((day, index) => (
                  <option key={index} value={index}>
                    {day}
                  </option>
                ))}
              </select>

              <input
                type="time"
                value={currentSlot.StartTime}
                onChange={(e) =>
                  setCurrentSlot((prev) => ({
                    ...prev,
                    StartTime: e.target.value,
                  }))
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />

              <input
                type="time"
                value={currentSlot.EndTime}
                onChange={(e) =>
                  setCurrentSlot((prev) => ({
                    ...prev,
                    EndTime: e.target.value,
                  }))
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />

              <button
                onClick={addSlot}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                disabled={!currentSlot.StartTime || !currentSlot.EndTime}
              >
                Add
              </button>
            </div>

            {/* Slots List */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {formData.slots.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {daysOfWeek[slot.DayOfWeek]}
                    </span>
                    <span>
                      {slot.StartTime} - {slot.EndTime}
                    </span>
                  </div>
                  <button
                    onClick={() => removeSlot(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              !formData.DoctorId || formData.slots.length === 0 || loading
            }
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddScheduleModal;
