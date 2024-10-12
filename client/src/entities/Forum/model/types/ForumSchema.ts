import { Forum } from './Forum';

export interface ForumSchema {
    data?: Forum;
    isLoading: boolean;
    error?: string;
}
