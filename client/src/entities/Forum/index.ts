export type { Forum } from './model/types/Forum';
export type { ForumSchema } from './model/types/ForumSchema';
export { ForumActions, ForumReducer } from './model/slice/ForumSlice';

export { getForumData, getForumIsLoading, getForumError } from './model/selectors/ForumSelectors';

export { ForumsList } from './ui/ForumsList/ForumsList';
