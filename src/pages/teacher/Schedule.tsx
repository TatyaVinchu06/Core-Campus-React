import React from 'react';
import '../../assets/css/teacher/dashboard.css';
import TopBar from '../../components/layout/TopBar';

const Schedule: React.FC = () => {
    const schedule = [
        {
            day: 'Monday', slots: [
                { time: '09:00 - 10:30', subject: 'CS204 - DBMS', room: 'Lecture Hall A', type: 'Lecture' },
                { time: '14:00 - 15:30', subject: 'CS303 - DAA', room: 'Room 301', type: 'Lecture' }
            ]
        },
        {
            day: 'Tuesday', slots: [
                { time: '11:00 - 12:30', subject: 'CS303 - DAA', room: 'Room 301', type: 'Tutorial' }
            ]
        },
        {
            day: 'Wednesday', slots: [
                { time: '09:00 - 10:30', subject: 'CS204 - DBMS', room: 'Lecture Hall A', type: 'Lecture' }
            ]
        },
        {
            day: 'Thursday', slots: [
                { time: '11:00 - 12:30', subject: 'CS303 - DAA', room: 'Room 301', type: 'Lecture' },
                { time: '11:30 - 12:15', subject: 'Department Meeting', room: 'Conf Room 2', type: 'Meeting' }
            ]
        },
        {
            day: 'Friday', slots: [
                { time: '09:00 - 10:30', subject: 'CS204 - DBMS', room: 'Lecture Hall A', type: 'Lecture' },
                { time: '14:00 - 17:00', subject: 'CS305 - ADPDBMS Lab', room: 'Lab 3', type: 'Lab' }
            ]
        }
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Lecture': return '#3b82f6';
            case 'Lab': return '#8b5cf6';
            case 'Tutorial': return '#10b981';
            case 'Meeting': return '#f59e0b';
            default: return '#64748b';
        }
    };

    return (
        <div>
            <TopBar title="Schedule" />

            <div style={{ padding: '1.5rem' }}>
                {schedule.map((day) => (
                    <div key={day.day} style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>
                            {day.day}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {day.slots.map((slot, index) => (
                                <div key={index} style={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderLeft: `4px solid ${getTypeColor(slot.type)}`,
                                    borderRadius: '12px',
                                    padding: '1.25rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                            <span style={{
                                                background: `${getTypeColor(slot.type)}15`,
                                                color: getTypeColor(slot.type),
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}>
                                                {slot.type}
                                            </span>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{slot.subject}</h4>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                            <i className="far fa-clock" style={{ marginRight: '0.5rem' }}></i>
                                            {slot.time} • {slot.room}
                                        </div>
                                    </div>
                                    <button style={{
                                        padding: '0.5rem 1rem',
                                        background: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '6px',
                                        color: '#64748b',
                                        cursor: 'pointer',
                                        fontWeight: 500
                                    }}>
                                        Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
