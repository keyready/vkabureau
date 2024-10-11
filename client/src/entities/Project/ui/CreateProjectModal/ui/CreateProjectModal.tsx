import { FormEvent, useCallback, useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { Project } from '../../../model/types/Project';
import { getProjectIsCreating } from '../../../model/selectors/ProjectSelectors';

import classes from './CreateProjectModal.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { SidebarModal } from '@/shared/ui/SidebarModal';
import { VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { createProject } from '@/entities/Project/model/service/createProject';
import { MultiplyFilesInput } from '@/shared/ui/MultiplyFilesInput';
import { useProjects } from '@/entities/Project/api/ProjectsApi';

interface CreateProjectModalProps {
    className?: string;
    isOpened: boolean;
    setIsOpened: (state: boolean) => void;
}

export const CreateProjectModal = (props: CreateProjectModalProps) => {
    const { className, isOpened, setIsOpened } = props;

    const { refetch } = useProjects();

    const isProjectCreating = useSelector(getProjectIsCreating);

    const dispatch = useAppDispatch();

    const [newProject, setNewProject] = useState<Partial<Project>>({});
    const [files, setFiles] = useState<File[]>([]);

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!newProject.title || !newProject.description) {
                toast.error('Заполните все поля формы!');
                return;
            }

            const formData = new FormData();
            formData.append('title', newProject.title);
            formData.append('description', newProject.description);
            if (files?.length) {
                files.forEach((file) => formData.append('documents', file));
            }

            const result = await dispatch(createProject(formData));
            if (result.meta.requestStatus === 'fulfilled') {
                refetch();
            }
        },
        [refetch, dispatch, files, newProject?.description, newProject?.title],
    );

    return (
        <SidebarModal
            classNames={{
                contentWrapper: classNames(classes.CreateProjectModal, {}, [className]),
            }}
            setIsOpened={setIsOpened}
            isOpened={isOpened}
        >
            <VStack maxH maxW gap="24px">
                <h1 className="text-xl text-black">Создать проект</h1>

                <form className="flex-grow h-full" onSubmit={handleFormSubmit}>
                    <VStack maxH maxW justify="between">
                        <VStack maxW gap="12px">
                            <Input
                                isDisabled={isProjectCreating}
                                value={newProject.title}
                                onChange={(event) =>
                                    setNewProject({ ...newProject, title: event.target.value })
                                }
                                autoFocus
                                label="Название проекта"
                                isRequired
                            />
                            <Textarea
                                isDisabled={isProjectCreating}
                                value={newProject.description}
                                onChange={(event) =>
                                    setNewProject({
                                        ...newProject,
                                        description: event.target.value,
                                    })
                                }
                                classNames={{
                                    inputWrapper: 'h-auto',
                                }}
                                label="Описание проекта"
                                isRequired
                            />
                            <MultiplyFilesInput
                                placeholder="Приложения к проекту"
                                files={files}
                                onChange={setFiles}
                            />
                        </VStack>

                        <Button type="submit" className="self-end" size="sm" color="primary">
                            {isProjectCreating ? 'Создание...' : 'Создать!'}
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </SidebarModal>
    );
};
