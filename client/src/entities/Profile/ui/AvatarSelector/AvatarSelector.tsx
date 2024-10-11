import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { changeProfile } from '../../model/service/changeProfile';

import classes from './AvatarSelector.module.scss';

import { getProfileData } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';

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

    const dispatch = useAppDispatch();

    const profile = useSelector(getProfileData);

    const handleChangeAvatar = useCallback(
        async (avatar: string) => {
            await toastDispatch(
                dispatch(
                    changeProfile({
                        ...profile,
                        avatar,
                    }),
                ),
            );
        },
        [dispatch, profile],
    );

    return (
        <Dropdown>
            <DropdownTrigger>
                <button className={classes.imageWrapper} type="button" aria-label="Ваш аватар">
                    <Image className="w-32 h-32" src={`/static/avatars/${profile?.avatar}`} />
                </button>
            </DropdownTrigger>
            <DropdownMenu
                classNames={{
                    list: 'grid grid-cols-4',
                }}
            >
                {AvatarsNames.map((avatarName, index) => (
                    <DropdownItem
                        classNames={{
                            base: `data-[hover=true]:bg-primary-400`,
                        }}
                        onClick={() => handleChangeAvatar(avatarName)}
                        key={index}
                    >
                        <Image
                            className="w-12 h-12"
                            src={`/static/avatars/${avatarName}`}
                            alt={avatarName}
                        />
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
