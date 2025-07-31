import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import DocumentForm from '../forms/DocumentForm';
import Preview from '../pages/Preview';
import AdminTemplates from '../pages/AdminTemplates';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * Define todas las rutas de la aplicación en un solo componente. Al separar
 * las rutas en su propio módulo, se mejora la organización y se facilita el
 * mantenimiento conforme la aplicación crece.
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/form/:id"
      element={
        <ProtectedRoute>
          <DocumentForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/preview/:id"
      element={
        <ProtectedRoute>
          <Preview />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/templates"
      element={
        <ProtectedRoute roles={['admin']}>
          <AdminTemplates />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
