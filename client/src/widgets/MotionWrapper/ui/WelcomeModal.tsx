import { useSelector } from 'react-redux';
import {
    Checkbox,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { useCallback } from 'react';

import { getIsWelcomeModalEnabled } from '../model/selectors/getIsWelcomeModalEnabled';
import { MotionWrapperActions } from '../model/slice/slice';

import { ChangeAnimationSettings } from './ChangeAnimationSettings';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getShouldWelcomeTourShown } from '@/widgets/MotionWrapper';

export const WelcomeModal = () => {
    const shouldWelcomeModalShown = useSelector(getIsWelcomeModalEnabled);
    const isToursShown = useSelector(getShouldWelcomeTourShown);

    const dispatch = useAppDispatch();

    const handleCloseModal = useCallback(() => {
        dispatch(MotionWrapperActions.disableWelcomeModal());
        dispatch(MotionWrapperActions.enableTours());
    }, [dispatch]);

    const handleToursDisable = useCallback(
        (state: boolean) => {
            if (state) {
                dispatch(MotionWrapperActions.enableTours());
            } else {
                dispatch(MotionWrapperActions.disableWelcomeModal());
            }
        },
        [dispatch],
    );

    return (
        <Modal size="2xl" isOpen={shouldWelcomeModalShown} onClose={handleCloseModal}>
            <ModalContent>
                <ModalHeader>Добро пожаловать в Конструкторское бюро!</ModalHeader>
                <ModalBody className="gap-4">
                    <div className="flex flex-col">
                        <ChangeAnimationSettings />
                        <p className="italic ml-7 text-xs opacity-70">
                            Позже вы можете изменить это в настройках, в профиле
                        </p>
                    </div>
                    <Divider />
                    <div className="w-full">
                        <Checkbox isSelected={isToursShown} onValueChange={handleToursDisable}>
                            Вы хотите видеть подсказки на каждой странице при первом ее посещении?
                        </Checkbox>
                        <p className="italic ml-7 text-xs opacity-70">
                            Каждый раз, когда Вы будете открывать страницу, на которую попали
                            впервые, мы будем показывать Вам небольшие подсказки, чтобы быстрее
                            ввести Вас в курс дела
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};
