export type { User, RegisterUser } from './model/types/User';
export type { UserSchema } from './model/types/UserSchema';
export { UserActions, UserReducer } from './model/slice/UserSlice';
export { getUserData, getUserIsLoading, getUserError } from './model/selectors/UserSelectors';

export { signupUser } from './model/services/authServices/signupUser';
export { loginUser } from './model/services/authServices/loginUser';

export { AuthBlockTabs } from './ui/AuthBlockTabs/AuthBlockTabs';
