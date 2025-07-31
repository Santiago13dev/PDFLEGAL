import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

/**
 * Barra de navegación principal. Muestra enlaces diferentes dependiendo de si
 * el usuario está autenticado o no. También permite cerrar sesión.
 */
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          PDFLEGAL
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-gray-700">Hola, {user?.name}</span>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin/templates"
                  className="text-gray-600 hover:text-indigo-600 font-medium"
                >
                  Administrar
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
