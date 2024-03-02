import { Router } from "express";
import { signUpUser,login } from '../controllers/authController';
import { validate } from "../middlewares/validate";
const authRouter = Router()
authRouter.post('/signUp',validate,signUpUser)
authRouter.post('/login',validate,login)


export default authRouter;