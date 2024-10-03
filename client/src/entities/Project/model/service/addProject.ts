import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

interface AddProjectProps {
    type: 'private' | 'public';
    name: string;
}

export const addProject = createAsyncThunk<string, AddProjectProps, ThunkConfig<string>>(
    'Project/addProject',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/projects/import', {
                name: props.name,
                type: props.type,
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
