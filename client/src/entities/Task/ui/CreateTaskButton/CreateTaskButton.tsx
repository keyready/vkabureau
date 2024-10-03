import {
    Button,
    CalendarDate,
    DatePicker,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    Textarea,
} from '@nextui-org/react';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { RiAddCircleLine } from '@remixicon/react';
import { I18nProvider } from '@react-aria/i18n';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { useSelector } from 'react-redux';

import { Task, TaskPriority } from '../../model/types/Task';
import { createTask } from '../../model/service/createTask';
import { getTaskIsLoading } from '../../model/selectors/TaskSelectors';
import { TaskReducer } from '../../model/slice/TaskSlice';
import { SelectTaskPriority } from '../SelectTaskPriority/SelectTaskPriority';
import { useTasks } from '../../api/TaskApi';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';
import { UserAutocomplete } from '@/entities/User';
import { getProjectData } from '@/entities/Project';

interface CreateTaskButtonProps {
    className?: string;
    projectId?: number;
}

export const CreateTaskButton = (props: CreateTaskButtonProps) => {
    const { className, projectId } = props;

    const now = today(getLocalTimeZone());

    const dispatch = useAppDispatch();
    const project = useSelector(getProjectData);

    const { refetch } = useTasks({
        projectId: projectId || -1,
    });

    const isTaskCreating = useSelector(getTaskIsLoading);

    const [isOpened, setIsOpened] = useState<boolean>(false);

    const [newTask, setNewTask] = useState<Partial<Task>>({});

    const renderSelectedDate = useMemo(() => {
        if (newTask.deadline) {
            return parseDate(newTask.deadline as unknown as string);
        }
        return now.add({ days: 3 });
    }, [newTask?.deadline, now]);

    useEffect(() => {
        setNewTask((prevState) => ({
            ...prevState,
            projectId,
        }));
    }, [projectId]);

    const isButtonDisabled = useMemo(
        () =>
            !newTask.title ||
            !newTask.description ||
            !newTask.deadline ||
            !newTask.priority ||
            isTaskCreating,
        [newTask, isTaskCreating],
    );

    const handleChangeDeadline = useCallback((event: CalendarDate) => {
        setNewTask((prevState) => ({
            ...prevState,
            deadline: `${event.year}-${event.month.toString().padStart(2, '0')}-${event.day
                .toString()
                .padStart(2, '0')}` as unknown as Date,
        }));
    }, []);

    const handleCreateTask = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const result = await toastDispatch(dispatch(createTask(newTask)));
            if (result.meta.requestStatus === 'fulfilled') {
                setIsOpened(false);
                setNewTask({});
                await refetch();
            }
        },
        [dispatch, refetch, newTask],
    );

    return (
        <DynamicModuleLoader reducers={{ task: TaskReducer }}>
            <Button
                onClick={() => setIsOpened(true)}
                className={classNames('bg-accent self-end mt-4', {}, [className])}
            >
                <HStack maxW>
                    <RiAddCircleLine className="text-white" />
                    <h1 className="text-white">Добавить задачу</h1>
                </HStack>
            </Button>

            <Modal
                hideCloseButton={isTaskCreating}
                isDismissable={isTaskCreating}
                size="2xl"
                isOpen={isOpened}
                onClose={() => setIsOpened(false)}
            >
                <ModalContent className="p-4">
                    <ModalHeader>Создание задачи</ModalHeader>
                    <form onSubmit={handleCreateTask}>
                        <VStack gap="12px" maxW>
                            <Input
                                isDisabled={isTaskCreating}
                                isRequired
                                onChange={(event) =>
                                    setNewTask({
                                        ...newTask,
                                        title: event.target.value,
                                    })
                                }
                                value={newTask.title || ''}
                                label="Краткое описание"
                            />
                            <Textarea
                                isDisabled={isTaskCreating}
                                isRequired
                                onChange={(event) =>
                                    setNewTask({
                                        ...newTask,
                                        description: event.target.value,
                                    })
                                }
                                value={newTask.description || ''}
                                classNames={{
                                    inputWrapper: 'h-auto',
                                }}
                                label="Подробно распишите, что нужно сделать в рамках поставленной задачи"
                            />
                            <I18nProvider locale="RU">
                                <DatePicker
                                    isDisabled={isTaskCreating}
                                    isRequired
                                    onChange={handleChangeDeadline}
                                    value={renderSelectedDate}
                                    visibleMonths={2}
                                    minValue={today(getLocalTimeZone())}
                                    label="Дедлайн"
                                />
                            </I18nProvider>

                            <UserAutocomplete
                                isDisabled={isTaskCreating}
                                selectedMember={newTask.executorId}
                                setSelectedMember={(user) =>
                                    setNewTask({ ...newTask, executorId: user })
                                }
                                project={project}
                            />

                            <SelectTaskPriority
                                isRequired
                                isDisabled={isTaskCreating}
                                setSelectedKey={(key) =>
                                    setNewTask({ ...newTask, priority: key as TaskPriority })
                                }
                                selectedKey={newTask.priority || TaskPriority.BACKLOG}
                                defaultValue={TaskPriority.BACKLOG}
                            />

                            <Button
                                isLoading={isTaskCreating}
                                isDisabled={isButtonDisabled}
                                type="submit"
                                size="sm"
                                className="mt-2 self-end bg-accent text-white"
                            >
                                {isTaskCreating ? 'Создание...' : 'Создать'}
                            </Button>
                        </VStack>
                    </form>
                </ModalContent>
            </Modal>
        </DynamicModuleLoader>
    );
};
