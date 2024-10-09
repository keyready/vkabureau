import { Suspense, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/AppRouter';
import { Toaster } from '@/widgets/Toaster';
import { HStack } from '@/shared/ui/Stack';
import { Sidebar } from '@/widgets/Sidebar';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchProfile } from '@/entities/Profile';

export const App = () => {
    const { theme } = useTheme();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (token) {
            dispatch(fetchProfile());
        }
    }, [dispatch]);

    return (
        <NextUIProvider navigate={navigate}>
            <div id="app" className={classNames('app', {}, [theme])}>
                <Suspense fallback="">
                    <HStack maxW>
                        <Sidebar />
                        <AppRouter />
                    </HStack>
                    <Toaster />
                </Suspense>
            </div>
        </NextUIProvider>
    );
};
