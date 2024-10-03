export interface Commit {
    id: number;
    projectId: number;

    message: string;
    author: string;
    commitLink: string;
    createdAt: Date;
}
