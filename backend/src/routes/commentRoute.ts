import { Router } from "express";
import { createComment } from "../controllers/commentController";
import { validate } from "../middlewares/validate";
import { CreateCommentSchema } from "../utils/validations/commentValidation";
const commentRoute = Router();
commentRoute.post('/', validate(CreateCommentSchema),createComment);

export default commentRoute;
