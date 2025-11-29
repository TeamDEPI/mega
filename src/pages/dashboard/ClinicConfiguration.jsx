/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaSave, FaUpload, FaUndo, FaCheck, FaTimes } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { API_BASE_URL } from "../../config.json";
const BASE_URL = API_BASE_URL + "/ClinicManagement";

export default function SettingsPage() {
  const token = localStorage.getItem("token");
  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };
  const defaultPrice = 150;
  const defaultSettings = {
    clinicName: "",
    phone: "",
    address: "",
    email: "",
    logo: "",
  };

  const [clinicPrice, setClinicPrice] = useState(defaultPrice);
  const [clinicSettings, setClinicSettings] = useState(defaultSettings);
  const [lastSavedPrice, setLastSavedPrice] = useState(defaultPrice);
  const [lastSavedSettings, setLastSavedSettings] = useState(defaultSettings);
  const [logoPreview, setLogoPreview] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/clinic-data`, {
        headers: { ...authHeaders },
      });

      const data = await res.json();

      if (data.statusCode !== 200) {
        alert("Failed to load clinic data");
        setIsLoading(false);
        return;
      }

      const clinic = data;

      const fullAddress = [
        clinic.addresscountry,
        clinic.addressgovernrate,
        clinic.addresscity,
        clinic.addresslocation,
      ]
        .filter(Boolean)
        .join(", ");

      setClinicSettings({
        clinicName: clinic.name,
        email: clinic.email,
        phone: clinic.phone,
        address: fullAddress,
        specialty: clinic.medicalspecialty?.name || "",
      });

      setClinicPrice(clinic.price);
      setLastSavedPrice(clinic.price);
      setLastSavedSettings({
        clinicName: clinic.name,
        email: clinic.email,
        phone: clinic.phone,
        address: fullAddress,
        logo: clinic.logourl || "",
      });

      if (clinic.logourl) setLogoPreview(clinic.logourl);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error loading clinic settings");
      setIsLoading(false);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("Logo", file);

    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/clinic-setlogo`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const response = await res.json();

      if (response.statusCode !== 200) {
        alert("Failed to upload logo");
      } else {
        const localPreview = URL.createObjectURL(file);
        setLogoPreview(localPreview);

        alert("Logo updated!");
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to upload logo");
      setIsLoading(false);
    }
  };

  const handlePriceChange = (value) => {
    setClinicPrice(parseInt(value) || 0);
  };

  const handleClinicSettingChange = (field, value) => {
    setClinicSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateEmail = (email) => {
    if (!email) return false;
    const emailRegex =
      /^[^\s@]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/i;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return false;
    const numericRegex = /^[0-9]{8,15}$/;
    return numericRegex.test(phone);
  };

  const getEmailValidationState = () => {
    if (!clinicSettings.email) return "empty";
    if (validateEmail(clinicSettings.email)) return "valid";
    return "invalid";
  };

  const getPhoneValidationState = () => {
    if (!clinicSettings.phone) return "empty";
    if (validatePhone(clinicSettings.phone)) return "valid";
    return "invalid";
  };

  const saveSettings = async () => {
    try {
      if (!validateEmail(clinicSettings.email)) {
        alert("Invalid email format");
        setEmailTouched(true);
        return;
      }
      if (!validatePhone(clinicSettings.phone)) {
        alert("Invalid phone number");
        setPhoneTouched(true);
        return;
      }

      setIsLoading(true);

      if (clinicPrice !== lastSavedPrice) {
        const res = await fetch(
          `${BASE_URL}/clinic-setprice?Price=${clinicPrice}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              ...authHeaders,
            },
          }
        );

        const data = await res.json();

        if (data.statusCode !== 200) {
          alert("Failed to save price");
          setIsLoading(false);
          return;
        }

        setLastSavedPrice(clinicPrice);
      }
      setLastSavedSettings({
        clinicName: clinicSettings.clinicName,
        email: clinicSettings.email,
        phone: clinicSettings.phone,
        address: clinicSettings.address,
      });
      alert("Settings saved successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
      setIsLoading(false);
    }
  };

  const resetSettings = () => {
    if (
      window.confirm("Are you sure you want to reset to last saved settings?")
    ) {
      setClinicPrice(lastSavedPrice);
      setClinicSettings({ ...lastSavedSettings });
      setLogoPreview(lastSavedSettings.logo || "");
      setEmailTouched(false);
      setPhoneTouched(false);
    }
  };

  const hasUnsavedChanges =
    clinicPrice !== lastSavedPrice ||
    clinicSettings.clinicName !== lastSavedSettings.clinicName ||
    clinicSettings.email !== lastSavedSettings.email ||
    clinicSettings.phone !== lastSavedSettings.phone ||
    clinicSettings.address !== lastSavedSettings.address;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  const emailState = getEmailValidationState();
  const phoneState = getPhoneValidationState();

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 md:mb-8">
        <div className="flex items-start gap-3">
          <FiSettings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mt-1 shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight wrap-break-word">
              Clinic Configuration
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base wrap-break-word">
              Manage your clinic configuration and preferences
              {hasUnsavedChanges && (
                <span className="text-orange-500 ml-2">• Unsaved changes</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2 sm:gap-3">
          <button
            onClick={resetSettings}
            disabled={!hasUnsavedChanges}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <FaUndo className="text-blue-500 w-3 h-3 sm:w-4 sm:h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={saveSettings}
            disabled={isLoading || !hasUnsavedChanges}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <FaSave className="text-white w-3 h-3 sm:w-4 sm:h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Logo & General Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Logo Settings */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Clinic Logo
            </h2>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Clinic Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400 text-xs sm:text-sm">
                    No Logo
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center space-y-2 sm:space-y-3 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 text-sm sm:text-base w-full sm:w-auto"
                >
                  <FaUpload className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Upload Logo</span>
                </label>
                <p className="text-xs text-gray-500 text-center max-w-xs">
                  Recommended: 300x300px, PNG or JPG
                  <br />
                  Max size: 2MB
                </p>
              </div>
            </div>
          </div>

          {/* General Settings */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              General Settings
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Clinic Name
                </label>
                <input
                  type="text"
                  value={clinicSettings.clinicName}
                  onChange={(e) =>
                    handleClinicSettingChange("clinicName", e.target.value)
                  }
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={clinicSettings.email}
                    onChange={(e) => {
                      const englishOnly = e.target.value.replace(
                        /[^\x20-\x7E@.\-_]/g,
                        ""
                      );
                      handleClinicSettingChange("email", englishOnly);
                      setEmailTouched(true);
                    }}
                    onBlur={() => setEmailTouched(true)}
                    className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base pr-10 ${
                      emailState === "valid"
                        ? "border-green-500 bg-green-50"
                        : emailState === "invalid" && emailTouched
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="example@clinic.com"
                  />
                  {clinicSettings.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {emailState === "valid" ? (
                        <FaCheck className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                      ) : emailState === "invalid" && emailTouched ? (
                        <FaTimes className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
                      ) : null}
                    </div>
                  )}
                </div>
                {emailState === "invalid" && emailTouched && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <FaTimes className="w-3 h-3" />
                    Please enter a valid email address (English only)
                  </p>
                )}
                {emailState === "valid" && (
                  <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                    <FaCheck className="w-3 h-3" />
                    Valid email address
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Phone *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={clinicSettings.phone}
                    onChange={(e) => {
                      const numbersOnly = e.target.value.replace(/\D/g, "");
                      handleClinicSettingChange("phone", numbersOnly);
                      setPhoneTouched(true);
                    }}
                    onBlur={() => setPhoneTouched(true)}
                    className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base pr-10 ${
                      phoneState === "valid"
                        ? "border-green-500 bg-green-50"
                        : phoneState === "invalid" && phoneTouched
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="1234567890"
                  />
                  {clinicSettings.phone && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {phoneState === "valid" ? (
                        <FaCheck className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                      ) : phoneState === "invalid" && phoneTouched ? (
                        <FaTimes className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
                      ) : null}
                    </div>
                  )}
                </div>
                {phoneState === "invalid" && phoneTouched && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <FaTimes className="w-3 h-3" />
                    Please enter 8-15 digits only (English only)
                  </p>
                )}
                {phoneState === "valid" && (
                  <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                    <FaCheck className="w-3 h-3" />
                    Valid phone number
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Address
                </label>
                <textarea
                  value={clinicSettings.address}
                  onChange={(e) =>
                    handleClinicSettingChange("address", e.target.value)
                  }
                  rows="2"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-vertical"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Price Settings */}
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Clinic Price
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between p-3 sm:p-4 border border-gray-200 rounded-lg gap-2 xs:gap-0">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 text-sm sm:text-base wrap-break-word">
                  Standard Consultation Fee
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 wrap-break-word">
                  Fixed price for all clinic services
                </p>
              </div>
              <div className="flex items-center gap-2 w-full xs:w-auto justify-end">
                <span className="text-gray-500 text-sm sm:text-base">$</span>
                <input
                  type="number"
                  value={clinicPrice}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-20 sm:w-24 p-2 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  min="0"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-700 text-center">
                💡 <strong>Note:</strong> This price will be applied to all
                clinic services and consultations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
