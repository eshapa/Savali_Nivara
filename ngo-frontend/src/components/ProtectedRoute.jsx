import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  if (requiredRole === "admin") {
    if (!adminToken) {
      // If attempting to access an admin route without admin token, redirect to home or login
      return <Navigate to="/signup" replace />; // Admin login is /signup currently
    }
    return children;
  }

  if (requiredRole === "user") {
    if (!userToken && !adminToken) {
      // If neither user nor admin, lock it.
      // But we will handle Donate lock within Donate itself as per requirements ('locked premium card').
      // So maybe we don't strictly redirect here if we want the locked UI to show.
      // Wait, let's keep the user strictly out if they try to access 'my-donations'.
      return <Navigate to="/user-login" replace />;
    }
    return children;
  }

  return children;
};

export default ProtectedRoute;
