import { Image } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { RiChat4Line } from '@remixicon/react';

import classes from './Sidebar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/config/routeConfig';
import HomeIcon from '@/shared/icons/home-icon.svg?react';
import ProjectIcon from '@/shared/icons/projects-icon.svg?react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { AvatarDropdown } from '@/widgets/AvatarDropdown';
import { getProfileData } from '@/entities/Profile';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    const profile = useSelector(getProfileData);

    return (
        <aside className={classNames(classes.Sidebar, {}, [className])}>
            <VStack maxH maxW align="center">
                <Image src="/static/logo.webp" />

                <VStack className="-translate-y-6" flexGrow maxW justify="center" align="center">
                    <VStack maxW gap="8px" justify="center" align="center">
                        <AppLink to={RoutePath.main}>
                            <Icon className="text-white" Svg={HomeIcon} />
                        </AppLink>
                        <AppLink to={RoutePath.projects}>
                            <Icon className="text-white" Svg={ProjectIcon} />
                        </AppLink>
                        {profile?.id && (
                            <AppLink to={RoutePath.chats}>
                                <RiChat4Line size={36} className="text-white" />
                            </AppLink>
                        )}
                    </VStack>
                </VStack>

                <AvatarDropdown />
            </VStack>
        </aside>
    );
};
