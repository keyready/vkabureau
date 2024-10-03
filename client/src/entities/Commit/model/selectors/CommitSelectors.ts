import { StateSchema } from '@/app/providers/StoreProvider';

export const getCommitData = (state: StateSchema) => state.commit?.data;
export const getCommitIsLoading = (state: StateSchema) => state.commit?.isLoading;
export const getCommitError = (state: StateSchema) => state.commit?.error;
