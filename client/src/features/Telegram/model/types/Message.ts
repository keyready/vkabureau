export interface Message {
    id: number;
    author: string;
    message: string;
    teamChatId: number;
    attachments?: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
