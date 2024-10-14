import { StateSchema } from '@/app/providers/StoreProvider';

export const getOverviewStatisticsData = (state: StateSchema) => state.statistics?.overviewData;
export const getTasksStatisticsData = (state: StateSchema) => state.statistics?.taskData;
export const getStatisticsIsLoading = (state: StateSchema) => state.statistics?.isLoading;
export const getStatisticsError = (state: StateSchema) => state.statistics?.error;
