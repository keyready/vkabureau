import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import classes from './AppLink.module.scss';

import { classNames } from '@/shared/lib/classNames';

interface AppLinkProps {
    className?: string;
    to: string;
    children: ReactNode;
}

export const AppLink = (props: AppLinkProps) => {
    const { className, children, to } = props;

    const mods = {
        // [classes.active]: pathname === to,
    };

    return (
        <Link to={to} className={classNames(classes.AppLink, mods, [className])}>
            {children}
        </Link>
    );
};
