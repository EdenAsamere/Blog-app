import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoryController";
import { validate } from "../middlewares/validate";
import { createCategorySchema } from "../utils/validations/categoryValidation";
const categoryRoute = Router();
categoryRoute.post('/',validate(createCategorySchema),createCategory);
categoryRoute.get('/',getCategories)

export default categoryRoute;
