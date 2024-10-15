import { Image } from '@nextui-org/react';

import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { PageTitle } from '@/shared/ui/PageTitle';
import { TasksStatisticsBlock, TotalStatisticsBlock } from '@/entities/Statistics';

const MainPage = () => (
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

export default MainPage;
