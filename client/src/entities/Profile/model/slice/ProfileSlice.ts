import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileSchema } from '../types/ProfileSchema';
import { fetchProfile } from '../service/fetchProfile';
import { changeProfile } from '../service/changeProfile';
import { Profile } from '../types/Profile';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const';

const initialState: ProfileSchema = {
    data: undefined,
    isLoading: !!localStorage.getItem(USER_LOCALSTORAGE_KEY),
    error: undefined,
};

export const ProfileSlice = createSlice({
    name: 'ProfileSlice',
    initialState,
    reducers: {
        setUserILoading: (state, payload: PayloadAction<boolean>) => {
            state.isLoading = payload.payload;
        },
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
            })

            .addCase(changeProfile.pending, (state) => {
                state.error = undefined;
                state.isPatching = true;
            })
            .addCase(changeProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isPatching = false;
                state.data = action.payload;
            })
            .addCase(changeProfile.rejected, (state, action) => {
                state.isPatching = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProfileActions } = ProfileSlice;
export const { reducer: ProfileReducer } = ProfileSlice;
