// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotAuthorized from './pages/NotAuthorized';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              allowedRoles={['patient', 'pharmacist', 'admin']}
            />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={['admin']}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
