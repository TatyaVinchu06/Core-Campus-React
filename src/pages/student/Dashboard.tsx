import React from 'react';
import '../../assets/css/student/dashboard.css';
import { useAuth } from '../../context/AuthContext';
import TopBar from '../../components/layout/TopBar';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();

    // EXACT MOCK DATA from legacy dashboard.js
    const data = {
        stats: [
            { label: 'Pending Assignments', value: 4, icon: 'fa-layer-group', color: 'blue' },
            { label: 'Completed This Week', value: 12, icon: 'fa-check-circle', color: 'green' },
            { label: 'Upcoming Events', value: 3, icon: 'fa-calendar-day', color: 'gold' }
        ],
        deadlines: [
            { title: 'Data Structures Lab 5', subject: 'CS301', due: 'Tomorrow, 11:59 PM', progress: 80, urgency: 'high' },
            { title: 'Web Development Project', subject: 'CS302', due: 'Jan 28, 2026', progress: 60, urgency: 'medium' },
            { title: 'Database Schema Design', subject: 'CS304', due: 'Feb 02, 2026', progress: 25, urgency: 'low' }
        ],
        feed: [
            { title: 'New Assignment Posted', desc: 'Prof. Sharma added "Binary Search Tree"', time: '2 hours ago', icon: 'fa-plus-circle' },
            { title: 'Notes Uploaded', desc: 'Unit 3: Normalization PDFs are available.', time: '5 hours ago', icon: 'fa-file-alt' },
            { title: 'Club Event', desc: 'Robotics Club meeting at 5 PM today.', time: '1 day ago', icon: 'fa-users' }
        ]
    };

    return (
        <div className="dashboard-page">
            <TopBar title="Dashboard" />

            <div className="dashboard-grid">

                {/* Welcome Section */}
                <div className="welcome-section">
                    <div className="welcome-text">
                        <h2 id="greeting">Welcome back, {user?.name.split(' ')[0]}!</h2>
                        <p>You have <strong>{data.stats[0].value} assignments</strong> due soon and <strong>{data.stats[2].value} event{data.stats[2].value !== 1 ? 's' : ''}</strong> today.</p>
                    </div>
                    <div className="quick-actions">
                        <button className="action-btn" onClick={() => window.location.href = '/student/assignments'}><i className="fas fa-plus"></i> New Submission</button>
                        <button className="action-btn outline" onClick={() => window.location.href = '/student/doubts'}><i className="fas fa-hand-paper"></i> Ask Doubt</button>
                    </div>
                </div>

                {/* Stats Row - EXACT from legacy */}
                <div className="stats-container" id="stats-row">
                    {data.stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className={`icon-box ${stat.color}`}>
                                <i className={`fas ${stat.icon}`}></i>
                            </div>
                            <div className="stat-info">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="content-split">

                    {/* Upcoming Deadlines - EXACT from legacy */}
                    <div className="section-container">
                        <div className="section-header">
                            <h3>Upcoming Deadlines</h3>
                            <a href="/student/assignments">View All</a>
                        </div>
                        <div className="card-list" id="deadlines-list">
                            {data.deadlines.map((item, index) => {
                                const urgencyColor = item.urgency === 'high' ? 'red' : (item.urgency === 'medium' ? 'orange' : 'green');
                                const progressBg = item.urgency === 'high' ? '#ef4444' : '#003366';

                                return (
                                    <div key={index} className="deadline-card">
                                        <div className="task-icon"><i className="fas fa-laptop-code"></i></div>
                                        <div className="task-content">
                                            <h4>{item.title}</h4>
                                            <div className="task-meta">
                                                <span><span className={`urgency-dot ${urgencyColor}`}></span> {item.due}</span>
                                                <span>• {item.subject}</span>
                                            </div>
                                            <div className="progress-track">
                                                <div className="progress-fill" style={{ width: `${item.progress}%`, background: progressBg }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Campus Feed - EXACT from legacy */}
                    <div className="section-container">
                        <div className="section-header">
                            <h3>Campus Feed</h3>
                            <div className="filter-dots">
                                <span className="dot active"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                        <div className="feed-list" id="activity-feed">
                            {data.feed.map((item, index) => (
                                <div key={index} className="feed-item">
                                    <div className="feed-icon"><i className={`fas ${item.icon}`}></i></div>
                                    <div className="feed-text">
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                        <span className="time">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
