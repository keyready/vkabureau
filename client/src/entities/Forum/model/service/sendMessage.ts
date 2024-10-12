import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Forum } from '../types/Forum';
import { ForumMessage } from '../types/ForumMessage';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const sendMessage = createAsyncThunk<Forum, ForumMessage, ThunkConfig<string>>(
    'Forum/sendMessage',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<Forum>(`/api/forums/message/send`, props);

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
