import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/shared/sidebar.css';

interface SidebarProps {
    role: 'student' | 'teacher';
}

interface MenuItem {
    label: string;
    path: string;
    icon: string;
}

interface StudentMenu {
    academics: MenuItem[];
    campus: MenuItem[];
}

interface TeacherMenu {
    teacherPanel: MenuItem[];
    communication: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
    const { user, logout } = useAuth();

    const studentMenu: StudentMenu = {
        academics: [
            { label: 'Dashboard', path: '/student/dashboard', icon: 'fa-home' },
            { label: 'Assignments', path: '/student/assignments', icon: 'fa-code' },
            { label: 'My Classes', path: '/student/classes', icon: 'fa-desktop' },
            { label: 'Code Editor', path: '/student/workspace', icon: 'fa-laptop-code' },
            { label: 'Resources', path: '/student/resources', icon: 'fa-copy' },
            { label: 'Doubts', path: '/student/doubts', icon: 'fa-question-circle' },
        ],
        campus: [
            { label: 'Notices', path: '/student/notices', icon: 'fa-bullhorn' },
            { label: 'Messages', path: '/student/messages', icon: 'fa-envelope' },
        ]
    };

    const teacherMenu: TeacherMenu = {
        teacherPanel: [
            { label: 'Dashboard', path: '/teacher/dashboard', icon: 'fa-home' },
            { label: 'Classes', path: '/teacher/classes', icon: 'fa-chalkboard-teacher' },
            { label: 'Assignments', path: '/teacher/assignments', icon: 'fa-list' },
            { label: 'Grade Book', path: '/teacher/grades', icon: 'fa-book' },
            { label: 'Resources', path: '/teacher/resources', icon: 'fa-folder-open' },
        ],
        communication: [
            { label: 'Schedule', path: '/teacher/schedule', icon: 'fa-calendar-alt' },
            { label: 'Messages', path: '/teacher/messages', icon: 'fa-envelope' },
            { label: 'Doubts', path: '/teacher/doubts', icon: 'fa-question-circle' },
            { label: 'Notices', path: '/teacher/notices', icon: 'fa-bullhorn' },
        ]
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <i className="fas fa-cube logo-icon"></i>
                <h2>Spark Tech</h2>
            </div>

            {role === 'student' ? (
                <>
                    <div className="nav-group">
                        <div className="group-label">ACADEMICS</div>
                        {studentMenu.academics.map((item: MenuItem) => (
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

                    <div className="nav-group">
                        <div className="group-label">CAMPUS</div>
                        {studentMenu.campus.map((item: MenuItem) => (
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
                </>
            ) : (
                <>
                    <div className="nav-group">
                        <div className="group-label">TEACHER PANEL</div>
                        {teacherMenu.teacherPanel.map((item: MenuItem) => (
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

                    <div className="nav-group">
                        <div className="group-label">COMMUNICATION</div>
                        {teacherMenu.communication.map((item: MenuItem) => (
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
                </>
            )}

            <div className="sidebar-footer">
                <div className="user-mini-profile">
                    <div className="avatar">
                        {user?.name.charAt(0)}
                    </div>
                    <div className="info">
                        <span className="name">{role === 'student' ? 'Student User' : user?.name}</span>
                        <span className="role">{role === 'student' ? `Student ID: ${user?.id}` : 'Faculty'}</span>
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
