import { RiCalendarLine, RiGroupLine, RiUser3Line } from '@remixicon/react';

import { classNames } from '@/shared/lib/classNames';
import { PageTitle } from '@/shared/ui/PageTitle';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

interface DetailedProjectPageSkeletonProps {
    className?: string;
}

export const DetailedProjectPageSkeleton = (props: DetailedProjectPageSkeletonProps) => {
    const { className } = props;

    return (
        <div className={classNames('', {}, [className])}>
            <VStack maxW gap="12px">
                <PageTitle title="Проект" />

                <HStack maxW justify="between" align="center" className="p-5 rounded-xl bg-white">
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
                        <VStack
                            gap="12px"
                            maxW
                            className={classNames('p-4 bg-white rounded-xl', {}, [className])}
                        >
                            {new Array(4).fill(null).map((_, index) => (
                                <Skeleton dark width="100%" height={60} key={index} />
                            ))}
                        </VStack>
                    </VStack>

                    <VStack gap="12px" maxW className="w-full sticky top-20">
                        <VStack
                            maxW
                            justify="start"
                            align="start"
                            className="p-5 rounded-xl bg-white"
                        >
                            <HStack maxW>
                                <RiUser3Line className="text-accent" size={24} />
                                <h2 className="text-left w-full text-l text-black">
                                    Автор проекта
                                </h2>
                            </HStack>
                            <Skeleton width="100px" height={15} />
                        </VStack>

                        <VStack
                            maxW
                            justify="start"
                            align="start"
                            className="p-5 rounded-xl bg-white"
                        >
                            <HStack maxW>
                                <RiGroupLine className="text-accent" size={24} />
                                <h2 className="text-left w-full text-l text-black">
                                    Участники проекта
                                </h2>
                            </HStack>
                            {new Array(3).fill(0).map((_, index) => (
                                <HStack maxW key={index}>
                                    <p className="text-black">{index + 1}.</p>{' '}
                                    <Skeleton width="100px" height={15} />
                                </HStack>
                            ))}
                        </VStack>
                    </VStack>
                </div>
            </VStack>
        </div>
    );
};
