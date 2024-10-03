import { Project } from '../model/types/Project';

import { rtkApi } from '@/shared/api/rtkApi';

interface ProjectsResponse {
    totalCount: number;
    Data: Project[];
}

const fetchProjectsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getRepos: build.query<ProjectsResponse, string>({
            query: (type) => ({
                url: `/api/repos/${type}`,
            }),
            transformResponse: (response: any) => {
                const { totalCount, Data } = response;
                return {
                    totalCount,
                    Data: [...Data].sort(
                        (a, b) =>
                            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
                    ),
                };
            },
        }),
        getProjects: build.query<Project[], void>({
            query: () => ({
                url: '/api/projects',
            }),
        }),
    }),
});

export const useRepos = fetchProjectsApi.useGetReposQuery;
export const useProjects = fetchProjectsApi.useGetProjectsQuery;
