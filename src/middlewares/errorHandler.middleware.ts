import { NextFunction, Request, Response } from 'express';
import { logger } from '../logging/logger';

const handleValidationError = (err: any, res: Response) => {
    console.group(err.errors);
    let errors = Object.values(err.errors).map((el: any) => el.message);
    let fields = Object.values(err.errors).map((el: any) => el.path);
    let code = 400;

    let formattedErrors: string;
    let formattedFields: string;

    if (errors.length == 1) {
        formattedErrors = errors.join(' ');
        formattedFields = fields.join(', ');
        return res.status(code).json({success: false, message: formattedErrors, field: formattedFields});
    }

    return res.status(code).json({success: false, messages: errors, fields: fields});
}

export async function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    logger.error("An error has occured")
    logger.error(err.message)
    try {
        if(err.name === 'ValidationError' || err.name === 'MongoServerError') {
            return handleValidationError(err, res);
        }

        if (err.message === "email or password is incorrect" || err.message === 'Failed to serialize user into session') {
            return res.status(400).json({success: false, message: 'email or password is incorrect'})
        }
        
        throw err;
    } catch(err) {
        res.status(500).json({success: false, message: 'An unknown error occurred.'});
    }
}