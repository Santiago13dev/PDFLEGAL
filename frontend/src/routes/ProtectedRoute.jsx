//Aquí definimos qué URL carga cada page
import React from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../store/auth.jsx";
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
