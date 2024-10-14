import { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { DetailedProjectPage } from '@/pages/DetailedProjectPage';
import { FeedPage } from '@/pages/FeedPage';
import { ChatsPage } from '@/pages/ChatsPage';
import { DetailedChatPage } from '@/pages/DetailedChatPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    PROJECTS = 'projects',
    PROJECT = 'project',
    FEED = 'feed',
    CHATS = 'chats',
    CHAT = 'chat',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROJECT]: '/projects/',
    [AppRoutes.PROJECTS]: '/projects',
    [AppRoutes.CHAT]: '/chats/',
    [AppRoutes.CHATS]: '/chats',

    [AppRoutes.FEED]: '/feed',

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
    [AppRoutes.FEED]: {
        path: RoutePath.feed,
        element: <FeedPage />,
        authOnly: true,
    },
    [AppRoutes.CHAT]: {
        path: `${RoutePath.chat}:chatId`,
        element: <DetailedChatPage />,
        authOnly: true,
    },
    [AppRoutes.CHATS]: {
        path: RoutePath.chats,
        element: <ChatsPage />,
        authOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
        authOnly: true,
    },
};
