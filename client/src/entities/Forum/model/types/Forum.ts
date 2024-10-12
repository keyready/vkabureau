import { ForumMessage } from './ForumMessage';

import { Profile } from '@/entities/Profile';

export interface Forum {
    id: string;
    title: string;
    membersId: Profile[];
    messages: ForumMessage[];
}
