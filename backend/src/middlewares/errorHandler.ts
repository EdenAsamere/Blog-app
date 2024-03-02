import {constants} from '../../constants';
import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatusCode extends Error {
    statusCode: number;
    stack?: string;
}

const errorHandler = (err: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = res.status(500).statusCode;
    console.log(err.statusCode);
    switch (statusCode) {
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized access", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "FORBIDDEN", message: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "SERVER ERROR", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log('no errors');
            break;
    }
    next();
};

export default errorHandler;
