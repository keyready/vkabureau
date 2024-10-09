import { Tab, Tabs } from '@nextui-org/react';

import { RegisterForm } from '../RegisterForm/RegisterForm';
import { LoginForm } from '../LoginForm/LoginForm';

import classes from './AuthBlockTabs.module.scss';

import { classNames } from '@/shared/lib/classNames';

interface AuthBlockTabsProps {
    className?: string;
    onLoginSuccess?: () => void;
}

export const AuthBlockTabs = (props: AuthBlockTabsProps) => {
    const { className, onLoginSuccess } = props;

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
                <LoginForm onLoginSuccess={onLoginSuccess} />
            </Tab>
            <Tab key="register" title="Регистрация">
                <RegisterForm />
            </Tab>
        </Tabs>
    );
};
