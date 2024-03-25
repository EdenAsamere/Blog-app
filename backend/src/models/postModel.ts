import mongoose,{Schema,Document} from "mongoose";
import {CommentSchema} from "./commentModel";

export interface Post extends Document{
    title:string,
    detail:string,
    isPublished:boolean,
    author:Schema.Types.ObjectId,
    post_picture:string,
    min_to_read:Number,
    createdAt:Date,
    comment:Comment[],
    category:string[]
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
    createdAt:{
        type:Date,
        default:Date.now()
    },
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    comment: [CommentSchema],
}
,

{ timestamps: true })

export default mongoose.model<Post>('Post', PostSchema);



  