import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Commit } from '../types/Commit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchCommit = createAsyncThunk<Commit, string, ThunkConfig<string>>(
    'Commit/fetchCommit',
    async (CommitId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Commit>('/url');

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
