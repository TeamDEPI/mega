import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";

import "../assets/css/RegistrationForm.css";
import OtpModal from "../components/OtpModal";
import { UserContext } from "../Contexts/UserContext";
import BootstrapSection from "../components/BootstrapSection";

function ForgetPassword() {
  const navigate = useNavigate();
  const { forgotPassword, verifyForgetOtp, resetPassword } =
    useContext(UserContext);

  const [stage, setStage] = useState("email");

  const [formInputs, setFormInputs] = useState({
    email: "",
    otp: "",
    newPassword: "",
    token: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [otpModal, setOtpModal] = useState(false);

  const handleChange = (e) => {
    setFormInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmailStage = () => {
    const newErrors = {};

    if (!emailRegex.test(formInputs.email))
      newErrors.email = "Enter a valid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetStage = () => {
    const newErrors = {};

    if (formInputs.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmailStage()) return;

    try {
      await forgotPassword(formInputs.email);
      setOtpModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOtpConfirm = async (otpCode) => {
    setFormInputs((prev) => ({ ...prev, otp: otpCode }));
    setOtpModal(false);
    let data = await verifyForgetOtp(formInputs.email, otpCode);
    if (!data.success) {
      alert(data.message);
      return;
    }
    setFormInputs((prev) => ({ ...prev, token: data.resettoken }));
    setStage("reset");
  };
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!validateResetStage()) return;

    try {
      await resetPassword(
        formInputs.email,
        formInputs.token,
        formInputs.newPassword
      );

      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  const isValid = (field) => {
    if (errors[field]) return false;

    const value = formInputs[field]?.trim();
    if (!value) return false;

    if (field === "email") return emailRegex.test(value);

    if (field === "newPassword") return value.length >= 6;

    return true;
  };

  return (
    <BootstrapSection>
      <div className={`d-flex min-vh-100 width-container bs`}>
        {/* OTP Modal */}
        <OtpModal
          visible={otpModal}
          email={formInputs.email}
          resendTime={15}
          onConfirm={handleOtpConfirm}
          onResend={() => forgotPassword(formInputs.email)}
          onClose={() => setOtpModal(false)}
        />

        {/* LEFT SECTION */}
        <div className="col-lg-6 px-5 d-none d-lg-flex flex-column justify-content-center">
          <h1 className="display-4 fw-bold">Reset Your Password</h1>
          <p className="lead mt-3">
            Back to{" "}
            <Link
              to="/login"
              className="text-warning fw-bold text-decoration-none border-bottom border-warning"
            >
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-2 p-md-5">
          <h2 className="mb-4 fw-bold fs-1">
            {stage === "email" && "Forgot Password"}
            {stage === "reset" && "Create New Password"}
          </h2>

          {/* ------------------ STAGE 1: ENTER EMAIL ------------------ */}
          {stage === "email" && (
            <form
              onSubmit={handleEmailSubmit}
              className="w-100"
              style={{ maxWidth: "350px" }}
            >
              <div className="input-group mb-1 form-group position-relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="form-control rounded-3 pe-5 py-3 btn-background shadow-sm"
                  value={formInputs.email}
                  onChange={handleChange}
                />
                {isValid("email") && (
                  <FaCheckCircle
                    className="position-absolute text-success"
                    style={{
                      top: "50%",
                      right: "15px",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                    }}
                  />
                )}
              </div>
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm mt-4"
                style={{
                  background: "linear-gradient(to right, #458FF6, #4772C5)",
                  border: "none",
                }}
              >
                Send OTP
              </button>
            </form>
          )}

          {/* ------------------ STAGE 2: RESET PASSWORD ------------------ */}
          {stage === "reset" && (
            <form
              onSubmit={handleResetSubmit}
              className="w-100"
              style={{ maxWidth: "350px" }}
            >
              <div className="input-group mb-1 form-group position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  className="form-control rounded-3 pe-5 py-3 btn-background shadow-sm"
                  value={formInputs.newPassword}
                  onChange={handleChange}
                />

                {/* Eye icon */}
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(false)}
                    className="position-absolute text-secondary"
                    style={{
                      top: "50%",
                      right: "45px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      zIndex: 3,
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(true)}
                    className="position-absolute text-secondary"
                    style={{
                      top: "50%",
                      right: "45px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      zIndex: 3,
                    }}
                  />
                )}

                {/* Valid check */}
                {isValid("newPassword") && (
                  <FaCheckCircle
                    className="position-absolute text-success"
                    style={{
                      top: "50%",
                      right: "15px",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
              </div>

              {errors.newPassword && (
                <small className="text-danger">{errors.newPassword}</small>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm mt-4"
                style={{
                  background: "linear-gradient(to right, #458FF6, #4772C5)",
                  border: "none",
                }}
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </BootstrapSection>
  );
}

export default ForgetPassword;
