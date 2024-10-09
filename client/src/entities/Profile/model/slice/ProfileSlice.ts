import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileSchema } from '../types/ProfileSchema';
import { fetchProfile } from '../service/fetchProfile';

const initialState: ProfileSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const ProfileSlice = createSlice({
    name: 'ProfileSlice',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProfileActions } = ProfileSlice;
export const { reducer: ProfileReducer } = ProfileSlice;
