import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/shared/sidebar.css';

interface SidebarProps {
    role: 'student' | 'teacher';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
    const { user, logout } = useAuth();

    const studentMenu = [
        { label: 'Dashboard', path: '/student/dashboard', icon: 'fa-home' },
        { label: 'My Classes', path: '/student/classes', icon: 'fa-book' },
        { label: 'Assignments', path: '/student/assignments', icon: 'fa-tasks' },
        { label: 'Doubts', path: '/student/doubts', icon: 'fa-question-circle' },
        { label: 'Resources', path: '/student/resources', icon: 'fa-folder-open' },
    ];

    const teacherMenu = [
        { label: 'Dashboard', path: '/teacher/dashboard', icon: 'fa-home' },
        { label: 'My Classes', path: '/teacher/classes', icon: 'fa-chalkboard' },
        { label: 'Assignments', path: '/teacher/assignments', icon: 'fa-clipboard-list' },
        { label: 'Gradebook', path: '/teacher/grades', icon: 'fa-chart-bar' },
        { label: 'Schedule', path: '/teacher/schedule', icon: 'fa-calendar-alt' },
    ];

    const menu = role === 'student' ? studentMenu : teacherMenu;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <i className="fas fa-cube logo-icon"></i>
                <h2>CORE</h2>
            </div>

            <div className="nav-group">
                <div className="group-label">MENU</div>
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <i className={`fas ${item.icon}`}></i>
                        {item.label}
                    </NavLink>
                ))}
            </div>

            <div className="sidebar-footer">
                <div className="user-mini-profile">
                    <div className="avatar">
                        {user?.name.charAt(0)}
                    </div>
                    <div className="info">
                        <span className="name">{user?.name}</span>
                        <span className="role">{user?.role}</span>
                    </div>
                    <button onClick={logout} className="logout-btn" title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
