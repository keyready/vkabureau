import { memo } from 'react';

import classes from './ChatsPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { ForumsList } from '@/entities/Forum';
import { VStack } from '@/shared/ui/Stack';
import { PageTitle } from '@/shared/ui/PageTitle';

interface ChatsPageProps {
    className?: string;
}

const ChatsPage = memo((props: ChatsPageProps) => {
    const { className } = props;

    return (
        <Page className={classNames(classes.ChatsPage, {}, [className])}>
            <VStack maxW gap="24px">
                <PageTitle title="Обсуждения" />
                <ForumsList />
            </VStack>
        </Page>
    );
});

export default ChatsPage;
