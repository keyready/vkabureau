export type { Profile } from './model/types/Profile';
export type { ProfileSchema } from './model/types/ProfileSchema';
export { ProfileActions, ProfileReducer } from './model/slice/ProfileSlice';

export { useProfiles } from './api/profileApi';

export { fetchProfile } from './model/service/fetchProfile';

export {
    getProfileData,
    getProfileIsLoading,
    getProfileError,
} from './model/selectors/ProfileSelectors';

export { ProfileBlock } from './ui/ProfileBlock/ProfileBlock';
export { AvatarSelector } from './ui/AvatarSelector/AvatarSelector';
