import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatisticsSchema } from '../types/StatisticsSchema';
import { fetchTaskStatistics } from '../service/fetchTaskStatistics';
import { fetchOverviewStatistics } from '../service/fetchOverviewStatistics';

const initialState: StatisticsSchema = {
    taskData: undefined,
    overviewData: undefined,
    isLoading: false,
    error: undefined,
};

export const StatisticsSlice = createSlice({
    name: 'StatisticsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskStatistics.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchTaskStatistics.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.taskData = action.payload;
            })
            .addCase(fetchTaskStatistics.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchOverviewStatistics.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchOverviewStatistics.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.overviewData = action.payload;
            })
            .addCase(fetchOverviewStatistics.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: StatisticsActions } = StatisticsSlice;
export const { reducer: StatisticsReducer } = StatisticsSlice;
