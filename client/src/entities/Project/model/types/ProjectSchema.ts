import { Project } from './Project';

export interface ProjectSchema {
    data?: Project;
    isLoading: boolean;
    isCreating?: boolean;
    isLikeSending?: boolean;
    error?: string;
}
