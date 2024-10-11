import { Task } from '@/entities/Task';
import { Profile } from '@/entities/Profile';

export enum ProjectStatus {
    CREATED = 'created',
    PROGRESS = 'progress',
    REVIEW = 'review',
    COMPLETED = 'completed',
}

export interface Project {
    id: string;
    title: string;
    description: string;
    documents: string[];
    status: ProjectStatus;
    author: Profile;
    tasks: Task[];
    createdAt: Date;
    startedAt: Date;
    finishedAt: Date;
}
