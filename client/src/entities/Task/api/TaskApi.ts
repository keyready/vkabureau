import { Task } from '../model/types/Task';

import { rtkApi } from '@/shared/api/rtkApi';

const fetchTasksApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], string>({
            query: (projectId) => `/api/tasks/${projectId}`,
        }),
        getOwnTasks: build.query<Task[], void>({
            query: () => `/api/tasks/own`,
        }),
    }),
});

export const useTasks = fetchTasksApi.useGetTasksQuery;
export const useOwnTasks = fetchTasksApi.useGetOwnTasksQuery;
