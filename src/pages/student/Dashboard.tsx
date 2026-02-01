import React from 'react';
import '../../assets/css/student/dashboard.css';
import { useAuth } from '../../context/AuthContext';
import TopBar from '../../components/layout/TopBar';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-page">
            <TopBar title="Dashboard" />

            <div className="dashboard-grid">

                {/* Welcome Section */}
                <div className="welcome-section">
                    <div className="welcome-text">
                        <h2 id="greeting">Welcome back, {user?.name.split(' ')[0]}!</h2>
                        <p>You have <strong>2 assignments</strong> due soon and <strong>1 event</strong> today.</p>
                    </div>
                    <div className="quick-actions">
                        <button className="action-btn" onClick={() => window.location.href = '/student/assignments'}><i className="fas fa-plus"></i> New Submission</button>
                        <button className="action-btn outline" onClick={() => window.location.href = '/student/doubts'}><i className="fas fa-hand-paper"></i> Ask Doubt</button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="stats-container" id="stats-row">
                    {/* Static Stats for now matching legacy look */}
                    <div className="stat-card">
                        <div className="icon-box blue"><i className="fas fa-book-open"></i></div>
                        <div className="stat-info">
                            <h3>8.5</h3>
                            <p>CGPA</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="icon-box green"><i className="fas fa-check-circle"></i></div>
                        <div className="stat-info">
                            <h3>92%</h3>
                            <p>Attendance</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="icon-box gold"><i className="fas fa-trophy"></i></div>
                        <div className="stat-info">
                            <h3>#5</h3>
                            <p>Rank</p>
                        </div>
                    </div>
                </div>

                <div className="content-split">

                    {/* Upcoming Deadlines */}
                    <div className="section-container">
                        <div className="section-header">
                            <h3>Upcoming Deadlines</h3>
                            <a href="/student/assignments">View All</a>
                        </div>
                        <div className="card-list" id="deadlines-list">
                            {/* Mock Data */}
                            <div className="deadline-card">
                                <div className="task-icon"><i className="fas fa-code"></i></div>
                                <div className="task-content">
                                    <h4>DBMS Lab Experiment 5</h4>
                                    <div className="task-meta">
                                        <span className="urgency-dot orange"></span> Due Tomorrow
                                    </div>
                                    <div className="progress-track">
                                        <div className="progress-fill" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="deadline-card">
                                <div className="task-icon"><i className="fas fa-file-alt"></i></div>
                                <div className="task-content">
                                    <h4>DAA Research Paper</h4>
                                    <div className="task-meta">
                                        <span className="urgency-dot red"></span> Due Today
                                    </div>
                                    <div className="progress-track">
                                        <div className="progress-fill" style={{ width: '30%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Campus Feed */}
                    <div className="section-container">
                        <div className="section-header">
                            <h3>Campus Feed</h3>
                            <div className="filter-dots">
                                <span className="dot active"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                        <div className="feed-list" id="activity-feed">
                            <div className="feed-item">
                                <div className="feed-icon"><i className="fas fa-bullhorn"></i></div>
                                <div className="feed-text">
                                    <h4>Hackathon Registration Open</h4>
                                    <p>Register for CodeWars 2026 by Friday.</p>
                                    <span className="time">2 hours ago</span>
                                </div>
                            </div>
                            <div className="feed-item">
                                <div className="feed-icon"><i className="fas fa-user-graduate"></i></div>
                                <div className="feed-text">
                                    <h4>Placement Drive</h4>
                                    <p>TCS Ninja drive scheduled for next week.</p>
                                    <span className="time">5 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
