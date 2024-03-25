import { Router } from "express";
import { signUpUser,login } from '../controllers/authController';
import { validate } from "../middlewares/validate";
import { loginUserSchema,signUpUserSchema } from "../utils/validations/authValidation";
const authRouter = Router()
authRouter.post('/signUp',validate(signUpUserSchema),signUpUser)
authRouter.post('/login',validate(loginUserSchema),login)

export default authRouter;