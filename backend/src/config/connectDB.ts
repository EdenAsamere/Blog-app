import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const mongoURI: string = process.env.MONGODB_URI as string;
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected")
    } catch (err:any) {
        console.log(err.message);
    }
};

export default connectDB;
