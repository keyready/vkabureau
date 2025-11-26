import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProjectSchema } from '../types/ProjectSchema';
import { createProject } from '../service/createProject';
import { fetchProject } from '../service/fetchProject';
import { Project } from '../types/Project';
import { changeLikeStatus } from '../service/changeLikeStatus';
import { deleteProject } from '../service/deleteProject';

import { changeProject } from '@/entities/Project/model/service/changeProject';

const initialState: ProjectSchema = {
    data: undefined,
    editableProject: undefined,
    isEditorMode: false,
    isLoading: false,
    isCreating: false,
    error: undefined,
};

export const ProjectSlice = createSlice({
    name: 'ProjectSlice',
    initialState,
    reducers: {
        setEditedProject: (state, action: PayloadAction<Partial<Project>>) => {
            state.editableProject = action.payload;
        },
        setEditorMode: (state, action: PayloadAction<boolean>) => {
            state.isEditorMode = action.payload;
        },
    },
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
            })

            .addCase(changeProject.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(changeProject.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changeProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteProject.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteProject.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(changeLikeStatus.pending, (state) => {
                state.error = undefined;
                state.isLikeSending = true;
            })
            .addCase(changeLikeStatus.fulfilled, (state) => {
                state.isLikeSending = false;
            })
            .addCase(changeLikeStatus.rejected, (state, action) => {
                state.isLikeSending = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProjectActions } = ProjectSlice;
export const { reducer: ProjectReducer } = ProjectSlice;
