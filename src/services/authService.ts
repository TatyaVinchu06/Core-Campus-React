import type { User, Role } from '../types';

// Mock credentials based on legacy logic
const MOCK_USERS = {
    students: [
        { id: 'student123', name: 'Student User', password: 'password', role: 'student' as Role },
        { id: 'abhi@student.com', name: 'Abhishek', password: 'password', role: 'student' as Role }
    ],
    teachers: [
        { id: 'teacher123', name: 'Teacher User', password: 'password', role: 'teacher' as Role },
        { id: 'prof@college.edu', name: 'Prof. Sharma', password: 'password', role: 'teacher' as Role }
    ]
};

export const authService = {
    login: async (emailOrId: string, password: string): Promise<User> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const student = MOCK_USERS.students.find(s => (s.id === emailOrId || s.id === emailOrId) && s.password === password);
        if (student) {
            return { id: student.id, name: student.name, role: 'student' };
        }

        const teacher = MOCK_USERS.teachers.find(t => (t.id === emailOrId || t.id === emailOrId) && t.password === password);
        if (teacher) {
            return { id: teacher.id, name: teacher.name, role: 'teacher' };
        }

        throw new Error("Invalid credentials");
    },

    logout: () => {
        sessionStorage.removeItem('currentUser');
    },

    getCurrentUser: (): User | null => {
        const stored = sessionStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : null;
    }
};
