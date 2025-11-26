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
    likes: {
        value: 0;
        followersId: string[];
    };
    createdAt: Date;
    startedAt: Date;
    finishedAt: Date;
}

export type SortingDirection = 'asc' | 'desc';
export type ProjectSortingKeys = 'popularity' | 'createdAt';
export type ProjectSorting = `${ProjectSortingKeys}-${SortingDirection}`;
export const sortingMapper: Record<ProjectSorting, string> = {
    'createdAt-asc': 'сначала новые',
    'createdAt-desc': 'сначала старые',
    'popularity-asc': 'сначала популярные',
    'popularity-desc': 'сначала неизвестные',
};
