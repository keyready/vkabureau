import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@nextui-org/react';
import { add, formatDistance } from 'date-fns';

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
import { CreateTaskModal } from '@/entities/Task/ui/CreateTask/CreateTask';
import { deleteTask } from '@/entities/Task/model/service/deleteTask';

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
    const [isContributorsShown, setIsContributorsShown] = useState<boolean>(false);
    const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const isTaskChanging = useSelector(getTaskIsLoading);

    const isParticipatingAvailable = useMemo(
        () =>
            profile?.id !== project?.author.id &&
            !task.contributors.some((pr) => pr.id === profile?.id),
        [profile?.id, project?.author.id, task.contributors],
    );

    const isDeadlineNear = useMemo(() => {
        const deadline = new Date(task.deadline);
        const before = add(deadline, { days: -3 });
        const distance = Number(formatDistance(new Date(), before).split(' ')[0]);

        if (distance <= 3) {
            return 'text-red-500 font-bold';
        }

        return '';
    }, [task.deadline]);

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
                        ...task,
                        status: key as TaskStatus,
                        priority: task.priority,
                    }),
                ),
            );
            refetch();
        },
        [dispatch, task, refetch],
    );

    const handleChangePriority = useCallback(
        async (key: string) => {
            setNewPriority(key as TaskPriority);
            await toastDispatch(
                dispatch(
                    changeTask({
                        ...task,
                        priority: key as TaskPriority,
                        status: task.status,
                    }),
                ),
            );
            refetch();
        },
        [dispatch, task, refetch],
    );

    const handleDeleteTask = useCallback(async () => {
        const res = await toastDispatch(dispatch(deleteTask(task?.id || '')), {
            success: 'Задача удалена',
        });
        if (deleteTask.fulfilled.match(res)) {
            await refetch();
        }
    }, [dispatch, refetch, task?.id]);

    return (
        <HStack
            align="start"
            maxW
            className={classNames('p-4 bg-white rounded-xl', {}, [className])}
        >
            <VStack maxW>
                <HStack maxW>
                    <h1 className="text-l text-black">{task.title}</h1>
                    <p className={`text-xs text-gray-500 ${isDeadlineNear}`}>{renderDate}</p>
                </HStack>
                <p className="text-black">{task.description}</p>

                {task.contributors?.length ? (
                    <button
                        onClick={() => setIsContributorsShown((prevState) => !prevState)}
                        type="button"
                        className="text-black underline opacity-60"
                    >
                        {isContributorsShown ? 'Скрыть' : 'Показать исполнителей задачи'}
                    </button>
                ) : null}
                {isContributorsShown && (
                    <VStack maxW gap="0px">
                        <p className="text-black leading-none">Исполнители задачи: </p>
                        <ul className="list-inside list-decimal">
                            {task.contributors.map((ctr) => (
                                <li className="text-black leading-none">
                                    {ctr.lastname} {ctr.firstname.slice(0, 1)}.{' '}
                                    {ctr.middlename.slice(0, 1)}.
                                </li>
                            ))}
                        </ul>
                    </VStack>
                )}
            </VStack>

            <VStack className="gap-4 w-2/3">
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
                {profile?.id === project?.author.id && (
                    <ButtonGroup className="self-end ">
                        <Button
                            onPress={() => setIsEditModalOpened(true)}
                            size="sm"
                            color="primary"
                        >
                            Редактровать
                        </Button>
                        <Button onPress={handleDeleteTask} size="sm" color="danger">
                            Удалить
                        </Button>
                    </ButtonGroup>
                )}
            </VStack>

            <CreateTaskModal
                projectId={project?.id}
                isOpened={isEditModalOpened}
                setIsOpened={setIsEditModalOpened}
                onSuccess={refetch}
                initialTask={task}
            />
        </HStack>
    );
};
