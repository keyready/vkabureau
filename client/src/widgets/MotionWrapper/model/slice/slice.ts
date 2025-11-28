import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MotionWrapperSchema } from '../types/MotionWrapper';

const saveSettings = (animations: boolean, welcome: boolean) => {
    localStorage.setItem(
        'animations',
        JSON.stringify({ isAnimationEnabled: animations, welcomeModal: welcome }),
    );
};

const loadSettings = () => {
    const saved = localStorage.getItem('animations');
    if (!saved)
        return {
            isAnimationEnabled: true,
            welcomeModal: true,
        };
    return JSON.parse(saved) as { isAnimationEnabled: boolean; welcomeModal: boolean };
};

const initialState: MotionWrapperSchema = {
    isAnimationEnable: loadSettings().isAnimationEnabled,
    welcomeModal: loadSettings().welcomeModal,
};

export const MotionWrapperSlice = createSlice({
    name: 'MotionWrapperSlice',
    initialState,
    reducers: {
        toggleAnimation: (state) => {
            saveSettings(!state.isAnimationEnable, state.welcomeModal);
            state.isAnimationEnable = !state.isAnimationEnable;
        },
        setAnimationEnabled: (state, action: PayloadAction<boolean>) => {
            state.isAnimationEnable = action.payload;
            saveSettings(action.payload, state.welcomeModal);
        },
        disableWelcomeModal: (state) => {
            state.welcomeModal = false;
            saveSettings(state.isAnimationEnable, state.welcomeModal);
        },
    },
});

export const { actions: MotionWrapperActions } = MotionWrapperSlice;
export const { reducer: MotionWrapperReducer } = MotionWrapperSlice;
