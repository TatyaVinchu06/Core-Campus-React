import React, { useState } from 'react';
import '../../assets/css/student/dashboard.css';
import TopBar from '../../components/layout/TopBar';

interface Notice {
    id: number;
    title: string;
    content: string;
    date: string;
    category: 'academic' | 'event' | 'urgent';
    postedBy: string;
}

const Notices: React.FC = () => {
    const [notices] = useState<Notice[]>([
        {
            id: 1,
            title: 'Mid-Semester Exam Schedule Released',
            content: 'The mid-semester examination schedule for all courses has been published. Please check the academic portal for your personalized timetable.',
            date: 'Feb 1, 2026',
            category: 'academic',
            postedBy: 'Academic Office'
        },
        {
            id: 2,
            title: 'Tech Fest 2026 - Registration Open',
            content: 'Annual tech fest registrations are now open. Participate in coding competitions, hackathons, and workshops. Register before Feb 15.',
            date: 'Jan 30, 2026',
            category: 'event',
            postedBy: 'Student Council'
        },
        {
            id: 3,
            title: 'Library Closure Notice',
            content: 'The central library will remain closed on Feb 5 for maintenance work. Digital resources will remain accessible.',
            date: 'Jan 28, 2026',
            category: 'urgent',
            postedBy: 'Library Department'
        }
    ]);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'academic': return '#3b82f6';
            case 'event': return '#10b981';
            case 'urgent': return '#ef4444';
            default: return '#64748b';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'academic': return 'fa-graduation-cap';
            case 'event': return 'fa-calendar-star';
            case 'urgent': return 'fa-exclamation-triangle';
            default: return 'fa-bullhorn';
        }
    };

    return (
        <div>
            <TopBar title="Notices" />

            <div style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="filter-pill active">All</button>
                    <button className="filter-pill">Academic</button>
                    <button className="filter-pill">Events</button>
                    <button className="filter-pill">Urgent</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {notices.map(notice => (
                        <div key={notice.id} style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            borderLeft: `4px solid ${getCategoryColor(notice.category)}`
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: `${getCategoryColor(notice.category)}15`,
                                    color: getCategoryColor(notice.category),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem'
                                }}>
                                    <i className={`fas ${getCategoryIcon(notice.category)}`}></i>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{notice.title}</h3>
                                        <span style={{
                                            background: `${getCategoryColor(notice.category)}15`,
                                            color: getCategoryColor(notice.category),
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            textTransform: 'uppercase'
                                        }}>
                                            {notice.category}
                                        </span>
                                    </div>
                                    <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>{notice.content}</p>
                                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                                        <span><i className="fas fa-calendar"></i> {notice.date}</span>
                                        <span><i className="fas fa-user"></i> {notice.postedBy}</span>
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

export default Notices;
