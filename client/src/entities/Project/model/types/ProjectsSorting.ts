export const SORTING_CONFIG = {
    createdAt: {
        label: 'По дате создания',
        asc: 'сначала новые',
        desc: 'сначала старые',
    },
    title: {
        label: 'По названию',
        asc: 'с начала',
        desc: 'с конца',
    },
    popularity: {
        label: 'По популярности',
        asc: 'сначала популярные',
        desc: 'сначала неизвестные',
    },
    tasks: {
        label: 'По количеству подзадач',
        asc: 'сначала больше',
        desc: 'сначала меньше',
    },
    contributors: {
        label: 'По количеству участников',
        asc: 'сначала больше',
        desc: 'сначала меньше',
    },
} as const;

export type SortingDirection = 'asc' | 'desc';
export type ProjectSortingKeys = keyof typeof SORTING_CONFIG;
export type ProjectSorting = `${ProjectSortingKeys}-${SortingDirection}`;
export const sortingMapper = Object.entries(SORTING_CONFIG).reduce((acc, [key, config]) => {
    acc[`${key}-asc` as ProjectSorting] = config.asc;
    acc[`${key}-desc` as ProjectSorting] = config.desc;
    return acc;
}, {} as Record<ProjectSorting, string>);
