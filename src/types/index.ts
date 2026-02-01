export type Role = 'student' | 'teacher';

export interface User {
    id: string;
    name: string;
    role: Role;
    email?: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
