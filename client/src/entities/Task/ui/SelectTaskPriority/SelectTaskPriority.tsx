import { Select, SelectItem } from '@nextui-org/react';
import { ChangeEvent, useCallback } from 'react';

import { TaskPriority } from '../../model/types/Task';

import { classNames } from '@/shared/lib/classNames';

interface SelectBugProps {
    className?: string;
    defaultValue?: TaskPriority;
    selectedKey?: string;
    setSelectedKey: (value: string) => void;
    isDisabled?: boolean;
    isRequired?: boolean;
}

export const SelectTaskPriority = (props: SelectBugProps) => {
    const { defaultValue, isRequired, className, isDisabled, setSelectedKey, selectedKey } = props;

    const handleSelectChange = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            setSelectedKey(e.target.value);
        },
        [setSelectedKey],
    );

    const renderTaskPriorityText = useCallback((status: TaskPriority) => {
        switch (status) {
            case TaskPriority.BACKLOG:
                return 'Бэклог';
            case TaskPriority.CRITICAL:
                return 'Критический';
            case TaskPriority.MEDIUM:
                return 'Средний';
            default:
                return '';
        }
    }, []);

    const renderItemColor = useCallback((status: TaskPriority) => {
        switch (status) {
            case TaskPriority.CRITICAL:
                return 'danger';
            case TaskPriority.BACKLOG:
                return 'success';
            case TaskPriority.MEDIUM:
                return 'warning';
            default:
                return 'default';
        }
    }, []);

    return (
        <Select
            label="Приоритет задачи"
            className={classNames('', {}, [className])}
            aria-label="Выберите приоритет задачи"
            color={renderItemColor(selectedKey as TaskPriority)}
            onChange={handleSelectChange}
            defaultSelectedKeys={new Set(defaultValue ? [defaultValue] : [])}
            isLoading={isDisabled}
            isDisabled={isDisabled}
            isRequired={isRequired}
        >
            <SelectItem
                aria-label={TaskPriority.BACKLOG}
                classNames={{
                    title: 'text-green-600',
                }}
                key={TaskPriority.BACKLOG}
                value={TaskPriority.BACKLOG}
            >
                {renderTaskPriorityText(TaskPriority.BACKLOG)}
            </SelectItem>
            <SelectItem
                aria-label={TaskPriority.MEDIUM}
                classNames={{
                    title: 'text-orange-500',
                }}
                key={TaskPriority.MEDIUM}
                value={TaskPriority.MEDIUM}
            >
                {renderTaskPriorityText(TaskPriority.MEDIUM)}
            </SelectItem>
            <SelectItem
                aria-label={TaskPriority.CRITICAL}
                classNames={{
                    title: 'text-red-500',
                }}
                key={TaskPriority.CRITICAL}
                value={TaskPriority.CRITICAL}
            >
                {renderTaskPriorityText(TaskPriority.CRITICAL)}
            </SelectItem>
        </Select>
    );
};
