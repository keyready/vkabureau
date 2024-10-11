import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
} from '@nextui-org/react';
import { RiDoorLine, RiLoginBoxLine, RiProfileLine } from '@remixicon/react';
import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { getProfileData, ProfileActions } from '@/entities/Profile';
import { RoutePath } from '@/shared/config/routeConfig';
import { SidebarModal } from '@/shared/ui/SidebarModal';
import { AuthBlockTabs, UserActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { className } = props;

    const userData = useSelector(getProfileData);

    const dispatch = useAppDispatch();

    const [isOpened, setIsOpened] = useState<boolean>(false);

    const handleLogoutClick = useCallback(() => {
        dispatch(UserActions.logout());
        dispatch(ProfileActions.logout());
    }, [dispatch]);

    if (!userData) {
        return (
            <>
                <Button onClick={() => setIsOpened((prevState) => !prevState)}>
                    <RiLoginBoxLine />
                </Button>

                <SidebarModal
                    classNames={{
                        contentWrapper: 'p-4',
                    }}
                    isOpened={isOpened}
                    setIsOpened={setIsOpened}
                >
                    <AuthBlockTabs onLoginSuccess={() => setIsOpened(false)} />
                </SidebarModal>
            </>
        );
    }

    return (
        <Dropdown className={classNames('', {}, [className])}>
            <DropdownTrigger>
                <Image
                    className="cursor-pointer w-14 h-14 rounded-xl"
                    src={`/static/avatars/${userData?.avatar}`}
                    alt="avatar-1"
                />
            </DropdownTrigger>

            <DropdownMenu>
                <DropdownItem
                    href={RoutePath.feed}
                    className="text-primary"
                    color="primary"
                    startContent={<RiProfileLine size={16} />}
                >
                    Личный кабинет
                </DropdownItem>
                <DropdownItem
                    startContent={<RiDoorLine size={16} />}
                    className="text-danger"
                    color="danger"
                    onClick={handleLogoutClick}
                >
                    Выйти
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
