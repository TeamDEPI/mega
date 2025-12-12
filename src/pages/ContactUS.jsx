import { useState } from "react";

export default function Contactus() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let temp = {};

    // First Name
    if (!formData.firstName.trim()) {
      temp.firstName = "First name is required";
    } else if (!/^[A-Za-z]{2,}$/.test(formData.firstName)) {
      temp.firstName = "Only letters, minimum 2 characters";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      temp.lastName = "Last name is required";
    } else if (!/^[A-Za-z]{2,}$/.test(formData.lastName)) {
      temp.lastName = "Only letters, minimum 2 characters";
    }

    // Email
    if (!formData.email.trim()) {
      temp.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      temp.email = "Invalid email format";
    }

    // Phone
    if (!formData.phone.trim()) {
      temp.phone = "Phone number is required";
    } else if (!/^\+20\d{10}$/.test(formData.phone)) {
      temp.phone = "Phone must start with +20 and contain 10 digits after";
    }

    // Message
    if (!formData.message.trim()) {
      temp.message = "Message is required";
    } else if (formData.message.length < 10) {
      temp.message = "Message must be at least 10 characters";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending…
    setTimeout(() => {
      alert("Form Submitted Successfully!");
      setIsSubmitting(false);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Image */}
          <div className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt="Modern buildings"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">
              Let's Get In Touch.
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First + Last Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Enter Your First Name"
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-full border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } focus:outline-none`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Enter Your Last Name"
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-full border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Phone Number
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-full border border-gray-300"
                  >
                    🇪🇬 +20
                  </button>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="+20XXXXXXXXXX"
                    onChange={handleChange}
                    className={`flex-1 px-4 py-3 rounded-full border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  placeholder="Enter Your Message..."
                  onChange={handleChange}
                  rows={6}
                  maxLength={250}
                  className={`w-full px-4 py-3 rounded-3xl border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } resize-none`}
                />
                <div className="text-right text-sm text-gray-500">
                  {formData.message.length}/250
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-700 text-white py-4 rounded-full font-semibold 
                  hover:bg-blue-800 transition-colors flex justify-center items-center gap-2 
                  shadow-lg ${isSubmitting && "opacity-60 cursor-not-allowed"}`}
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
