import { OverviewStatistics, TasksStatistics } from './Statistics';

export interface StatisticsSchema {
    taskData?: TasksStatistics;
    overviewData?: OverviewStatistics;
    isLoading: boolean;
    error?: string;
}
