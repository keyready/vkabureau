import { Image } from '@nextui-org/react';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { PageTitle } from '@/shared/ui/PageTitle';
import { TasksStatisticsBlock, TotalStatisticsBlock } from '@/entities/Statistics';
import { useOnboarding } from '@/shared/lib/hooks/useOnboarding';
import { getProfileData } from '@/entities/Profile';

const MainPage = () => {
    const userData = useSelector(getProfileData);
    const isUserLogged = useMemo(() => Boolean(userData?.id), [userData?.id]);

    const { start } = useOnboarding(`main-page-${isUserLogged ? 'logged' : 'not-logged'}`, [
        ...(isUserLogged
            ? [
                  {
                      element: '.projectsSelector',
                      popover: {
                          title: 'Все проекты платформы',
                          description:
                              'На этой странице можно посмотреть, принять участие или создать свой собственный проект',
                      },
                  },
                  {
                      element: '.forumsSelector',
                      popover: {
                          title: 'Форумы для обсуждения',
                          description:
                              'На этой странице собраны все чаты проектов и задач, в которых Вы состоите. Используйте их, чтобы общаться с коллегами',
                      },
                  },
                  {
                      element: '.avatarDropdownSelector',
                      popover: {
                          title: 'Ваш профиль',
                          description:
                              'В этом меню можно перейти на страницу настроек профиля или выйти из аккаунта',
                      },
                  },
              ]
            : [
                  {
                      element: '.mainSelector',
                      popover: {
                          title: 'Главная страница',
                          description:
                              'Здесь собрана главная информация о платформе: предназначение проекта и немного статистики',
                      },
                  },
                  {
                      element: '.loginButtonSelector',
                      popover: {
                          title: 'Авторизуйтесь',
                          description:
                              'Создайте аккаунт, чтобы стать частью этого огромного сообщества инноваторов!',
                      },
                  },
              ]),
    ]);

    useEffect(() => {
        start();
    }, [start]);

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <VStack maxW maxH gap="24px">
                <PageTitle title="КБ имени Можайского" />

                <VStack maxW align="start" justify="center" maxH flexGrow>
                    <HStack maxW gap="24px" align="center">
                        <Image
                            className="p-4"
                            classNames={{ wrapper: classes.image }}
                            width="350px"
                            height="350px"
                            src="/static/logo.webp"
                        />
                        <VStack maxW gap="24px">
                            <h1 className="text-xl">
                                <b>Конструкторское Бюро имени А.Ф. Можайского</b> — уникальная
                                платформа, объединившая офицеров и курсантов всех факультетов для
                                решения профессиональных инженерных задач
                            </h1>

                            <HStack justify="center" maxW gap="48px">
                                <TasksStatisticsBlock />
                                <TotalStatisticsBlock />
                            </HStack>
                        </VStack>
                    </HStack>
                </VStack>
            </VStack>
        </Page>
    );
};

export default MainPage;
