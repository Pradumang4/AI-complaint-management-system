import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // 🔒 Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 🔒 Admin-only route
  if (adminOnly && username !== "admin") {
    return <Navigate to="/user-dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
