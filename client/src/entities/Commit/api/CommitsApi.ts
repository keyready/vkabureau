import { Commit } from '../model/types/Commit';

import { rtkApi } from '@/shared/api/rtkApi';

const fetchCommitsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getCommits: build.query<Commit[], string>({
            query: (projectName) => ({
                url: `/api/commits/${projectName}`,
            }),
        }),
    }),
});

export const useCommits = fetchCommitsApi.useGetCommitsQuery;
