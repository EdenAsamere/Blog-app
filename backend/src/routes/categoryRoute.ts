import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoryController";
import { validate } from "../middlewares/validate";

const categoryRoute = Router();
categoryRoute.post('/',validate,createCategory);
categoryRoute.get('/',getCategories)

export default categoryRoute;
