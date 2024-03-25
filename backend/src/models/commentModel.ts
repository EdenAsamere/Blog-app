import mongoose,{Schema,Document} from "mongoose";

export interface Comment extends Document{
    userId:string,
    comment:string,
    postId:String
}

export const CommentSchema:Schema =  new Schema({
    userId: {
        type: String,
        required: true,
      },
    comment:{
        type:String,
        required:false,
    },
    postId:{
        type:String,
        required:true,
    },
}
);

export default mongoose.model<Comment>('Comment', CommentSchema);