export type { Forum } from './model/types/Forum';
export type { ForumMessage } from './model/types/ForumMessage';
export type { ForumSchema } from './model/types/ForumSchema';
export { ForumActions, ForumReducer } from './model/slice/ForumSlice';

export { getForumData, getForumIsLoading, getForumError } from './model/selectors/ForumSelectors';

export { fetchForum } from './model/service/fetchForum';

export { ForumsList } from './ui/ForumsList/ForumsList';
