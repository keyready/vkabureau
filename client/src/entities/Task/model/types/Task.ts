import { Profile } from '@/entities/Profile';

export enum TaskStatus {
    CREATED = 'CREATED',
    PROGRESS = 'PROGRESS',
    REVIEW = 'REVIEW',
    COMPLETED = 'COMPLETED',
}

export enum TaskPriority {
    FEATURE = 'FEATURE',
    MEDIUM = 'MEDIUM',
    CRITICAL = 'CRITICAL',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    contributors: Profile[];
    createdAt: Date;
    updatedAt: Date;
    deadline: Date;
}
