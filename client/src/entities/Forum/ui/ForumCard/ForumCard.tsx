import { useCallback, useMemo } from 'react';
import { RiMessageLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

import { Forum } from '../../model/types/Forum';

import classes from './ForumCard.module.scss';

import { HStack, VStack } from '@/shared/ui/Stack';
import { normalizeWordForm } from '@/shared/lib/normalizeWordForm';
import { RoutePath } from '@/shared/config/routeConfig';

interface ForumCardProps {
    className?: string;
    forum: Forum;
}

export const ForumCard = (props: ForumCardProps) => {
    const { className, forum } = props;

    const navigate = useNavigate();

    const handleCardClick = useCallback(() => {
        navigate(RoutePath.chat + forum.id);
    }, [forum.id, navigate]);

    const membersCount = useMemo(
        () => normalizeWordForm(forum?.membersId?.length, ['участник', 'участника', 'участников']),
        [forum?.membersId?.length],
    );

    const messagesCount = useMemo(
        () => normalizeWordForm(forum?.messages?.length, ['сообщение', 'сообщения', 'сообщений']),
        [forum?.messages?.length],
    );

    return (
        <VStack onClick={handleCardClick} gap="12px" className={classes.ForumCard}>
            <HStack justify="between" maxW>
                <h1 className="text-xl">{forum.title}</h1>
                <HStack>
                    <RiMessageLine className="text-primary" />
                    <h2>
                        {forum?.messages?.length} {messagesCount}
                    </h2>
                </HStack>
            </HStack>
            <p className="text-l">
                {forum?.membersId?.length} {membersCount}
            </p>
        </VStack>
    );
};
