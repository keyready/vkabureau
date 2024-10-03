import { Suspense } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/AppRouter';
import { Toaster } from '@/widgets/Toaster';
import { HStack } from '@/shared/ui/Stack';
import { Sidebar } from '@/widgets/Sidebar';

export const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <HStack maxW>
                    <Sidebar />
                    <AppRouter />
                </HStack>
                <Toaster />
            </Suspense>
        </div>
    );
};
