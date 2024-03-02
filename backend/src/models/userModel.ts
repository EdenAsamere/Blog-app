import mongoose, { Schema, Document } from 'mongoose';


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    profilePic:string;
    likedPosts: string[]; 
    savedPosts: string[]
}


const UserSchema: Schema = new Schema({
    username: { 
        type: String,
        required: true,
        unique: true },
    email: {
        type: String, 
        required: true,
        unique: true },
    password: {
        type: String, 
        required: true },
    profilePic :{
        type:String
    },
    likedPosts: [{ type: String }],
    savedPosts: [{  type: String }]
}
,
{ timestamps: true });


export default mongoose.model<User>('User', UserSchema);
