export const doubts = [
    {
        id: 'D001',
        title: 'How to implement QuickSort in C++?',
        desc: 'I am getting a stack overflow error when recursing. Can someone check my pivot logic?',
        author: 'Rahul Verma',
        time: '2 hours ago', // Keeping string for now as per original, or can upgrade to ISO
        votes: 12,
        tags: ['cpp', 'algorithms', 'sorting'],
        answersCount: 3,
        comments: [
            {
                id: 'C001',
                text: 'Check your base case condition. It might be infinite recursion.',
                author: 'Amit Singh',
                accepted: true
            },
            {
                id: 'C002',
                text: 'Make sure you are not including the pivot in the recursive calls.',
                author: 'Sneha Gupta',
                accepted: false
            }
        ]
    },
    {
        id: 'D002',
        title: 'Difference between normalization and denormalization?',
        desc: 'When should we prefer denormalization despite redundancy?',
        author: 'Priya Sharma',
        time: '5 hours ago',
        votes: 8,
        tags: ['dbms', 'theory'],
        answersCount: 1,
        comments: [
            {
                id: 'C003',
                text: 'Denormalization is useful for read-heavy applications to avoid costly joins.',
                author: 'Dr. Rao',
                accepted: true
            }
        ]
    }
];
