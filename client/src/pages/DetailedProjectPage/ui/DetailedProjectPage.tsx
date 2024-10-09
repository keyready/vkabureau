import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiGlobalLine } from '@remixicon/react';

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
        <DynamicModuleLoader reducers={{ project: ProjectReducer }}>
            <Page className={classNames(classes.DetailedProjectPage, {}, [className])}>
                <VStack maxW gap="12px" className="relative">
                    <PageTitle title="Проект" />
                    <ProjectInfoBlock project={project} />
                    <HStack className="w-full items-start relative gap-4">
                        <VStack maxW className="w-4/5" gap="12px">
                            <HStack
                                maxW
                                justify="between"
                                align="center"
                                className="p-5 rounded-xl bg-white"
                            >
                                <h1 className="text-xl text-black uppercase">Задачи</h1>
                            </HStack>
                        </VStack>

                        <VStack gap="12px" maxW className="w-1/5 sticky top-20">
                            <VStack
                                maxW
                                justify="start"
                                align="center"
                                className="p-5 rounded-xl bg-white"
                            >
                                <HStack maxW>
                                    <RiGlobalLine className="text-accent" size={24} />
                                    <h2 className="text-left w-full text-l text-black">Языки</h2>
                                </HStack>
                            </VStack>
                        </VStack>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default DetailedProjectPage;
