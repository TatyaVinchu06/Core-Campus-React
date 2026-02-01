export const activities = [
    {
        id: 'ACT001',
        title: 'DBMS Lab Cancelled Today',
        description: 'Due to server maintenance, the DBMS lab scheduled for today at 2 PM is cancelled.',
        timestamp: new Date(new Date().getTime() - 10 * 60 * 1000).toISOString(), // 10 mins ago
        icon: 'fa-exclamation-triangle',
        type: 'notice',
        priority: 'URGENT',
        category: 'CS305 (Lab)',
        fullMessage: 'Due to server maintenance, the DBMS lab scheduled for today at 2 PM is cancelled. Please utilize this time for project work.'
    },
    {
        id: 'ACT002',
        title: 'Mid-Term Syllabus Update',
        description: 'The syllabus for the DAA mid-term exam has been updated. Chapter 5 (Dynamic Programming) will be included.',
        timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        icon: 'fa-book',
        type: 'notice',
        priority: 'Normal',
        category: 'CS303 (DAA)',
        fullMessage: 'The syllabus for the DAA mid-term exam has been updated. Chapter 5 (Dynamic Programming) will be included.'
    },
    {
        id: 'ACT003',
        title: 'Hackathon Winners Announced',
        description: 'Congratulations to Team \'CyberWarriors\' for winning the Inter-Department Hackathon!',
        timestamp: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        icon: 'fa-trophy',
        type: 'event',
        priority: 'Event',
        category: 'All Students',
        fullMessage: 'Congratulations to Team \'CyberWarriors\' for winning the Inter-Department Hackathon!'
    },
    {
        id: 'ACT004',
        title: 'Holiday Declaration',
        description: 'The college will remain closed on 26th Jan on account of Republic Day.',
        timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        icon: 'fa-flag',
        type: 'notice',
        priority: 'General',
        category: 'Campus',
        fullMessage: 'The college will remain closed on 26th Jan on account of Republic Day. Flag hosting ceremony at 8:00 AM.'
    }
];

