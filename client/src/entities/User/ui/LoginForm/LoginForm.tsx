import { Button, Input } from '@nextui-org/react';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';
import { useSelector } from 'react-redux';

import classes from './LoginForm.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { getUserIsLoading, loginUser, User } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';
import { fetchProfile } from '@/entities/Profile';

interface LoginFormProps {
    className?: string;
    onLoginSuccess?: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className, onLoginSuccess } = props;

    const [userForm, setUserForm] = useState<Partial<User>>({});
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const isUserLoading = useSelector(getUserIsLoading);

    const dispatch = useAppDispatch();

    const isButtonDisabled = useMemo(
        () => isUserLoading || !userForm.login || !userForm.password,
        [isUserLoading, userForm.login, userForm.password],
    );

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const response = await toastDispatch(dispatch(loginUser(userForm)), {
                loading: 'Вход...',
                success: 'Здравия желаю!',
                error: 'Ошибка входа!',
            });
            if (response.meta.requestStatus === 'fulfilled') {
                setUserForm({});
                onLoginSuccess?.();
                dispatch(fetchProfile());
            }
        },
        [dispatch, onLoginSuccess, userForm],
    );

    return (
        <VStack maxW className={classNames(classes.LoginForm, {}, [className])}>
            <form onSubmit={handleFormSubmit}>
                <VStack maxW align="stretch" gap="16px">
                    <Input
                        value={userForm.login}
                        onChange={(event) =>
                            setUserForm({
                                ...userForm,
                                login: event.target.value,
                            })
                        }
                        label="Имя пользователя"
                        isRequired
                        isDisabled={isUserLoading}
                    />
                    <Input
                        value={userForm.password}
                        onChange={(event) =>
                            setUserForm({
                                ...userForm,
                                password: event.target.value,
                            })
                        }
                        isRequired
                        type={isPasswordVisible ? 'text' : 'password'}
                        isDisabled={isUserLoading}
                        label="Пароль"
                        endContent={
                            <Button
                                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                                variant="ghost"
                                className="border-none min-w-fit self-center h-fit w-fit p-0"
                            >
                                {isPasswordVisible ? (
                                    <RiEyeOffLine size={16} />
                                ) : (
                                    <RiEyeLine size={16} />
                                )}
                            </Button>
                        }
                    />
                    <Button
                        type="submit"
                        isLoading={isUserLoading}
                        color="primary"
                        isDisabled={isButtonDisabled}
                    >
                        {isUserLoading ? 'Ожидайте...' : 'Вход'}
                    </Button>
                </VStack>
            </form>
        </VStack>
    );
};
