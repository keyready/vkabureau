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
import { TaskReducer, TasksList } from '@/entities/Task';

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

    useEffect(() => {
        if (projectId) {
            dispatch(fetchProject(projectId));
        } else {
            navigate(RoutePath.projects);
        }
    }, [dispatch, navigate, projectId]);

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
                        <VStack maxW className="w-8/12" gap="12px">
                            <HStack
                                maxW
                                justify="between"
                                align="center"
                                className="p-5 rounded-xl bg-white"
                            >
                                <h1 className="text-xl text-black uppercase">Задачи</h1>
                                <Button onClick={() => setIsFiltersOpened(true)}>Фильтры</Button>
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
                                align="center"
                                className="p-5 rounded-xl bg-white"
                            >
                                <HStack maxW>
                                    <RiGroupLine className="text-accent" size={24} />
                                    <h2 className="text-left w-full text-l text-black">
                                        Участники проекта
                                    </h2>
                                </HStack>
                                <AuthorBlock author={project?.author} />
                            </VStack>
                        </VStack>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default DetailedProjectPage;
