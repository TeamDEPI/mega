import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, user }) {
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user .usertype)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
