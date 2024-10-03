import { useCallback, useMemo } from 'react';
import { Image } from '@nextui-org/react';
import { RiCalendarLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

import { Project } from '../../model/types/Project';

import classes from './ProjectPreviewCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { RoutePath } from '@/shared/config/routeConfig';

interface ProjectPreviewCardProps {
    className?: string;
    project: Project;
}

export const ProjectPreviewCard = (props: ProjectPreviewCardProps) => {
    const { className, project } = props;

    const navigate = useNavigate();

    const renderDate = useMemo(
        () =>
            new Date(project.created_at).toLocaleDateString('ru-Ru', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
            }),
        [project.created_at],
    );

    const handleCardClick = useCallback(() => {
        navigate(RoutePath.project + project.id);
    }, [navigate, project.id]);

    return (
        <VStack
            onClick={handleCardClick}
            role="link"
            gap="12px"
            maxW
            className={classNames(classes.ProjectPreviewCard, {}, [className])}
        >
            <h1 className="text-l text-accent font-bold">{project.name}</h1>
            <HStack maxW>
                <RiCalendarLine className="text-accent" />
                <h2 className="text-black">{renderDate}</h2>
            </HStack>
            <HStack maxW>
                <Image src={project.author.avatar} width={30} radius="full" />
                <h2 className="text-black">{project.author.name}</h2>
            </HStack>
        </VStack>
    );
};
