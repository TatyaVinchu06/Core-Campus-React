import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/student/assignments.css';
import TopBar from '../../components/layout/TopBar';

interface Assignment {
    id: number;
    title: string;
    subject: string;
    type: string;
    deadline: string;
    submission: {
        status: 'draft' | 'not_started' | 'submitted' | 'graded';
        marks?: number;
        max?: number;
    };
}

const StudentAssignments: React.FC = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        // EXACT MOCK DATA from legacy assignments.js
        const mockAssignments: Assignment[] = [
            {
                id: 1, title: 'Data Structures Lab 5', subject: 'CS301', type: 'Assignment',
                deadline: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                submission: { status: 'draft' }
            },
            {
                id: 2, title: 'Database Schema Design', subject: 'CS302', type: 'Assignment',
                deadline: new Date(Date.now() - 100000000).toISOString(), // Past (Overdue)
                submission: { status: 'not_started' }
            },
            {
                id: 3, title: 'Web Development Project', subject: 'CS302', type: 'Assignment',
                deadline: new Date(Date.now() - 50000000).toISOString(), // Overdue
                submission: { status: 'not_started' }
            },
            {
                id: 4, title: 'Operating Systems Quiz', subject: 'CS305', type: 'Assignment',
                deadline: new Date(Date.now() - 30000000).toISOString(), // Overdue
                submission: { status: 'not_started' }
            },
            {
                id: 5, title: 'Array Operations', subject: 'CS301', type: 'Lab',
                deadline: new Date(Date.now() - 864000000).toISOString(),
                submission: { status: 'graded', marks: 18, max: 20 }
            }
        ];
        setAssignments(mockAssignments);
    }, []);

    // FILTERING LOGIC from legacy
    const filtered = assignments.filter(a => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'pending') return a.submission.status === 'draft' || a.submission.status === 'not_started';
        if (activeFilter === 'submitted') return a.submission.status === 'submitted' || a.submission.status === 'graded';
        if (activeFilter === 'overdue') return new Date(a.deadline) < new Date() && a.submission.status !== 'submitted' && a.submission.status !== 'graded';
        return true;
    });

    // GROUPING LOGIC from legacy
    const groups: { overdue: Assignment[], dueSoon: Assignment[], upcoming: Assignment[], submitted: Assignment[], graded: Assignment[] } =
        { overdue: [], dueSoon: [], upcoming: [], submitted: [], graded: [] };
    const now = new Date();

    filtered.forEach(a => {
        const deadline = new Date(a.deadline);
        const status = a.submission.status;
        const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (status === 'graded') groups.graded.push(a);
        else if (status === 'submitted') groups.submitted.push(a);
        else if (deadline < now) groups.overdue.push(a);
        else if (hoursLeft <= 48) groups.dueSoon.push(a);
        else groups.upcoming.push(a);
    });

    const handleAssignmentClick = (item: Assignment) => {
        // Navigate to code editor/workspace
        navigate('/student/workspace');
    };

    const createCard = (item: Assignment) => {
        const now = new Date();
        const deadline = new Date(item.deadline);
        const isOverdue = deadline < now && item.submission.status !== 'submitted' && item.submission.status !== 'graded';

        let btnConfig = { text: 'Start', className: 'btn-primary', icon: 'fa-play' };
        if (item.submission.status === 'graded') {
            btnConfig = { text: `${item.submission.marks}/${item.submission.max}`, className: 'btn-info', icon: 'fa-star' };
        } else if (isOverdue) {
            btnConfig = { text: 'Late Submit', className: 'btn-danger', icon: 'fa-exclamation' };
        } else if (item.submission.status === 'draft') {
            btnConfig = { text: 'Continue', className: 'btn-primary', icon: 'fa-pen' };
        }

        const dueDate = deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const dueTime = deadline.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        return (
            <div key={item.id} className="assignment-card" onClick={() => handleAssignmentClick(item)}>
                <div className="card-left">
                    <div className="card-header">
                        <span className="subject-badge">{item.subject}</span>
                        <span className="type-badge">{item.type}</span>
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <div className="card-meta">
                        <span>Due: {dueDate}, {dueTime}</span>
                    </div>
                </div>
                <div className="card-action">
                    <button className={`btn ${btnConfig.className}`} onClick={(e) => { e.stopPropagation(); handleAssignmentClick(item); }}>
                        <i className={`fas ${btnConfig.icon}`}></i> {btnConfig.text}
                    </button>
                </div>
            </div>
        );
    };

    const renderSection = (title: string, items: Assignment[], variant: string) => {
        if (items.length === 0) return null;

        return (
            <div key={variant} className={`assignment-section section-${variant}`}>
                <div className="section-header">
                    <h2>{title}</h2>
                    <span className="count-badge">{items.length}</span>
                </div>
                {items.map(item => createCard(item))}
            </div>
        );
    };

    return (
        <div>
            <TopBar title="Assignments" />

            <div className="controls-section">
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search by subject or title..." />
                </div>

                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`filter-tab ${activeFilter === 'submitted' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('submitted')}
                    >
                        Submitted
                    </button>
                    <button
                        className={`filter-tab ${activeFilter === 'overdue' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('overdue')}
                    >
                        Overdue
                    </button>
                </div>
            </div>

            <div id="assignmentsList" style={{ padding: '0 1.5rem 1.5rem' }}>
                {renderSection('🔴 Overdue', groups.overdue, 'overdue')}
                {renderSection('🟡 Due Soon', groups.dueSoon, 'duesoon')}
                {renderSection('Upcoming', groups.upcoming, 'normal')}
                {renderSection('✅ Submitted', groups.submitted, 'submitted')}
                {renderSection('⭐ Graded', groups.graded, 'graded')}

                {filtered.length === 0 && (
                    <div className="empty-state">
                        <h3>All caught up!</h3>
                        <p>No assignments found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentAssignments;
