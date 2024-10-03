import { Commit } from './Commit';

export interface CommitSchema {
    data?: Commit;
    isLoading: boolean;
    error?: string;
}
