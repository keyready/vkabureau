import { Task, TaskPriority, TaskStatus } from './Task';

export interface TaskSchema {
    data?: Task;
    isLoading: boolean;
    error?: string;
    filters: {
        priority: TaskPriority[];
        status: TaskStatus[];
    };
}
