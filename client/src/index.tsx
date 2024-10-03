import '@/app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { App } from '@/app/App';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';

import '@/shared/config/i18next';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать приложение');
}

const root = createRoot(container);
root.render(
    <BrowserRouter>
        <NextUIProvider>
            <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </StoreProvider>
        </NextUIProvider>
    </BrowserRouter>,
);
