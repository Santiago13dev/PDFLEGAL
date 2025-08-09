import React from 'react'; import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx'; import Login from './pages/Login.jsx'; import Register from './pages/Register.jsx'; import Dashboard from './pages/Dashboard.jsx'; import Upload from './pages/Upload.jsx'; import Form from './pages/Form.jsx'; import Preview from './pages/Preview.jsx'; import Search from './pages/Search.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx'; import { AuthProvider } from './store/auth.js';
export default function App(){ return (<AuthProvider><Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/search' element={<Search/>}/>
  <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
  <Route path='/upload' element={<ProtectedRoute><Upload/></ProtectedRoute>}/>
  <Route path='/form/:id' element={<ProtectedRoute><Form/></ProtectedRoute>}/>
  <Route path='/preview/:id' element={<ProtectedRoute><Preview/></ProtectedRoute>}/>
  <Route path='*' element={<Navigate to='/' replace/>}/>
</Routes></AuthProvider>); }
