import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TaskSchema } from '../types/TaskSchema';
import { createTask } from '../service/createTask';
import { changeTask } from '../service/changeTask';
import { participate } from '../service/participate';

import { TaskPriority, TaskStatus } from '@/entities/Task/model/types/Task';

const initialState: TaskSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
    filters: {
        priority: [TaskPriority.FEATURE, TaskPriority.MEDIUM, TaskPriority.CRITICAL],
        status: [TaskStatus.CREATED, TaskStatus.PROGRESS, TaskStatus.COMPLETED, TaskStatus.REVIEW],
    },
};

export const TaskSlice = createSlice({
    name: 'TaskSlice',
    initialState,
    reducers: {
        setFilters: (
            state,
            action: PayloadAction<{ status: TaskStatus[]; priority: TaskPriority[] }>,
        ) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(changeTask.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(changeTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changeTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(participate.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(participate.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(participate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: TaskActions } = TaskSlice;
export const { reducer: TaskReducer } = TaskSlice;
