import bg from "../../assets/images/OurServices-background.png";

function OurServices() {
  return (
    <section>
      <div className="w-[90vw] mx-auto">
        <div
          className="bg-cover bg-center text-white h-96 sm:h-72 rounded-2xl flex flex-col sm:flex-row text-center sm:text-start gap-5 px-5 md:px-16 lg:px-20 xl:px-28 py-10"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="sm:w-1/2">
            <h2 className="font-bold text-4xl sm:max-w-96">
              Our Best Services For Your Solution
            </h2>
          </div>

          <div className="sm:w-1/2">
            <p className="lg:max-w-[40vw]">
              We offer a wide range of healthcare services designed to support
              every stage of your well-being. Our medical team provides reliable
              guidance, personalized care, and trusted support for all patients.
              With modern methods and compassionate service, we help you
              maintain a healthier and safer lifestyle.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 -translate-y-16 md:-translate-y-20">
          <div className="px-16 py-6 bg-white shadow-xl rounded-2xl w-[275px] flex flex-col items-center text-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="text-[#1CBCCF] w-10"
            >
              <path
                fill="currentColor"
                d="M19 8a2 2 0 0 1 2 2v6.76c.61.55 1 1.35 1 2.24c0 1.66-1.34 3-3 3s-3-1.34-3-3c0-.89.39-1.69 1-2.24V10c0-1.1.9-2 2-2m0 1c-.55 0-1 .45-1 1v1h2v-1c0-.55-.45-1-1-1M5 20v-8H2l10-9l4.4 3.96A3.97 3.97 0 0 0 15 10v6c-.63.83-1 1.87-1 3l.1 1z"
              />
            </svg>
            <h3 className="font-bold text-lg">General Practitioners</h3>
            <p>
              Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.
            </p>
          </div>
          <div className="px-16 py-6 bg-white shadow-xl rounded-2xl w-[275px] flex flex-col items-center text-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="text-[#1CBCCF] w-10"
            >
              <path
                fill="currentColor"
                d="M9 4c0-1.11.89-2 2-2s2 .89 2 2s-.89 2-2 2s-2-.89-2-2m7 9a3.29 3.29 0 0 0-2-3c0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3z"
              />
            </svg>
            <h3 className="font-bold text-lg">Pregnancy Support</h3>
            <p>
              Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.
            </p>
          </div>
          <div className="px-16 py-6 bg-white shadow-xl rounded-2xl w-[275px] flex flex-col items-center text-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="text-[#1CBCCF] w-10"
            >
              <path
                fill="currentColor"
                d="M22 18a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-2h12zM4 3h10a2 2 0 0 1 2 2v9H8v5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 3v2h2V6zm10 2V6H8v2zM4 10v2h2v-2zm4 0v2h6v-2zm-4 4v2h2v-2z"
              />
            </svg>
            <h3 className="font-bold text-lg">Nutritional Support</h3>
            <p>
              Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.
            </p>
          </div>
          <div className="px-16 py-6 bg-white shadow-xl rounded-2xl w-[275px] flex flex-col items-center text-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="text-[#1CBCCF] w-10"
            >
              <path
                fill="currentColor"
                d="M3 21v-2l2-6l-2-6V5h12.7l1.45-4l2.35.85L18.35 5H21v2l-2 6l2 6v2zm8-4h2v-3h3v-2h-3V9h-2v3H8v2h3z"
              />
            </svg>
            <h3 className="font-bold text-lg">Pharmaceutical Care</h3>
            <p>
              Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;
