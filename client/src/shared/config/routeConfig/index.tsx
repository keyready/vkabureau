import { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { DetailedProjectPage } from '@/pages/DetailedProjectPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    PROJECTS = 'projects',
    PROJECT = 'project',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROJECT]: '/projects/',
    [AppRoutes.PROJECTS]: '/projects',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    // авторизация
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },

    // закрытые роуты
    [AppRoutes.PROJECT]: {
        path: `${RoutePath.project}:projectId`,
        element: <DetailedProjectPage />,
        authOnly: true,
    },
    [AppRoutes.PROJECTS]: {
        path: RoutePath.projects,
        element: <ProjectsPage />,
        authOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
        authOnly: true,
    },
};
