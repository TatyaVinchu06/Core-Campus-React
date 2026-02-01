import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/css/student/dashboard.css';

const ClassDetail: React.FC = () => {
    const { classId } = useParams();
    const navigate = useNavigate();

    // Mock class data
    const classData: any = {
        'cs204': { code: 'CS204', name: 'DBMS', professor: 'Prof. Gupta', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)' },
        'cs303': { code: 'CS303', name: 'DAA', professor: 'Dr. Alan', gradient: 'linear-gradient(135deg, #059669, #34d399)' },
        'cs305': { code: 'CS305', name: 'ADPDBMS Lab', professor: 'Ms. Roberts', gradient: 'linear-gradient(135deg, #db2777, #f472b6)' }
    };

    const cls = classData[classId || 'cs204'];

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Back Button */}
            <button
                onClick={() => navigate('/student/classes')}
                style={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <i className="fas fa-arrow-left"></i> Back to Classes
            </button>

            {/* Class Banner */}
            <div style={{
                height: '200px',
                background: cls.gradient,
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: 'white',
                marginBottom: '2rem'
            }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{cls.name}</h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>{cls.code} • {cls.professor}</p>
            </div>

            {/* Stream Container */}
            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                {/* Upcoming Work */}
                <aside style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    height: 'fit-content'
                }}>
                    <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>Upcoming</h4>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Due Monday</div>
                    <div style={{ fontWeight: 500, color: '#0f172a' }}>Lab Assignment 4</div>
                    <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                        <a href="#" style={{ fontSize: '0.85rem', color: '#003366', fontWeight: 600 }}>View all</a>
                    </div>
                </aside>

                {/* Stream Feed */}
                <section>
                    {/* Post Input */}
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        marginBottom: '1.5rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        cursor: 'pointer'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: '#003366',
                            borderRadius: '50%',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        }}>U</div>
                        <div style={{ color: '#64748b' }}>Announce something to your class...</div>
                    </div>

                    {/* Post 1 */}
                    <div style={{
                        background: 'white',
                        border: '1px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: '#0f172a',
                                borderRadius: '50%',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold'
                            }}>T</div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#0f172a' }}>{cls.professor}</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Posted yesterday</div>
                            </div>
                        </div>
                        <div style={{ color: '#334155', lineHeight: 1.5 }}>
                            Welcome to the course! Please make sure to review the syllabus and join the WhatsApp group using the link below.
                        </div>
                        <div style={{
                            marginTop: '1rem',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#003366',
                            fontWeight: 500,
                            background: '#f8fafc',
                            width: 'fit-content'
                        }}>
                            <i className="fas fa-file-pdf" style={{ color: '#ef4444' }}></i> Syllabus_v1.pdf
                        </div>
                    </div>

                    {/* Post 2 */}
                    <div style={{
                        background: 'white',
                        border: '1px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: '#0f172a',
                                borderRadius: '50%',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold'
                            }}>T</div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#0f172a' }}>{cls.professor}</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Posted 2 days ago</div>
                            </div>
                        </div>
                        <div style={{ color: '#334155', lineHeight: 1.5 }}>
                            <i className="fas fa-clipboard-check" style={{ color: '#003366', marginRight: '5px' }}></i>
                            <strong>New Assignment Posted:</strong> Lab Assignment 4
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClassDetail;
