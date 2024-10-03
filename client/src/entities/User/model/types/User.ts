export interface ServerUser {
    id: number;

    login: string;
    avatar: string;
    createdAt: Date;

    bio: string;
    name: string;
    publicRepos: number;
}

export type User = Partial<ServerUser>;
