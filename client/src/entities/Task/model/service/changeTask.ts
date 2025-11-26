import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Task } from '../types/Task';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const changeTask = createAsyncThunk<string, Partial<Task>, ThunkConfig<string>>(
    'Task/changeTask',
    async (task, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        const { title, deadline, description, priority, status, id } = task;

        try {
            const response = await extra.api.put<string>(`/api/tasks/update`, {
                title,
                deadline,
                description,
                priority,
                status,
                taskId: id,
            });

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
