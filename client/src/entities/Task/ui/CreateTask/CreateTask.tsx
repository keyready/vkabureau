import { Button, DatePicker, DateValue, Input, Textarea } from '@nextui-org/react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { I18nProvider } from '@react-aria/i18n';
import { getLocalTimeZone, now, parseDate } from '@internationalized/date';

import { createTask } from '../../model/service/createTask';
import { Task, TaskPriority } from '../../model/types/Task';

import classes from './CreateTask.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { SidebarModal } from '@/shared/ui/SidebarModal';
import { VStack } from '@/shared/ui/Stack';
import { getTaskIsLoading } from '@/entities/Task';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';
import { changeTask } from '@/entities/Task/model/service/changeTask';

interface CreateTaskProps {
    className?: string;
    projectId?: string;
    isOpened: boolean;
    setIsOpened: (state: boolean) => void;
    onSuccess?: () => void;
    initialTask?: Task;
}

export const CreateTaskModal = (props: CreateTaskProps) => {
    const { className, isOpened, initialTask, onSuccess, projectId, setIsOpened } = props;

    const isTaskCreating = useSelector(getTaskIsLoading);

    const dispatch = useAppDispatch();

    const [newTask, setNewTask] = useState<Partial<Task>>({});
    const [deadline, setDeadline] = useState<DateValue | undefined>();

    useEffect(() => {
        if (initialTask && initialTask?.deadline) {
            setNewTask(initialTask);
            setDeadline(parseDate(new Date(initialTask.deadline).toISOString().split('T')[0]));
        }
    }, [initialTask]);

    useEffect(() => {
        if (deadline) {
            const { day, month, year } = deadline;
            setNewTask((prevState) => ({
                ...prevState,
                deadline: new Date(year, month - 1, day),
            }));
        }
    }, [deadline]);

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            let result;

            if (initialTask) {
                result = await toastDispatch(dispatch(changeTask(newTask)), {
                    loading: 'Создаем...',
                    success: 'Создано!',
                    error: 'Что-то сломалось...',
                });
            } else {
                result = await toastDispatch(
                    dispatch(
                        createTask({
                            title: newTask?.title,
                            description: newTask.description,
                            priority: TaskPriority.FEATURE,
                            projectId,
                            deadline: newTask.deadline,
                        }),
                    ),
                    {
                        loading: 'Создаем...',
                        success: 'Создано!',
                        error: 'Что-то сломалось...',
                    },
                );
            }

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess?.();
                setIsOpened(false);
                setNewTask({});
                setDeadline(undefined);
            }
        },
        [initialTask, dispatch, newTask, projectId, onSuccess, setIsOpened],
    );

    return (
        <SidebarModal
            classNames={{
                contentWrapper: classNames(classes.CreateTask, {}, [className]),
            }}
            setIsOpened={setIsOpened}
            isOpened={isOpened}
        >
            <VStack maxH maxW gap="24px">
                <h1 className="text-xl text-black">
                    {initialTask?.id ? 'Редактировать' : 'Добавить'} задачу
                </h1>

                <form className="flex-grow h-full" onSubmit={handleFormSubmit}>
                    <VStack maxH maxW justify="between">
                        <VStack maxW gap="12px">
                            <Input
                                isDisabled={isTaskCreating}
                                value={newTask?.title || ''}
                                onChange={(event) =>
                                    setNewTask({
                                        ...newTask,
                                        title: event.target.value,
                                    })
                                }
                                autoFocus
                                label="Задача"
                                isRequired
                            />
                            <Textarea
                                isDisabled={isTaskCreating}
                                value={newTask.description || ''}
                                onChange={(event) =>
                                    setNewTask({
                                        ...newTask,
                                        description: event.target.value,
                                    })
                                }
                                classNames={{
                                    inputWrapper: 'h-auto',
                                }}
                                label="Описание задачи"
                                isRequired
                            />
                            <I18nProvider>
                                <DatePicker
                                    showMonthAndYearPickers
                                    label="Выполнить до"
                                    isDisabled={isTaskCreating}
                                    isRequired
                                    aria-label="Дедлайн проекта"
                                    onChange={setDeadline}
                                    value={deadline}
                                    minValue={now(getLocalTimeZone())}
                                />
                            </I18nProvider>
                        </VStack>

                        <Button
                            isDisabled={isTaskCreating}
                            isLoading={isTaskCreating}
                            type="submit"
                            className="self-end"
                            size="sm"
                            color="primary"
                        >
                            {initialTask?.id ? 'Сохранить' : 'Создать'}
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </SidebarModal>
    );
};
