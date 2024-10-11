import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { PageTitle } from '@/shared/ui/PageTitle';

const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <VStack maxW gap="24px">
            <PageTitle title="КБ имени Можайского" />
        </VStack>
    </Page>
);

export default MainPage;
