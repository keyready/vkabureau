import { Button } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { RiAddBoxLine } from '@remixicon/react';

import { useProjects } from '../../api/ProjectsApi';
import { ProjectPreviewCard } from '../ProjectPreviewCard/ProjectPreviewCard';

import classes from './ProjectsList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CreateProjectModal } from '@/entities/Project/ui/CreateProjectModal/ui/CreateProjectModal';

interface ProjectsListProps {
    className?: string;
}

export const ProjectsList = (props: ProjectsListProps) => {
    const { className } = props;

    const { data: projects, isLoading: isProjectsLoading } = useProjects();

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const handleImportProjectClick = useCallback(() => {
        setIsModalOpened(true);
    }, []);

    if (isProjectsLoading) {
        return (
            <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
                <div className="grid w-full grid-cols-3 gap-4">
                    {new Array(7).fill(0).map((_, index) => (
                        <Skeleton dark width="100%" height={180} rounded={18} key={index} />
                    ))}
                </div>
            </VStack>
        );
    }

    if (!projects?.length && !isProjectsLoading) {
        return (
            <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
                <h1 className="text-l text-black">Вы пока не добавили ни одного проекта</h1>
                <Button
                    className="bg-accent fixed bottom-10 right-10 shadow-2xl"
                    onClick={handleImportProjectClick}
                >
                    <RiAddBoxLine className="text-white" />
                    <p className="text-white">Создать проект</p>
                </Button>
                <CreateProjectModal isOpened={isModalOpened} setIsOpened={setIsModalOpened} />
            </VStack>
        );
    }

    return (
        <VStack maxW>
            <div className="grid w-full grid-cols-3 gap-4">
                {projects?.map((project) => (
                    <ProjectPreviewCard project={project} key={project.id} />
                ))}
            </div>
            <Button
                className="bg-accent fixed bottom-10 right-10 shadow-2xl"
                onClick={handleImportProjectClick}
            >
                <RiAddBoxLine className="text-white" />
                <p className="text-white">Создать проект</p>
            </Button>

            <CreateProjectModal isOpened={isModalOpened} setIsOpened={setIsModalOpened} />
        </VStack>
    );
};
