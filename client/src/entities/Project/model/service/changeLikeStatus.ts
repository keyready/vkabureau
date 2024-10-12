import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

interface ChangeLikeStatusProps {
    followerId: string;
    projectId: string;
}

export const changeLikeStatus = createAsyncThunk<
    string,
    ChangeLikeStatusProps,
    ThunkConfig<string>
>('Project/changeLikeStatus', async (props, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<string>('/api/projects/like', props);

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
