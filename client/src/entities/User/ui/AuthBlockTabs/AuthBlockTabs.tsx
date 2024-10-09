import { Tab, Tabs } from '@nextui-org/react';

import classes from './AuthBlockTabs.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { RegisterForm } from '@/entities/User';
import { LoginForm } from '@/entities/User/ui/LoginForm/LoginForm';

interface AuthBlockTabsProps {
    className?: string;
}

export const AuthBlockTabs = (props: AuthBlockTabsProps) => {
    const { className } = props;

    return (
        <Tabs
            color="primary"
            variant="underlined"
            classNames={{
                tabList: 'flex-grow justify-between',
                panel: 'w-full',
            }}
            className={classNames(classes.AuthBlockTabs, {}, [className])}
        >
            <Tab key="login" title="Авторизация">
                <LoginForm />
            </Tab>
            <Tab key="register" title="Регистрация">
                <RegisterForm />
            </Tab>
        </Tabs>
    );
};
