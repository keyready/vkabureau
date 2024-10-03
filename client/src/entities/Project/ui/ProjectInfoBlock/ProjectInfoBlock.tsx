import { RiCalendarLine } from '@remixicon/react';
import { useMemo } from 'react';

import { Project } from '../../model/types/Project';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';

interface ProjectInfoBlockProps {
    className?: string;
    project?: Project;
}

export const ProjectInfoBlock = (props: ProjectInfoBlockProps) => {
    const { className, project } = props;

    const renderDate = useMemo(() => {
        if (!project?.created_at) return '';

        return new Date(project?.created_at).toLocaleDateString('ru-Ru', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        });
    }, [project?.created_at]);

    return (
        <HStack
            maxW
            justify="between"
            align="center"
            className={classNames('p-5 rounded-xl bg-white sticky top-2 z-20 shadow-2xl', {}, [
                className,
            ])}
        >
            <a
                href={`https://github.com${project?.url.split('repos')[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-2xl text-black"
            >
                {project?.name}
            </a>
            <HStack>
                <RiCalendarLine className="text-accent" />
                <h2 className="text-black">{renderDate}</h2>
            </HStack>
        </HStack>
    );
};
