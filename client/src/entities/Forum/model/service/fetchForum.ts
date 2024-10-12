import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Forum } from '../types/Forum';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchForum = createAsyncThunk<Forum, string, ThunkConfig<string>>(
    'Forum/fetchForum',
    async (forumId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Forum>(`/api/forums/${forumId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
