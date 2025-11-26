import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Project } from '../types/Project';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const changeProject = createAsyncThunk<string, Partial<Project>, ThunkConfig<string>>(
    'Project/changeProject',
    async ({ title, description, id }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.put<string>(`/api/projects/${id}/change`, {
                title,
                description,
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
