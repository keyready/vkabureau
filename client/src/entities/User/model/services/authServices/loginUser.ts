import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const';
import { User } from '@/entities/User';

export const loginUser = createAsyncThunk<void, Partial<User>, ThunkConfig<string>>(
    'User/loginUser',
    async (user, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response: AxiosResponse<{ accessToken: string }> = await extra.api.post(
                '/api/user/login',
                user,
            );

            if (response.status > 300) {
                throw new Error();
            }

            if (response.data.accessToken) {
                localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.accessToken);
            }
        } catch (e) {
            const axiosError = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
