import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useSelector } from 'react-redux';

import { TaskPriority, TaskStatus } from '../../model/types/Task';

import { HStack, VStack } from '@/shared/ui/Stack';
import { SidebarModal } from '@/shared/ui/SidebarModal';
import { getTaskFilters } from '@/entities/Task/model/selectors/TaskSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { TaskActions } from '@/entities/Task';

interface TaskFiltersProps {
    className?: string;
    isFiltersOpened: boolean;
    setIsFiltersOpened: (state: boolean) => void;
}

export const TasksFilters = (props: TaskFiltersProps) => {
    const { className, setIsFiltersOpened, isFiltersOpened } = props;

    const filters = useSelector(getTaskFilters);
    const dispatch = useAppDispatch();

    return (
        <SidebarModal isOpened={isFiltersOpened} setIsOpened={setIsFiltersOpened}>
            <VStack
                maxW
                gap="12px"
                justify="between"
                className="bg-white p-4 rounded-xl h-full w-full flex-grow"
            >
                <VStack maxW gap="12px">
                    <h2 className="text-xl text-black">Фильтры</h2>
                    <HStack align="start" maxW>
                        <VStack maxW align="start">
                            <CheckboxGroup
                                onChange={(values) =>
                                    dispatch(
                                        TaskActions.setFilters({
                                            ...filters,
                                            priority: values as TaskPriority[],
                                        }),
                                    )
                                }
                                value={filters?.priority}
                                label="Приоритет"
                            >
                                <Checkbox
                                    value={TaskPriority.FEATURE}
                                    classNames={{ label: 'text-xs text-black' }}
                                >
                                    Обычный
                                </Checkbox>
                                <Checkbox
                                    value={TaskPriority.MEDIUM}
                                    classNames={{ label: 'text-xs text-black' }}
                                >
                                    Средний
                                </Checkbox>
                                <Checkbox
                                    value={TaskPriority.CRITICAL}
                                    classNames={{ label: 'text-xs text-black' }}
                                >
                                    Критический
                                </Checkbox>
                            </CheckboxGroup>
                        </VStack>
                        <VStack maxW align="start">
                            <CheckboxGroup
                                onChange={(values) =>
                                    dispatch(
                                        TaskActions.setFilters({
                                            ...filters,
                                            status: values as TaskStatus[],
                                        }),
                                    )
                                }
                                value={filters?.status}
                                label="Статус"
                            >
                                <Checkbox
                                    value={TaskStatus.CREATED}
                                    classNames={{ label: 'text-xs text-black' }}
                                >
                                    Новая
                                </Checkbox>
                                <Checkbox
                                    value={TaskStatus.PROGRESS}
                                    classNames={{ label: 'text-xs text-black' }}
                                >
                                    В процессе
                                </Checkbox>
                                <Checkbox
                                    value={TaskStatus.COMPLETED}
                                    classNames={{ label: 'text-xs text-black' }}
                                >
                                    Решена
                                </Checkbox>
                                <Checkbox
                                    value={TaskStatus.REVIEW}
                                    classNames={{ label: 'text-xs text-black' }}
                                >
                                    На проверке
                                </Checkbox>
                            </CheckboxGroup>
                        </VStack>
                    </HStack>
                </VStack>

                <Button
                    color="primary"
                    onClick={() => setIsFiltersOpened(false)}
                    size="sm"
                    className="self-end"
                >
                    Показать
                </Button>
            </VStack>
        </SidebarModal>
    );
};
