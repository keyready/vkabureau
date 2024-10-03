import { User } from '../model/types/User';

import { rtkApi } from '@/shared/api/rtkApi';

const fetchAllUsersApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => ({
                url: '/api/users',
            }),
        }),
    }),
});

export const useUsers = fetchAllUsersApi.useGetUsersQuery;
