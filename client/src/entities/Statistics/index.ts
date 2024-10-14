export type { TasksStatistics, OverviewStatistics } from './model/types/Statistics';
export type { StatisticsSchema } from './model/types/StatisticsSchema';
export { StatisticsActions, StatisticsReducer } from './model/slice/StatisticsSlice';

export {
    getOverviewStatisticsData,
    getTasksStatisticsData,
    getStatisticsIsLoading,
    getStatisticsError,
} from './model/selectors/StatisticsSelectors';

export { TasksStatistics as TasksStatisticsBlock } from './ui/TasksStatistics/TasksStatistics';
export { TotalStatistics as TotalStatisticsBlock } from './ui/TotalStatistics/TotalStatistics';
