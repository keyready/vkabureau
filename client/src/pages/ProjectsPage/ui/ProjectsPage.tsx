import { memo } from 'react';

import classes from './ProjectsPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { PageTitle } from '@/shared/ui/PageTitle';
import { ProjectsList } from '@/entities/Project';
import { VStack } from '@/shared/ui/Stack';

interface ProjectsPageProps {
    className?: string;
}

const ProjectsPage = memo((props: ProjectsPageProps) => {
    const { className } = props;

    return (
        <Page className={classNames(classes.ProjectsPage, {}, [className])}>
            <VStack maxW gap="24px">
                <PageTitle title="Текущие проекты" />
                <ProjectsList />
            </VStack>
        </Page>
    );
});

export default ProjectsPage;
