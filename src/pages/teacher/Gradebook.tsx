import React from 'react';
import '../../assets/css/teacher/dashboard.css';
import TopBar from '../../components/layout/TopBar';

const Gradebook: React.FC = () => {
    const students = [
        { id: 4001, name: 'Aditya Kumar', cgpa: 8.5, attendance: 92, assignments: 18, total: 20 },
        { id: 4002, name: 'Riya Singh', cgpa: 9.1, attendance: 95, assignments: 19, total: 20 },
        { id: 4003, name: 'Arjun Mehta', cgpa: 7.8, attendance: 88, assignments: 16, total: 20 },
        { id: 4004, name: 'Priya Patel', cgpa: 8.9, attendance: 94, assignments: 20, total: 20 },
        { id: 4005, name: 'Rohan Sharma', cgpa: 8.2, attendance: 90, assignments: 17, total: 20 }
    ];

    return (
        <div>
            <TopBar title="Gradebook" />

            <div style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                    <select style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        background: 'white',
                        fontSize: '0.95rem',
                        cursor: 'pointer'
                    }}>
                        <option>CS204 - DBMS</option>
                        <option>CS303 - DAA</option>
                        <option>CS305 - ADPDBMS Lab</option>
                    </select>
                    <button style={{
                        padding: '0.75rem 1.5rem',
                        background: '#003366',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        <i className="fas fa-download"></i> Export
                    </button>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Student ID</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Name</th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>CGPA</th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Attendance</th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Assignments</th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id} style={{ borderBottom: index < students.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>{student.id}</td>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{student.name}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>{student.cgpa}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <span style={{
                                            background: student.attendance >= 90 ? '#ecfdf5' : '#fffbeb',
                                            color: student.attendance >= 90 ? '#10b981' : '#f59e0b',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.85rem',
                                            fontWeight: 600
                                        }}>
                                            {student.attendance}%
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>
                                        {student.assignments}/{student.total}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <button style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#3b82f6',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Gradebook;
