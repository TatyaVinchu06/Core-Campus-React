import React, { useState } from 'react';
import '../../assets/css/teacher/dashboard.css';
import '../../assets/css/teacher/assignments.css';
import TopBar from '../../components/layout/TopBar';

interface Assignment {
    id: number;
    title: string;
    subject: string;
    dueDate: string;
    status: 'active' | 'draft' | 'closed';
    submitted: number;
    total: number;
}

const TeacherAssignments: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const assignments: Assignment[] = [
        { id: 1, title: 'Binary Tree Implementation', subject: 'CS301', dueDate: 'Jan 30', status: 'active', submitted: 18, total: 32 },
        { id: 2, title: 'Database Normalization', subject: 'CS204', dueDate: 'Feb 02', status: 'active', submitted: 12, total: 45 },
        { id: 3, title: 'Graph Algorithms Project', subject: 'CS301', dueDate: 'Feb 15', status: 'draft', submitted: 0, total: 32 },
        { id: 4, title: 'SQL Queries Practice', subject: 'CS204', dueDate: 'Jan 20', status: 'closed', submitted: 45, total: 45 }
    ];

    const filteredAssignments = activeFilter === 'all'
        ? assignments
        : assignments.filter(a => a.status === activeFilter);

    const getProgress = (submitted: number, total: number) => {
        return Math.round((submitted / total) * 100);
    };

    return (
        <div>
            <TopBar title="Manage Assignments" />

            <div className="controls-section" style={{ padding: '1rem 1.5rem' }}>
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input type="text" id="searchInput" placeholder="Search assignments..." />
                </div>

                <div className="filter-tabs">
                    <button className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Items</button>
                    <button className={`filter-tab ${activeFilter === 'active' ? 'active' : ''}`} onClick={() => setActiveFilter('active')}>Active</button>
                    <button className={`filter-tab ${activeFilter === 'draft' ? 'active' : ''}`} onClick={() => setActiveFilter('draft')}>Drafts</button>
                    <button className={`filter-tab ${activeFilter === 'closed' ? 'active' : ''}`} onClick={() => setActiveFilter('closed')}>Past</button>
                </div>
            </div>

            <div className="assignments-container" style={{ padding: '0 1.5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {filteredAssignments.map(assignment => (
                    <div key={assignment.id} className="assignment-card" style={{
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div className="assignment-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div className="assignment-title">
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{assignment.title}</h3>
                                <p className="subject-tag" style={{ fontSize: '0.85rem', color: '#64748b' }}>{assignment.subject}</p>
                            </div>
                            <div className="assignment-actions">
                                <button className="btn-secondary edit-btn" style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                    <i className="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>

                        <div className="assignment-details" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            <div className="detail-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                                <i className="far fa-clock"></i>
                                <span>Due: {assignment.dueDate}</span>
                            </div>
                            <div className={`detail-item status-${assignment.status}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <i className="fas fa-circle" style={{ fontSize: '0.5rem' }}></i>
                                <span style={{ textTransform: 'capitalize' }}>{assignment.status}</span>
                            </div>
                        </div>

                        {assignment.status !== 'draft' && (
                            <div className="assignment-description">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{assignment.submitted}/{assignment.total} Submitted</span>
                                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{getProgress(assignment.submitted, assignment.total)}%</span>
                                </div>
                                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', marginTop: '5px' }}>
                                    <div style={{ height: '100%', background: '#3b82f6', width: `${getProgress(assignment.submitted, assignment.total)}%`, borderRadius: '3px' }}></div>
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', gap: '10px' }}>
                            {assignment.status === 'draft' ? (
                                <>
                                    <button style={{ flex: 1, padding: '8px', background: '#003366', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Publish</button>
                                    <button style={{ flex: 1, padding: '8px', background: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                                </>
                            ) : (
                                <>
                                    <button style={{ flex: 1, padding: '8px', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Review</button>
                                    <button style={{ flex: 1, padding: '8px', background: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherAssignments;
