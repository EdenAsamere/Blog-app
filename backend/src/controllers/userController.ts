import { Request, Response} from 'express';
import UserModel, { User } from '../models/userModel';
import { IUserMessage } from '../middlewares/authMiddleware';
import * as bcrypt from "bcryptjs";
import postModel from '../models/postModel';

export const getUsers = async(req: Request, res: Response): Promise<void>=>{
    try{
    const userId: string = req.params.userId;
    const keyword = req.query.search
    ? {
        $or: [{ userName: { $regex: req.query.search, $options: "i" } }],
        _id: { $ne: userId.toString() },
      }
    : {}
    const users = await UserModel.find(keyword);
    res.status(200).json(users)
  }
  catch(error:any){

}

}
export const getuserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.params.userId;
        // console.log(userId)
        const user = await UserModel.findById(userId)
        if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

export const updateProfile = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const userId: string = req.params.userId;
        const userData: User = req.body;
        // console.log(req.userData?.userId.toString())
        // console.log(userId)
        if (req.userData?.userId.toString()!== userId){
            res.status(401).json({message:'Unauthorized'})
            return
        }
        
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPass;
          }
        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};



export const getSavedPosts = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const userId: string = req.params.userId;
        const user = await UserModel.findById(userId);
        console.log(req.userData?.userId.toString())
        console.log(userId)
        if (req.userData?.userId.toString() !== userId){
            res.status(401).json({message:'Unauthorized'})
            return
        }
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const savedPosts = user.savedPosts || []; // Ensure savedPosts is not undefined
        const postPromises = savedPosts.map(postId => postModel.findById(postId));
        const resolvedPosts = await Promise.all(postPromises);
        res.status(200).json(resolvedPosts.filter(post => post !== null)); // Filter out null values

    } catch (error: any) {
        console.error('Error fetching saved posts:', error);
        res.status(500).json({ message: 'Failed to fetch saved posts', error: error.message });
    }
};




export const getLikedPosts = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const userId: string = req.params.userId;
        const user = await UserModel.findById(userId);
        console.log(req.userData?.userId.toString())
        console.log(userId)
        if (req.userData?.userId.toString() !== userId){
            res.status(401).json({message:'Unauthorized'})
            return
        }
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const likedPosts = user.likedPosts || []; // Ensure savedPosts is not undefined
        const postPromises = likedPosts.map(postId => postModel.findById(postId));
        const resolvedPosts = await Promise.all(postPromises);
        res.status(200).json(resolvedPosts.filter(post => post !== null)); // Filter out null values

    } catch (error: any) {
        // console.error('Error fetching liked posts:', error);
        res.status(500).json({ message: 'Failed to fetch liked posts', error: error.message });
    }
};



