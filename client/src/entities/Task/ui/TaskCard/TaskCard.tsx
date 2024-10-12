import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';

import { Task, TaskPriority, TaskStatus } from '../../model/types/Task';
import { SelectTaskPriority } from '../SelectTaskPriority/SelectTaskPriority';
import { SelectTaskStatus } from '../SelectTaskStatus/SelectTaskStatus';
import { changeTask } from '../../model/service/changeTask';
import { getTaskIsLoading } from '../../model/selectors/TaskSelectors';
import { useTasks } from '../../api/TaskApi';
import { participate } from '../../model/service/participate';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';
import { getProfileData } from '@/entities/Profile';
import { getProjectData } from '@/entities/Project';

interface TaskCardProps {
    className?: string;
    task: Task;
    projectId?: string;
}

export const TaskCard = (props: TaskCardProps) => {
    const { className, projectId, task } = props;

    const { refetch } = useTasks(projectId || '');

    const profile = useSelector(getProfileData);
    const project = useSelector(getProjectData);

    const [newPriority, setNewPriority] = useState<TaskPriority>(task.priority);
    const [newStatus, setNewStatus] = useState<TaskStatus>(task.status);

    const dispatch = useAppDispatch();

    const isTaskChanging = useSelector(getTaskIsLoading);

    const isParticipatingAvailable = useMemo(
        () =>
            profile?.id !== project?.author.id &&
            !task.contributors.some((pr) => pr.id === profile?.id),
        [profile?.id, project?.author.id, task.contributors],
    );

    const renderDate = useMemo(
        () =>
            `до ${new Date(task.deadline).toLocaleString('ru-RU', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
            })}`,
        [task.deadline],
    );

    const handleParticipateClick = useCallback(async () => {
        const result = await toastDispatch(
            dispatch(
                participate({
                    taskId: task.id,
                    userId: profile?.id || '',
                }),
            ),
            {
                loading: 'Отправляем запрос...',
                success: 'Теперь Вы в команде!',
                error: 'Что-то опять сломалось',
            },
        );

        if (result.meta.requestStatus === 'fulfilled') {
            refetch();
        }
    }, [refetch, dispatch, profile?.id, task.id]);

    const handleChangeStatus = useCallback(
        async (key: string) => {
            setNewStatus(key as TaskStatus);
            await toastDispatch(
                dispatch(
                    changeTask({
                        taskId: task.id,
                        status: key as TaskStatus,
                        priority: task.priority,
                    }),
                ),
            );
            refetch();
        },
        [refetch, dispatch, task.id, task.priority],
    );

    const handleChangePriority = useCallback(
        async (key: string) => {
            setNewPriority(key as TaskPriority);
            await toastDispatch(
                dispatch(
                    changeTask({
                        taskId: task.id,
                        priority: key as TaskPriority,
                        status: task.status,
                    }),
                ),
            );
            refetch();
        },
        [refetch, dispatch, task.id, task.status],
    );

    return (
        <HStack
            align="start"
            maxW
            className={classNames('p-4 bg-white rounded-xl', {}, [className])}
        >
            <VStack maxW>
                <HStack maxW>
                    <h1 className="text-l text-black">{task.title}</h1>
                    <p className="text-xs text-gray-500">{renderDate}</p>
                </HStack>
                <p className="text-black">{task.description}</p>
            </VStack>

            <VStack className="w-2/3">
                <HStack maxW>
                    <SelectTaskPriority
                        isDisabled={isTaskChanging}
                        className="!w-full"
                        defaultValue={task.priority}
                        selectedKey={newPriority}
                        setSelectedKey={handleChangePriority}
                    />
                    <SelectTaskStatus
                        isDisabled={isTaskChanging}
                        className="!w-full"
                        defaultValue={task.status}
                        selectedKey={newStatus}
                        setSelectedKey={handleChangeStatus}
                    />
                </HStack>
                {isParticipatingAvailable && (
                    <Button
                        isDisabled={isTaskChanging}
                        isLoading={isTaskChanging}
                        onClick={handleParticipateClick}
                        color="primary"
                        className="self-end"
                    >
                        {isTaskChanging ? 'Ожидайте...' : 'Откликнуться'}
                    </Button>
                )}
            </VStack>
        </HStack>
    );
};
