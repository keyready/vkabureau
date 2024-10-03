import { memo, ReactNode } from 'react';

import classes from './Page.module.scss';

import { classNames } from '@/shared/lib/classNames';

interface PageProps {
    className?: string;
    children?: ReactNode;
}

export const Page = memo((props: PageProps) => {
    const { className, children } = props;

    return <section className={classNames(classes.Page, {}, [className])}>{children}</section>;
});
