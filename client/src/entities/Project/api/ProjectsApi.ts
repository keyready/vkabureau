import { Project } from '../model/types/Project';

import { rtkApi } from '@/shared/api/rtkApi';

const fetchProjectsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProjects: build.query<Project[], boolean | void>({
            query: (own) => ({
                url: `/api/projects${own ? '/own' : ''}`,
            }),
        }),
    }),
});

export const useProjects = fetchProjectsApi.useGetProjectsQuery;
