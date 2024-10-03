import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

import { classNames } from '@/shared/lib/classNames';
import { Project } from '@/entities/Project';

interface UserAutocompleteProps {
    className?: string;
    project?: Project;
    selectedMember?: string;
    setSelectedMember: (member: string) => void;
    isDisabled?: boolean;
}

export const UserAutocomplete = (props: UserAutocompleteProps) => {
    const { className, project, isDisabled, setSelectedMember, selectedMember } = props;

    return (
        <Autocomplete
            isDisabled={isDisabled}
            selectedKey={selectedMember}
            label="Выберите исполнителя"
            onSelectionChange={(value) => setSelectedMember(value as string)}
            className={classNames('', {}, [className])}
            items={project?.collaborators || []}
            listboxProps={{
                emptyContent: 'Нет доступных исполнителей',
            }}
        >
            {(user) => (
                <AutocompleteItem value={user.name} key={user.id || -1}>
                    {user.name}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
};
