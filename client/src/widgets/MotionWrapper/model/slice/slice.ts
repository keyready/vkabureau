import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MotionWrapperSchema } from '../types/MotionWrapper';

const saveSettings = (animations: boolean, welcome: boolean, welcomeTour: boolean) => {
    localStorage.setItem(
        'animations',
        JSON.stringify({ isAnimationEnabled: animations, welcomeModal: welcome, welcomeTour }),
    );
};

const loadSettings = () => {
    const saved = localStorage.getItem('animations');
    if (!saved)
        return {
            isAnimationEnabled: true,
            welcomeModal: true,
            welcomeTour: false,
        };
    return JSON.parse(saved) as {
        isAnimationEnabled: boolean;
        welcomeModal: boolean;
        welcomeTour: boolean;
    };
};

const initialState: MotionWrapperSchema = {
    isAnimationEnable: loadSettings().isAnimationEnabled,
    welcomeModal: loadSettings().welcomeModal,
    showWelcomeTour: loadSettings().welcomeTour,
};

export const MotionWrapperSlice = createSlice({
    name: 'MotionWrapperSlice',
    initialState,
    reducers: {
        toggleAnimation: (state) => {
            saveSettings(!state.isAnimationEnable, state.welcomeModal, state.showWelcomeTour);
            state.isAnimationEnable = !state.isAnimationEnable;
        },
        setAnimationEnabled: (state, action: PayloadAction<boolean>) => {
            state.isAnimationEnable = action.payload;
            saveSettings(action.payload, state.welcomeModal, state.showWelcomeTour);
        },
        disableWelcomeModal: (state) => {
            state.welcomeModal = false;
            saveSettings(state.isAnimationEnable, state.welcomeModal, state.showWelcomeTour);
        },
        enableTours: (state) => {
            state.showWelcomeTour = true;
            state.welcomeModal = false;
            saveSettings(state.isAnimationEnable, false, true);
        },
    },
});

export const { actions: MotionWrapperActions } = MotionWrapperSlice;
export const { reducer: MotionWrapperReducer } = MotionWrapperSlice;
