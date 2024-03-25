import { object, string} from "zod";
export const createCategorySchema = object({
    body:object({
        name:string({ required_error: "category name is required" }).min(2,{message:'user name should be minimum of 2 characters'})
    })
});

