import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { TaskPriority, TaskStatus } from '../types/Task';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

interface ChangeTaskProps {
    taskId: string;
    status: TaskStatus;
    priority: TaskPriority;
}

export const changeTask = createAsyncThunk<string, ChangeTaskProps, ThunkConfig<string>>(
    'Task/changeTask',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>(`/api/tasks/update`, props);

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
