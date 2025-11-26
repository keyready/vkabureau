import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Profile } from '../types/Profile';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { RegisterUser } from '@/entities/User';

export const changeProfile = createAsyncThunk<Profile, Partial<RegisterUser>, ThunkConfig<string>>(
    'Profile/changeProfile',
    async (profile, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.put<Profile>(`/api/user/change`, profile);

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
