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
    desc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical exper...",
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
    desc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical exper...",
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
    desc: "With over a decade of clinical experience, Dr. Ananya Mehta is a trusted diabetologist decade of clinical exper...",
    image: card,
  },
];

export default function DoctorCards() {
  return (
    <div className="w-full flex justify-center  bg-white">
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
              {doc.desc}{" "}
              <span className="text-[#1CBCCF] cursor-pointer">see more</span>
            </p>

            {/* Price */}
            <p className="text-xl font-semibold">{doc.price}</p>

            {/* Button */}
            <button className="w-full bg-[#1CBCCF] text-white py-2 rounded-full  font-medium hover:bg-[#1ca5b4] transition">
              Book appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
