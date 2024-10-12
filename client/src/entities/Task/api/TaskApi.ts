import { Task } from '../model/types/Task';

import { rtkApi } from '@/shared/api/rtkApi';

const fetchTasksApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], string>({
            query: (projectId) => `/api/tasks/${projectId}`,
        }),
    }),
});

export const useTasks = fetchTasksApi.useGetTasksQuery;
