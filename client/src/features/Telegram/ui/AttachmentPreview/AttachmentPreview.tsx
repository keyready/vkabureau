import { useMemo, useState } from 'react';
import { Image, Modal, ModalContent } from '@nextui-org/react';
import { RiFile3Line } from '@remixicon/react';

import { fileTypeMap } from '../../lib/const';

import classes from './AttachmentPreview.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';

interface AttachmentPreviewProps {
    className?: string;
    attachment: string;
}

export const AttachmentPreview = (props: AttachmentPreviewProps) => {
    const { className, attachment } = props;

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const determineFileType = useMemo(() => {
        const lowerCaseExtension = attachment.split('.')[1].toLowerCase().trim();

        const foundType = Object.entries(fileTypeMap).find(([_, value]) =>
            value.extension.some(
                (ext) => ext === lowerCaseExtension || ext.endsWith(`.${lowerCaseExtension}`),
            ),
        );

        return foundType?.[1].name ?? fileTypeMap.unknown;
    }, [attachment]);

    if (determineFileType === 'Image') {
        return (
            <>
                <Image
                    onClick={() => setIsModalOpened(true)}
                    width={64}
                    height={64}
                    classNames={{
                        wrapper: classes.attachedFilePreview,
                    }}
                    src={`/attachments/${attachment}`}
                    fallbackSrc="/static/image-unavailable.webp"
                    alt={attachment}
                    className="rounded-md"
                />
                <Modal
                    backdrop="blur"
                    isOpen={isModalOpened}
                    onClose={() => setIsModalOpened(false)}
                >
                    <ModalContent className="p-6 flex items-center justify-center">
                        <Image
                            width={400}
                            height={400}
                            classNames={{
                                wrapper: classes.imagePreview,
                            }}
                            src={`https://storage.yandexcloud.net/vkahub-storage/${attachment}`}
                            fallbackSrc="/static/image-unavailable.webp"
                            alt={attachment}
                            className="rounded-md"
                        />
                    </ModalContent>
                </Modal>
            </>
        );
    }

    return (
        <a
            aria-label="Download attachment"
            download
            target="_blank"
            href={`https://storage.yandexcloud.net/vkahub-storage/${attachment}`}
            rel="noreferrer"
        >
            <VStack
                maxW
                justify="center"
                align="center"
                className={classNames('bg-input-hover-bg rounded-md p-4', {}, [className])}
            >
                <RiFile3Line size={32} className="text-primary" />
            </VStack>
            <p className="w-full text-center text-white text-xs">
                .{attachment.split('.')[1].toUpperCase()}
            </p>
        </a>
    );
};
