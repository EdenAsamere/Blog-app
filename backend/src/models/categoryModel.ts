import mongoose,{Schema,Document} from "mongoose";

export interface Category extends Document{
    name:string
}

const CategorySchema:Schema =  new Schema({
    name:{
        type:String,
        required:true,
        unique:true,   
    }
},

  { timestamps: true });

export default mongoose.model<Category>('Category', CategorySchema);
