/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import OtpModal from "../../components/OtpModal";
import { UserContext } from "../../Contexts/UserContext";
import { API_BASE_URL } from "../../config.json";

const TwoFactorAuth = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const { sendOtp, user } = useContext(UserContext);

  const [showOtpModal, setShowOtpModal] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      setIs2FAEnabled(user._2fa);
      // const verification = JSON.parse(localStorage.getItem("verification"));
      // if (verification?.requiresotpverification === true) {
      //   setIs2FAEnabled(true);
      // } else {
      //   setIs2FAEnabled(false);
      // }
    } catch (error) {
      console.log("LocalStorage error:", error);
    }
  }, []);

  const clearMessage = () => setMessage({ type: "", text: "" });

  const handleEnable2FA = async () => {
    setLoading(true);
    clearMessage();

    try {
      const res = await fetch(API_BASE_URL + "/Auth/2fa/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setShowOtpModal(true);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const confirm2FA = async (code) => {
    const res = await fetch(API_BASE_URL + `/Auth/2fa/confirm?Otp=${code}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    setIs2FAEnabled(true);
    setShowOtpModal(false);

    setMessage({
      type: "success",
      text: "Two-Factor Authentication enabled successfully.",
    });
  };
  const disable2FA = async () => {
    if (!password) {
      return setMessage({
        type: "error",
        text: "Please enter your current password",
      });
    }

    setLoading(true);
    clearMessage();

    try {
      const res = await fetch(API_BASE_URL + "/Auth/2fa/disable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentpassword: password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setIs2FAEnabled(false);
      setIsDeleting(false);
      setPassword("");

      setMessage({
        type: "success",
        text: "Two-Factor Authentication disabled successfully.",
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <OtpModal
        visible={showOtpModal}
        email={user.email}
        resendTime={15}
        onConfirm={confirm2FA}
        onResend={() => sendOtp(user.email, "2fa", token)}
        onClose={() => setShowOtpModal(false)}
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Two-Factor Authentication
      </h2>

      {/* Status */}
      <div className="mb-6">
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            is2FAEnabled
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full mr-2 ${
              is2FAEnabled ? "bg-green-500" : "bg-yellow-500"
            }`}
          ></span>
          {is2FAEnabled ? "2FA Enabled" : "2FA Not Enabled"}
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-md cursor-pointer ${
            message.type === "error"
              ? "bg-red-100 text-red-700 border border-red-200"
              : "bg-green-100 text-green-700 border border-green-200"
          }`}
          onClick={clearMessage}
        >
          {message.text}
        </div>
      )}

      {/* ENABLE */}
      {!is2FAEnabled && !isDeleting && (
        <button
          onClick={handleEnable2FA}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {loading ? "Processing..." : "Enable 2FA"}
        </button>
      )}

      {/* DISABLE */}
      {is2FAEnabled && !isDeleting && (
        <button
          onClick={() => setIsDeleting(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Disable 2FA
        </button>
      )}

      {/* Disable Confirmation */}
      {isDeleting && (
        <div className="mt-4 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-yellow-800 text-sm">
            <strong>Warning:</strong> Disabling 2FA reduces account security.
          </div>

          <input
            type="password"
            placeholder="Enter your current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />

          <div className="flex space-x-3">
            <button
              onClick={disable2FA}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
            >
              {loading ? "Disabling..." : "Disable"}
            </button>

            <button
              onClick={() => {
                setIsDeleting(false);
                setPassword("");
              }}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* OTP MODAL */}
    </div>
  );
};

export default TwoFactorAuth;
