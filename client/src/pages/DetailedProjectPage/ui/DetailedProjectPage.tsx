import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiGroupLine, RiUser3Line } from '@remixicon/react';
import { Button } from '@nextui-org/react';

import classes from './DetailedProjectPage.module.scss';
import { DetailedProjectPageSkeleton } from './DetailedProjectPageSkeleton';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { PageTitle } from '@/shared/ui/PageTitle';
import { RoutePath } from '@/shared/config/routeConfig';
import {
    fetchProject,
    getProjectData,
    getProjectIsLoading,
    ProjectInfoBlock,
    ProjectReducer,
} from '@/entities/Project';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AuthorBlock } from '@/entities/Profile';
import { ContributorsBlock, TaskReducer, TasksList } from '@/entities/Task';
import { useOnboarding } from '@/shared/lib/hooks/useOnboarding';

interface DetailedProjectPageProps {
    className?: string;
}

const DetailedProjectPage = memo((props: DetailedProjectPageProps) => {
    const { className } = props;

    const { projectId } = useParams<{ projectId: string }>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const project = useSelector(getProjectData);
    const isProjectLoading = useSelector(getProjectIsLoading);

    const [isFiltersOpened, setIsFiltersOpened] = useState<boolean>(false);

    const { start } = useOnboarding('detailed-project-page', [
        {
            element: '.detailedProjectTitleSelector',
            popover: {
                title: 'Название проекта или идеи',
                description: 'Зацепит Вас или ваших коллег для совместного решения',
            },
        },
        {
            element: '.detailedProjectDescriptionSelector',
            popover: {
                title: 'Описание проекта',
                description:
                    'Позволяет авторы выразить свои мысли и идеи, которые он хотел бы реализовать',
            },
        },
        {
            element: '.detailedProjectDateSelector',
            popover: {
                title: 'Дата создания проекта',
            },
        },
        {
            element: '.detailedProjectTasksSelector',
            popover: {
                title: 'Задачи проекта',
                description:
                    'Любой проект разделен на подзадачи, у них есть приоритет и статус. Вы можете откликаться на задачи, которые близки к Вам по компетенциям',
            },
        },
        {
            element: '.detailedProjectFiltersSelector',
            popover: {
                title: 'Фильтры по задачам',
                description:
                    'Позволяют выбрать из множества задач те, у которых определенный статус или приоритет',
            },
        },
        {
            element: '.wrapperTasksList',
            popover: {
                title: 'Здесь перечислены все задачи проекта, которые автор посчитал важными для реализации идеи',
                description: '',
            },
        },
        {
            element: '.taskTitleSelector',
            popover: {
                title: 'Краткая формулировка',
                description: '',
            },
        },
        {
            element: '.taskDateSelector',
            popover: {
                title: 'Сроки выполнения',
                description: 'Сроки, до которых надо выполнить задачу по мнению автора',
            },
        },
        {
            element: '.taskDescriptionSelector',
            popover: {
                title: 'Описание задачи',
                description:
                    'Подробное описание задачи, позволяет вникнуть в суть и понять, надо ли оно вам это все...',
            },
        },
        {
            element: '.taskPrioritySelector',
            popover: {
                title: 'Приоритет задачи',
                description:
                    'Определяет, на сколько задача важна: критическая, средняя или бэклог (когда-нибудь)',
            },
        },
        {
            element: '.taskStatusSelector',
            popover: {
                title: 'Статус задачи',
                description:
                    'Задача может быть новой, в процессе, решена или на проверке. Статусы изменяет автор задачи',
            },
        },
    ]);

    useEffect(() => {
        if (projectId) {
            dispatch(fetchProject(projectId));
        } else {
            navigate(RoutePath.projects);
        }
    }, [dispatch, navigate, projectId]);

    useEffect(() => {
        if (!isProjectLoading) start();
    }, [isProjectLoading, start]);

    if (isProjectLoading) {
        return (
            <DynamicModuleLoader reducers={{ project: ProjectReducer }}>
                <Page className={classNames(classes.DetailedProjectPage, {}, [className])}>
                    <DetailedProjectPageSkeleton />
                </Page>
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={{ project: ProjectReducer, task: TaskReducer }}>
            <Page className={classNames(classes.DetailedProjectPage, {}, [className])}>
                <VStack maxW gap="12px" className="relative">
                    <PageTitle title="Проект" />
                    <ProjectInfoBlock project={project} />

                    <HStack className="w-full items-start relative gap-4">
                        <VStack maxW className="detailedProjectTasksSelector w-8/12" gap="12px">
                            <HStack
                                maxW
                                justify="between"
                                align="center"
                                className="p-5 rounded-xl bg-white"
                            >
                                <h1 className="text-xl text-black uppercase">Задачи</h1>
                                <Button
                                    className="detailedProjectFiltersSelector"
                                    onClick={() => setIsFiltersOpened(true)}
                                >
                                    Фильтры
                                </Button>
                            </HStack>
                            <TasksList
                                isFiltersOpened={isFiltersOpened}
                                setIsFiltersOpened={setIsFiltersOpened}
                            />
                        </VStack>

                        <VStack gap="12px" maxW className="w-4/12 sticky top-32">
                            <VStack
                                maxW
                                justify="start"
                                align="center"
                                className="p-5 rounded-xl bg-white"
                            >
                                <HStack maxW>
                                    <RiUser3Line className="text-accent" size={24} />
                                    <h2 className="text-left w-full text-l text-black">
                                        Автор проекта
                                    </h2>
                                </HStack>
                                <AuthorBlock author={project?.author} />
                            </VStack>

                            <VStack
                                maxW
                                justify="start"
                                align="start"
                                className="p-5 rounded-xl bg-white"
                            >
                                <HStack maxW>
                                    <RiGroupLine className="text-accent" size={24} />
                                    <h2 className="text-left w-full text-l text-black">
                                        Исполнители проекта
                                    </h2>
                                </HStack>
                                <ContributorsBlock />
                            </VStack>
                        </VStack>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default DetailedProjectPage;
