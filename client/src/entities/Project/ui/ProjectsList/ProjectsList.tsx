import { Button, Select, SelectItem, SelectSection, SharedSelection } from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import { RiAddBoxLine } from '@remixicon/react';
import { AnimatePresence, motion } from 'framer-motion';

import { useProjects } from '../../api/ProjectsApi';
import { ProjectPreviewCard } from '../ProjectPreviewCard/ProjectPreviewCard';
import { CreateProjectModal } from '../CreateProjectModal/ui/CreateProjectModal';
import { ProjectReducer } from '../../model/slice/ProjectSlice';
import { Project, ProjectSorting } from '../../model/types/Project';

import classes from './ProjectsList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';

interface ProjectsListProps {
    className?: string;
}

export const ProjectsList = (props: ProjectsListProps) => {
    const { className } = props;

    const { data: projects, isLoading: isProjectsLoading } = useProjects(false);

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
    const [selectedSorting, setSelectedSorting] = useState<ProjectSorting>('createdAt-asc');

    const handleImportProjectClick = useCallback(() => {
        setIsModalOpened(true);
    }, []);

    const handleChangeSorting = useCallback((ss: SharedSelection) => {
        setSelectedSorting(ss.currentKey as ProjectSorting);
    }, []);

    useEffect(() => {
        if (!projects?.length) return;

        const sorted = [...projects].sort((a, b) => {
            switch (selectedSorting) {
                case 'createdAt-asc':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'createdAt-desc':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'popularity-asc':
                    return b.likes.value - a.likes.value;
                case 'popularity-desc':
                    return a.likes.value - b.likes.value;
                default:
                    return 0;
            }
        });
        setSortedProjects(sorted);
    }, [projects, selectedSorting]);

    if (isProjectsLoading) {
        return (
            <DynamicModuleLoader reducers={{ project: ProjectReducer }}>
                <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
                    <div className="grid w-full grid-cols-3 gap-4">
                        {new Array(7).fill(0).map((_, index) => (
                            <Skeleton dark width="100%" height={180} rounded={18} key={index} />
                        ))}
                    </div>
                </VStack>
            </DynamicModuleLoader>
        );
    }

    if (!isProjectsLoading && !projects?.length) {
        return (
            <DynamicModuleLoader reducers={{ project: ProjectReducer }}>
                <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
                    <h1 className="w-full text-center text-xl text-black">
                        На платформу пока не добавлено ни одного проекта
                    </h1>
                    <Button
                        className="bg-accent fixed bottom-10 right-10 shadow-2xl"
                        onClick={handleImportProjectClick}
                    >
                        <RiAddBoxLine className="text-white" />
                        <p className="text-white">Создать проект</p>
                    </Button>
                    <CreateProjectModal isOpened={isModalOpened} setIsOpened={setIsModalOpened} />
                </VStack>
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={{ project: ProjectReducer }}>
            <VStack maxW>
                <div className="flex w-full flex-wrap gap-4">
                    <AnimatePresence mode="wait">
                        {sortedProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ scale: 0.7, opacity: 0 }}
                                exit={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                    mass: 0.9,
                                    duration: 0.1,
                                    delay: 0.02 * index,
                                }}
                            >
                                <ProjectPreviewCard project={project} key={project.id} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className="fixed flex-row-reverse bottom-10 right-10 flex gap-3 items-center">
                    <Button
                        className="w-[200px] bg-accent shadow-2xl"
                        onClick={handleImportProjectClick}
                    >
                        <RiAddBoxLine className="text-white" />
                        <p className="text-white">Создать проект</p>
                    </Button>
                    <Select
                        classNames={{
                            base: 'w-[200px]',
                            label: 'group-data-[filled=true]:text-white',
                            value: 'group-data-[has-value=true]:text-white',
                            trigger: 'duration-200 bg-accent data-[hover=true]:bg-accent/70',
                        }}
                        label="Сортировать"
                        size="sm"
                        onSelectionChange={handleChangeSorting}
                        selectedKeys={[selectedSorting]}
                    >
                        <SelectSection title="По популярности">
                            <SelectItem key="popularity-asc">сначала популярные</SelectItem>
                            <SelectItem key="popularity-desc">сначала неизвестные</SelectItem>
                        </SelectSection>
                        <SelectSection title="По дате создания">
                            <SelectItem key="createdAt-asc">сначала новые</SelectItem>
                            <SelectItem key="createdAt-desc">сначала старые</SelectItem>
                        </SelectSection>
                    </Select>
                </div>

                <CreateProjectModal isOpened={isModalOpened} setIsOpened={setIsModalOpened} />
            </VStack>
        </DynamicModuleLoader>
    );
};
