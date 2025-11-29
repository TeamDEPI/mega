import img from "../../assets/images/hero-img copy2.png";

function Hero() {
  return (
    <section className="relative md:-translate-y-8  pt-10  md:py-36 xl:py-24 2xl:py-16 min-h-screen sm:min-h-auto bg-[#E8F0F1] bg-cover bg-center flex items-center px-5 sm:px-16 lg:px-40 xl:px-52 2xl:px-60">
      <div className="w-full flex flex-col md:flex-row gap-10 justify-between items-center">
        <div className="max-w-lg space-y-8">
          <div className="flex gap-2 w-fit rounded-full bg-white px-7 py-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-[#1CBCCF]"
            >
              <path
                fill="currentColor"
                d="M12 21q-.45 0-.862-.162t-.738-.488l-6.7-6.725q-.875-.875-1.287-2T2 9.275Q2 6.7 3.675 4.85T7.85 3q1.2 0 2.263.475T12 4.8q.8-.85 1.863-1.325T16.125 3q2.5 0 4.188 1.85T22 9.25q0 1.225-.425 2.35t-1.275 2l-6.725 6.75q-.325.325-.725.488T12 21m1-13q.25 0 .475.125t.35.325l1.7 2.55h4.15q.175-.425.263-.862t.087-.888q-.05-1.725-1.15-2.963t-2.75-1.237q-.775 0-1.487.3t-1.238.875l-.675.725q-.125.15-.325.238t-.4.087t-.4-.087t-.35-.238l-.675-.725q-.525-.575-1.225-.9T7.85 5Q6.2 5 5.1 6.263T4 9.25q0 .45.075.888t.25.862H9q.25 0 .475.125t.35.325l.875 1.3l1.35-4.05q.1-.3.362-.5T13 8m.3 3.25l-1.35 4.05q-.1.3-.375.5t-.6.2q-.25 0-.475-.125t-.35-.325L8.45 13H5.9l5.925 5.925q.05.05.088.063T12 19t.088-.012t.087-.063l5.9-5.925H15q-.25 0-.475-.125t-.375-.325z"
              />
            </svg>
            <span>LIVE YOUR LIFE</span>
          </div>
          <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            We Care About Your Health
          </h1>
          <p>
            Vitae aliquam vestibulum elit adipiscing massa diam in dignissim.
            Risus tellus libero elementum aliquam etiam. Lectus adipiscing est
            auctor mi quisque nunc non viverra est.
          </p>
          <a
            href=""
            className="bg-[#1CBCCF] text-sm sm:text-base hover:bg-[#1ca5b4] transition duration-300 text-white px-10 sm:px-15 tracking-widest py-3 sm:py-4 rounded-full"
          >
            CONTACT US
          </a>
        </div>

        <div className="">
          <img
            src={img}
            className="w-[260px] sm:w-[380px] md:w-[500px] lg:w-[600px]"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
