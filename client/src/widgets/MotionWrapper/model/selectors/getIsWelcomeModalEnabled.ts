import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsWelcomeModalEnabled = (state: StateSchema) => state.motionWrapper.welcomeModal;
