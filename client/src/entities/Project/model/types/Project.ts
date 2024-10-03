import { User } from '@/entities/User';

export interface Project {
    id: number;
    name: string;
    description: string;
    commitsId: number[];
    created_at: Date;
    url: string;
    author: User;
    collaborators: User[];

    private: boolean;
}
