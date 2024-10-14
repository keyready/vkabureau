export interface ForumMessage {
    id: string;
    forumId: string;
    author: string;
    body: string;
    createdAt: Date;
    attachments: string[];
}
