import * as jwt from 'jsonwebtoken';
import { NextFunction, Request,RequestHandler,Response } from 'express';

export interface UserDataType {

    userId: string;
  }
  export interface IUserMessage<TParams = any, TQuery = any, TBody = any> extends Request<TParams, TQuery, TBody> {
    userData?: UserDataType;
  }
  export const authMiddleware = async (req: IUserMessage, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization as string;
        if (!authHeader?.startsWith("Bearer ")) {
            res.status(401).json({ message: 'Unauthorized access' });
            return;
        }
        const token:string = authHeader.split(" ")[1];
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: 'FORBIDDEN' });
                return;
            }
            req.userData = decoded as UserDataType;
            // console.log({ decoded });
            next();
        });
    } catch (err) {
        res.status(403).json({ message: "Unauthorized" });
    }
};