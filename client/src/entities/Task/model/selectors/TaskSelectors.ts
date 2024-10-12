import { StateSchema } from '@/app/providers/StoreProvider';
import { TaskPriority, TaskStatus } from '@/entities/Task/model/types/Task';

export const getTaskData = (state: StateSchema) => state.task?.data;
export const getTaskFilters = (state: StateSchema) =>
    state.task?.filters || {
        priority: [TaskPriority.FEATURE, TaskPriority.MEDIUM, TaskPriority.CRITICAL],
        status: [TaskStatus.CREATED, TaskStatus.PROGRESS, TaskStatus.COMPLETED, TaskStatus.REVIEW],
    };
export const getTaskIsLoading = (state: StateSchema) => state.task?.isLoading;
export const getTaskError = (state: StateSchema) => state.task?.error;
