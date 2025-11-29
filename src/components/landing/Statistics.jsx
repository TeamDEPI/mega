function Statistics() {
  return (
    <section>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-16">
        <div className="flex flex-col items-center">
          <h3 className="text-5xl font-bold text-[#90C6CD]">+5120</h3>
          <span>Happy Patients</span>
        </div>
        <div className="hidden sm:block bg-gray-300 h-8 w-0.5 rounded-full self-center"></div>
        <div className="flex flex-col items-center">
          <h3 className="text-5xl font-bold text-[#90C6CD]">+26</h3>
          <span>Total Branches</span>
        </div>
        <div className="hidden sm:block bg-gray-300 h-8 w-0.5 rounded-full self-center"></div>

        <div className="flex flex-col items-center">
          <h3 className="text-5xl font-bold text-[#90C6CD]">+53</h3>
          <span>Senior Doctors</span>
        </div>
        <div className="hidden sm:block bg-gray-300 h-8 w-0.5 rounded-full self-center"></div>

        <div className="flex flex-col items-center">
          <h3 className="text-5xl font-bold text-[#90C6CD]">+10</h3>
          <span>Years Experience</span>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
