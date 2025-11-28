import { useSelector } from 'react-redux';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useCallback } from 'react';

import { getIsWelcomeModalEnabled } from '../model/selectors/getIsWelcomeModalEnabled';
import { MotionWrapperActions } from '../model/slice/slice';

import { ChangeAnimationSettings } from './ChangeAnimationSettings';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

export const WelcomeModal = () => {
    const shouldWelcomeModalShown = useSelector(getIsWelcomeModalEnabled);

    const dispatch = useAppDispatch();

    const handleCloseModal = useCallback(() => {
        dispatch(MotionWrapperActions.disableWelcomeModal());
    }, [dispatch]);

    return (
        <Modal size="2xl" isOpen={shouldWelcomeModalShown} onClose={handleCloseModal}>
            <ModalContent>
                <ModalHeader>Добро пожаловать в Конструкторское бюро!</ModalHeader>
                <ModalBody className="gap-0">
                    <ChangeAnimationSettings />
                    <p className="italic ml-7 text-xs opacity-70">
                        Позже вы можете изменить это в настройках, в профиле
                    </p>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};
