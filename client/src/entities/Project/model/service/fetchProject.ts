import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Project } from '../types/Project';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchProject = createAsyncThunk<Project, string, ThunkConfig<string>>(
    'Project/fetchProject',
    async (projectId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Project>(`/api/projects/project/${projectId}`);

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
