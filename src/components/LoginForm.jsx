import { useContext, useState } from "react";
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

import OtpModal from "../components/OtpModal";

function LoginForm() {
  const navigate = useNavigate();

  const { login, sendOtp, verifyLogin, verifyEmail } = useContext(UserContext);

  const [showOtpModal, setShowOtpModal] = useState(false);

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [noEmailconfirmed, setNoEmailconfirmed] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const emailRegex = /^\S+@\S+\.\S+$/;

  const isValid = (field) => {
    if (errors[field]) return false;

    const value = formInputs[field]?.trim();

    if (!value) return false;

    if (field === "email") {
      return emailRegex.test(value);
    }

    return true;
  };
  const validateForm = () => {
    const newErrors = {};
    if (!emailRegex.test(formInputs.email))
      newErrors.email = "Enter a valid email";
    if (formInputs.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (!validateForm()) return;

    try {
      let data = await login(formInputs.email, formInputs.password);
      if (data?.requiresotpverification) {
        setShowOtpModal(true);
        return;
      } else if (data?.emailconfirmed === false) {
        setShowOtpModal(true);
        setNoEmailconfirmed(true);
        return;
      }
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="d-flex min-vh-100 width-container">
      <OtpModal
        visible={showOtpModal}
        email={formInputs.email}
        resendTime={15}
        onConfirm={async (code) => {
          try {
            if (noEmailconfirmed) {
              let data = await verifyEmail(formInputs.email, code);
              if (data.success) await handleSubmit();
            } else await verifyLogin(formInputs.email, code);
            navigate("/dashboard");
          } catch (err) {
            console.log(err);
            alert("Invalid OTP");
          }
        }}
        onResend={(email) =>
          sendOtp(email, noEmailconfirmed ? "email" : "login")
        }
        onClose={() => setShowOtpModal(false)}
      />

      <div className="col-lg-6 px-5 d-none d-lg-flex flex-column justify-content-center">
        <h1 className="display-4 fw-bold">Sign In to get your nutrients</h1>
        <p className="lead mt-3">
          If you don’t have an account you can{" "}
          <Link
            to="/register"
            className="text-warning fw-bold text-decoration-none border-bottom border-warning"
          >
            Register here!
          </Link>
        </p>
      </div>

      <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-2 p-md-5">
        <h2 className="mb-4 fw-bold fs-1">Welcome Back</h2>

        <form
          onSubmit={handleSubmit}
          className="w-100"
          style={{ maxWidth: "350px" }}
        >
          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div className="input-group mt-3 mb-1 form-group position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="form-control rounded-3 pe-5 py-3 btn-background shadow-sm"
              value={formInputs.password}
              onChange={handleChange}
            />

            {/* Eye toggle */}
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(false)}
                className="position-absolute end-0 me-3 text-secondary input-icon"
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
                className="position-absolute end-0 me-3 text-secondary input-icon"
                style={{
                  top: "50%",
                  right: "45px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  zIndex: 3,
                }}
              />
            )}
          </div>
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm mt-4"
            style={{
              background: "linear-gradient(to right, #458FF6, #4772C5)",
              border: "none",
            }}
          >
            Sign In
          </button>
        </form>

        <Link to="/forget-password">
          <p className="text-muted mt-4">Forget password?</p>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
