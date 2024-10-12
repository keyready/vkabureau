import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const';

export const rtkApi = createApi({
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers: Headers) => {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
