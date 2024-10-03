import { Project } from './Project';

export interface ProjectSchema {
    data?: Project;
    isLoading: boolean;
    error?: string;
}
