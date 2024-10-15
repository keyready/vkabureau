import { Profile } from '@/entities/Profile';

export interface ControlQuestions {
    id: string;
    question: string;
}

export interface User {
    id: string;
    login: string;
    password: string;
    created_at: string;
    controlAnswer: string;
    controlQuestion: string;
}

export type RegisterUser = User & Profile;
