import { useCallback } from 'react';
import { Checkbox } from '@nextui-org/react';
import { useSelector } from 'react-redux';

import { getIsAnimationEnabled } from '../model/selectors/getIsAnimationEnabled';
import { MotionWrapperActions } from '../model/slice/slice';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

export const ChangeAnimationSettings = () => {
    const isAnimationEnabled = useSelector(getIsAnimationEnabled);

    const dispatch = useAppDispatch();

    const handleAnimationToggle = useCallback(
        (state: boolean) => {
            dispatch(MotionWrapperActions.setAnimationEnabled(state));
        },
        [dispatch],
    );

    return (
        <div className="w-full">
            <Checkbox isSelected={isAnimationEnabled} onValueChange={handleAnimationToggle}>
                Использовать анимации на сайте
            </Checkbox>
            <p className="italic ml-7 text-xs opacity-70">
                Если Ваш компутер не отличается производительностью, Вы можете выключить анимации
            </p>
        </div>
    );
};
