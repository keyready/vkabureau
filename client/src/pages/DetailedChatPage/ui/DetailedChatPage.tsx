import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './DetailedChatPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchForum, ForumReducer, getForumData } from '@/entities/Forum';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';
import { PageTitle } from '@/shared/ui/PageTitle';
import { VStack } from '@/shared/ui/Stack';
import { ChatWindow } from '@/features/Telegram';

interface DetailedChatPageProps {
    className?: string;
}

const DetailedChatPage = memo((props: DetailedChatPageProps) => {
    const { className } = props;

    const { chatId } = useParams<{ chatId: string }>();

    const dispatch = useAppDispatch();

    const forum = useSelector(getForumData);

    useEffect(() => {
        if (chatId) {
            dispatch(fetchForum(chatId));
        }
    }, [dispatch, chatId]);

    return (
        <DynamicModuleLoader reducers={{ forum: ForumReducer }}>
            <Page className={classNames(classes.DetailedChatPage, {}, [className])}>
                <VStack maxW gap="24px">
                    <PageTitle title="Обсуждение" />
                    <ChatWindow />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default DetailedChatPage;
