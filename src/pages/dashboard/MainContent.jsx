import MyGraph from "../../components/dashboard/UsersGraph";

function MainContent() {
  return (
    <main className="min-h-screen p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Clinics Count */}
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-200 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Clinics</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">124</h2>
            </div>

            {/* CLINIC ICON */}
            <div className="h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21V8.25L12 3l9 5.25V21M9 21v-6h6v6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Pending Clinics */}
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-200 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Clinics</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">18</h2>
            </div>

            {/* CLOCK / PENDING ICON */}
            <div className="h-12 w-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l3 3m6-3A9 9 0 113 12a9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-200 transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Users</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">542</h2>
            </div>

            <div className="h-12 w-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MyGraph />
      </div>
    </main>
  );
}

export default MainContent;
