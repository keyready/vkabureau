import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ForumSchema } from '../types/ForumSchema';
import { fetchForum } from '../service/fetchForum';
import { sendMessage } from '../service/sendMessage';
import { Forum } from '../types/Forum';

const initialState: ForumSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const ForumSlice = createSlice({
    name: 'ForumSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchForum.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchForum.fulfilled, (state, action: PayloadAction<Forum>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchForum.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(sendMessage.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Forum>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ForumActions } = ForumSlice;
export const { reducer: ForumReducer } = ForumSlice;
