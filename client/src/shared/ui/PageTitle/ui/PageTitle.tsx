import { RiTriangleFill } from '@remixicon/react';

import classes from './PageTitle.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';

interface PageTitleProps {
    className?: string;
    title: string;
}

export const PageTitle = (props: PageTitleProps) => {
    const { className, title } = props;

    return (
        <HStack gap="12px" maxW className={classNames(classes.PageTitle, {}, [className])}>
            <RiTriangleFill className="-rotate-[30deg] -translate-y-[3px] text-red-400" />
            <hr className="flex-grow border-red-400 border-1.5" />
            <h1 className="text-2xl text-accent font-bold">{title}</h1>
            <hr className="flex-grow border-red-400 border-1.5" />
            <RiTriangleFill className="-rotate-[210deg] translate-y-[2px] text-red-400" />
        </HStack>
    );
};
