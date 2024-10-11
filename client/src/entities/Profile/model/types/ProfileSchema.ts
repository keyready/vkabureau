import { Profile } from './Profile';

export interface ProfileSchema {
    data?: Profile;
    isLoading: boolean;
    isPatching?: boolean;
    error?: string;
}
