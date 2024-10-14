import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { useTasks } from '@/entities/Task/api/TaskApi';
import { getProjectData } from '@/entities/Project';
import { Profile } from '@/entities/Profile';
import { RenderedRanks } from '@/entities/Profile/model/types/Profile';

interface ContributorsBlockProps {
    className?: string;
}

export const ContributorsBlock = (props: ContributorsBlockProps) => {
    const { className } = props;

    const project = useSelector(getProjectData);
    const { data: tasks } = useTasks(project?.id || '');

    const [uniqueParticipants, setUniqueParticipants] = useState<Profile[]>([]);

    const sortRanks = useCallback((a: Profile, b: Profile) => {
        const rankA = Object.entries(RenderedRanks).find(([key]) => key === a?.rank);
        const rankB = Object.entries(RenderedRanks).find(([key]) => key === b?.rank);

        if (rankA && rankB) {
            return rankB[1].order - rankA[1].order;
        }
        return 0;
    }, []);

    const renderContributorsName = useCallback((contributor: Profile) => {
        const rankObj = Object.entries(RenderedRanks).find(([key]) => key === contributor?.rank);
        const rank = rankObj?.length ? rankObj[1].title : 'н/д';
        return `${rank} ${contributor?.lastname} ${contributor?.firstname.slice(
            0,
            1,
        )}. ${contributor?.middlename.slice(0, 1)}.`;
    }, []);

    useEffect(() => {
        if (tasks?.length) {
            const contributors = tasks.flatMap((task) => task.contributors);
            const unique: Profile[] = [];
            for (let i = 0; i < contributors.length; i += 1) {
                if (unique.every((ctr) => ctr.id !== contributors[i].id))
                    unique.push(contributors[i]);
            }
            setUniqueParticipants(unique);
        }
    }, [tasks]);

    if (!uniqueParticipants?.length) {
        return <p className="text-black">В проекте пока нет исполнителей</p>;
    }

    return (
        <ul className={classNames('list-decimal list-inside', {}, [className])}>
            {[...uniqueParticipants].sort(sortRanks).map((prt) => (
                <li className="text-start w-full text-black" key={prt?.id}>
                    {renderContributorsName(prt)}
                </li>
            ))}
        </ul>
    );
};
