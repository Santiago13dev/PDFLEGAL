import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

/**
 * Componente que protege rutas de React Router. Redirige a la página de inicio
 * de sesión si el usuario no está autenticado. También puede restringir el
 * acceso por roles (por ejemplo, solo administradores).
 *
 * @param {{children: React.ReactNode, roles?: string[]}} props
 */
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
