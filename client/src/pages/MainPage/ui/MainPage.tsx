import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { LoginButton } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import GitHubLogoIcon from '@/shared/icons/big-github-logo.svg?react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { PageTitle } from '@/shared/ui/PageTitle';

const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <VStack maxW gap="24px">
            <PageTitle title="GMANAGE" />

            <HStack maxW className="px-5 py-3 rounded-xl bg-white">
                <p className="text-black text-l">
                    <span className="text-xl text-accent font-bold">GMANAGE</span> — это система
                    управления проектами, которая интегрируется с GitHub для автоматизации работы с
                    задачами, анализа прогресса и отслеживания производительности команды. Система
                    использует данные из GitHub для автоматического создания и управления задачами,
                    упрощая планирование, распределение ответственности и мониторинг выполнения
                    проектов.
                </p>
            </HStack>

            <HStack maxW gap="48px">
                <Icon
                    className={classNames('w-[300px]', {}, [classes.icon])}
                    Svg={GitHubLogoIcon}
                />

                <VStack gap="12px">
                    <HStack maxW className="px-5 py-3 rounded-xl bg-white">
                        <p className="text-black">
                            <span className="text-accent font-bold">GMANAGE</span> автоматически
                            собирает информацию о репозиториях, коммитах, pull requests и issue,
                            предоставляя проектным менеджерам и разработчикам все необходимые данные
                            в одном интерфейсе. Система поддерживает популярные методологии
                            управления проектами, такие как Kanban и Scrum, позволяя создавать доски
                            с задачами, планировать спринты и назначать приоритеты.
                            <span className="text-accent font-bold">GMANAGE</span> визуализирует
                            состояние проекта, что облегчает мониторинг выполнения задач и принятие
                            решений.
                        </p>
                    </HStack>
                    <HStack className="px-5 py-3 rounded-xl bg-white">
                        <p className="text-black">
                            Интеграция с GitHub API позволяет системе динамически обновлять
                            информацию о текущих задачах, получая данные о коммитах, времени
                            выполнения задач и активности команды. Система автоматически генерирует
                            отчеты о прогрессе проекта, а также предоставляет детальные метрики
                            производительности каждого участника. Это позволяет отслеживать вклад
                            каждого разработчика, оценивать скорость закрытия задач и общее
                            состояние проекта.
                        </p>
                    </HStack>
                </VStack>
            </HStack>

            <HStack maxW justify="between">
                <VStack gap="12px" className="w-2/3">
                    <HStack className="px-5 py-3 rounded-xl bg-white">
                        <p className="text-black">
                            <span className="text-accent font-bold">GMANAGE</span> поддерживает
                            интеграцию с системами уведомлений, такими как Slack и Email, для
                            своевременного оповещения о статусах задач, изменениях в репозиториях и
                            завершении pull requests. Дополнительная интеграция с CI/CD-системами
                            помогает отслеживать статус сборок и релизов.
                        </p>
                    </HStack>
                    <HStack maxW className="px-5 py-3 rounded-xl bg-white">
                        <p className="text-black">
                            Это делает <span className="text-accent font-bold">GMANAGE</span>{' '}
                            идеальным инструментом для управления проектами, объединяя всю
                            информацию о разработке в одном месте и предоставляя гибкие инструменты
                            для улучшения производительности и прозрачности команды.
                        </p>
                    </HStack>
                </VStack>
                <LoginButton />
            </HStack>
        </VStack>
    </Page>
);

export default MainPage;
