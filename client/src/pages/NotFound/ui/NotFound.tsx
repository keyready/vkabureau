import React from 'react';

import classes from './NotFound.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';

interface NotFoundProps {
    className?: string;
}

export const NotFound = ({ className }: NotFoundProps) => (
    <Page className={classNames(classes.NotFound, {}, [className])}>
        <h1 className={classes.icon}>не найдено</h1>
    </Page>
);
