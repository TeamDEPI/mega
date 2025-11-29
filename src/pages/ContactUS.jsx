import { useState } from "react";

export default function Contactus() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt="Modern buildings"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">
              Let's Get In Touch.
            </h2>
            <p className="text-gray-600 mb-8">
              or just out manually to{" "}
              <a
                href="mailto:Paradise@gmail.com"
                className="text-blue-700 hover:underline font-medium"
              >
                Paradise@gmail.com
              </a>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-900 font-semibold mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter Your First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-900 font-semibold mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Your Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-900 font-semibold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-900 font-semibold mb-2"
                >
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden flex flex-col">
                      <div className="h-2 bg-red-600"></div>
                      <div className="h-2 bg-white"></div>
                      <div className="h-2 bg-black"></div>
                    </div>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+20 --- --- ----"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-900 font-semibold mb-2"
                >
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter Your Main Text Here...."
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={250}
                    rows={6}
                    className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="absolute bottom-3 right-4 text-sm text-gray-500">
                    {formData.message.length}/250
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-4 rounded-full font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Submit Form
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
