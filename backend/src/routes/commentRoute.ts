import { Router } from "express";
import { createComment } from "../controllers/commentController";
import { validate } from "../middlewares/validate";

const commentRoute = Router();
commentRoute.post('/', validate,createComment);

export default commentRoute;
