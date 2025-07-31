import React, { createContext, useContext, useState } from 'react';

// Contexto de autenticación para compartir estado de usuario y token
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  /**
   * Inicia sesión estableciendo usuario y token en el estado global y en localStorage.
   * @param {Object} userData
   * @param {string} jwt
   */
  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwt);
  };

  /**
   * Cierra sesión limpiando el estado global y eliminando valores del localStorage.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personalizado para consumir el contexto de autenticación.
 * @returns {ReturnType<typeof AuthProvider>['value']}
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
