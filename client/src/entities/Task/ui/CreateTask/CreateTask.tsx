import { Button, Input } from '@nextui-org/react';
import { FormEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './CreateTask.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { SidebarModal } from '@/shared/ui/SidebarModal';
import { VStack } from '@/shared/ui/Stack';
import { getTaskIsLoading } from '@/entities/Task';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';
import { createTask } from '@/entities/Task/model/service/createTask';

interface CreateTaskProps {
    className?: string;
    isOpened: boolean;
    setIsOpened: (state: boolean) => void;
}

export const CreateTaskModal = (props: CreateTaskProps) => {
    const { className, isOpened, setIsOpened } = props;

    const isTaskCreating = useSelector(getTaskIsLoading);

    const dispatch = useAppDispatch();

    const [taskTitle, setTaskTitle] = useState<string>('');

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            await toastDispatch(dispatch(createTask({ title: taskTitle })), {
                loading: 'Создаем...',
                success: 'Создано!',
                error: 'Что-то сломалось...',
            });
        },
        [dispatch, taskTitle],
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
                                value={taskTitle || ''}
                                onChange={(event) => setTaskTitle(event.target.value)}
                                autoFocus
                                label="Задача"
                                isRequired
                            />
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
