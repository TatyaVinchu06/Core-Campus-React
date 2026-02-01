import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import StudentDashboard from './pages/student/Dashboard';
import StudentAssignments from './pages/student/Assignments';
import StudentClasses from './pages/student/Classes';
import StudentDoubts from './pages/student/Doubts';
import StudentResources from './pages/student/Resources';
import StudentWorkspace from './pages/student/Workspace';
import StudentMessages from './pages/student/Messages';
import StudentNotices from './pages/student/Notices';
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherAssignments from './pages/teacher/Assignments';
import TeacherClasses from './pages/teacher/Classes';
import Gradebook from './pages/teacher/Gradebook';
import Schedule from './pages/teacher/Schedule';
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
        <Route path="/student/classes" element={<StudentClasses />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/doubts" element={<StudentDoubts />} />
        <Route path="/student/resources" element={<StudentResources />} />
        <Route path="/student/workspace" element={<StudentWorkspace />} />
        <Route path="/student/messages" element={<StudentMessages />} />
        <Route path="/student/notices" element={<StudentNotices />} />
      </Route>

      {/* Teacher Routes */}
      <Route element={
        <ProtectedRoute role="teacher">
          <DashboardLayout role="teacher" />
        </ProtectedRoute>
      }>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/grades" element={<Gradebook />} />
        <Route path="/teacher/schedule" element={<Schedule />} />
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
