import { StateSchema } from '@/app/providers/StoreProvider';

export const getProjectData = (state: StateSchema) => state.project?.data;
export const getProjectIsLoading = (state: StateSchema) => state.project?.isLoading;
export const getProjectError = (state: StateSchema) => state.project?.error;
