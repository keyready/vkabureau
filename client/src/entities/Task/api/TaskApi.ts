import { Task, TaskPriority, TaskStatus } from '../model/types/Task';

import { rtkApi } from '@/shared/api/rtkApi';

interface TaskApiProps {
    projectId: number;
    status?: TaskStatus;
    priority?: TaskPriority;
}

const fetchTasksApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], TaskApiProps>({
            query: (props) => {
                let url = `/api/tasks/${props.projectId}?`;
                if (props.status) {
                    url += `status=${props.status}`;
                }
                if (props.priority) {
                    if (props.status) {
                        url += '&';
                    }
                    url += `priority=${props.priority}`;
                }
                return url;
            },
        }),
    }),
});

export const useTasks = fetchTasksApi.useGetTasksQuery;
