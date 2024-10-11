import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react';

import { AvatarSelector } from '../AvatarSelector/AvatarSelector';
import { Profile, ProfileRank, RenderedRanks } from '../../model/types/Profile';
import { getProfileData, getProfileIsPatching } from '../../model/selectors/ProfileSelectors';

import { HStack, VStack } from '@/shared/ui/Stack';
import { toastDispatch } from '@/widgets/Toaster';
import { changeProfile } from '@/entities/Profile/model/service/changeProfile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface ProfileBlockProps {
    className?: string;
}

export const ProfileBlock = (props: ProfileBlockProps) => {
    const { className } = props;

    const profile = useSelector(getProfileData);
    const isProfilePatching = useSelector(getProfileIsPatching);

    const dispatch = useAppDispatch();

    const [patchedProfile, setPatchedProfile] = useState<Partial<Profile>>({});

    useEffect(() => {
        if (profile) setPatchedProfile(profile);
    }, [profile]);

    const isProfileEqual = useMemo(
        () => JSON.stringify(profile) === JSON.stringify(patchedProfile),
        [patchedProfile, profile],
    );

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await toastDispatch(dispatch(changeProfile(patchedProfile)));
        },
        [dispatch, patchedProfile],
    );

    const cancelChanges = useCallback(() => {
        if (profile) setPatchedProfile(profile);
    }, [profile]);

    return (
        <VStack gap="24px" maxW className={className}>
            <HStack gap="24px" maxW align="start">
                <AvatarSelector />
                <form onSubmit={handleFormSubmit}>
                    <VStack gap="12px" maxW>
                        <Input
                            label="Фамилия"
                            isDisabled={isProfilePatching}
                            value={patchedProfile.lastname}
                            onChange={(event) =>
                                setPatchedProfile({
                                    ...patchedProfile,
                                    lastname: event.target.value,
                                })
                            }
                        />
                        <Input
                            label="Имя"
                            isDisabled={isProfilePatching}
                            value={patchedProfile.firstname}
                            onChange={(event) =>
                                setPatchedProfile({
                                    ...patchedProfile,
                                    firstname: event.target.value,
                                })
                            }
                        />
                        <Input
                            label="Отчество"
                            isDisabled={isProfilePatching}
                            value={patchedProfile.middlename}
                            onChange={(event) =>
                                setPatchedProfile({
                                    ...patchedProfile,
                                    middlename: event.target.value,
                                })
                            }
                        />
                        <Input
                            label="Подразделение"
                            isDisabled={isProfilePatching}
                            value={patchedProfile.division}
                            onChange={(event) =>
                                setPatchedProfile({
                                    ...patchedProfile,
                                    division: event.target.value,
                                })
                            }
                        />
                        <Autocomplete
                            value={patchedProfile.rank}
                            onSelectionChange={(key) =>
                                setPatchedProfile({
                                    ...patchedProfile,
                                    rank: key as ProfileRank,
                                })
                            }
                            isDisabled={isProfilePatching}
                            selectedKey={patchedProfile.rank}
                            label="Воинское звание"
                            items={Object.entries(RenderedRanks).map(([key, value]) => ({
                                title: value,
                                value: key,
                            }))}
                        >
                            {(rank) => (
                                <AutocompleteItem key={rank.value} value={rank.value}>
                                    {rank.title}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>

                        <HStack className="mt-5" justify="end" maxW>
                            {!isProfileEqual && (
                                <Button
                                    isDisabled={isProfileEqual}
                                    onClick={cancelChanges}
                                    type="button"
                                    color="danger"
                                >
                                    Отмена
                                </Button>
                            )}
                            <Button
                                isLoading={isProfilePatching}
                                type="submit"
                                color="primary"
                                isDisabled={isProfileEqual}
                            >
                                {isProfilePatching ? 'Сохраняем...' : 'Сохранить'}
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </HStack>
        </VStack>
    );
};
