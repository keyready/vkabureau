import classes from './PageError.module.scss';

import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

export const PageError = () => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <Page className={classes.PageError}>
            <VStack maxH align="center" justify="center">
                <h1 className={classes.error500}>500</h1>
                <h1 className={classes.error500Title}>Внутренная ошибка</h1>
                <p>Здесь нет Вашей вины</p>
            </VStack>
        </Page>
    );
};
