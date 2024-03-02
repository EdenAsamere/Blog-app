import mongoose,{Schema,Document} from "mongoose";

export interface Comment extends Document{
    userId:string,
    comment:string,
    postId:String
}

const CommentSchema:Schema =  new Schema({
    userId: {
        type: String,
        required: true,
      },
    comment:{
        type:String,
        required:true,
        unique:true,   
    },
    postId:{
        type:String,
        required:true,
    },
},
{ timestamps: true }
);

export default mongoose.model<Comment>('Comment', CommentSchema);
