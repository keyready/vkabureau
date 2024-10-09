import { Divider, Modal, ModalContent, ModalHeader } from '@nextui-org/react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { inviteMember } from '../../model/services/otherServices/inviteMember';

import { User, UserCard } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';
import { VStack } from '@/shared/ui/Stack';

interface InviteMemberModalProps {
    isModalOpened: boolean;
    setIsModalOpened: (value: boolean) => void;
    projectId?: number;
}

export const InviteMemberModal = (props: InviteMemberModalProps) => {
    const { projectId, isModalOpened, setIsModalOpened } = props;

    const isUsersLoading = false;
    const users: User[] = [];

    const dispatch = useAppDispatch();

    const handleInviteUserClick = useCallback(
        async (userId?: number) => {
            if (!projectId || !userId) {
                toast.error('Не найден projectId');
                return;
            }

            await toastDispatch(
                dispatch(
                    inviteMember({
                        projectId,
                        userId,
                    }),
                ),
            );
        },
        [dispatch, projectId],
    );

    return (
        <Modal size="3xl" isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
            <ModalContent className="p-4">
                <ModalHeader>Пригласить участников</ModalHeader>
                {isUsersLoading &&
                    new Array(5)
                        .fill(null)
                        .map((_, index) => <Skeleton key={index} width="100%" height={40} />)}

                <VStack gap="8px" maxW>
                    {users?.length ? (
                        users.map((user, index) => (
                            <VStack maxW key={user.id}>
                                <UserCard onInviteClick={handleInviteUserClick} user={user} />
                                {index !== users?.length - 1 && <Divider />}
                            </VStack>
                        ))
                    ) : (
                        <p className="text-black text-opacity-60 text-center">
                            Вы единственный пользователь сервиса... Не знаю, радоваться или плакать?
                        </p>
                    )}
                </VStack>
            </ModalContent>
        </Modal>
    );
};
