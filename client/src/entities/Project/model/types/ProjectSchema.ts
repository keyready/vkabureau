import { Project } from './Project';

export interface ProjectSchema {
    data?: Project;
    editableProject?: Partial<Project>;
    isEditorMode?: boolean;
    isLoading: boolean;
    isCreating?: boolean;
    isLikeSending?: boolean;
    error?: string;
}
