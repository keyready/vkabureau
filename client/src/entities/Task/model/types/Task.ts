export enum TaskStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

export enum TaskPriority {
    BACKLOG = 'backlog',
    MEDIUM = 'medium',
    CRITICAL = 'critical',
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: Date;
    createdDate: Date;
    executorId: string;
}

export interface TaskFilter {
    status?: TaskStatus;
    priority?: TaskPriority;
}
