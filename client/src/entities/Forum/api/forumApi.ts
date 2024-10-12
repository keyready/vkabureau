import { Forum } from '../model/types/Forum';

import { rtkApi } from '@/shared/api/rtkApi';

const fetchForumsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getForums: build.query<Forum[], void>({
            query: () => ({
                url: '/api/forums',
            }),
        }),
    }),
});

export const useForums = fetchForumsApi.useGetForumsQuery;
