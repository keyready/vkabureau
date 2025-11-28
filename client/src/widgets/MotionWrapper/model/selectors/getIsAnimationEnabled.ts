import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsAnimationEnabled = (state: StateSchema) => state.motionWrapper.isAnimationEnable;
