import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { AttachmentPreview } from '../AttachmentPreview/AttachmentPreview';

import classes from './Message.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { decrypt } from '@/shared/lib/hooks/useCrypto/useCrypto';
import { getProfileData } from '@/entities/Profile';
import { ForumMessage } from '@/entities/Forum';

interface MessageProps {
    className?: string;
    message: ForumMessage;
}

export const Message = (props: MessageProps) => {
    const { className, message } = props;

    const profile = useSelector(getProfileData);

    const isOwnMessage = useMemo(
        () => profile?.login === message.author,
        [message.author, profile?.login],
    );

    const messageContent = useMemo(
        () => (
            <VStack gap="0" className={classes.Message}>
                <p className="opacity-30 text-white italic leading-none">{message.author}</p>
                <VStack maxW>
                    <p className="text-white">{decrypt(message.body)}</p>
                    {message?.attachments && (
                        <div className="mt-2 grid grid-cols-4 gap-4">
                            {message.attachments.map((attachment) => (
                                <AttachmentPreview key={attachment} attachment={attachment} />
                            ))}
                        </div>
                    )}
                </VStack>
                <p className="opacity-30 text-white italic text-right w-full leading-none">
                    {new Date(message.createdAt).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </VStack>
        ),
        [message.attachments, message.author, message.body, message.createdAt],
    );

    return (
        <HStack
            align="end"
            gap="12px"
            className={classNames(
                classes.MessageWrapper,
                { 'flex-row-reverse self-end': isOwnMessage },
                [className],
            )}
        >
            {messageContent}
        </HStack>
    );
};
