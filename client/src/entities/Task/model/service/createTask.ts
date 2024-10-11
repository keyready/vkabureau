import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Task } from '../types/Task';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const createTask = createAsyncThunk<string, Partial<Task>, ThunkConfig<string>>(
    'Task/createTask',
    async (task, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/projects/task/create', task);

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
