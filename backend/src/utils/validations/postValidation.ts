import { object, string, boolean, number, array } from 'zod';

export const postSchema = object({
    title: string({ required_error: "title is required" }).min(2).max(255),
    detail: string().min(2),
    isPublished: boolean().optional(),
    author: string(),
    post_picture: string().optional(),
    min_to_read: number().int().positive(),
    comment: array(string()).optional(), 
    category: array(string()).optional(), 
});


