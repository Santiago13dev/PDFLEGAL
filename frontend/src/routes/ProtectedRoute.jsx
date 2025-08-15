// Donde tengo protejida mi ruta de autenticación
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{padding:16}}>Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
