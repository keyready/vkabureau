import type { Key, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

import { AppearEffect } from '../model/types/MotionWrapper';
import { getIsAnimationEnabled } from '../model/selectors/getIsAnimationEnabled';

interface MotionWrapperProps {
    children: ReactNode;
    id?: Key;
    layout?: boolean;
    animationPosition?: number;
    animationDelay?: number;
    animationDuration?: number;
    className?: string;
    appear?: AppearEffect;
}

export const MotionWrapper = (props: MotionWrapperProps) => {
    const {
        children,
        layout,
        className,
        id,
        animationDuration = 0.1,
        animationDelay = 0.4,
        animationPosition,
        appear = 'scale-in',
    } = props;

    const isAnimationEnabled = useSelector(getIsAnimationEnabled);

    const animations = {
        'scale-in': {
            initial: { scale: 0.7, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.7, opacity: 0 },
        },
        'translate-x': {
            initial: { x: -80, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: -80, opacity: 0 },
        },
    } as const;

    const { initial, animate, exit } = animations[appear];

    if (!isAnimationEnabled) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            layout={layout}
            key={id || uuidv4()}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                mass: 0.9,
                duration: animationDuration,
                ...(animationPosition ? { delay: animationDelay * animationPosition } : {}),
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
