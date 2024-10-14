import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { StatisticsReducer } from '../../model/slice/StatisticsSlice';
import { fetchOverviewStatistics } from '../../model/service/fetchOverviewStatistics';
import {
    getOverviewStatisticsData,
    getStatisticsIsLoading,
} from '../../model/selectors/StatisticsSelectors';

import classes from './TotalStatistics.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';

ChartJS.register(ArcElement, Tooltip, Legend);

const initialData = {
    labels: [
        'Всего проектов',
        'Проекты в работе',
        'Всего задач',
        'Задач в работе',
        'Выполненных задач',
    ],
    datasets: [
        {
            label: 'Задачи',
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

interface TotalStatisticsProps {
    className?: string;
}

export const TotalStatistics = (props: TotalStatisticsProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const [data, setData] = useState<any>(initialData);

    const overviewStatistics = useSelector(getOverviewStatisticsData);
    const isTasksStatisticsLoading = useSelector(getStatisticsIsLoading);

    useEffect(() => {
        dispatch(fetchOverviewStatistics());
    }, [dispatch]);

    useEffect(() => {
        if (overviewStatistics?.totalTasks) {
            setData({
                labels: [
                    'Всего проектов',
                    'Проекты в работе',
                    'Всего задач',
                    'Задач в работе',
                    'Выполненных задач',
                ],
                datasets: [
                    {
                        label: 'шт',
                        data: [
                            overviewStatistics.totalProjects,
                            overviewStatistics.progressProjects,
                            overviewStatistics.totalTasks,
                            overviewStatistics.progressTasks,
                            overviewStatistics.completedTasks,
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [
        overviewStatistics?.completedTasks,
        overviewStatistics?.progressProjects,
        overviewStatistics?.progressTasks,
        overviewStatistics?.totalProjects,
        overviewStatistics?.totalTasks,
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
        <VStack gap="12px" maxW className={classNames(classes.TotalStatistics, {}, [className])}>
            <h1 className="w-full text-center text-l">Общая статистика</h1>
            <Doughnut options={{ plugins: { legend: { position: 'right' } } }} data={data} />
        </VStack>
    );
};
