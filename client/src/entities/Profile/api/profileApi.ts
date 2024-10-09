import { Profile } from '../model/types/Profile';

import { rtkApi } from '@/shared/api/rtkApi';

const fetchProfilesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfiles: build.query<Profile[], void>({
            query: () => ({
                url: '/api/profiles',
            }),
        }),
    }),
});

export const useProfiles = fetchProfilesApi.useGetProfilesQuery;
