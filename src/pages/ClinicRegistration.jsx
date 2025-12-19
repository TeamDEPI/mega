import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaChevronDown,
  FaGoogle,
  FaApple,
  FaFacebook,
} from "react-icons/fa";
import "../assets/css/RegistrationForm.css";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import BootstrapSection from "../components/BootstrapSection";

import { API_BASE_URL } from "../config.json";

function ClinicRegistration() {
  const navigate = useNavigate();

  const [medicalSpecialties, setMedicalSpecialties] = useState([]);

  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    addressCountry: "",
    addressGovernRate: "",
    addressCity: "",
    addressLocation: "",
    phone: "",
    medicalSpecialtyId: "",
  });

  const [errors, setErrors] = useState({});
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/MedicalSpecialty/medical-specialties`
        );
        const json = await res.json();
        setMedicalSpecialties(json?.list || []);
      } catch (err) {
        console.log("Error loading specialties", err);
      }
    };

    fetchSpecialties();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const noSpecialsNoNumbers = /^[A-Za-z\s]+$/;
  const noLeadingSpace = /^[^\s].*$/;
  const locationRegex = /^[A-Za-z0-9\s]+$/;
  const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
  const validate = () => {
    let newErrors = {};

    if (!formInputs.name.trim()) newErrors.name = "Clinic name is required.";
    else if (!noLeadingSpace.test(formInputs.name))
      newErrors.name = "Name cannot start with a space.";
    else if (!noSpecialsNoNumbers.test(formInputs.name))
      newErrors.name = "Name must contain letters only.";

    if (!formInputs.addressCountry.trim())
      newErrors.addressCountry = "Country is required.";
    else if (!noLeadingSpace.test(formInputs.addressCountry))
      newErrors.addressCountry = "Country cannot start with a space.";
    else if (!noSpecialsNoNumbers.test(formInputs.addressCountry))
      newErrors.addressCountry = "Country must contain letters only.";

    if (!formInputs.addressGovernRate.trim())
      newErrors.addressGovernRate = "Governorate is required.";
    else if (!noLeadingSpace.test(formInputs.addressGovernRate))
      newErrors.addressGovernRate = "Governorate cannot start with a space.";
    else if (!noSpecialsNoNumbers.test(formInputs.addressGovernRate))
      newErrors.addressGovernRate = "Governorate must contain letters only.";

    if (!formInputs.addressCity.trim())
      newErrors.addressCity = "City is required.";
    else if (!noLeadingSpace.test(formInputs.addressCity))
      newErrors.addressCity = "City cannot start with a space.";
    else if (!noSpecialsNoNumbers.test(formInputs.addressCity))
      newErrors.addressCity = "City must contain letters only.";

    if (!formInputs.addressLocation.trim())
      newErrors.addressLocation = "Address is required.";
    else if (!noLeadingSpace.test(formInputs.addressLocation))
      newErrors.addressLocation = "Address cannot start with a space.";
    else if (!locationRegex.test(formInputs.addressLocation))
      newErrors.addressLocation =
        "Address can contain letters, numbers, and spaces only.";

    if (!phoneRegex.test(formInputs.phone))
      newErrors.phone =
        "Phone must be 11 digits and start with 010, 011, 012, or 015";

    if (!formInputs.medicalSpecialtyId)
      newErrors.medicalSpecialtyId = "Select a medical specialty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValid = (field) => {
    if (errors[field]) return false;
    const value = formInputs[field]?.trim();
    if (!value) return false;

    switch (field) {
      case "name":
      case "addressCountry":
      case "addressGovernRate":
      case "addressCity":
        return noLeadingSpace.test(value) && noSpecialsNoNumbers.test(value);

      case "addressLocation":
        return noLeadingSpace.test(value) && locationRegex.test(value);

      case "phone":
        return phoneRegex.test(value);

      case "email":
        return emailRegex.test(value);

      default:
        return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const body = {
      name: formInputs.name,
      medicalSpecialtyId: formInputs.medicalSpecialtyId,
      email: formInputs.email,
      addressCountry: formInputs.addressCountry,
      addressGovernRate: formInputs.addressGovernRate,
      addressCity: formInputs.addressCity,
      addressLocation: formInputs.addressLocation,
      phone: formInputs.phone,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/clinic/create-clinicrequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.statusCode !== 200) throw new Error(data.message);

      setSuccessModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <BootstrapSection>
      <div className="d-flex min-vh-100 width-container">
        {/* SUCCESS MODAL */}
        <SuccessModal
          visible={successModal}
          message="We have received your request, and it is currently under review. An email will be sent after the review."
          onClose={() => setSuccessModal(false)}
          onOk={() => navigate("/")}
        />

        {/* LEFT SECTION */}
        <div className="col-lg-6 px-5 d-none d-lg-flex flex-column justify-content-center">
          <h1 className="display-4 fw-bold">Register Your Clinic</h1>
          <p className="lead mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-warning fw-bold text-decoration-none border-bottom border-warning"
            >
              Login here!
            </Link>
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-2 p-md-5">
          <h2 className="mb-4 fw-bold fs-1">Welcome Clinic</h2>

          <form
            onSubmit={handleSubmit}
            className="w-100"
            style={{ maxWidth: "400px" }}
          >
            {/* Clinic Name */}
            <div className="mb-3 form-group">
              <div className="input-group position-relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Clinic Name"
                  className="form-control rounded-3 py-3 btn-background shadow-sm"
                  value={formInputs.name}
                  onChange={handleChange}
                />
                {isValid("name") && (
                  <FaCheckCircle
                    className="position-absolute end-0 me-3 text-success"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </div>
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            {/* Email */}
            <div className="mb-3 form-group">
              <div className="input-group position-relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control rounded-3 py-3 btn-background shadow-sm"
                  value={formInputs.email}
                  onChange={handleChange}
                />
                {isValid("email") && (
                  <FaCheckCircle
                    className="position-absolute end-0 me-3 text-success"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </div>
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            {/* Country */}
            <div className="mb-3 form-group">
              <div className="input-group position-relative">
                <input
                  type="text"
                  name="addressCountry"
                  placeholder="Country"
                  className="form-control rounded-3 py-3 btn-background shadow-sm"
                  value={formInputs.addressCountry}
                  onChange={handleChange}
                />
                {isValid("addressCountry") && (
                  <FaCheckCircle
                    className="position-absolute end-0 me-3 text-success"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </div>
              {errors.addressCountry && (
                <small className="text-danger">{errors.addressCountry}</small>
              )}
            </div>

            {/* Governorate */}
            <div className="mb-3 form-group">
              <div className="input-group position-relative">
                <input
                  type="text"
                  name="addressGovernRate"
                  placeholder="Govern Rate"
                  className="form-control rounded-3 py-3 btn-background shadow-sm"
                  value={formInputs.addressGovernRate}
                  onChange={handleChange}
                />
                {isValid("addressGovernRate") && (
                  <FaCheckCircle
                    className="position-absolute end-0 me-3 text-success"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </div>
              {errors.addressGovernRate && (
                <small className="text-danger">
                  {errors.addressGovernRate}
                </small>
              )}
            </div>

            {/* City */}
            <div className="mb-3 form-group">
              <div className="input-group position-relative">
                <input
                  type="text"
                  name="addressCity"
                  placeholder="City"
                  className="form-control rounded-3 py-3 btn-background shadow-sm"
                  value={formInputs.addressCity}
                  onChange={handleChange}
                />
                {isValid("addressCity") && (
                  <FaCheckCircle
                    className="position-absolute end-0 me-3 text-success"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </div>
              {errors.addressCity && (
                <small className="text-danger">{errors.addressCity}</small>
              )}
            </div>

            {/* Address */}
            <div className="mb-3 form-group">
              <div className="input-group position-relative">
                <input
                  type="text"
                  name="addressLocation"
                  placeholder="Address"
                  className="form-control rounded-3 py-3 btn-background shadow-sm"
                  value={formInputs.addressLocation}
                  onChange={handleChange}
                />
                {isValid("addressLocation") && (
                  <FaCheckCircle
                    className="position-absolute end-0 me-3 text-success"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </div>
              {errors.addressLocation && (
                <small className="text-danger">{errors.addressLocation}</small>
              )}
            </div>

            {/* Phone */}
            <div className="mb-3 form-group">
              <div className="input-group position-relative">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control rounded-3 py-3 btn-background shadow-sm"
                  value={formInputs.phone}
                  onChange={handleChange}
                />
                {isValid("phone") && (
                  <FaCheckCircle
                    className="position-absolute end-0 me-3 text-success"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </div>
              {errors.phone && (
                <small className="text-danger">{errors.phone}</small>
              )}
            </div>

            {/* Medical Specialty */}
            <div className="mb-4 form-group">
              <div className="input-group position-relative">
                <select
                  name="medicalSpecialtyId"
                  className="form-control rounded-3 py-3 btn-background shadow-sm"
                  value={formInputs.medicalSpecialtyId}
                  onChange={handleChange}
                >
                  <option value="">Select Medical Specialty</option>
                  {medicalSpecialties.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))}
                </select>

                <FaChevronDown
                  className="position-absolute end-0 me-3 text-secondary"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                />

                {isValid("medicalSpecialtyId") && (
                  <FaCheckCircle
                    className="position-absolute end-0 me-5 text-success"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                )}
              </div>

              {errors.medicalSpecialtyId && (
                <small className="text-danger">
                  {errors.medicalSpecialtyId}
                </small>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm"
              style={{
                background: "linear-gradient(to right, #458FF6, #4772C5)",
                border: "none",
              }}
            >
              Register Clinic
            </button>
          </form>
        </div>
      </div>
    </BootstrapSection>
  );
}

export default ClinicRegistration;
