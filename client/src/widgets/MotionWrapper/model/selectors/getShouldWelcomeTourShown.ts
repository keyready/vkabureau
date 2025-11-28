import { StateSchema } from '@/app/providers/StoreProvider';

export const getShouldWelcomeTourShown = (state: StateSchema) =>
    state.motionWrapper.showWelcomeTour;
