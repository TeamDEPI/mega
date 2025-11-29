import logo from "../assets/images/logo.png";
function Footer() {
  return (
    <section>
      <div className="border border-[#1CBCCF]/40 rounded-t-[60px] sm:rounded-t-[100px] md:rounded-t-[200px] pt-16">
        <div
          className="px-5 sm:px-16 lg:px-40 xl:px-52 2xl:px-60 
                    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 
                    gap-10"
        >
          <div className="space-y-5 max-w-[300px]">
            <img src={logo} className="w-40 sm:w-48" alt="logo" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              maiores corrupti quia, amet ea, quidem harum explicabo.
            </p>

            <div className="flex gap-3 sm:gap-5 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-2xl border border-gray-100 p-2 shadow-md hover:shadow-lg transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className="text-[#1CBCCF]"
                  >
                    <path
                      fill="currentColor"
                      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84
                     3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2
                     c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#1CBCCF] font-bold text-lg">Product</h3>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Case studies</a>
              <a href="#">Reviews</a>
              <a href="#">Updates</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#1CBCCF] font-bold text-lg">Company</h3>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <a href="#">About</a>
              <a href="#">Contact us</a>
              <a href="#">Careers</a>
              <a href="#">Culture</a>
              <a href="#">Blog</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#1CBCCF] font-bold text-lg">Support</h3>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <a href="#">Getting started</a>
              <a href="#">Help center</a>
              <a href="#">Server status</a>
              <a href="#">Report a bug</a>
              <a href="#">Chat support</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#1CBCCF] font-bold text-lg">Contact us</h3>
            <div className="flex flex-col gap-3 text-gray-700 text-sm">
              <a href="#" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="text-[#1CBCCF]"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="16" height="12" x="4" y="6" rx="2" />
                    <path d="m4 9l7.106 3.553a2 2 0 0 0 1.788 0L20 9" />
                  </g>
                </svg>
                <span>contact@company.com</span>
              </a>

              <a href="#" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="text-[#1CBCCF]"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M5.733 2.043c1.217-1.21 3.221-.995 4.24.367l1.262 
                1.684c.83 1.108.756 2.656-.229 3.635l-.238.238..."
                  />
                </svg>
                <span>(414) 687 - 5892</span>
              </a>

              <a href="#" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="text-[#1CBCCF]"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 1 1 16 0Z"
                  />
                </svg>
                <span>794 Mcallister St, San Francisco</span>
              </a>
            </div>
          </div>
        </div>

        <div className="h-1 w-[80%] mx-auto bg-gray-100 mt-10 rounded-full"></div>

        <div className="text-center sm:flex sm:justify-between sm:px-16 lg:px-40 xl:px-52 2xl:px-60 py-5 text-sm text-gray-600 gap-2">
          <div>Copyright Â© 2025</div>
          <div>
            All Rights Reserved |
            <a href="#" className="text-blue-500 underline mx-1">
              Terms
            </a>{" "}
            |
            <a href="#" className="text-blue-500 underline ml-1">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
