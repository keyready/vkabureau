import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { TaskPriority } from '../types/Task';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

interface CreateTaskProps {
    projectId?: string;
    title?: string;
    description?: string;
    priority?: TaskPriority;
    deadline?: Date;
}

export const createTask = createAsyncThunk<string, CreateTaskProps, ThunkConfig<string>>(
    'Task/createTask',
    async (task, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/tasks/create', task);

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
