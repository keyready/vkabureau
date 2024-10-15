import { useOwnTasks } from '../../api/TaskApi';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

interface OwnTasksListProps {
    className?: string;
}

export const OwnTasksList = (props: OwnTasksListProps) => {
    const { className } = props;

    const { data: tasks, isLoading } = useOwnTasks();

    if (isLoading) {
        return (
            <VStack
                maxW
                className={classNames(
                    'flex-grow self-stretch h-full border-1 border-primary rounded-xl p-4',
                    {},
                    [className],
                )}
            >
                {new Array(5).map((_, index) => (
                    <Skeleton key={index} width="100%" height={40} />
                ))}
            </VStack>
        );
    }

    if (!isLoading && !tasks?.length) {
        return (
            <VStack
                maxW
                className={classNames(
                    'flex-grow self-stretch h-full border-1 border-primary rounded-xl p-4',
                    {},
                    [className],
                )}
            >
                <h1 className="text-black text-l">У Вас пока нет активных задач</h1>
            </VStack>
        );
    }

    return (
        <VStack
            maxW
            className={classNames(
                'flex-grow self-stretch h-full border-1 border-primary rounded-xl p-4',
                {},
                [className],
            )}
        >
            {tasks?.map((task) => (
                <p className="text-black text-l" key={task.id}>
                    {task.title}
                </p>
            ))}
        </VStack>
    );
};
