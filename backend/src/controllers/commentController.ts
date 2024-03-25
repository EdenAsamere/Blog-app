import { Request, Response} from 'express';
import CommentModel, { Comment } from '../models/commentModel';
import postModel from '../models/postModel';
import { IUserMessage } from '../middlewares/authMiddleware';


export const createComment = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const CommentData: Comment = req.body; 
        const newComment = new CommentModel(CommentData);
        const savedComment = await newComment.save();
        const post = await postModel.findById(req.body.postId);
        await post?.updateOne({ $push: { comment: req.body.userId } });
        res.status(201).json(savedComment);
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to create Comment', error: error.message });
    }
};

