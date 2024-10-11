import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import classes from './SidebarModal.module.scss';

import { classNames as cn, Mods } from '@/shared/lib/classNames';

interface SidebarClassNames {
    backdrop?: string;
    contentWrapper?: string;
}

interface SidebarModalProps {
    isOpened: boolean;
    setIsOpened: (state: boolean) => void;
    children: ReactNode;
    classNames?: SidebarClassNames;
}

export const SidebarModal = (props: SidebarModalProps) => {
    const { classNames, children, isOpened, setIsOpened } = props;

    useEffect(() => {
        const handleKeyboardClicks = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                event.preventDefault();
                setIsOpened(false);
            }
        };

        document.addEventListener('keydown', handleKeyboardClicks);

        return () => {
            document.removeEventListener('keydown', handleKeyboardClicks);
        };
    }, [setIsOpened]);

    const mods: Mods = {
        [classes.openedSidebar]: isOpened,
    };

    const backdropMods: Mods = {
        [classes.backdropOpened]: isOpened,
    };

    return createPortal(
        <div
            aria-label="Close sidebar"
            onClick={() => setIsOpened(false)}
            className={cn(classes.backdrop, backdropMods, [classNames?.backdrop])}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={cn(classes.SidebarModal, mods, [classNames?.contentWrapper])}
            >
                {children}
            </div>
        </div>,
        document.body.querySelector('#app') || document.body,
    );
};
