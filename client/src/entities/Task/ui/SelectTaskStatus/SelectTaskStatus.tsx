import { Select, SelectItem } from '@nextui-org/react';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { TaskStatus } from '../../model/types/Task';

import { classNames } from '@/shared/lib/classNames';
import { getProjectData } from '@/entities/Project';
import { getProfileData } from '@/entities/Profile';

interface SelectBugProps {
    className?: string;
    defaultValue?: TaskStatus;
    selectedKey: string | undefined;
    setSelectedKey: (value: string) => void;
    isDisabled?: boolean;
}

export const SelectTaskStatus = (props: SelectBugProps) => {
    const { defaultValue, className, setSelectedKey, isDisabled, selectedKey } = props;

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

    const renderTaskStatusText = useCallback((status: TaskStatus) => {
        switch (status) {
            case TaskStatus.CREATED:
                return 'Новая';
            case TaskStatus.COMPLETED:
                return 'Решена';
            case TaskStatus.PROGRESS:
                return 'В процессе';
            default:
                return 'На проверке';
        }
    }, []);

    const renderItemColor = useCallback((status: TaskStatus) => {
        switch (status) {
            case TaskStatus.CREATED:
                return 'danger';
            case TaskStatus.COMPLETED:
                return 'success';
            case TaskStatus.PROGRESS:
                return 'warning';
            default:
                return 'default';
        }
    }, []);

    return (
        <Select
            isLoading={isDisabled}
            isDisabled={isDisabled || isSelectorDisabled}
            label="Статус задачи"
            className={classNames('', {}, [className])}
            aria-label="Выберите статус задачи"
            color={renderItemColor(selectedKey as TaskStatus)}
            onChange={handleSelectChange}
            defaultSelectedKeys={new Set(defaultValue ? [defaultValue] : [])}
            size="sm"
        >
            <SelectItem
                aria-label={TaskStatus.COMPLETED}
                classNames={{
                    title: 'text-green-600',
                }}
                key={TaskStatus.COMPLETED}
                value={TaskStatus.COMPLETED}
            >
                {renderTaskStatusText(TaskStatus.COMPLETED)}
            </SelectItem>
            <SelectItem
                aria-label={TaskStatus.PROGRESS}
                classNames={{
                    title: 'text-orange-500',
                }}
                key={TaskStatus.PROGRESS}
                value={TaskStatus.PROGRESS}
            >
                {renderTaskStatusText(TaskStatus.PROGRESS)}
            </SelectItem>
            <SelectItem
                showDivider
                aria-label={TaskStatus.CREATED}
                classNames={{
                    title: 'text-red-500',
                }}
                key={TaskStatus.CREATED}
                value={TaskStatus.CREATED}
            >
                {renderTaskStatusText(TaskStatus.CREATED)}
            </SelectItem>
            <SelectItem
                aria-label={TaskStatus.REVIEW}
                classNames={{
                    title: 'text-green-700',
                }}
                key={TaskStatus.REVIEW}
                value={TaskStatus.REVIEW}
            >
                {renderTaskStatusText(TaskStatus.REVIEW)}
            </SelectItem>
        </Select>
    );
};
