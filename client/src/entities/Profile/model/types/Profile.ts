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

export const RenderedRanks: Record<ProfileRank, string> = {
    [ProfileRank.PRIVATE]: 'рядовой',
    [ProfileRank.CORPORAL]: 'ефрейтор',
    [ProfileRank.JUNIORSERGEANT]: 'младший сержант',
    [ProfileRank.SERGEANT]: 'сержант',
    [ProfileRank.SENIORSERGEANT]: 'старший сержант',
    [ProfileRank.PETTY]: 'старшина',
    [ProfileRank.OFFICERWARRANT]: 'прапорщик',
    [ProfileRank.SENIORWARRANT]: 'старший прапорщик',
    [ProfileRank.JUNIORLIEUTENANT]: 'младший лейтенант',
    [ProfileRank.LIEUTENANT]: 'лейтенант',
    [ProfileRank.SENIORLIEUTENANT]: 'старший лейтенант',
    [ProfileRank.CAPTAIN]: 'капитан',
    [ProfileRank.MAJOR]: 'майор',
    [ProfileRank.LIEUTENANTCOLONEL]: 'подполковник',
    [ProfileRank.COLONEL]: 'полковник',
    [ProfileRank.GENERALMAJOR]: 'генерал-майор',
    [ProfileRank.GENERALLIEUTENANT]: 'генерал-лейтенант',
    [ProfileRank.GENERALCOLONEL]: 'генерал-полковник',
    [ProfileRank.ARMYGENERAL]: 'генерал армии',
};

export interface Profile {
    id: string;
    avatar: string;
    lastname: string;
    firstname: string;
    middlename: string;

    rank: ProfileRank;
    division: string;
}
