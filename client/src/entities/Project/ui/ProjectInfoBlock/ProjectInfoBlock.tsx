import {
    RiCalendarLine,
    RiDeleteBin3Line,
    RiEdit2Fill,
    RiRestartLine,
    RiSave2Fill,
} from '@remixicon/react';
import { useCallback, useEffect, useMemo } from 'react';
import { Button, cn, Divider, Input, Textarea, Tooltip } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Project } from '../../model/types/Project';
import { getEditedProject, getIsEditorModeEnabled } from '../../model/selectors/ProjectSelectors';
import { ProjectActions } from '../../model/slice/ProjectSlice';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getProfileData } from '@/entities/Profile';
import { changeProject } from '@/entities/Project/model/service/changeProject';
import { toastDispatch } from '@/widgets/Toaster';
import { deleteProject } from '@/entities/Project/model/service/deleteProject';
import { RoutePath } from '@/shared/config/routeConfig';

interface ProjectInfoBlockProps {
    className?: string;
    project?: Project;
}

export const ProjectInfoBlock = (props: ProjectInfoBlockProps) => {
    const { className, project } = props;

    const userId = useSelector(getProfileData)?.id;
    const isEditorMode = useSelector(getIsEditorModeEnabled);
    const editedProject = useSelector(getEditedProject);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (project) {
            dispatch(ProjectActions.setEditedProject(project));
        }
    }, [dispatch, project]);

    useEffect(() => {
        console.log(userId, editedProject.author?.id);
    }, [editedProject.author?.id, userId]);

    const renderDate = useMemo(() => {
        if (!project?.createdAt) return '';

        return new Date(project?.createdAt).toLocaleDateString('ru-Ru', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        });
    }, [project?.createdAt]);

    const handleEditModeEnter = useCallback(() => {
        dispatch(ProjectActions.setEditorMode(true));
    }, [dispatch]);

    const handleSaveChanges = useCallback(async () => {
        const res = await toastDispatch(dispatch(changeProject(editedProject)), {
            success: 'Изменения успешно внесены',
        });
        if (deleteProject.fulfilled.match(res)) {
            dispatch(ProjectActions.setEditorMode(false));
        }
    }, [dispatch, editedProject]);

    const handleDeleteProject = useCallback(async () => {
        const res = await toastDispatch(dispatch(deleteProject(project?.id || '')), {
            success: 'Проект удален',
        });
        if (deleteProject.fulfilled.match(res)) {
            navigate(RoutePath.projects);
            dispatch(ProjectActions.setEditorMode(false));
        }
    }, [dispatch, navigate, project?.id]);

    const handleRejectChanges = useCallback(() => {
        if (project) {
            dispatch(ProjectActions.setEditedProject(project));
            dispatch(ProjectActions.setEditorMode(false));
        }
    }, [dispatch, project]);

    const handleChangeProjectTitle = useCallback(
        (val: string) => {
            dispatch(
                ProjectActions.setEditedProject({
                    ...editedProject,
                    title: val,
                }),
            );
        },
        [dispatch, editedProject],
    );
    const handleChangeProjectDescription = useCallback(
        (val: string) => {
            dispatch(
                ProjectActions.setEditedProject({
                    ...editedProject,
                    description: val,
                }),
            );
        },
        [dispatch, editedProject],
    );

    return (
        <div
            className={classNames(
                'group grid grid-cols-7 gap-5 items-start justify-items-end w-full p-5 rounded-xl bg-white sticky top-2 z-20 shadow-2xl',
                {},
                [className],
            )}
        >
            <VStack maxW gap="12px" className="col-span-6">
                <Input
                    classNames={{
                        inputWrapper: cn(
                            'shadow-none',
                            isEditorMode
                                ? ''
                                : 'group-data-[focus=true]:bg-transparent data-[hover=true]:bg-transparent bg-transparent',
                        ),
                        input: cn(
                            'text-xl text-start text-black',
                            isEditorMode ? 'cursor-text' : 'cursor-default',
                        ),
                    }}
                    isReadOnly={!isEditorMode}
                    value={editedProject?.title}
                    onValueChange={handleChangeProjectTitle}
                />
                <Divider />

                <Textarea
                    minRows={1}
                    maxRows={5}
                    classNames={{
                        inputWrapper: cn(
                            'shadow-none h-fit',
                            isEditorMode
                                ? ''
                                : 'group-data-[focus=true]:bg-transparent data-[hover=true]:bg-transparent bg-transparent',
                        ),
                        input: cn(
                            'text-l italic opacity-60 text-start text-black',
                            isEditorMode ? 'cursor-text' : 'cursor-default',
                        ),
                    }}
                    value={editedProject.description}
                    onValueChange={handleChangeProjectDescription}
                />
            </VStack>

            <HStack>
                <RiCalendarLine className="text-accent col-span-1" />
                <h2 className="text-black">{renderDate}</h2>
            </HStack>

            <div
                className={cn(
                    'duration-200 group-hover:opacity-100 absolute top-3 right-3',
                    isEditorMode ? 'opacity-100' : 'opacity-0 ',
                )}
            >
                {userId === editedProject.author?.id && (
                    <AnimatePresence mode="wait">
                        {isEditorMode ? (
                            <div className="flex flex-col gap-1">
                                <motion.div
                                    key="save-changes"
                                    initial={{ opacity: 0, x: 50 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <Tooltip
                                        color="success"
                                        placement="left"
                                        content="Сохранить изменения"
                                    >
                                        <Button
                                            size="sm"
                                            color="success"
                                            onPress={handleSaveChanges}
                                        >
                                            <RiSave2Fill />
                                        </Button>
                                    </Tooltip>
                                </motion.div>
                                <motion.div
                                    key="reject-changes"
                                    initial={{ opacity: 0, x: 50 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 }}
                                >
                                    <Tooltip
                                        color="warning"
                                        placement="left"
                                        content="Отменить изменения"
                                    >
                                        <Button
                                            size="sm"
                                            color="warning"
                                            onPress={handleRejectChanges}
                                        >
                                            <RiRestartLine />
                                        </Button>
                                    </Tooltip>
                                </motion.div>
                                <motion.div
                                    key="delete-project"
                                    initial={{ opacity: 0, x: 50 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Tooltip
                                        color="danger"
                                        placement="left"
                                        content="Удалить проект"
                                    >
                                        <Button
                                            size="sm"
                                            color="danger"
                                            onPress={handleDeleteProject}
                                        >
                                            <RiDeleteBin3Line />
                                        </Button>
                                    </Tooltip>
                                </motion.div>
                            </div>
                        ) : (
                            <motion.div
                                key="enable-edit-mode"
                                initial={{ opacity: 0, x: 20 }}
                                exit={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Button size="sm" color="primary" onPress={handleEditModeEnter}>
                                    <RiEdit2Fill />
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};
