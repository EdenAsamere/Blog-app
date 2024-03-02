import mongoose,{Schema,Document} from "mongoose";

export interface Post extends Document{
    title:string,
    detail:string,
    isPublished:boolean,
    author:string[],
    post_picture:string,
    min_to_read:Number,
    commentId:string[],
    categoryId:string[]
}
const PostSchema:Schema =  new Schema({
    title:{
        type:String,
        required:true,
        minlength:2,   
    },
    detail:{
        type:String,
        required:true,
    },
    isPublished:{
        type:Boolean,
        default:false,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post_picture:{
        type:String,
    },
    min_to_read:{
        type:Number,
        required:true
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],



}
,
{ timestamps: true })


export default mongoose.model<Post>('Post', PostSchema);
