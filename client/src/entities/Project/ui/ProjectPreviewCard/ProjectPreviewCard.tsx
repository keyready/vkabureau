import { DetailedHTMLProps, HTMLAttributes, useCallback, useMemo } from 'react';
import { RiCalendarLine, RiGroupLine, RiHeart2Line, RiListCheck } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';

import { Project } from '../../model/types/Project';
import { changeLikeStatus } from '../../model/service/changeLikeStatus';
import { useProjects } from '../../api/ProjectsApi';
import { getProjectLikeIsSending } from '../../model/selectors/ProjectSelectors';

import classes from './ProjectPreviewCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { RoutePath } from '@/shared/config/routeConfig';
import { getProfileData } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { pluralize } from '@/shared/lib/pluralize';

interface ProjectPreviewCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string;
    project: Project;
}

export const ProjectPreviewCard = (props: ProjectPreviewCardProps) => {
    const { className, project, ...rest } = props;

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
            {...rest}
            onClick={handleCardClick}
            role="link"
            gap="12px"
            justify="between"
            className={classNames(classes.ProjectPreviewCard, {}, [className])}
        >
            <VStack maxW>
                <h1 className="projectTitleSelector text-l w-full text-accent font-bold truncate">
                    {project.title}
                </h1>
                <HStack maxW className="projectDateSelector gap-2">
                    <RiCalendarLine size={16} className="text-accent" />
                    <h2 className="text-black">{renderDate}</h2>
                </HStack>
                <div className="flex w-full gap-3">
                    <div className="projectTasksSelector flex gap-1 items-center">
                        <RiListCheck className="text-accent" size={14} />
                        <h2 className="text-black">
                            {pluralize(project.tasks.length, ['задача', 'задачи', 'задач'])}
                        </h2>
                    </div>
                    <div className="projectUsersSelector flex gap-1 items-center">
                        <RiGroupLine className="text-accent" size={14} />
                        <h2 className="text-black">
                            {pluralize(
                                new Set(project.tasks.map((t) => t.contributors.length)).size,
                                ['участник', 'участника', 'участников'],
                            )}
                        </h2>
                    </div>
                </div>
            </VStack>
            <Button
                size="sm"
                isDisabled={isProjectLikeSending}
                onClick={handleLikeButtonClick}
                className="projectLikesSelector self-end"
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
