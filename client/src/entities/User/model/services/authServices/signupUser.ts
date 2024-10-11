import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RegisterUser } from '../../types/User';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const signupUser = createAsyncThunk<string, Partial<RegisterUser>, ThunkConfig<string>>(
    'User/signupUser',
    async (newUser, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/user/sign-up', {
                ...newUser,
                avatar: 'avatar-1.webp',
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
