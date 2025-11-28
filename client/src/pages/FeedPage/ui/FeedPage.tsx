import { memo, useEffect } from 'react';

import classes from './FeedPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { ProfileBlock } from '@/entities/Profile';
import { PageTitle } from '@/shared/ui/PageTitle';
import { MyProjectsList } from '@/entities/Project';
import { OwnTasksList } from '@/entities/Task';
import { VStack } from '@/shared/ui/Stack';
import { ChangeAnimationSettings } from '@/widgets/MotionWrapper';
import { useOnboarding } from '@/shared/lib/hooks/useOnboarding';

interface FeedPageProps {
    className?: string;
}

const FeedPage = memo((props: FeedPageProps) => {
    const { className } = props;

    const { start } = useOnboarding('feed-page', [
        {
            element: '.profileSelector',
            popover: {
                title: 'Основные настройки профиля',
                description:
                    'Можно изменить всю общедоступную информаци. Указывайте настоящие данные, чтобы Ваши знакомые могли Вас найти',
            },
        },
        {
            element: '.ownProjectsSelector',
            popover: {
                title: 'Созданные Вами проекты',
                description: 'Здесь отобржается быстрый доступ к проектам, которые создали Вы',
            },
        },
        {
            element: '.tasksSelector',
            popover: {
                title: 'Ваши задачи',
                description: 'Задачи, в которых Вы принимаете непосредственное участие',
            },
        },
        {
            element: '.animationSettingsSelectors',
            popover: {
                title: 'Настройки анимаций приложения',
            },
        },
    ]);

    useEffect(() => {
        start();
    }, [start]);

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
                <div className="profileSelector w-full col-span-3 p-3 bg-white shadow-lg rounded-xl">
                    <ProfileBlock />
                </div>
                <VStack maxH className="gap-4 col-span-2">
                    <div className="ownProjectsSelector w-full p-3 bg-white shadow-lg rounded-xl">
                        <MyProjectsList />
                    </div>
                    <div className="tasksSelector w-full p-3 bg-white shadow-lg rounded-xl">
                        <OwnTasksList />
                    </div>
                </VStack>
                <div className="animationSettingsSelectors w-full col-span-3 p-3 bg-white shadow-lg rounded-xl">
                    <ChangeAnimationSettings />
                </div>
            </div>
        </Page>
    );
});

export default FeedPage;
