import { ControlQuestions, User } from './User';

export interface UserSchema {
    data?: User;
    isLoading: boolean;
    questions?: ControlQuestions[];
    error?: string;
}
