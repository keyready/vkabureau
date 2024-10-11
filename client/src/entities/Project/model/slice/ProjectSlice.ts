import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProjectSchema } from '../types/ProjectSchema';
import { createProject } from '../service/createProject';
import { fetchProject } from '../service/fetchProject';
import { Project } from '../types/Project';

const initialState: ProjectSchema = {
    data: undefined,
    isLoading: false,
    isCreating: false,
    error: undefined,
};

export const ProjectSlice = createSlice({
    name: 'ProjectSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.error = undefined;
                state.isCreating = true;
            })
            .addCase(createProject.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isCreating = false;
                state.error = action.payload;
            })

            .addCase(fetchProject.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProject.fulfilled, (state, action: PayloadAction<Project>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProjectActions } = ProjectSlice;
export const { reducer: ProjectReducer } = ProjectSlice;
