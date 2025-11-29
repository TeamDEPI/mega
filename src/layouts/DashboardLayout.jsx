import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { useState } from "react";
import { LoadingPage } from "../components/loadingPage";

function DashboardLayout({ user, loading }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) {
    return <LoadingPage />;
  }
  if (!user) return <Navigate to="/" />;
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR SECTION - ثابت تماماً */}
      <div
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 fixed md:fixed inset-y-0 left-0 z-40
          w-64 bg-white shadow-xl border-r border-gray-200
          transition-transform duration-300 ease-in-out
          h-screen
        `}
      >
        <Sidebar />
      </div>

      {/* OVERLAY SECTION - Mobile only */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT SECTION - مع مسافة للسايد بار */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* MAIN CONTENT AREA - محتوى متحرك فقط */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
export default DashboardLayout;
