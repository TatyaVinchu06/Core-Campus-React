import React from 'react';
import '../../assets/css/teacher/dashboard.css';
import TopBar from '../../components/layout/TopBar';

const TeacherClasses: React.FC = () => {
    const classes = [
        {
            code: 'CS204',
            name: 'DBMS',
            section: 'Section A',
            students: 38,
            gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            schedule: 'Mon, Wed, Fri • 09:00 AM'
        },
        {
            code: 'CS303',
            name: 'DAA',
            section: 'Section B',
            students: 42,
            gradient: 'linear-gradient(135deg, #059669, #34d399)',
            schedule: 'Tue, Thu • 11:00 AM'
        },
        {
            code: 'CS305',
            name: 'ADPDBMS Lab',
            section: 'Lab Batch 1',
            students: 25,
            gradient: 'linear-gradient(135deg, #db2777, #f472b6)',
            schedule: 'Friday • 02:00 PM'
        }
    ];

    return (
        <div>
            <TopBar title="My Classes" />

            <div className="classes-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem',
                padding: '1.5rem'
            }}>
                {classes.map((cls) => (
                    <div key={cls.code} className="class-card" style={{
                        background: 'white',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}>
                        <div className="class-header" style={{
                            height: '120px',
                            background: cls.gradient,
                            padding: '1.5rem',
                            position: 'relative',
                            color: 'white'
                        }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{cls.name}</div>
                            <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>{cls.code} • {cls.section}</div>
                            <div style={{
                                position: 'absolute',
                                right: '1.5rem',
                                bottom: '-25px',
                                background: 'white',
                                borderRadius: '12px',
                                padding: '0.75rem 1.25rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <i className="fas fa-user-graduate" style={{ color: '#64748b' }}></i>
                                <span style={{ fontWeight: 600, color: '#0f172a' }}>{cls.students}</span>
                            </div>
                        </div>
                        <div className="class-body" style={{ padding: '2.5rem 1.5rem 1.5rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>SCHEDULE</div>
                                <div style={{ fontWeight: 500, color: '#0f172a' }}>
                                    <i className="far fa-clock" style={{ marginRight: '0.5rem', color: '#64748b' }}></i>
                                    {cls.schedule}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                <button style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: '#eff6ff',
                                    color: '#3b82f6',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}>
                                    <i className="fas fa-users"></i> View Students
                                </button>
                                <button style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'transparent',
                                    color: '#64748b',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}>
                                    <i className="fas fa-cog"></i> Settings
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherClasses;
