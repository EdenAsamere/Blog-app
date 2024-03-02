import { Router } from "express";
import { getuserById,updateProfile,getUsers,getSavedPosts, getLikedPosts } from '../controllers/userController';
import { validate } from "../middlewares/validate";

const userRouter = Router()
userRouter.get('/:userId',getuserById)
userRouter.get('/',getUsers)
userRouter.put('/:userId',validate,updateProfile)
userRouter.get('/:userId/savedPosts',getSavedPosts)
userRouter.get('/:userId/likedPosts',getLikedPosts)


export default userRouter;

