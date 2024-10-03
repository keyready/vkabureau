import { Button } from '@nextui-org/react';
import { RiGithubLine } from '@remixicon/react';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import classes from './LoginButton.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { loginUser } from '@/entities/User';
import { VStack } from '@/shared/ui/Stack';

interface LoginButtonProps {
    className?: string;
}

const oauthLink =
    'https://github.com/login/oauth/authorize?client_id=Ov23liAdpGWqdpDnrsyK&scope=repo&redirect_uri=http://localhost:3000/';

export const LoginButton = (props: LoginButtonProps) => {
    const { className } = props;

    const [params, setParams] = useSearchParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const code = params.get('code');

        if (code) {
            dispatch(loginUser(code));
            setParams(new URLSearchParams());
        }
    }, [params, setParams, dispatch]);

    const handleLoginClick = useCallback(() => {
        location.href = oauthLink;
    }, []);

    return (
        <Button
            size="lg"
            onClick={handleLoginClick}
            className={classNames('py-3 px-6 h-fit', {}, [className])}
        >
            <RiGithubLine className={classNames(classes.icon, {}, ['!max-w-none'])} size={48} />
            <VStack align="center">
                <h1>Войти с помощью</h1>
                <h1 className="text-l">GitHub</h1>
            </VStack>
        </Button>
    );
};
