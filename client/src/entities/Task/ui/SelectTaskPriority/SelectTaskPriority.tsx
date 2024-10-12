import { Select, SelectItem } from '@nextui-org/react';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { TaskPriority } from '../../model/types/Task';

import { classNames } from '@/shared/lib/classNames';
import { getProjectData } from '@/entities/Project';
import { getProfileData } from '@/entities/Profile';

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

    const project = useSelector(getProjectData);
    const profile = useSelector(getProfileData);

    const isSelectorDisabled = useMemo(
        () => project?.author.id !== profile?.id,
        [profile?.id, project?.author.id],
    );

    const handleSelectChange = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            setSelectedKey(e.target.value);
        },
        [setSelectedKey],
    );

    const renderTaskPriorityText = useCallback((status: TaskPriority) => {
        switch (status) {
            case TaskPriority.FEATURE:
                return 'Обычный';
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
            case TaskPriority.FEATURE:
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
            isDisabled={isDisabled || isSelectorDisabled}
            isRequired={isRequired}
        >
            <SelectItem
                aria-label={TaskPriority.FEATURE}
                classNames={{
                    title: 'text-green-600',
                }}
                key={TaskPriority.FEATURE}
                value={TaskPriority.FEATURE}
            >
                {renderTaskPriorityText(TaskPriority.FEATURE)}
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
