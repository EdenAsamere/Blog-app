import { Request, Response} from 'express';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import UserModel, { User } from '../models/userModel'; 
  
export const signUpUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password, username} = req.body;
        let userNameUnique = await UserModel.findOne({username});
        if (userNameUnique){
            res.status(401).json({message:'User name already taken!'})
        }
        let emailUnique = await UserModel.findOne({email});
        if (emailUnique){
            res.status(401).json({message:'User with this email is already registered!'})
        }
        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = {...req.body,password:hashedPassword};
        const user = new UserModel(newUser);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
        return  
    } catch (error:any) {
        res.status(500).json({ message: 'Failed to create Comment', error: error.message });
        return
    }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        
        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(401).json({ message: "Authentication Failed" });
            return
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).json({ message: "Authentication Failed" });
            return
        }

        // Sign JWT token
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_SECRET_KEY as string,
        );

        // Respond with access token and user ID
        res.status(200).json({
            accessToken: token,
            userId: user._id
        });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: 'Failed to login', error: error.message });
    }
};