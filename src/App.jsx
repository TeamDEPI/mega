import Landing from "./pages/Landing";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboardlayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicLayout from "./layouts/PublicLayout";
import { UserContext } from "./Contexts/UserContext";
import React, { useContext } from "react";
import ForgetPassword from "./pages/ForgetPassword";
import ClinicRegistration from "./pages/ClinicRegistration";
import ChatWidget from "./components/Chatbot";
import { dashboardRoutes } from "./config/routesConfig";
import { componentsMap } from "./componentsMap";
import ProtectedRoute from "./components/ProtectedRoute";
import ClinicsVisitorsPage from "./pages/ClinicsVisitorsPage";
import ClinicDoctorsPage from "./pages/ClinicDoctorsPage";
import Contactus from "./pages/ContactUS";

function App() {
  const { user, loading } = useContext(UserContext);
  return (
    <>
      {user && <ChatWidget />}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/contact-us" element={<Contactus />} />
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
        {/* <Route
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
          </Route> */}
        <Route
          path="/dashboard"
          element={<Dashboardlayout user={user} loading={loading} />}
        >
          {dashboardRoutes.map((route) => {
            const isRoleObjects = typeof route.roles[0] === "object";

            if (isRoleObjects) {
              const matched = route.roles.find(
                (r) => r.role === user?.usertype
              );

              const isDashboardHome = route.path === "/dashboard/";

              if (isDashboardHome) {
                return (
                  <Route
                    index
                    key="dashboard-home"
                    element={React.createElement(
                      componentsMap[matched?.element]
                    )}
                  />
                );
              }

              return (
                <Route
                  key={route.path}
                  element={
                    <ProtectedRoute
                      allowedRoles={route.roles.map((r) => r.role)}
                      user={user}
                    />
                  }
                >
                  <Route
                    path={route.path.replace("/dashboard/", "")}
                    element={React.createElement(
                      componentsMap[matched?.element]
                    )}
                  />
                </Route>
              );
            }

            return (
              <Route
                key={route.path}
                element={
                  <ProtectedRoute allowedRoles={route.roles} user={user} />
                }
              >
                <Route
                  path={route.path.replace("/dashboard/", "")}
                  element={React.createElement(componentsMap[route.element])}
                />
              </Route>
            );
          })}
        </Route>
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </>
  );
}
export default App;
