import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                next();
            } catch (e: any) {
                console.log({ e })
                const message = e.errors.map((err: any) => err.message)
                return res.status(400).json({ message: message.join(','), success: false });
            }
        };

