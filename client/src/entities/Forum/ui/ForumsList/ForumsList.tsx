import { AnimatePresence } from 'framer-motion';
import { cn } from '@nextui-org/react';

import { useForums } from '../../api/forumApi';
import { ForumCard } from '../ForumCard/ForumCard';

import classes from './ForumsList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { MotionWrapper } from '@/widgets/MotionWrapper';

interface ForumsListProps {
    className?: string;
}

export const ForumsList = (props: ForumsListProps) => {
    const { className } = props;

    const { data: forums, isLoading: isForumsLoading } = useForums();

    if (isForumsLoading) {
        return (
            <VStack maxW className={classNames(classes.ForumsList, {}, [className])}>
                <h1 className="text-l text-center w-full text-black">Загрузка...</h1>
            </VStack>
        );
    }

    if (!isForumsLoading && !forums?.length) {
        return (
            <VStack maxW className={classNames(classes.ForumsList, {}, [className])}>
                <h1 className="text-l text-center w-full text-black">
                    Вы пока не состоите ни в одном чате.
                </h1>
                <h2 className="text-l text-center w-full text-black">
                    Чтобы принять участие в обсуждении, нужно создать проект или присоединиться к
                    проекту.
                </h2>
            </VStack>
        );
    }

    return (
        <VStack gap="12px" maxW>
            <AnimatePresence mode="wait">
                {forums &&
                    forums.map((forum, index) => (
                        <MotionWrapper
                            key={forum.id}
                            appear="translate-x"
                            animationPosition={index}
                            animationDelay={0.04}
                            className={cn(
                                'w-full',
                                forum.title.includes('задачи') ? 'self-end p-2 w-11/12' : '',
                            )}
                        >
                            <ForumCard forum={forum} />
                        </MotionWrapper>
                    ))}
            </AnimatePresence>
        </VStack>
    );
};
