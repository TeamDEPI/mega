/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../../config.json";
import { FaCamera } from "react-icons/fa";
import { UserContext } from "../../Contexts/UserContext";

export default function EditUserPage() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const validateFullname = (name) => {
    const clean = name.trim();
    if (clean.length < 2) return "Name must be at least 2 characters long";
    if (!/^[a-zA-Z\u0600-\u06FF ]+$/.test(clean))
      return "Name can only contain letters";
    if (/\s{2,}/.test(clean)) return "Name cannot contain double spaces";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email address";
  };

  const validatePhone = (phone) => {
    if (!phone) return "";
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phone)
      ? ""
      : "Please enter a valid phone number (7–15 digits)";
  };

  const validateForm = () => {
    const newErrors = {
      fullname: validateFullname(userData.fullname),
      email: validateEmail(userData.email),
      phone: validatePhone(userData.phone),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      setUserData({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phonenumber || "",
        image: null,
      });
      if (user.imagepath) {
        setPreviewImage(user.imagepath);
      }
    } catch {
      setMessage({ text: "Error loading user data", type: "error" });
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullname") {
      const allowed = /^[a-zA-Z\u0600-\u06FF ]*$/;
      if (!allowed.test(value)) return;
    }

    if (name === "phone") {
      const allowed = /^[0-9]*$/;
      if (!allowed.test(value)) return;
    }

    setUserData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage({ text: "Please select an image file", type: "error" });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setMessage({
          text: "Image size should be less than 2MB",
          type: "error",
        });
        return;
      }

      setUserData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({
        text: "Please fix the errors before saving",
        type: "error",
      });
      return;
    }

    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("fullname", userData.fullname.trim());
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);

      if (userData.image) {
        formData.append("image", userData.image);
      }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
        if (userData.image) {
          setPreviewImage(URL.createObjectURL(userData.image));
        }
        setUserData((prev) => ({ ...prev, image: null }));
      } else {
        setMessage({
          text: data.message || "Failed to update profile",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "Error updating profile", type: "error" });
    }
    setSaving(false);
  };

  const handleRemoveImage = () => {
    setUserData((prev) => ({ ...prev, image: null }));
    setPreviewImage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-600 mt-2">
              Update your personal information
            </p>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image-input"
              />
              <label
                htmlFor="profile-image-input"
                className="cursor-pointer inline-block relative"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaCamera size={32} className="text-gray-400" />
                  )}
                </div>
              </label>

              {previewImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              )}

              <p className="text-sm text-gray-500 mt-2">
                Click the circle to change your profile picture
              </p>
            </div>

            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={userData.fullname}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.fullname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., 1234567890"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Phone number is optional
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
