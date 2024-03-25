import { Request, Response} from 'express';
import PostModel, { Post } from '../models/postModel';
import commentModel,{Comment} from '../models/commentModel';
import postModel from '../models/postModel';
import { IUserMessage } from '../middlewares/authMiddleware';
import userModel from '../models/userModel';
export const createDraftforPost = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const postData: Post = {
            isPublished:false,
            author:req.userData?.userId,
            ...req.body}; 
        const newPost = new PostModel(postData);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};
export const PublishPost = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const postId= req.params.postid;
        const postData: Post = req.body;
        const post = await PostModel.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        if(req.userData?.userId !== postData.author.toString()){
            res.status(401).json({message:'This is not your post'})
        }
        const updatedPost = await postModel.findByIdAndUpdate(postId, {isPublished:true}, { new: true })
        res.status(200).json(updatedPost);
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to publish post', error: error.message });
    }
};


export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    const author = req.query.author as string;
    const cat = req.query.category as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; 
    try {
        let query: any = {};
        if (author) {
            query.author = author;
        } else if (cat) {
            query.category = { $in: [cat] };
        }

        const postsCount = await PostModel.countDocuments(query);
        const totalPages = Math.ceil(postsCount / limit);

        const posts = await PostModel.find(query)
            .sort({ createdAt: -1 }) 
            .skip((page - 1) * limit) 
            .limit(limit);

        res.status(200).json({ posts, totalPages });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
};


export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const postId = req.params.postid;
        // console.log(postId)
        const post = await PostModel.findById(postId)
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to fetch post', error: error.message });
    }
};

export const updatePost = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const postId= req.params.postid;
        const postData: Post = req.body;
        const post = await PostModel.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        console.log(req.userData)
  
        if(req.userData?.userId !== postData.author.toString()){
            res.status(401).json({message:'This is not your post'})
        }
        const updatedPost = await postModel.findByIdAndUpdate(postId, postData, { new: true })
        res.status(200).json(updatedPost);
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to update post', error: error.message });
    }
};

// Function to delete a post

export const deletePost = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const postId= req.params.postid;
        const postData: Post = req.body;
        const post = await PostModel.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        // console.log(req.userData?.userId)
        if(req.userData?.userId !== postData.author.toString()){
            res.status(401).json({message:'This is not your post'})
        }
        const deletedPost = await postModel.findByIdAndDelete(postId)
        res.status(200).json(deletedPost);
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to update post', error: error.message });
    }
};


export const getPostComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const postId: string = req.params.postid;
      const comment: Comment | null = await commentModel.findOne({ postId }).sort({ createdAt: -1 }) ;
      res.status(200).json(comment);
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to get comment', error: error.message });
    }
  };

  export const savePost = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const postId: string = req.params.postid;
        const post = await PostModel.findById(postId);
        if(!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        if(req.userData?.userId !== post.author.toString()){
            res.status(401).json({message:'You can not save your own post'})
        }
        let user = await userModel.findById(req.userData?.userId.toString());

        if (user?.savedPosts.includes(postId)){
            res.status(400).json({message:'Post already on your list'})
        } 
        await user?.updateOne({ $push: { savedPosts: postId } });
        user = await userModel.findById(req.userData?.userId.toString());
        res.status(200).json({ data: user });
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to save post', error: error.message });
    }
};

export const likePost = async (req: IUserMessage, res: Response): Promise<void> => {
    try {
        const postId: string = req.params.postid;
        const post = await PostModel.findById(postId);
        if(!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        if(req.userData?.userId !== post.author.toString()){
            res.status(401).json({message:'You can not like your own post'})
        }
        let user = await userModel.findById(req.userData?.userId.toString());

        if (user?.likedPosts.includes(postId)){
            res.status(400).json({message:'Post already on your favorites list'})
        } 
        await user?.updateOne({ $push: { likedPosts: postId } });
        user = await userModel.findById(req.userData?.userId.toString());
        res.status(200).json({ data: user });
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to like post', error: error.message });
    }
};

