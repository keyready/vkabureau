import { useCallback, useMemo } from 'react';
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
            new Date(project.createdAt).toLocaleDateString('ru-Ru', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
            }),
        [project.createdAt],
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
            <h1 className="text-l text-accent font-bold">{project.title}</h1>
            <HStack maxW>
                <RiCalendarLine className="text-accent" />
                <h2 className="text-black">{renderDate}</h2>
            </HStack>
        </VStack>
    );
};
