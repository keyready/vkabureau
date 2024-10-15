import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { StatisticsReducer } from '../../model/slice/StatisticsSlice';
import {
    getStatisticsIsLoading,
    getTasksStatisticsData,
} from '../../model/selectors/StatisticsSelectors';
import { fetchTaskStatistics } from '../../model/service/fetchTaskStatistics';

import classes from './TasksStatistics.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';

ChartJS.register(ArcElement, Tooltip, Legend);

const initialDta = {
    labels: ['Критические', 'Средние', 'Умеренные'],
    datasets: [
        {
            label: 'Задачи',
            data: [23, 43, 12],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

interface TasksStatisticsProps {
    className?: string;
}

export const TasksStatistics = (props: TasksStatisticsProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const tasksStatistics = useSelector(getTasksStatisticsData);
    const isTasksStatisticsLoading = useSelector(getStatisticsIsLoading);

    const [data, setData] = useState<any>(initialDta);

    useEffect(() => {
        dispatch(fetchTaskStatistics());
    }, [dispatch]);

    useEffect(() => {
        if (tasksStatistics?.criticalTasks) {
            setData({
                labels: ['Критические', 'Средние', 'Умеренные'],
                datasets: [
                    {
                        label: 'Задачи',
                        data: [
                            tasksStatistics.criticalTasks || 0,
                            tasksStatistics.mediumTasks || 0,
                            tasksStatistics.featureTasks || 0,
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [
        tasksStatistics?.criticalTasks,
        tasksStatistics?.featureTasks,
        tasksStatistics?.mediumTasks,
    ]);

    if (isTasksStatisticsLoading) {
        return (
            <DynamicModuleLoader
                removeAfterUnmount={false}
                reducers={{ statistics: StatisticsReducer }}
            >
                <h1>Загрузка статистики...</h1>
            </DynamicModuleLoader>
        );
    }

    return (
        <VStack gap="12px" className={classNames(classes.TasksStatistics, {}, [className])}>
            <h1 className="w-full text-center text-l">Статистика по задачам</h1>
            <Doughnut options={{ plugins: { legend: { position: 'left' } } }} data={data} />
        </VStack>
    );
};
