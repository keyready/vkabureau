import { RiCalendarLine } from '@remixicon/react';
import { useMemo } from 'react';
import { Divider } from '@nextui-org/react';

import { Project } from '../../model/types/Project';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';

interface ProjectInfoBlockProps {
    className?: string;
    project?: Project;
}

export const ProjectInfoBlock = (props: ProjectInfoBlockProps) => {
    const { className, project } = props;

    const renderDate = useMemo(() => {
        if (!project?.createdAt) return '';

        return new Date(project?.createdAt).toLocaleDateString('ru-Ru', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        });
    }, [project?.createdAt]);

    return (
        <div
            className={classNames(
                'grid grid-cols-7 gap-5 items-start justify-items-end w-full p-5 rounded-xl bg-white sticky top-2 z-20 shadow-2xl',
                {},
                [className],
            )}
        >
            <VStack maxW gap="12px" className="col-span-6">
                <h1 className="text-xl text-start text-black">{project?.title}</h1>
                <Divider />
                <p className="text-l italic opacity-60 text-start text-black">
                    {project?.description}
                </p>
            </VStack>

            <HStack>
                <RiCalendarLine className="text-accent col-span-1" />
                <h2 className="text-black">{renderDate}</h2>
            </HStack>
        </div>
    );
};
