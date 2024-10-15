import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state.user?.data;
export const getUserQuestions = (state: StateSchema) => state.user?.questions;
export const getUserIsLoading = (state: StateSchema) => state.user?.isLoading;
export const getUserError = (state: StateSchema) => state.user?.error;
