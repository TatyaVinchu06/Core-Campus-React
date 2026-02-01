export const assignments = [
    {
        id: 'A001',
        title: 'Data Structures Lab 5',
        subject: 'CS301',
        deadline: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Tomorrow
        status: 'pending',
        urgency: 'high',
        progress: 80,
        description: 'Implement Binary Search Tree operations: Insertion, Deletion, and Traversal.'
    },
    {
        id: 'A002',
        title: 'Web Development Project',
        subject: 'CS302',
        deadline: '2026-01-28T23:59:00Z',
        status: 'pending',
        urgency: 'medium',
        progress: 60,
        description: 'Build a responsive portfolio website using HTML, CSS, and JS.'
    },
    {
        id: 'A003',
        title: 'Database Schema Design',
        subject: 'CS304',
        deadline: '2026-02-02T23:59:00Z',
        status: 'submitted',
        urgency: 'low',
        progress: 100,
        description: 'Design a normalized schema for a Library Management System.'
    },
    {
        id: 'A004',
        title: 'Algorithm Analysis',
        subject: 'CS301',
        deadline: '2026-02-05T23:59:00Z',
        status: 'pending',
        urgency: 'low',
        progress: 0,
        description: 'Analyze time complexity of various sorting algorithms.'
    },
    {
        id: 'A005',
        title: 'Operating Systems Quiz',
        subject: 'CS305',
        deadline: '2026-01-23T23:59:00Z', // Yesterday
        status: 'overdue',
        urgency: 'high',
        progress: 0,
        description: 'Quiz on Process Scheduling algorithms.'
    }
];
