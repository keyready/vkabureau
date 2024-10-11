import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileData = (state: StateSchema) => state.profile?.data;
export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading;
export const getProfileIsPatching = (state: StateSchema) => state.profile?.isPatching;
export const getProfileError = (state: StateSchema) => state.profile?.error;
