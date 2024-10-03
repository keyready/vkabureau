import { useTranslation } from 'react-i18next';
import { Divider, Pagination } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { ProjectCard } from '../ProjectCard/ProjectCard';
import { Project } from '../../model/types/Project';
import { ProjectReducer } from '../../model/slice/ProjectSlice';

import classes from './ReposList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';

interface ReposListProps {
    className?: string;
    repos?: Project[];
    isLoading?: boolean;
    total?: number;
}

export const ReposList = (props: ReposListProps) => {
    const { className, isLoading, repos, total } = props;

    const { t } = useTranslation();

    const [page, setPage] = useState<number>(1);

    const [paginatedRepos, setPaginatedRepos] = useState<Project[]>([]);

    useEffect(() => {
        if (repos?.length) setPaginatedRepos(repos?.slice((page - 1) * 5, page * 5));
    }, [page, repos]);

    if (isLoading) {
        return (
            <VStack gap="12px" maxW className={classNames(classes.ProjectsList, {}, [className])}>
                {new Array(5).fill(0).map((_, index) => (
                    <Skeleton rounded={8} width="100%" height={60}
key={index} />
                ))}
            </VStack>
        );
    }

    if (!repos?.length) {
        return (
            <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
                <p>{t('Кажется, у Вас нет репозиториев')}</p>
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader reducers={{ project: ProjectReducer }}>
            <VStack
                maxW
                maxH
                flexGrow
                gap="32px"
                justify="between"
                className={classNames(classes.ProjectsList, {}, [className])}
            >
                <VStack maxW gap="12px">
                    {paginatedRepos.map((project, index) => (
                        <>
                            <ProjectCard project={project} />
                            {index <= 3 && <Divider />}
                        </>
                    ))}
                </VStack>

                <HStack justify="center" maxW>
                    <Pagination
                        page={page}
                        onChange={setPage}
                        classNames={{
                            cursor: 'bg-accent text-white',
                        }}
                        color="default"
                        total={total || 0}
                    />
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
};
