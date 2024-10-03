import { Modal, ModalContent, ModalHeader, Tab, Tabs } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { Key, useCallback, useEffect, useState } from 'react';

import { useRepos } from '../../api/ProjectsApi';
import { ReposList } from '../ReposList/ReposList';

interface ImportReposModalProps {
    className?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const ImportReposModal = (props: ImportReposModalProps) => {
    const { className, isOpen, setIsOpen } = props;

    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState<string>('public');
    const [totalRepos, setTotalRepos] = useState<number>(1);

    const { data: repos, isLoading, isFetching } = useRepos(activeTab);

    useEffect(() => {
        if (repos?.totalCount) {
            setTotalRepos(Math.ceil(repos.totalCount / 5) || 0);
        }
    }, [repos?.totalCount]);

    const handleTabChange = useCallback((key: Key) => {
        setActiveTab(key as string);
    }, []);

    return (
        <Modal
            hideCloseButton={isLoading || isFetching}
            isDismissable={!isLoading || !isFetching}
            size="2xl"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <ModalContent className="p-5">
                <ModalHeader>
                    <h1 className="text-l">{t('Импортировать репозитории')}</h1>
                </ModalHeader>
                <Tabs
                    selectedKey={activeTab}
                    onSelectionChange={handleTabChange}
                    classNames={{
                        tabList: 'w-full',
                    }}
                >
                    <Tab
                        isDisabled={isLoading || isFetching}
                        key="public"
                        title={t('Открытые репозитории')}
                    >
                        <ReposList
                            isLoading={isLoading || isFetching}
                            repos={repos?.Data}
                            total={totalRepos}
                        />
                    </Tab>
                    <Tab
                        isDisabled={isLoading || isFetching}
                        key="private"
                        title={t('Приватные репозитории')}
                    >
                        <ReposList
                            isLoading={isLoading || isFetching}
                            repos={repos?.Data}
                            total={totalRepos}
                        />
                    </Tab>
                </Tabs>
            </ModalContent>
        </Modal>
    );
};
