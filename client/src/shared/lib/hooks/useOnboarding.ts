import { driver, type DriveStep } from 'driver.js';
import { useSelector } from 'react-redux';

import { getShouldWelcomeTourShown } from '@/widgets/MotionWrapper';

import 'driver.js/dist/driver.css';

type TourState = {
    completed: boolean;
    currentStepIndex?: number;
};

export const useOnboarding = (onBoardingId: string, steps: DriveStep[]) => {
    const isShown = useSelector(getShouldWelcomeTourShown);

    const getTourState = (): TourState => {
        try {
            const raw = localStorage.getItem(`onboarding:${onBoardingId}`);
            return raw ? JSON.parse(raw) : { completed: false };
        } catch {
            return { completed: false };
        }
    };

    const setTourState = (state: Partial<TourState>) => {
        const current = getTourState();
        const next = { ...current, ...state };
        localStorage.setItem(`onboarding:${onBoardingId}`, JSON.stringify(next));
    };

    const resetTour = () => {
        localStorage.removeItem(`onboarding:${onBoardingId}`);
    };

    const createDriver = () => {
        const { completed, currentStepIndex } = getTourState();

        if (completed || !isShown) return null;

        const drv = driver({
            steps: currentStepIndex ? steps.slice(currentStepIndex) : steps,
            showProgress: true,
            nextBtnText: 'Дальше',
            prevBtnText: 'Назад',
            doneBtnText: 'Отлично!',
            progressText: '{{current}} из {{total}}',
            overlayClickBehavior: 'nextStep',
            onDestroyed: (skipped) => {
                if (skipped) {
                    const { className } = skipped;
                    const skippedIndex = steps.findIndex((s) =>
                        // @ts-expect-error types mischecks
                        className.includes(s.element?.split('.')[1]),
                    );
                    if (skippedIndex === steps.length - 1) {
                        setTourState({ completed: true, currentStepIndex: undefined });
                    } else {
                        setTourState({ completed: false, currentStepIndex: skippedIndex });
                    }
                } else setTourState({ completed: true, currentStepIndex: undefined });
            },
        });

        return drv;
    };

    const start = () => {
        const drv = createDriver();
        if (drv) {
            drv.drive();
        } else {
            console.log(`[onboarding] Тур "${onBoardingId}" уже завершён.`);
        }
    };

    const isCompleted = () => getTourState().completed;

    return {
        start,
        reset: resetTour,
        isCompleted,
    };
};
