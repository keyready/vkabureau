import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { TasksStatistics } from '../types/Statistics';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchTaskStatistics = createAsyncThunk<TasksStatistics, void, ThunkConfig<string>>(
    'Statistics/fetchStatistics',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<TasksStatistics>('/api/statistics/tasks');

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
