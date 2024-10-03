import { useCallback, useMemo } from 'react';
import { Button } from '@nextui-org/react';

import { Project } from '../../model/types/Project';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { addProject } from '@/entities/Project/model/service/addProject';
import { useProjects } from '@/entities/Project/api/ProjectsApi';

interface ProjectCardProps {
    className?: string;
    project: Project;
}

export const ProjectCard = (props: ProjectCardProps) => {
    const { className, project } = props;

    const { refetch } = useProjects();

    const dispatch = useAppDispatch();

    const renderDate = useMemo(
        () =>
            new Date(project.created_at).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }),
        [project],
    );

    const renderDescription = useMemo(() => {
        if (project.description?.length) {
            if (project.description?.length > 50) {
                return `${project.description.slice(0, 50)}...`;
            }
        }
        return project.description;
    }, [project?.description]);

    const handleImportProject = useCallback(async () => {
        await dispatch(
            addProject({ name: project.url, type: project.private ? 'private' : 'public' }),
        );
        await refetch();
    }, [dispatch, project.private, project.url, refetch]);

    return (
        <div className={classNames('h-[60px] w-full grid grid-cols-4', {}, [className])}>
            <VStack className="col-span-3">
                <HStack align="center" gap="12px">
                    <a
                        target="_blank"
                        className="underline underline-1 underline-offset-2"
                        href={`https://github.com${project.url.split('repos')[1]}`}
                        rel="noreferrer"
                    >
                        {project.name}
                    </a>
                    <h2 className="text-s opacity-50">{renderDate}</h2>
                </HStack>
                <p className="italic opacity-50">{renderDescription}</p>
            </VStack>
            <Button
                onClick={handleImportProject}
                color="success"
                className="col-span-1bg-opacity-50 py-1 px-3 min-h-none h-fit"
            >
                Импортировать
            </Button>
        </div>
    );
};
