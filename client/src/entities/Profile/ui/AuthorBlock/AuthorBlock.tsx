import { useMemo } from 'react';

import classes from './AuthorBlock.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Profile } from '@/entities/Profile';
import { VStack } from '@/shared/ui/Stack';
import { RenderedRanks } from '@/entities/Profile/model/types/Profile';

interface AuthorBlockProps {
    className?: string;
    author: Profile | undefined;
}

export const AuthorBlock = (props: AuthorBlockProps) => {
    const { className, author } = props;

    const renderAuthorRank = useMemo(() => {
        const result = Object.entries(RenderedRanks).find(([key]) => key === author?.rank);
        if (!result) return 'н/д';
        return result[1].title;
    }, [author?.rank]);

    return (
        <VStack maxW className={classNames(classes.AuthorBlock, {}, [className])}>
            <h1 className="text-black text-m">
                {renderAuthorRank} {author?.lastname} {author?.firstname?.slice(0, 1)}.{' '}
                {author?.middlename?.slice(0, 1)}.
            </h1>
        </VStack>
    );
};
