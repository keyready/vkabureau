export enum ProfileRank {
    'PRIVATE' = 'private', // 'рядовой',
    'CORPORAL' = 'corporal', // 'ефрейтор',
    'JUNIORSERGEANT' = 'juniorsergeant', // 'младший сержант',
    'SERGEANT' = 'sergeant', // 'сержант',
    'SENIORSERGEANT' = 'seniorsergeant', // 'старший сержант',
    'PETTY' = 'petty', // 'старшина',
    'OFFICERWARRANT' = 'officerwarrant', // 'прапорщик',
    'SENIORWARRANT' = 'seniorwarrant', // 'старший прапорщик',
    'JUNIORLIEUTENANT' = 'juniorlieutenant', // 'младший лейтенант',
    'LIEUTENANT' = 'lieutenant', // 'лейтенант',
    'SENIORLIEUTENANT' = 'seniorlieutenant', // 'старший лейтенант',
    'CAPTAIN' = 'captain', // 'капитан',
    'MAJOR' = 'major', // 'майор',
    'LIEUTENANTCOLONEL' = 'lieutenantcolonel', // 'подполковник',
    'COLONEL' = 'colonel', // 'полковник',
    'GENERALMAJOR' = 'generalmajor', // 'генерал-майор',
    'GENERALLIEUTENANT' = 'generallieutenant', // 'генерал-лейтенант',
    'GENERALCOLONEL' = 'generalcolonel', // 'генерал-полковник',
    'ARMYGENERAL' = 'armygeneral', // 'генерал армии',
}

interface Rank {
    title: string;
    order: number;
}

export const RenderedRanks: Record<ProfileRank, Rank> = {
    [ProfileRank.PRIVATE]: {
        title: 'рядовой',
        order: 1,
    },
    [ProfileRank.CORPORAL]: {
        title: 'ефрейтор',
        order: 2,
    },
    [ProfileRank.JUNIORSERGEANT]: {
        title: 'младший сержант',
        order: 3,
    },
    [ProfileRank.SERGEANT]: {
        title: 'сержант',
        order: 4,
    },
    [ProfileRank.SENIORSERGEANT]: {
        title: 'старший сержант',
        order: 5,
    },
    [ProfileRank.PETTY]: {
        title: 'старшина',
        order: 6,
    },
    [ProfileRank.OFFICERWARRANT]: {
        title: 'прапорщик',
        order: 7,
    },
    [ProfileRank.SENIORWARRANT]: {
        title: 'старший прапорщик',
        order: 8,
    },
    [ProfileRank.JUNIORLIEUTENANT]: {
        title: 'младший лейтенант',
        order: 9,
    },
    [ProfileRank.LIEUTENANT]: {
        title: 'лейтенант',
        order: 10,
    },
    [ProfileRank.SENIORLIEUTENANT]: {
        title: 'старший лейтенант',
        order: 11,
    },
    [ProfileRank.CAPTAIN]: {
        title: 'капитан',
        order: 12,
    },
    [ProfileRank.MAJOR]: {
        title: 'майор',
        order: 13,
    },
    [ProfileRank.LIEUTENANTCOLONEL]: {
        title: 'подполковник',
        order: 14,
    },
    [ProfileRank.COLONEL]: {
        title: 'полковник',
        order: 15,
    },
    [ProfileRank.GENERALMAJOR]: {
        title: 'генерал-майор',
        order: 16,
    },
    [ProfileRank.GENERALLIEUTENANT]: {
        title: 'генерал-лейтенант',
        order: 17,
    },
    [ProfileRank.GENERALCOLONEL]: {
        title: 'генерал-полковник',
        order: 18,
    },
    [ProfileRank.ARMYGENERAL]: {
        title: 'генерал армии',
        order: 19,
    },
};

export interface Profile {
    id: string;
    avatar: string;
    login: string;
    lastname: string;
    firstname: string;
    middlename: string;

    rank: ProfileRank;
    division: string;
}
