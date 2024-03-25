// src/services/types.ts
export interface BlogPost {
    _id:string,
    title:string,
    detail:string,
    isPublished:boolean,
    author:string[],
    post_picture:string,
    min_to_read:Number,
    commentId:string[],
    categoryId:string[]
   
}
