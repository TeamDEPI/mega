import logo from "../assets/images/logo.png";

function Footer() {
  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95",
      label: "Facebook",
    },
    {
      href: "https://twitter.com",
      icon: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
      label: "Twitter",
    },
    {
      href: "https://instagram.com",
      icon: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.555.555.9 1.112 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.555.555-1.112.9-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
      label: "Instagram",
    },
    {
      href: "https://linkedin.com",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      label: "LinkedIn",
    },
  ];

  const baseUrl = "/mega";

  return (
    <section>
      <div className="border border-[#1CBCCF]/40 rounded-t-[60px] sm:rounded-t-[100px] md:rounded-t-[200px] pt-16">
        <div
          className="px-5 sm:px-16 lg:px-40 xl:px-52 2xl:px-60 
                    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                    gap-10"
        >
          <div className="space-y-5 max-w-[300px]">
            <img src={logo} className="w-40 sm:w-48" alt="logo" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              maiores corrupti quia, amet ea, quidem harum explicabo.
            </p>

            <div className="flex gap-3 sm:gap-5 flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-gray-100 p-2 shadow-md hover:shadow-lg hover:scale-110 hover:border-[#1CBCCF] transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className="text-[#1CBCCF] hover:text-[#1a9ba8] transition-colors duration-300"
                  >
                    <path fill="currentColor" d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#1CBCCF] font-bold text-lg">Contact us</h3>
            <div className="flex flex-col gap-3 text-gray-700 text-sm">
              <a
                href="mailto:contact@insove.com"
                className="flex items-center gap-2 hover:text-[#1CBCCF] transition-colors duration-300"
              >
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
                <span>contact@insove.com</span>
              </a>

              <a
                href="tel:+14146875892"
                className="flex items-center gap-2 hover:text-[#1CBCCF] transition-colors duration-300"
              >
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
                    d="M5.733 2.043c1.217-1.21 3.221-.995 4.24.367l1.262 1.684c.83 1.108.756 2.656-.229 3.635l-.238.238c-.238.237-.374.56-.374.9 0 .67.408 1.585 1.308 2.485.9.9 1.814 1.308 2.485 1.308.34 0 .663-.136.9-.374l.238-.238c.98-.985 2.527-1.059 3.635-.229l1.684 1.262c1.362 1.019 1.577 3.023.367 4.24l-1.368 1.368c-.845.845-2.07 1.187-3.232.84-1.617-.496-3.748-1.594-6.393-4.239-2.645-2.645-3.743-4.776-4.239-6.393-.347-1.162-.005-2.387.84-3.232z"
                  />
                </svg>
                <span>(414) 687 - 5892</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-2 hover:text-[#1CBCCF] transition-colors duration-300"
              >
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

          <div className="space-y-4">
            <h3 className="text-[#1CBCCF] font-bold text-lg">Quick Links</h3>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              <a
                href={`${baseUrl}/`}
                className="hover:text-[#1CBCCF] hover:underline transition-all duration-300"
              >
                Home
              </a>
              <a
                href={`${baseUrl}/clinics`}
                className="hover:text-[#1CBCCF] hover:underline transition-all duration-300"
              >
                Clinics
              </a>
              <a
                href={`${baseUrl}/login`}
                className="hover:text-[#1CBCCF] hover:underline transition-all duration-300"
              >
                Login
              </a>
              <a
                href={`${baseUrl}/register`}
                className="hover:text-[#1CBCCF] hover:underline transition-all duration-300"
              >
                Register
              </a>
              <a
                href={`${baseUrl}/clinic-register`}
                className="hover:text-[#1CBCCF] hover:underline transition-all duration-300"
              >
                Apply as Clinic
              </a>
            </div>
          </div>
        </div>

        <div className="h-1 w-[80%] mx-auto bg-gray-100 mt-10 rounded-full"></div>

        <div className="text-center sm:flex sm:justify-between sm:px-16 lg:px-40 xl:px-52 2xl:px-60 py-5 text-sm text-gray-600 gap-2">
          <div>Copyright © 2025</div>
          <div>
            All Rights Reserved |
            <a
              href={`${baseUrl}/terms`}
              className="text-blue-500 underline mx-1 hover:text-blue-600 transition-colors duration-300"
            >
              Terms
            </a>{" "}
            |
            <a
              href={`${baseUrl}/privacy`}
              className="text-blue-500 underline ml-1 hover:text-blue-600 transition-colors duration-300"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
