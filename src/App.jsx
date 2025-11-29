import Landing from "./pages/Landing";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboardlayout from "./layouts/DashboardLayout";
import MainContent from "./pages/dashboard/MainContent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicLayout from "./layouts/PublicLayout";
import { UserContext } from "./Contexts/UserContext";
import React, { useContext } from "react";
import ForgetPassword from "./pages/ForgetPassword";
import ClinicRegistration from "./pages/ClinicRegistration";
import ChangePassword from "./pages/dashboard/ChangePassword";
import ClinicRequests from "./pages/dashboard/ClinicRequests";
import ClinicDoctors from "./pages/dashboard/ClinicDoctors";
import CreateDoctorAccount from "./pages/dashboard/CreateDoctorAccount";
import ClinicsPage from "./pages/dashboard/ClinicsPage";
import ClinicUsersPage from "./pages/dashboard/ClinicUsers";
import ChatWidget from "./components/Chatbot";
import DoctorSchedules from "./pages/dashboard/DoctorSchedules";
import { dashboardRoutes } from "./config/routesConfig";
import { componentsMap } from "./componentsMap";
import ProtectedRoute from "./components/ProtectedRoute";
import ClinicsVisitorsPage from "./pages/ClinicsVisitorsPage";
import ClinicDoctorsPage from "./pages/ClinicDoctorsPage";

function App() {
  const { user, loading } = useContext(UserContext);
  return (
    <>
      {user && <ChatWidget />}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/clinics" element={<ClinicsVisitorsPage />} />
          <Route path="/clinic/:id/doctors" element={<ClinicDoctorsPage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/forget-password"
            element={user ? <Navigate to="/dashboard" /> : <ForgetPassword />}
          />
          <Route
            path="/clinic-register"
            element={
              user ? <Navigate to="/dashboard" /> : <ClinicRegistration />
            }
          />
        </Route>
        <Route
          path="/dashboard"
          element={<Dashboardlayout user={user} loading={loading} />}
        >
          {dashboardRoutes
            // .filter((c) => c.roles.includes(user?.usertype))
            .map((route) => (
              <Route
                key={route.path}
                element={
                  <ProtectedRoute allowedRoles={route.roles} user={user} />
                }
              >
                <Route
                  index={
                    route.path === "/dashboard/" || route.path === "/dashboard"
                  }
                  path={route.path.replace("/dashboard/", "")}
                  element={React.createElement(componentsMap[route.element])}
                />
              </Route>
            ))}
        </Route>
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </>
  );
}
export default App;
