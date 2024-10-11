import { Project } from '../model/types/Project';

import { rtkApi } from '@/shared/api/rtkApi';

const fetchProjectsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => ({
                url: '/api/projects',
            }),
        }),
    }),
});

export const useProjects = fetchProjectsApi.useGetProjectsQuery;
