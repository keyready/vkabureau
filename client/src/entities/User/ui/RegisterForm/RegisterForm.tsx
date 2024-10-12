import { FormEvent, useCallback, useMemo, useState } from 'react';
import { Autocomplete, AutocompleteItem, Button, Divider, Input } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';

import classes from './RegisterForm.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { getUserIsLoading, RegisterUser, signupUser } from '@/entities/User';
import { ProfileRank, RenderedRanks } from '@/entities/Profile/model/types/Profile';
import { toastDispatch } from '@/widgets/Toaster';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface RegisterFormProps {
    className?: string;
}

export const RegisterForm = (props: RegisterFormProps) => {
    const { className } = props;

    const isUserLoading = useSelector(getUserIsLoading);

    const [newUserForm, setNewUserForm] = useState<Partial<RegisterUser>>({});
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const isPasswordsEqual = useMemo(
        () => newUserForm.password === repeatedPassword,
        [newUserForm.password, repeatedPassword],
    );

    const isButtonDisabled = useMemo(
        () =>
            isUserLoading ||
            !newUserForm.division ||
            !newUserForm.rank ||
            !newUserForm.lastname ||
            !newUserForm.firstname ||
            !newUserForm.middlename ||
            !newUserForm.login ||
            !isPasswordsEqual,
        [
            isPasswordsEqual,
            isUserLoading,
            newUserForm.division,
            newUserForm.firstname,
            newUserForm.lastname,
            newUserForm.login,
            newUserForm.middlename,
            newUserForm.rank,
        ],
    );

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            await toastDispatch(dispatch(signupUser(newUserForm)), {
                loading: 'Регистрируем...',
                success: 'Вы успешно зарегистрированы',
                error: 'Попробуйте по-другому',
            });
        },
        [dispatch, newUserForm],
    );

    return (
        <VStack maxW className={classNames(classes.RegisterForm, {}, [className])}>
            <form onSubmit={handleFormSubmit}>
                <VStack gap="16px" align="stretch" justify="start">
                    <Input
                        value={newUserForm.login}
                        onChange={(event) =>
                            setNewUserForm({
                                ...newUserForm,
                                login: event.target.value,
                            })
                        }
                        isRequired
                        isDisabled={isUserLoading}
                        label="Имя пользователя"
                    />
                    <Input
                        value={newUserForm.password}
                        onChange={(event) =>
                            setNewUserForm({
                                ...newUserForm,
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
                    <Input
                        value={repeatedPassword}
                        onChange={(event) => setRepeatedPassword(event.target.value)}
                        isRequired
                        type={isPasswordVisible ? 'text' : 'password'}
                        isDisabled={isUserLoading}
                        label="Повторите пароль"
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

                    <Divider />

                    <Input
                        value={newUserForm.lastname}
                        onChange={(event) =>
                            setNewUserForm({
                                ...newUserForm,
                                lastname: event.target.value,
                            })
                        }
                        isRequired
                        isDisabled={isUserLoading}
                        label="Фамилия"
                    />
                    <Input
                        value={newUserForm.firstname}
                        onChange={(event) =>
                            setNewUserForm({
                                ...newUserForm,
                                firstname: event.target.value,
                            })
                        }
                        isRequired
                        isDisabled={isUserLoading}
                        label="Имя"
                    />
                    <Input
                        value={newUserForm.middlename}
                        onChange={(event) =>
                            setNewUserForm({
                                ...newUserForm,
                                middlename: event.target.value,
                            })
                        }
                        isRequired
                        isDisabled={isUserLoading}
                        label="Отчество"
                    />

                    <Divider />

                    <Autocomplete
                        value={newUserForm.rank}
                        onSelectionChange={(key) =>
                            setNewUserForm({
                                ...newUserForm,
                                rank: key as ProfileRank,
                            })
                        }
                        isRequired
                        isDisabled={isUserLoading}
                        label="Воинское звание"
                        items={Object.entries(RenderedRanks).map(([key, value]) => ({
                            title: value,
                            value: key,
                        }))}
                    >
                        {(rank) => (
                            <AutocompleteItem
                                className="capitalize"
                                key={rank.value}
                                value={rank.value}
                            >
                                {rank.title.title}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>

                    <Input
                        value={newUserForm.division}
                        onChange={(event) =>
                            setNewUserForm({
                                ...newUserForm,
                                division: event.target.value,
                            })
                        }
                        isRequired
                        isDisabled={isUserLoading}
                        label="Подразделение"
                    />

                    <Button
                        type="submit"
                        color="primary"
                        isDisabled={isButtonDisabled}
                        isLoading={isUserLoading}
                    >
                        {isUserLoading ? 'Ожидайте...' : 'Регистрация'}
                    </Button>
                </VStack>
            </form>
        </VStack>
    );
};
