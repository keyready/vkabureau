import { RiCalendarLine, RiGlobalLine, RiGroupLine } from '@remixicon/react';

import { classNames } from '@/shared/lib/classNames';
import { PageTitle } from '@/shared/ui/PageTitle';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TasksList } from '@/entities/Task';

interface DetailedProjectPageSkeletonProps {
    className?: string;
}

export const DetailedProjectPageSkeleton = (props: DetailedProjectPageSkeletonProps) => {
    const { className } = props;

    return (
        <div className={classNames('', {}, [className])}>
            <VStack maxW gap="12px">
                <PageTitle title="Проект" />

                <HStack maxW justify="between" align="center"
className="p-5 rounded-xl bg-white">
                    <Skeleton width="200px" height={40} />
                    <HStack>
                        <RiCalendarLine className="text-accent" />
                        <Skeleton width="100px" height={20} />
                    </HStack>
                </HStack>

                <div className="w-full items-start gap-4 grid grid-cols-5">
                    <VStack maxW className="col-span-4" gap="12px">
                        <HStack
                            maxW
                            justify="between"
                            align="center"
                            className="p-5 rounded-xl bg-white"
                        >
                            <h1 className="text-xl text-black uppercase">Задачи</h1>
                        </HStack>
                        <TasksList isGlobalLoading />
                    </VStack>

                    <VStack gap="12px" maxW className="col-span-1">
                        <HStack
                            justify="between"
                            align="center"
                            maxW
                            className="p-5 rounded-xl bg-white"
                        >
                            <VStack maxW gap="8px">
                                <HStack maxW>
                                    <RiGroupLine className="text-accent" size={18} />
                                    <h2 className="text-l text-black">Авторы</h2>
                                </HStack>
                                {new Array(3).fill(0).map((_, index) => (
                                    <HStack key={index} maxW gap="8px">
                                        <Skeleton width={20} height={20} rounded={999} />
                                        <Skeleton width="100px" height={15} />
                                    </HStack>
                                ))}
                            </VStack>
                        </HStack>
                        <VStack
                            maxW
                            justify="start"
                            align="center"
                            className="p-5 rounded-xl bg-white"
                        >
                            <HStack maxW>
                                <RiGlobalLine className="text-accent" size={24} />
                                <h2 className="text-left w-full text-l text-black">Языки</h2>
                            </HStack>
                            {new Array(7).fill(0).map((_, index) => (
                                <Skeleton key={index} width="100px" height={13} />
                            ))}
                        </VStack>
                    </VStack>
                </div>
            </VStack>
        </div>
    );
};
