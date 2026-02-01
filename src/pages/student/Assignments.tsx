import React, { useState, useEffect } from 'react';
import '../../assets/css/student/dashboard.css';
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

const mockAssignments: Assignment[] = [
    {
        id: 1, title: 'Data Structures Lab 5', subject: 'CS301', type: 'Lab',
        deadline: new Date(Date.now() + 86400000).toISOString(),
        submission: { status: 'draft' }
    },
    {
        id: 2, title: 'Database Schema Design', subject: 'CS302', type: 'Theory',
        deadline: new Date(Date.now() - 100000000).toISOString(),
        submission: { status: 'not_started' }
    },
    {
        id: 3, title: 'Web Dev Project', subject: 'CS303', type: 'Project',
        deadline: new Date(Date.now() + 600000000).toISOString(),
        submission: { status: 'not_started' }
    },
    {
        id: 4, title: 'Array Operations', subject: 'CS301', type: 'Lab',
        deadline: new Date(Date.now() - 864000000).toISOString(),
        submission: { status: 'graded', marks: 18, max: 20 }
    }
];

const Assignments: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAssignments(mockAssignments);
            setLoading(false);
        }, 1000);
    }, []);

    const getFilteredAssignments = () => {
        return assignments.filter(a => {
            if (activeFilter === 'all') return true;
            if (activeFilter === 'pending') return a.submission.status === 'draft' || a.submission.status === 'not_started';
            if (activeFilter === 'submitted') return a.submission.status === 'submitted' || a.submission.status === 'graded';
            if (activeFilter === 'overdue') return new Date(a.deadline) < new Date() && a.submission.status !== 'submitted' && a.submission.status !== 'graded';
            return true;
        });
    };

    const groupAssignments = () => {
        const groups: any = { overdue: [], dueSoon: [], upcoming: [], submitted: [], graded: [] };
        const now = new Date();

        getFilteredAssignments().forEach(a => {
            const deadline = new Date(a.deadline);
            const status = a.submission.status;
            const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

            if (status === 'graded') groups.graded.push(a);
            else if (status === 'submitted') groups.submitted.push(a);
            else if (deadline < now) groups.overdue.push(a);
            else if (hoursLeft <= 48) groups.dueSoon.push(a);
            else groups.upcoming.push(a);
        });

        return groups;
    };

    const renderCard = (item: Assignment) => {
        let btnConfig = { text: 'Start', className: 'btn-primary', icon: 'fa-play' };
        if (item.submission.status === 'graded') btnConfig = { text: `${item.submission.marks}/${item.submission.max}`, className: 'btn-info', icon: 'fa-star' };
        else if (new Date(item.deadline) < new Date()) btnConfig = { text: 'Late Submit', className: 'btn-danger', icon: 'fa-exclamation' };
        else if (item.submission.status === 'draft') btnConfig = { text: 'Continue', className: 'btn-primary', icon: 'fa-pen' };

        const due = new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return (
            <div key={item.id} className="assignment-card">
                <div className="card-left">
                    <div className="card-header">
                        <span className="subject-badge">{item.subject}</span>
                        <span className="type-badge">{item.type}</span>
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <div className="card-meta">
                        <span>Due: {due}</span>
                    </div>
                </div>
                <div className="card-action">
                    <button className={`btn ${btnConfig.className}`}>
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
                {items.map(renderCard)}
            </div>
        );
    };

    const groups = groupAssignments();

    return (
        <div>
            <TopBar title="Assignments" />

            <div className="controls-section">
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input type="text" id="searchInput" placeholder="Search by subject or title..." />
                </div>

                <div className="filter-tabs" id="filterTabs">
                    <button className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
                    <button className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`} onClick={() => setActiveFilter('pending')}>Pending</button>
                    <button className={`filter-tab ${activeFilter === 'submitted' ? 'active' : ''}`} onClick={() => setActiveFilter('submitted')}>Submitted</button>
                    <button className={`filter-tab ${activeFilter === 'overdue' ? 'active' : ''}`} onClick={() => setActiveFilter('overdue')}>Overdue</button>
                </div>
            </div>

            <div className="assignments-container" id="assignmentsList">
                {loading ? (
                    <div className="skeleton-loader">
                        <div className="skeleton-card"></div>
                        <div className="skeleton-card"></div>
                        <div className="skeleton-card"></div>
                    </div>
                ) : (
                    <>
                        {renderSection('🔴 Overdue', groups.overdue, 'overdue')}
                        {renderSection('🟡 Due Soon', groups.dueSoon, 'duesoon')}
                        {renderSection('Upcoming', groups.upcoming, 'normal')}
                        {renderSection('✅ Submitted', groups.submitted, 'submitted')}
                        {renderSection('⭐ Graded', groups.graded, 'graded')}
                        {Object.values(groups).every((arr: any) => arr.length === 0) && (
                            <div className="empty-state">
                                <h3>All caught up!</h3>
                                <p>No assignments found.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Assignments;
