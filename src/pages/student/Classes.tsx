import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/student/dashboard.css';
import TopBar from '../../components/layout/TopBar';

const StudentClasses: React.FC = () => {
    const navigate = useNavigate();
    const classes = [
        {
            id: 1,
            classId: 'cs204',
            code: 'CS204',
            name: 'DBMS',
            professor: 'Prof. Gupta',
            gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            nextDue: 'Normalization Quiz',
            icon: 'fa-file-alt',
            iconColor: '#7c3aed',
            announcement: 'Lab exam schedule has been updated. Check the shared schedule folder.',
            announcementIcon: 'fa-bullhorn',
            announcementColor: '#f59e0b'
        },
        {
            id: 2,
            classId: 'cs303',
            code: 'CS303',
            name: 'DAA',
            professor: 'Dr. Alan',
            gradient: 'linear-gradient(135deg, #059669, #34d399)',
            nextDue: 'Dynamic Programming',
            icon: 'fa-code-branch',
            iconColor: '#059669',
            announcement: 'Chapter 4 notes have been uploaded.',
            announcementIcon: 'fa-clipboard-check',
            announcementColor: '#059669'
        },
        {
            id: 3,
            classId: 'cs305',
            code: 'CS305',
            name: 'ADPDBMS Lab',
            professor: 'Ms. Roberts',
            gradient: 'linear-gradient(135deg, #db2777, #f472b6)',
            nextDue: 'Complex Queries Log',
            icon: 'fa-database',
            iconColor: '#db2777',
            announcement: "Don't forget to submit your lab manual by EOD.",
            announcementIcon: 'fa-exclamation-circle',
            announcementColor: '#ef4444'
        }
    ];

    return (
        <div>
            <TopBar title="My Classes" />

            <div style={{ padding: '1.5rem' }}>
                <div className="classes-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    {classes.map(cls => (
                        <div
                            key={cls.id}
                            className="class-card"
                            onClick={() => navigate(`/student/class/${cls.classId}`)}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e2e8f0',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            <div className="class-header" style={{
                                height: '100px',
                                background: cls.gradient,
                                padding: '1.5rem',
                                position: 'relative'
                            }}>
                                <div className="class-title" style={{
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: 700
                                }}>{cls.name}</div>
                                <div className="class-subtitle" style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '0.9rem'
                                }}>{cls.code} • {cls.professor}</div>
                                <div className="teacher-avatar" style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    right: '1.5rem',
                                    bottom: '-30px',
                                    border: '4px solid white',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${cls.professor.replace(' ', '+')}&background=${cls.gradient.match(/#([0-9a-f]{6})/i)?.[1] || '003366'}&color=fff`}
                                        width="100%"
                                        alt={cls.professor}
                                    />
                                </div>
                            </div>
                            <div className="class-body" style={{
                                padding: '2.5rem 1.5rem 1.5rem'
                            }}>
                                <div style={{ marginBottom: '10px', color: '#64748b', fontSize: '0.9rem' }}>
                                    NEXT DUE
                                </div>
                                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '5px' }}>
                                    <i className={`fas ${cls.icon}`} style={{ color: cls.iconColor }}></i> {cls.nextDue}
                                </div>
                                <div className="stream-preview" style={{
                                    marginTop: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid #f1f5f9'
                                }}>
                                    <div className="announcement" style={{
                                        fontSize: '0.9rem',
                                        color: '#475569',
                                        marginBottom: '0.5rem',
                                        display: 'flex',
                                        gap: '10px'
                                    }}>
                                        <i className={`fas ${cls.announcementIcon}`} style={{ color: cls.announcementColor, marginTop: '3px' }}></i>
                                        <span>{cls.announcement}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentClasses;
