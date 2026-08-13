import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    // No token → redirect to sign-in
    return <Navigate to="/sign-in" replace />;
  }

  // Token exists → render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;
