export type { Project } from './model/types/Project';
export type { ProjectSchema } from './model/types/ProjectSchema';
export { ProjectActions, ProjectReducer } from './model/slice/ProjectSlice';

export {
    getProjectData,
    getProjectIsLoading,
    getProjectError,
} from './model/selectors/ProjectSelectors';

export { ProjectsList } from './ui/ProjectsList/ProjectsList';
export { fetchProject } from './model/service/fetchProject';
export { ProjectInfoBlock } from './ui/ProjectInfoBlock/ProjectInfoBlock';
