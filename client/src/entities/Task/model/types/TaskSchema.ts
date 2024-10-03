import { Task } from './Task';

export interface TaskSchema {
    data?: Task;
    isLoading: boolean;
    error?: string;
}
