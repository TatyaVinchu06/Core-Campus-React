import React, { useState } from 'react';
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
    comments: Array<{
        author: string;
        text: string;
        accepted: boolean;
        time: string;
    }>;
}

const StudentDoubts: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);

    // EXACT MOCK DATA from legacy doubts.js
    const doubtsData: Doubt[] = [
        {
            id: 1, title: 'How does BST deletion work?',
            desc: 'I am confused about the case where the node has two children. Do we replace with predecessor or successor?\n\nI tried implementing it using the successor but I am getting an infinite loop in my recursive call.',
            subject: 'CS301', tags: ['bst', 'tree', 'algorithms'],
            author: 'Rohan Sharma', time: '2 hours ago',
            votes: 12, answers: 1, resolved: true,
            comments: [
                { author: 'Dr. Gupta', text: 'You typically replace it with the Inorder Successor (smallest value in the right subtree).\n\nIf the node has two children, find the min value in the right subtree, copy the value, and then recursively delete that min node.', accepted: true, time: '1 hour ago' }
            ]
        },
        {
            id: 2, title: 'CSS Flexbox centering issue',
            desc: 'justify-content: center is not working on my div. It stays on the left. I have set display: flex on the container.',
            subject: 'CS302', tags: ['css', 'flexbox', 'frontend'],
            author: 'Om Bhamare', time: '5 hours ago',
            votes: 5, answers: 0, resolved: false,
            comments: []
        }
    ];

    const filtered = activeFilter === 'all' ? doubtsData :
        activeFilter === 'unanswered' ? doubtsData.filter(d => d.answers === 0) :
            doubtsData.filter(d => d.resolved);

    return (
        <div>
            <TopBar title="Doubts & Forum" />

            <div className="doubts-container" style={{ padding: '1.5rem' }}>
                <div className="controls-section">
                    <div className="filter-group">
                        <button className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')} data-filter="all">All</button>
                        <button className={`filter-pill ${activeFilter === 'unanswered' ? 'active' : ''}`} onClick={() => setActiveFilter('unanswered')} data-filter="unanswered">Unanswered</button>
                        <button className={`filter-pill ${activeFilter === 'resolved' ? 'active' : ''}`} onClick={() => setActiveFilter('resolved')} data-filter="resolved">Resolved</button>
                    </div>
                    <button id="askBtn" className="btn-primary" style={{ padding: '0.75rem 1.5rem', background: '#003366', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-plus"></i> Ask Question
                    </button>
                </div>

                <div id="doubtsList">
                    {filtered.map(d => (
                        <div key={d.id} className="doubt-card" onClick={() => setSelectedDoubt(d)}>
                            <div className="vote-box">
                                <span className="vote-count">{d.votes}</span>
                                <span className="vote-label">Votes</span>
                                {d.resolved && <i className="fas fa-check-circle" style={{ color: '#10b981', marginTop: '5px', fontSize: '1.2rem' }}></i>}
                            </div>
                            <div className="doubt-main">
                                <div className="doubt-title">{d.title}</div>
                                <div className="doubt-desc">{d.desc}</div>
                                <div className="tags-row">
                                    {d.tags.map(t => <span key={t} className="tag-pill">#{t}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Overlay */}
            {selectedDoubt && (
                <div className="detail-overlay active" onClick={() => setSelectedDoubt(null)}>
                    <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="detail-header">
                            <button className="back-link" onClick={() => setSelectedDoubt(null)}>
                                <i className="fas fa-arrow-left"></i> Back to List
                            </button>
                        </div>
                        <div className="detail-content">
                            <div className="question-section">
                                <div className="big-vote-box">
                                    <button className="vote-btn"><i className="fas fa-caret-up"></i></button>
                                    <span className="big-score">{selectedDoubt.votes}</span>
                                    <button className="vote-btn"><i className="fas fa-caret-down"></i></button>
                                    <button style={{ border: 'none', background: 'none', color: '#cbd5e1', marginTop: '10px' }}><i className="fas fa-star"></i></button>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h1 className="q-title-lg">{selectedDoubt.title}</h1>
                                    <div className="tags-row" style={{ marginBottom: '1.5rem' }}>
                                        {selectedDoubt.tags.map(t => <span key={t} className="tag-pill">#{t}</span>)}
                                    </div>

                                    <div className="q-text-lg">{selectedDoubt.desc}</div>

                                    <div className="user-signature">
                                        <span className="asked-time">Asked {selectedDoubt.time}</span>
                                        <div className="user-row">
                                            <div className="user-avatar">{selectedDoubt.author.charAt(0)}</div>
                                            <div>
                                                <span className="user-name">{selectedDoubt.author}</span>
                                                <span className="user-role">Student (ID: 4022)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="answers-header">{selectedDoubt.answers} Answers</h3>
                            {selectedDoubt.comments.map((c, idx) => (
                                <div key={idx} className={`answer-item ${c.accepted ? 'accepted' : ''}`}>
                                    <div className="big-vote-box">
                                        <button className="vote-btn"><i className="fas fa-caret-up"></i></button>
                                        <span className="big-score">{c.accepted ? 5 : 1}</span>
                                        <button className="vote-btn"><i className="fas fa-caret-down"></i></button>
                                        {c.accepted && <i className="fas fa-check" style={{ color: '#10b981', fontSize: '1.5rem', marginTop: '10px' }}></i>}
                                    </div>

                                    <div className="answer-content">
                                        {c.accepted && <div className="accepted-badge"><i className="fas fa-check-circle"></i> Accepted Solution</div>}

                                        <div style={{ fontSize: '1rem', lineHeight: '1.6', color: '#334155', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>{c.text}</div>

                                        <div className="user-signature">
                                            <span className="asked-time">Answered {c.time}</span>
                                            <div className="user-row">
                                                <div className="user-avatar" style={{ background: c.accepted ? '#10b981' : '#64748b' }}>{c.author.charAt(0)}</div>
                                                <div>
                                                    <span className="user-name" style={{ color: c.accepted ? '#047857' : '#334155' }}>{c.author}</span>
                                                    <span className="user-role">Faculty</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="reply-section">
                                <h4 style={{ marginBottom: '15px', color: '#0f172a', fontSize: '1.1rem' }}>Your Answer</h4>

                                <div className="editor-container">
                                    <div className="editor-toolbar">
                                        <i className="fas fa-bold" title="Bold"></i>
                                        <i className="fas fa-italic" title="Italic"></i>
                                        <i className="fas fa-link" title="Link"></i>
                                        <i className="fas fa-code" title="Code Block"></i>
                                        <i className="fas fa-list-ul" title="List"></i>
                                        <i className="fas fa-image" title="Image"></i>
                                    </div>
                                    <textarea className="reply-textarea" placeholder="Type your detailed solution here... Use Markdown for code blocks."></textarea>
                                </div>

                                <button className="post-btn">Post Your Answer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDoubts;
