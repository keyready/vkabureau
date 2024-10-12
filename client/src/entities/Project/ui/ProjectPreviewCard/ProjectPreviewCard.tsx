import { useCallback, useMemo } from 'react';
import { RiCalendarLine, RiHeart2Line } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';

import { Project } from '../../model/types/Project';

import classes from './ProjectPreviewCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { RoutePath } from '@/shared/config/routeConfig';
import { getProfileData } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { changeLikeStatus } from '@/entities/Project/model/service/changeLikeStatus';
import { useProjects } from '@/entities/Project/api/ProjectsApi';
import { getProjectLikeIsSending } from '@/entities/Project/model/selectors/ProjectSelectors';

interface ProjectPreviewCardProps {
    className?: string;
    project: Project;
}

export const ProjectPreviewCard = (props: ProjectPreviewCardProps) => {
    const { className, project } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { refetch } = useProjects(false);

    const profile = useSelector(getProfileData);
    const isProjectLikeSending = useSelector(getProjectLikeIsSending);

    const renderDate = useMemo(
        () =>
            new Date(project.createdAt).toLocaleDateString('ru-Ru', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
            }),
        [project.createdAt],
    );

    const isLikeSelected = useMemo(() => {
        if (profile?.id && project.likes.followersId?.length) {
            return project?.likes?.followersId?.includes(profile?.id);
        }
        return false;
    }, [profile?.id, project.likes.followersId]);

    const handleCardClick = useCallback(() => {
        navigate(RoutePath.project + project.id);
    }, [navigate, project.id]);

    const handleLikeButtonClick = useCallback(async () => {
        const result = await dispatch(
            changeLikeStatus({
                followerId: profile?.id || '',
                projectId: project.id,
            }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            await refetch();
        }
    }, [dispatch, profile?.id, project.id, refetch]);

    return (
        <VStack
            onClick={handleCardClick}
            role="link"
            gap="12px"
            maxW
            justify="between"
            className={classNames(classes.ProjectPreviewCard, {}, [className])}
        >
            <VStack maxW>
                <h1 className="text-l text-accent font-bold">{project.title}</h1>
                <HStack maxW>
                    <RiCalendarLine className="text-accent" />
                    <h2 className="text-black">{renderDate}</h2>
                </HStack>
            </VStack>
            <Button
                size="sm"
                isDisabled={isProjectLikeSending}
                onClick={handleLikeButtonClick}
                className="self-end"
                color={isLikeSelected ? 'danger' : 'default'}
            >
                <HStack maxW justify="center">
                    <RiHeart2Line />
                    {project?.likes?.value || null}
                </HStack>
            </Button>
        </VStack>
    );
};
