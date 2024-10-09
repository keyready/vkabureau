import { Profile } from '@/entities/Profile';

export enum TaskStatus {
    CREATED = 'created',
    PROGRESS = 'progress',
    REVIEW = 'review',
    COMPLETED = 'completed',
}

export enum TaskPriority {
    FEATURE = 'feature',
    MEDIUM = 'medium',
    CRITICAL = 'critical',
}

export interface Task {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    contributors: Profile[];
    createdAt: Date;
    updatedAt: Date;
}
