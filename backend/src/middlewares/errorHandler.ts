import { constants } from '../../constants';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface ErrorWithStatusCode extends Error {
    statusCode: number;
    stack?: string;
}

const errorHandler = (err: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = res.statusCode || 500;

    if (err instanceof ZodError) {
        // Handle Zod validation errors
        const validationErrors = err.errors.map(error => ({
            path: error.path.join('.'),
            message: error.message,
        }));

        res.status(400).json({
            title: 'Validation Error',
            message: 'One or more validation errors occurred',
            errors: validationErrors,
        });
    } else {
        switch (statusCode) {
            case constants.UNAUTHORIZED:
                res.json({ title: "Unauthorized access", message: err.message, stackTrace: err.stack });
                break;
            case constants.FORBIDDEN:
                res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
                break;
            case constants.SERVER_ERROR:
                res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
                break;
            default:
                console.error(err.stack); // Log the error stack for other types of errors
                res.status(statusCode).json({ title: "Error", message: err.message });
                break;
        }
    }

    next(); // Call next middleware
};

export default errorHandler;
