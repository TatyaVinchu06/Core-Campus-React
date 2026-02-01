import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import StudentDashboard from './pages/student/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import DashboardLayout from './components/layout/DashboardLayout';

import './assets/css/shared/utilities.css';

const ProtectedRoute = ({ children, role }: { children: React.ReactElement, role?: 'student' | 'teacher' }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Student Routes */}
      <Route element={
        <ProtectedRoute role="student">
          <DashboardLayout role="student" />
        </ProtectedRoute>
      }>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        {/* Add more student routes here */}
      </Route>

      {/* Teacher Routes */}
      <Route element={
        <ProtectedRoute role="teacher">
          <DashboardLayout role="teacher" />
        </ProtectedRoute>
      }>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
