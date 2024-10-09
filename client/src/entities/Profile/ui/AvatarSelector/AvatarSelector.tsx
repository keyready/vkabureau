import { Image } from '@nextui-org/react';
import { useState } from 'react';

import { classNames } from '@/shared/lib/classNames';

const AvatarsNames = [
    'avatar-1.webp',
    'avatar-2.webp',
    'avatar-3.webp',
    'avatar-4.webp',
    'avatar-5.webp',
    'avatar-6.webp',
    'avatar-7.webp',
    'avatar-8.webp',
    'avatar-9.webp',
    'avatar-10.webp',
    'avatar-11.webp',
    'avatar-12.webp',
    'avatar-13.webp',
    'avatar-14.webp',
    'avatar-15.webp',
    'avatar-16.webp',
    'avatar-17.webp',
    'avatar-18.webp',
    'avatar-19.webp',
    'avatar-20.webp',
    'avatar-21.webp',
];

interface AvatarSelectorProps {
    className?: string;
}

export const AvatarSelector = (props: AvatarSelectorProps) => {
    const { className } = props;

    const [selectedAvatar, setSelectedAvatar] = useState<string>('');

    return (
        <div className={classNames('grid grid-cols-5 gap-2', {}, [className])}>
            {AvatarsNames.map((avatarName, index) => (
                <button
                    onClick={() => setSelectedAvatar(avatarName)}
                    className={
                        'hover:scale-110 hover:z-20 hover:outline-neutral-900 ' +
                        'rounded-xl outline outline-2 outline-transparent duration-200'
                    }
                    type="button"
                    aria-label={avatarName}
                    key={index}
                >
                    <Image
                        className={`w-16 h-16 rounded-xl hover:grayscale-0 duration-200 ${
                            selectedAvatar === avatarName ? 'grayscale-0' : 'grayscale'
                        }`}
                        src={`/static/avatars/${avatarName}`}
                        alt={avatarName}
                    />
                </button>
            ))}
        </div>
    );
};
