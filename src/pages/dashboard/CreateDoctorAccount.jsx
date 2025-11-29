import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_BASE_URL } from "../../config.json";

const API_URL = API_BASE_URL + "/clinicManagement/create-clinic-user";
const CreateDoctorAccount = () => {
  const TOKEN = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm the password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.userType) newErrors.userType = "Please select a user type.";

    if (!formData.photo) newErrors.photo = "Please upload a profile photo.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const typeMap = {
      Doctor: "ClinicDoctor",
      Receptionist: "ClinicReceptionist",
    };
    console.log(typeMap[formData.userType], formData.userType);
    const payload = {
      email: formData.email,
      password: formData.password,
      fullName: formData.name,
      userType: typeMap[formData.userType],
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.statusCode === 201) {
        alert("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          photo: null,
          password: "",
          confirmPassword: "",
          userType: "",
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Request failed. Check console.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Clinic User Account
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              autoComplete="new-email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Photo (Mock Only)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full px-3 py-2 border rounded-xl cursor-pointer focus:outline-none ${
                errors.photo ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                autoComplete="new-password"
                style={{ paddingRight: "2rem" }}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-400 focus:ring-red-400"
                    : "focus:ring-blue-500"
                }`}
              />

              {/* Show / Hide Icon */}
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(false)}
                  className="position-absolute end-0 me-3 text-gray-500 input-icon"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(true)}
                  className="position-absolute end-0 me-3 text-gray-500 input-icon"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                style={{ paddingRight: "2rem" }}
                className={`w-full px-4  py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-400 focus:ring-red-400"
                    : "focus:ring-blue-500"
                }`}
              />

              {/* Show / Hide Icon */}
              {showConfirmPassword ? (
                <FaEyeSlash
                  onClick={() => setShowConfirmPassword(false)}
                  className="position-absolute end-0 me-3 text-gray-500 input-icon"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <FaEye
                  onClick={() => setShowConfirmPassword(true)}
                  className="position-absolute end-0 me-3 text-gray-500 input-icon"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* User Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              User Type
            </label>
            <select
              value={formData.userType}
              onChange={(e) =>
                setFormData({ ...formData, userType: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.userType
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
            >
              <option value="">Select a type</option>
              <option value="Doctor">Doctor</option>
              <option value="Receptionist">Receptionis</option>
            </select>
            {errors.userType && (
              <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition duration-200 disabled:bg-blue-300"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctorAccount;
