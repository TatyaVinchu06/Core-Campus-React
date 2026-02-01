import React, { useState } from 'react';
import '../../assets/css/student/dashboard.css';
import '../../assets/css/student/doubts.css';
import TopBar from '../../components/layout/TopBar';

interface Doubt {
    id: number;
    title: string;
    desc: string;
    subject: string;
    tags: string[];
    author: string;
    time: string;
    votes: number;
    answers: number;
    resolved: boolean;
}

const Doubts: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const doubtsData: Doubt[] = [
        {
            id: 1, title: 'How does BST deletion work?',
            desc: 'I am confused about the case where the node has two children. Do we replace with predecessor or successor?',
            subject: 'CS301', tags: ['bst', 'tree', 'algorithms'],
            author: 'Rohan Sharma', time: '2 hours ago',
            votes: 12, answers: 1, resolved: true
        },
        {
            id: 2, title: 'CSS Flexbox centering issue',
            desc: 'justify-content: center is not working on my div. It stays on the left.',
            subject: 'CS302', tags: ['css', 'flexbox', 'frontend'],
            author: 'Om Bhamare', time: '5 hours ago',
            votes: 5, answers: 0, resolved: false
        },
        {
            id: 3, title: 'SQL JOIN vs UNION difference?',
            desc: 'When should I use JOIN and when should I use UNION in SQL queries?',
            subject: 'CS204', tags: ['sql', 'database', 'joins'],
            author: 'Priya Patel', time: '1 day ago',
            votes: 8, answers: 2, resolved: true
        }
    ];

    const getFilteredDoubts = () => {
        if (activeFilter === 'unanswered') return doubtsData.filter(d => d.answers === 0);
        if (activeFilter === 'resolved') return doubtsData.filter(d => d.resolved);
        return doubtsData;
    };

    return (
        <div>
            <TopBar title="Doubts Forum" />

            <div className="controls-section" style={{ padding: '1rem 1.5rem' }}>
                <div className="filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Questions</button>
                    <button className={`filter-pill ${activeFilter === 'unanswered' ? 'active' : ''}`} onClick={() => setActiveFilter('unanswered')}>🔴 Unanswered</button>
                    <button className={`filter-pill ${activeFilter === 'resolved' ? 'active' : ''}`} onClick={() => setActiveFilter('resolved')}>🟢 Resolved</button>
                </div>
            </div>

            <div className="doubts-container" style={{ padding: '0 1.5rem 1.5rem' }}>
                {getFilteredDoubts().map(doubt => (
                    <div key={doubt.id} className="doubt-card" style={{
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        gap: '1.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}>
                        <div className="vote-box" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            minWidth: '60px'
                        }}>
                            <span className="vote-count" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{doubt.votes}</span>
                            <span className="vote-label" style={{ fontSize: '0.75rem', color: '#64748b' }}>Votes</span>
                            {doubt.resolved && <i className="fas fa-check-circle" style={{ color: '#10b981', marginTop: '5px', fontSize: '1.2rem' }}></i>}
                        </div>
                        <div className="doubt-main" style={{ flex: 1 }}>
                            <div className="doubt-title" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>
                                {doubt.title}
                            </div>
                            <div className="doubt-desc" style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
                                {doubt.desc}
                            </div>
                            <div className="tags-row" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {doubt.tags.map(tag => (
                                    <span key={tag} className="tag-pill" style={{
                                        background: '#f1f5f9',
                                        color: '#475569',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '999px',
                                        fontSize: '0.8rem'
                                    }}>#{tag}</span>
                                ))}
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                                Asked by {doubt.author} • {doubt.time} • {doubt.answers} {doubt.answers === 1 ? 'answer' : 'answers'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doubts;
