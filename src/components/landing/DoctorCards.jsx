import { useState } from "react";
import card from "../../assets/images/dashboard/M.jpg";

const doctors = [
  {
    name: "Dr. Ananya Mehta",
    title: "Diabetologist",
    degrees: "MBBS, MD (Internal Medicine), D.Diab",
    experience: "10+",
    patients: "1970+",
    hospital: "Global Hospital , Mumbai",
    price: "$20–50/ Consultation",
    desc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical experience in managing diabetes and related metabolic disorders. She specializes in personalized treatment plans and patient education.",
    shortDesc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical exper...",
    image: card,
  },
  {
    name: "Dr. Ananya Mehta",
    title: "Diabetologist",
    degrees: "MBBS, MD (Internal Medicine), D.Diab",
    experience: "10+",
    patients: "1970+",
    hospital: "Global Hospital , Mumbai",
    price: "$20–50/ Consultation",
    desc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical experience in managing diabetes and related metabolic disorders. She specializes in personalized treatment plans and patient education.",
    shortDesc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical exper...",
    image: card,
  },
  {
    name: "Dr. Ananya Mehta",
    title: "Diabetologist",
    degrees: "MBBS, MD (Internal Medicine), D.Diab",
    experience: "10+",
    patients: "1970+",
    hospital: "Global Hospital , Mumbai",
    price: "$20–50/ Consultation",
    desc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical experience in managing diabetes and related metabolic disorders. She specializes in personalized treatment plans and patient education.",
    shortDesc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical exper...",
    image: card,
  },
];

export default function DoctorCards() {
  const [expandedCards, setExpandedCards] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const toggleExpand = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleBookAppointment = (doctor, index) => {
    setSelectedDoctor({ ...doctor, index });
    setShowBookingModal(true);
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white w-full max-w-[425px] rounded-3xl shadow-md border border-gray-200 p-3 flex flex-col gap-4"
          >
            {/* Top Section */}
            <div className="flex gap-4 items-start">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-32 h-32 rounded-2xl object-cover"
              />

              <div className="flex flex-col">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {doc.name}
                  <span className="text-green-500 text-xl">✔</span>
                </h2>

                <p className="text-gray-700">{doc.title}</p>
                <p className="text-gray-500 text-sm">{doc.degrees}</p>

                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-lime-400 text-white px-3 rounded-full text-sm font-semibold">
                      {doc.experience}
                    </span>
                    <span className="text-gray-600 text-sm">
                      Year experience
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-lime-400 text-white px-3 rounded-full text-sm font-semibold">
                      {doc.patients}
                    </span>
                    <span className="text-gray-600 text-sm">
                      Trusted patients
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hospital */}
            <div className="flex items-center gap-2 text-gray-700 ">
              <span className="text-xl">📍</span>
              <span>{doc.hospital}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {expandedCards[index] ? doc.desc : doc.shortDesc}{" "}
              <button 
                onClick={() => toggleExpand(index)}
                className="text-[#1CBCCF] cursor-pointer hover:text-[#1a9ba8] transition-colors duration-200 font-medium"
              >
                {expandedCards[index] ? "see less" : "see more"}
              </button>
            </p>

            {/* Price */}
            <p className="text-xl font-semibold">{doc.price}</p>

            {/* Button */}
            <button 
              onClick={() => handleBookAppointment(doc, index)}
              className="w-full bg-[#1CBCCF] text-white py-3 rounded-full font-medium hover:bg-[#1ca5b4] transition-all duration-300 hover:shadow-lg"
            >
              Book appointment
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#1CBCCF]">Book Appointment</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{selectedDoctor.name}</h4>
                  <p className="text-gray-600">{selectedDoctor.title}</p>
                  <p className="text-gray-500 text-sm">{selectedDoctor.hospital}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1CBCCF] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1CBCCF] focus:border-transparent">
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={closeModal}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert(`Appointment booked with ${selectedDoctor.name}!`);
                    closeModal();
                  }}
                  className="flex-1 py-2 bg-[#1CBCCF] text-white rounded-lg hover:bg-[#1ca5b4] transition"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}