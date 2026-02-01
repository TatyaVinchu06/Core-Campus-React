import React from 'react';
import '../../assets/css/teacher/dashboard.css';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard: React.FC = () => {
    const { logout, user } = useAuth();

    return (
        <div className="app-container">
            {/* Sidebar Placeholder */}
            <div className="sidebar" style={{ width: '250px', background: '#003366', color: 'white', padding: '1rem' }}>
                <h2>TEACHER</h2>
                <p>Welcome {user?.name}</p>
                <button onClick={logout} style={{ marginTop: 'auto' }}>Logout</button>
            </div>

            <div className="main-content">
                <div className="top-bar">
                    <div className="page-title">
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <div className="dashboard-grid">
                    <div className="welcome-section">
                        <div className="welcome-text">
                            <h2>Good Morning, {user?.name}!</h2>
                            <p>You have 3 lectures today.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
