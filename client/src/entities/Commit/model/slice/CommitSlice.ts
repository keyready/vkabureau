import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CommitSchema } from '../types/CommitSchema';
import { fetchCommit } from '../services/fetchCommit';

const initialState: CommitSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const CommitSlice = createSlice({
    name: 'CommitSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommit.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommit.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCommit.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: CommitActions } = CommitSlice;
export const { reducer: CommitReducer } = CommitSlice;
