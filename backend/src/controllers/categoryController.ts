import { Request, Response} from 'express';
import CategoryModel, { Category } from '../models/categoryModel';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryData:Category = req.body;
        const newCategory =  new CategoryModel(categoryData)
        const savedCategory= await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories)
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to fetch Comments', error: error.message });
    }
};