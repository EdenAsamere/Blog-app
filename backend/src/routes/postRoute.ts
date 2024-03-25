import { Router } from "express";
import { createDraftforPost, PublishPost, getAllPosts, getPostById, updatePost, deletePost, savePost, getPostComment, likePost } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Import the authentication middleware
import { validate } from "../middlewares/validate";
// import { postSchema} from "../utils/validations/postValidation";
const postRouter = Router();
postRouter.post('/', authMiddleware,validate,createDraftforPost);
postRouter.put('/:postid/publish',authMiddleware,PublishPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:postid', getPostById);
postRouter.put('/:postid',authMiddleware,validate, updatePost);
postRouter.delete('/:postid',authMiddleware,deletePost ); 
postRouter.put('/:postid/savePost',authMiddleware,validate,savePost); 
postRouter.put('/:postid/likePost',authMiddleware,likePost); 
postRouter.get('/:postid/comments',getPostComment)

export default postRouter;
