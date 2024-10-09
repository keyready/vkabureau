import { memo, useEffect } from 'react';

import classes from './FeedPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { ProfileBlock } from '@/entities/Profile';

interface FeedPageProps {
    className?: string;
}

const FeedPage = memo((props: FeedPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Ваш профиль';
    }, []);

    return (
        <Page className={classNames(classes.FeedPage, {}, [className])}>
            <ProfileBlock />
        </Page>
    );
});

export default FeedPage;
