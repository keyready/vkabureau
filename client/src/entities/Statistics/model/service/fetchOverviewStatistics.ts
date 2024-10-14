import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { OverviewStatistics } from '../types/Statistics';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchOverviewStatistics = createAsyncThunk<
    OverviewStatistics,
    void,
    ThunkConfig<string>
>('Statistics/fetchOverviewStatistics', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<OverviewStatistics>('/api/statistics/overview');

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        const axiosError = e as AxiosError;
        // @ts-ignore
        return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
    }
});
