import { StateSchema } from '@/app/providers/StoreProvider';

export const getTaskData = (state: StateSchema) => state.task?.data;
export const getTaskIsLoading = (state: StateSchema) => state.task?.isLoading;
export const getTaskError = (state: StateSchema) => state.task?.error;
