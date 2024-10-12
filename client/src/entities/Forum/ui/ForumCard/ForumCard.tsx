import { useMemo } from 'react';

import { Forum } from '../../model/types/Forum';

import classes from './ForumCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { normalizeWordForm } from '@/shared/lib/normalizeWordForm';

interface ForumCardProps {
    className?: string;
    forum: Forum;
}

export const ForumCard = (props: ForumCardProps) => {
    const { className, forum } = props;

    const membersCount = useMemo(
        () => normalizeWordForm(forum?.membersId?.length, ['участник', 'участника', 'участников']),
        [forum?.membersId?.length],
    );

    return (
        <VStack maxW className={classNames(classes.ForumCard, {}, [className])}>
            <h1 className="text-black">{forum.title}</h1>
            <p>{membersCount}</p>
        </VStack>
    );
};
