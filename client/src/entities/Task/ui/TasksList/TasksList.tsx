import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';

import { TaskCard } from '../TaskCard/TaskCard';
import { CreateTaskModal } from '../CreateTask/CreateTask';
import { useTasks } from '../../api/TaskApi';
import { TasksFilters } from '../TaskFilters/TaskFilters';
import { Task } from '../../model/types/Task';

import classes from './TasksList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getProjectData } from '@/entities/Project';
import { getProfileData } from '@/entities/Profile';
import { getTaskFilters } from '@/entities/Task/model/selectors/TaskSelectors';

interface TasksListProps {
    className?: string;
    isFiltersOpened: boolean;
    setIsFiltersOpened: (state: boolean) => void;
}

export const TasksList = (props: TasksListProps) => {
    const { className, setIsFiltersOpened, isFiltersOpened } = props;

    const project = useSelector(getProjectData);
    const profile = useSelector(getProfileData);
    const filters = useSelector(getTaskFilters);

    const { data: tasks, isLoading, refetch } = useTasks(project?.id || '');

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!tasks?.length) setFilteredTasks([]);
        else {
            setFilteredTasks(
                [...tasks]
                    .sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                    )
                    .filter(
                        (task) =>
                            filters.status.includes(task.status) &&
                            filters.priority.includes(task.priority),
                    ),
            );
        }
    }, [filters, tasks]);

    if (!filteredTasks?.length) {
        return (
            <VStack maxW gap="12px">
                <VStack
                    flexGrow
                    gap="12px"
                    maxW
                    className={classNames(classes.TasksList, {}, [className])}
                >
                    <HStack
                        maxW
                        className="emptyTasksList p-4 bg-white rounded-xl"
                        justify="center"
                        align="center"
                    >
                        <h1 className="text-black text-l">Для этого проекта пока нет задач.</h1>
                    </HStack>
                </VStack>
                {profile?.id === project?.author.id && (
                    <HStack maxW justify="end">
                        <Button onClick={() => setIsModalOpened(true)} color="primary">
                            Добавить задачу
                        </Button>
                    </HStack>
                )}
                <CreateTaskModal
                    projectId={project?.id}
                    isOpened={isModalOpened}
                    setIsOpened={setIsModalOpened}
                    onSuccess={refetch}
                />
                <TasksFilters
                    isFiltersOpened={isFiltersOpened}
                    setIsFiltersOpened={setIsFiltersOpened}
                />
            </VStack>
        );
    }

    return (
        <VStack maxW gap="12px">
            <VStack
                maxW
                className={classNames(classes.TasksList, {}, [className, 'wrapperTasksList'])}
            >
                {filteredTasks.map((task) => (
                    <TaskCard projectId={project?.id} task={task} key={task.id} />
                ))}
            </VStack>

            {profile?.id === project?.author.id && (
                <HStack maxW justify="end">
                    <Button onClick={() => setIsModalOpened(true)} color="primary">
                        Добавить задачу
                    </Button>
                </HStack>
            )}

            <CreateTaskModal
                projectId={project?.id}
                isOpened={isModalOpened}
                setIsOpened={setIsModalOpened}
                onSuccess={refetch}
            />
            <TasksFilters
                isFiltersOpened={isFiltersOpened}
                setIsFiltersOpened={setIsFiltersOpened}
            />
        </VStack>
    );
};
