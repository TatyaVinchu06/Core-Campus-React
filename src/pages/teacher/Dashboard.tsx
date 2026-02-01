import React from 'react';
import '../../assets/css/teacher/dashboard.css';
import TopBar from '../../components/layout/TopBar';

const TeacherDashboard: React.FC = () => {

    return (
        <div className="dashboard-page">
            <TopBar title="Dashboard" />

            <div className="dashboard-grid">

                <div className="welcome-section">
                    <div className="welcome-text">
                        <h2>Overview</h2>
                        <p>Track your classes and student performance.</p>
                    </div>
                    <div className="quick-actions">
                        <button className="action-btn"><i className="fas fa-plus"></i> New Assignment</button>
                        <button className="action-btn outline"><i className="fas fa-envelope"></i> Message Class</button>
                    </div>
                </div>

                <div className="stats-container">
                    <div className="stat-card">
                        <div className="icon-box blue">
                            <i className="fas fa-layer-group"></i>
                        </div>
                        <div className="stat-info">
                            <h3>3</h3>
                            <p>Active Batches</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="icon-box gold">
                            <i className="fas fa-clipboard-check"></i>
                        </div>
                        <div className="stat-info">
                            <h3>12</h3>
                            <p>Pending Reviews</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="icon-box green">
                            <i className="fas fa-user-graduate"></i>
                        </div>
                        <div className="stat-info">
                            <h3>145</h3>
                            <p>Total Students</p>
                        </div>
                    </div>
                </div>

                <div className="content-split">

                    {/* Main Column */}
                    <div className="section-container">
                        <div className="section-header">
                            <h3>Recent Submissions</h3>
                            <a href="/teacher/assignments">View All</a>
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #cbd5e1' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600 }}>Student</th>
                                    <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600 }}>Assignment</th>
                                    <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: '1rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>Aditya Kumar</td>
                                    <td style={{ color: '#64748b' }}>React Components</td>
                                    <td><span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>On Time</span></td>
                                    <td style={{ textAlign: 'right', paddingRight: '1rem' }}><button style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Grade</button></td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>Riya Singh</td>
                                    <td style={{ color: '#64748b' }}>Database Schema</td>
                                    <td><span style={{ background: '#fffbeb', color: '#f59e0b', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>Late</span></td>
                                    <td style={{ textAlign: 'right', paddingRight: '1rem' }}><button style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Grade</button></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>Arjun Mehta</td>
                                    <td style={{ color: '#64748b' }}>React Components</td>
                                    <td><span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>On Time</span></td>
                                    <td style={{ textAlign: 'right', paddingRight: '1rem' }}><button style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Grade</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Sidebar Right Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Today's Schedule */}
                        <div className="section-container">
                            <div className="section-header">
                                <h3>Today's Schedule</h3>
                            </div>
                            <div className="deadline-card">
                                <div className="task-icon">
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </div>
                                <div className="task-content">
                                    <h4>CS301 - Web Dev</h4>
                                    <div className="task-meta">
                                        <span><i className="far fa-clock"></i> 09:00 - 10:30</span>
                                        <span>Lecture Hall A</span>
                                    </div>
                                </div>
                            </div>
                            <div className="deadline-card">
                                <div className="task-icon">
                                    <i className="fas fa-users"></i>
                                </div>
                                <div className="task-content">
                                    <h4>Department Meeting</h4>
                                    <div className="task-meta">
                                        <span><i className="far fa-clock"></i> 11:30 - 12:15</span>
                                        <span>Conf Room 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* My Classes */}
                        <div className="section-container">
                            <div className="section-header">
                                <h3>My Classes</h3>
                            </div>

                            <div className="feed-item" style={{ cursor: 'pointer' }}>
                                <div style={{ width: '40px', height: '40px', background: '#7c3aed', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>DB</div>
                                <div>
                                    <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>DBMS</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>CS204 • 38 Students</p>
                                </div>
                            </div>

                            <div className="feed-item" style={{ cursor: 'pointer', marginTop: '10px' }}>
                                <div style={{ width: '40px', height: '40px', background: '#059669', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>DA</div>
                                <div>
                                    <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>DAA</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>CS303 • 42 Students</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
