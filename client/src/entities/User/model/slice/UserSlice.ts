import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSchema } from '../types/UserSchema';
import { signupUser } from '../services/authServices/signupUser';
import { loginUser } from '../services/authServices/loginUser';
import { inviteMember } from '../services/otherServices/inviteMember';
import { getControlQuestions } from '../services/authServices/getControlQuestions';
import { ControlQuestions } from '../types/User';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const';

const initialState: UserSchema = {
    data: undefined,
    questions: undefined,
    isLoading: false,
    error: undefined,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = undefined;
        },
        logout: (state) => {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            state.data = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(inviteMember.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(inviteMember.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
            })
            .addCase(inviteMember.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(getControlQuestions.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                getControlQuestions.fulfilled,
                (state, action: PayloadAction<ControlQuestions[]>) => {
                    state.isLoading = false;
                    state.questions = action.payload;
                },
            )
            .addCase(getControlQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
