import { useState } from 'react';
import { Button } from '@nextui-org/react';

import { TaskReducer } from '../../model/slice/TaskSlice';
import { useTasks } from '../../api/TaskApi';
import { TaskCard } from '../TaskCard/TaskCard';
import { CreateTaskModal } from '../CreateTask/CreateTask';

import classes from './TasksList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';
import { Skeleton } from '@/shared/ui/Skeleton';

interface TasksListProps {
    className?: string;
    projectId?: number;
    isGlobalLoading?: boolean;
}

export const TasksList = (props: TasksListProps) => {
    const { className, isGlobalLoading, projectId } = props;

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const { data: tasks, isLoading: isTasksLoading } = useTasks({
        projectId,
    });

    if (isTasksLoading || isGlobalLoading) {
        return (
            <VStack
                gap="12px"
                maxW
                className={classNames('p-4 bg-white rounded-xl', {}, [className])}
            >
                {new Array(4).fill(null).map((_, index) => (
                    <Skeleton dark width="100%" height={120} key={index} />
                ))}
            </VStack>
        );
    }

    if (!tasks?.length && !isTasksLoading) {
        return (
            <VStack maxW>
                <VStack
                    flexGrow
                    gap="12px"
                    maxW
                    className={classNames(classes.TasksList, {}, [className])}
                >
                    <HStack
                        maxW
                        className="p-4 bg-white rounded-xl"
                        justify="center"
                        align="center"
                    >
                        <h1 className="text-black text-l">Для этого проекта пока нет задач.</h1>
                    </HStack>
                </VStack>
                <Button onClick={() => setIsModalOpened(true)} color="primary">
                    Добавить задачу
                </Button>
                <CreateTaskModal isOpened={isModalOpened} setIsOpened={setIsModalOpened} />
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader reducers={{ task: TaskReducer }}>
            <VStack maxW>
                <VStack maxW className={classNames(classes.TasksList, {}, [className])}>
                    {tasks?.map((task) => (
                        <TaskCard projectId={projectId} task={task} key={task.id} />
                    ))}
                </VStack>

                <CreateTaskModal isOpened={isModalOpened} setIsOpened={setIsModalOpened} />
            </VStack>
        </DynamicModuleLoader>
    );
};
