import { memo, useEffect } from 'react';

import classes from './ProjectsPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { PageTitle } from '@/shared/ui/PageTitle';
import { ProjectsList } from '@/entities/Project';
import { VStack } from '@/shared/ui/Stack';
import { useOnboarding } from '@/shared/lib/hooks/useOnboarding';

interface ProjectsPageProps {
    className?: string;
}

const ProjectsPage = memo((props: ProjectsPageProps) => {
    const { className } = props;

    const { start } = useOnboarding('projects-page', [
        {
            element: '#projects-list',
            popover: {
                title: 'Список проектов',
                description:
                    'В этом разделе представлены все проекты, которые сейчас существуют на платформе',
            },
        },
        {
            element: '.projectCardSelector:nth-child(1)',
            popover: {
                title: 'Карточка проекта',
                description: 'Здесь собрана краткая информация о проекте',
            },
        },
        {
            element: '.projectTitleSelector:nth-child(1)',
            popover: {
                title: 'Название проекта',
            },
        },
        {
            element: '.projectDateSelector',
            popover: {
                title: 'Дата создания проекта',
            },
        },
        {
            element: '.projectTasksSelector:nth-child(1)',
            popover: {
                title: 'Количество задач в проекте',
            },
        },
        {
            element: '.projectUsersSelector',
            popover: {
                title: 'Количество участников',
                description:
                    'Это сторонние участники проекта (не считая создателя). Участники группируются по доступным задачам',
            },
        },
        {
            element: '.projectLikesSelector',
            popover: {
                title: 'Счетчик заинтересованности пользователей',
                description: 'Отображает количество пользователей, которым проект пришелся по душе',
            },
        },
        {
            element: '.sortingProjectsSelector',
            popover: {
                title: 'Переключение сортировки проектов',
                description: 'Выберите удобное представление проектов',
            },
        },
        {
            element: '.addProjectSelector',
            popover: {
                title: 'Добавьте свою идею на платформу!',
                description: 'Начните творить прямо сейчас!',
            },
        },
    ]);

    useEffect(() => {
        start();
    }, [start]);

    return (
        <Page className={classNames(classes.ProjectsPage, {}, [className])}>
            <VStack maxW gap="24px">
                <PageTitle id="page-title" title="Текущие проекты" />
                <ProjectsList id="projects-list" />
            </VStack>
        </Page>
    );
});

export default ProjectsPage;
