import { TaskFilter, TaskPriority, TaskStatus } from '../../model/types/Task';
import { SelectTaskStatus } from '../SelectTaskStatus/SelectTaskStatus';
import { SelectTaskPriority } from '../SelectTaskPriority/SelectTaskPriority';

import classes from './TaskFilters.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';

interface TaskFiltersProps {
    className?: string;
    filters: TaskFilter;
    setFilters: (filters: TaskFilter) => void;
}

export const TaskFilters = (props: TaskFiltersProps) => {
    const { className, filters, setFilters } = props;

    return (
        <VStack gap="12px" maxW className={classNames(classes.TaskFilters, {}, [className])}>
            <SelectTaskStatus
                className="w-full"
                selectedKey={filters.status}
                setSelectedKey={(key) =>
                    setFilters({
                        ...filters,
                        status: key as TaskStatus,
                    })
                }
            />
            <SelectTaskPriority
                className="w-full"
                selectedKey={filters.priority}
                setSelectedKey={(key) =>
                    setFilters({
                        ...filters,
                        priority: key as TaskPriority,
                    })
                }
            />
        </VStack>
    );
};
