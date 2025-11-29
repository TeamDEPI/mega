import { useState, useContext } from "react";
import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
  FaFacebook,
} from "react-icons/fa";
import "../assets/css/RegistrationForm.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

import OtpModal from "./OtpModal";

function RegistrationForm() {
  const navigate = useNavigate();
  const { register, verifyEmail, sendOtp } = useContext(UserContext);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const emailRegex = /^\S+@\S+\.\S+$/;

  const validateForm = () => {
    const newErrors = {};

    if (!formInputs.name.trim()) newErrors.name = "Name is required";

    if (!emailRegex.test(formInputs.email))
      newErrors.email = "Enter a valid email";
    if (!formInputs.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{8,15}$/.test(formInputs.phone))
      newErrors.phone = "Phone must be 8-15 digits";
    if (formInputs.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formInputs.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";

    if (
      formInputs.password !== formInputs.confirmPassword &&
      formInputs.confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      await register(formInputs.name, formInputs.email, formInputs.password);
      setShowOtpModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const isValid = (field) => {
    if (errors[field]) return false;

    const value = formInputs[field]?.trim();
    if (!value) return false;

    if (field === "email") return emailRegex.test(value);

    return true;
  };

  return (
    <div className="d-flex min-vh-100 width-container">
      <OtpModal
        visible={showOtpModal}
        email={formInputs.email}
        resendTime={15}
        onConfirm={async (code) => {
          try {
            await verifyEmail(formInputs.email, code);
            navigate("/dashboard");
          } catch (err) {
            alert(err.message);
          }
        }}
        onResend={(email) => sendOtp(email, "email")}
        onClose={() => setShowOtpModal(false)}
      />

      <div className="col-lg-6 px-5 d-none d-lg-flex flex-column justify-content-center">
        <h1 className="display-4 fw-bold">Sign Up to get your nutrients</h1>

        <p className="lead mt-3">
          If you already have an account{" "}
          <Link
            to="/login"
            className="text-warning fw-bold text-decoration-none border-bottom border-warning"
          >
            Login here!
          </Link>
        </p>
      </div>

      <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-2 p-md-5">
        <h2 className="mb-4 fw-bold fs-1">Welcome User</h2>

        <form
          onSubmit={handleSubmit}
          className="w-100"
          style={{ maxWidth: "350px" }}
          autoComplete="off"
        >
          {/* NAME */}
          <div className="input-group mb-1 form-group position-relative">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control rounded-3 pe-5 py-3 btn-background shadow-sm"
              value={formInputs.name}
              onChange={handleChange}
            />
            {isValid("name") && (
              <FaCheckCircle
                className="position-absolute end-0 me-3 text-success input-icon"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              />
            )}
          </div>
          {errors.name && <small className="text-danger">{errors.name}</small>}

          {/* EMAIL */}
          <div className="input-group mb-1 mt-3 form-group position-relative">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="new-email"
              className="form-control rounded-3 pe-5 py-3 btn-background shadow-sm"
              value={formInputs.email}
              onChange={handleChange}
            />

            {isValid("email") && (
              <FaCheckCircle
                className="position-absolute end-0 me-3 text-success input-icon"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              />
            )}
          </div>
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
          {/* PHONE NUMBER */}
          <div className="input-group mb-1 mt-3 form-group position-relative">
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              className="form-control rounded-3 pe-5 py-3 btn-background shadow-sm"
              value={formInputs.phone}
              onChange={handleChange}
            />

            {isValid("phone") && (
              <FaCheckCircle
                className="position-absolute end-0 me-3 text-success input-icon"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              />
            )}
          </div>

          {errors.phone && (
            <small className="text-danger">{errors.phone}</small>
          )}
          {/* PASSWORD */}
          <div className="input-group mb-1 mt-3 form-group position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="form-control rounded-3 pe-5 py-3 btn-background shadow-sm"
              value={formInputs.password}
              onChange={handleChange}
            />

            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(false)}
                className="position-absolute end-0 me-3 text-secondary input-icon"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(true)}
                className="position-absolute end-0 me-3 text-secondary input-icon"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="input-group mb-1 mt-3 form-group position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control rounded-3 pe-5 py-3 btn-background shadow-sm"
              value={formInputs.confirmPassword}
              onChange={handleChange}
            />

            {/* Show/Hide Icon */}
            {showConfirmPassword ? (
              <FaEyeSlash
                onClick={() => setShowConfirmPassword(false)}
                className="position-absolute end-0 me-3 text-secondary input-icon"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            ) : (
              <FaEye
                onClick={() => setShowConfirmPassword(true)}
                className="position-absolute end-0 me-3 text-secondary input-icon"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            )}
          </div>

          {errors.confirmPassword && (
            <small className="text-danger">{errors.confirmPassword}</small>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm mt-3"
            style={{
              background: "linear-gradient(to right, #458FF6, #4772C5)",
              border: "none",
            }}
          >
            Register
          </button>
        </form>

        <p className="text-muted mt-4">Or continue with</p>

        <div
          className="d-flex w-50 justify-content-between"
          style={{ maxWidth: "300px" }}
        >
          <button className="btn border-0 fs-2">
            <FaGoogle className="text-danger" />
          </button>
          <button className="btn border-0 fs-2">
            <FaApple className="text-dark" />
          </button>
          <button className="btn border-0 fs-2">
            <FaFacebook className="text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
