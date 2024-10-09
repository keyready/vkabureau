import { Profile } from '@/entities/Profile';

export interface User {
    id: string;
    login: string;
    password: string;
    created_at: string;
}

export type RegisterUser = User & Profile;
