import { Profile } from '@/entities/Profile';

export interface ForumMessage {
    id: string;
    forumId: string;
    author: Profile;
    message: {
        body: string;
        attachments: string[];
    };
}
