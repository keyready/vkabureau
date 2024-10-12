import { Button, DatePicker, DateValue, Input } from '@nextui-org/react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { I18nProvider } from '@react-aria/i18n';
import { getLocalTimeZone, now } from '@internationalized/date';

import { createTask } from '../../model/service/createTask';
import { Task, TaskPriority } from '../../model/types/Task';

import classes from './CreateTask.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { SidebarModal } from '@/shared/ui/SidebarModal';
import { VStack } from '@/shared/ui/Stack';
import { getTaskIsLoading } from '@/entities/Task';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';

interface CreateTaskProps {
    className?: string;
    projectId?: string;
    isOpened: boolean;
    setIsOpened: (state: boolean) => void;
    onSuccess?: () => void;
}

export const CreateTaskModal = (props: CreateTaskProps) => {
    const { className, isOpened, onSuccess, projectId, setIsOpened } = props;

    const isTaskCreating = useSelector(getTaskIsLoading);

    const dispatch = useAppDispatch();

    const [newTask, setNewTask] = useState<Partial<Task>>({});
    const [deadline, setDeadline] = useState<DateValue>();

    useEffect(() => {
        if (deadline) {
            const { day, month, year } = deadline;
            setNewTask((prevState) => ({
                ...prevState,
                deadline: new Date(year, month, day),
            }));
        }
    }, [deadline]);

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const result = await toastDispatch(
                dispatch(
                    createTask({
                        title: newTask?.title,
                        description:
                            'Что-то сломалось... Что-то сломалось... Что-то сломалось... Что-то сломалось... Что-то сломалось...Что-то сломалось... Что-то сломалось...',
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

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess?.();
            }
        },
        [dispatch, newTask?.title, newTask.deadline, projectId, onSuccess],
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
                <h1 className="text-xl text-black">Добавить задачу</h1>

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
                            {isTaskCreating ? 'Создание...' : 'Создать!'}
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </SidebarModal>
    );
};
