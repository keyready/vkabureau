import { Profile } from './Profile';

export interface ProfileSchema {
    data?: Profile;
    isLoading: boolean;
    error?: string;
}
