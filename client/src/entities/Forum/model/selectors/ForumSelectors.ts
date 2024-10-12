import { StateSchema } from '@/app/providers/StoreProvider';

export const getForumData = (state: StateSchema) => state.forum?.data;
export const getForumIsLoading = (state: StateSchema) => state.forum?.isLoading;
export const getForumError = (state: StateSchema) => state.forum?.error;
