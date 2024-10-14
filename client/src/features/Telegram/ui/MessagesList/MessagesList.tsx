import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Message } from '../Message/Message';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { getForumData } from '@/entities/Forum';

interface MessagesListProps {
    className?: string;
    receiveMessage?: 'flow' | 'leave';
}

export const MessagesList = (props: MessagesListProps) => {
    const { className, receiveMessage } = props;

    const forum = useSelector(getForumData);

    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (triggerRef.current && receiveMessage === 'flow') {
            triggerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [receiveMessage]);

    if (!forum?.messages?.length) {
        return (
            <VStack
                maxW
                align="center"
                justify="center"
                className={classNames(
                    'p-4 flex gap-4 flex-col h-[382px] w-full overflow-y-auto',
                    {},
                    [className],
                )}
            >
                <VStack maxW align="center">
                    <h3 className="text-l italic">Отправьте первое сообщение!</h3>
                </VStack>
            </VStack>
        );
    }

    return (
        <VStack
            maxW
            className={classNames('p-4 flex gap-4 flex-col h-[382px] w-full overflow-y-auto', {}, [
                className,
            ])}
        >
            {forum?.messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
            <div ref={triggerRef} />
        </VStack>
    );
};
