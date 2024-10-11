import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useProjects } from '@/entities/Project/api/ProjectsApi';
import { RoutePath } from '@/shared/config/routeConfig';

interface MyProjectsListProps {
    className?: string;
}

export const MyProjectsList = (props: MyProjectsListProps) => {
    const { className } = props;

    const { data: projects, isLoading } = useProjects();

    const navigate = useNavigate();

    const handleProjectLinkClick = useCallback(
        (projectId: string) => {
            navigate(RoutePath.project + projectId);
        },
        [navigate],
    );

    if (isLoading) {
        return (
            <VStack
                maxH
                flexGrow
                maxW
                className={classNames(
                    'flex-grow self-stretch h-full border-2 border-primary rounded-xl p-4',
                    {},
                    [className],
                )}
            >
                <h1 className="text-black text-l">Загрузка</h1>
            </VStack>
        );
    }

    if (!isLoading && !projects?.length) {
        return (
            <VStack
                maxH
                flexGrow
                maxW
                className={classNames(
                    'flex-grow self-stretch h-full border-2 border-primary rounded-xl p-4',
                    {},
                    [className],
                )}
            >
                <h1 className="text-black text-l">У Вас пока нет проектов</h1>
            </VStack>
        );
    }

    return (
        <VStack
            flexGrow
            className={classNames(
                'flex-grow self-stretch h-full border-2 border-primary rounded-xl p-4',
                {},
                [className],
            )}
        >
            <h1 className="text-black text-l">Ваши проекты</h1>
            <ul className="list-decimal list-inside">
                {projects?.map((project) => (
                    <li
                        className="text-black hover:bg-primary hover:text-white duration-200 p-1 rounded-md"
                        key={project.id}
                    >
                        <button
                            onClick={() => handleProjectLinkClick(project.id)}
                            type="button"
                            aria-label={project.title}
                        >
                            {project.title}
                        </button>
                    </li>
                ))}
            </ul>
        </VStack>
    );
};
