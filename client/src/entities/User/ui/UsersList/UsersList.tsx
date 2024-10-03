import { RiGroupLine } from '@remixicon/react';
import { Image } from '@nextui-org/react';
import { useCallback, useState } from 'react';

import { User } from '../../model/types/User';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { InviteMemberModal } from '@/entities/User/ui/InviteMemberModal/InviteMemberModal';

interface UsersListProps {
    className?: string;
    users?: User[];
    projectId?: number;
}

export const UsersList = (props: UsersListProps) => {
    const { className, users, projectId } = props;

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const handleInviteMembers = useCallback(async () => {
        setIsModalOpened(true);
    }, []);

    return (
        <VStack
            justify="between"
            align="center"
            className={classNames('p-5 rounded-xl bg-white', {}, [className])}
            maxW
            gap="8px"
        >
            <HStack maxW>
                <RiGroupLine className="text-accent" size={18} />
                <h2 className="text-l text-black">Участники</h2>
            </HStack>
            {users?.length ? (
                users.map((collaborator) => (
                    <HStack maxW gap="8px">
                        <Image src={collaborator.avatar} width={25} radius="full" />
                        <h2 className="text-black">{collaborator.name}</h2>
                    </HStack>
                ))
            ) : (
                <p className="text-black">Пока никого нет ;(</p>
            )}

            <button
                className="opacity-55 underline text-accent"
                type="button"
                onClick={handleInviteMembers}
            >
                Пригласить участников
            </button>

            <InviteMemberModal
                projectId={projectId}
                isModalOpened={isModalOpened}
                setIsModalOpened={setIsModalOpened}
            />
        </VStack>
    );
};
