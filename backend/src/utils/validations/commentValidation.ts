import { object, string } from 'zod';

export const CreateCommentSchema = object({
    userId: string(),
    comment: string().min(2).max(255), 
    postId: string()
});
