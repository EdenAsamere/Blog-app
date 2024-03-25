import { object, string, boolean, number, array } from 'zod';

export const updateProfileValidate = object({
    body:object({
        email: string({ required_error: "email is required" }).email({ message: 'Invalid email address' }),
        username:string({ required_error: "username is required" }).min(3,{message:'user name should be minimum of 3 characters'}).max(10,{message:'username should be minimum of 10 characters'}),
        password: string({ required_error: "password is required" }).min(8, { message: 'Password should have at least 8 characters' }),
        profilePic:string()
    })
})




