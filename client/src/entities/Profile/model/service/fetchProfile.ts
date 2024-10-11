import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Profile } from '../types/Profile';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchProfile = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'Profile/fetchProfile',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Profile>(`/api/user/userData`);

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
