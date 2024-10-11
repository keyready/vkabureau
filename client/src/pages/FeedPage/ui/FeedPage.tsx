import { memo, useEffect } from 'react';

import classes from './FeedPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { ProfileBlock } from '@/entities/Profile';
import { PageTitle } from '@/shared/ui/PageTitle';
import { MyProjectsList } from '@/entities/Project';

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
            <PageTitle title="Ваш профиль" className="mb-10" />
            <div
                className={classNames(
                    'grid grid-cols-5 items-start justify-items-stretch gap-4',
                    {},
                    [className],
                )}
            >
                <ProfileBlock className="col-span-3" />
                <MyProjectsList className="col-span-2" />
            </div>
        </Page>
    );
});

export default FeedPage;
