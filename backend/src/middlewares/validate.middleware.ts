import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

//Valida si hubo errores de validacion al usar los validadores de "express-validator"
export const validate = (req: Request, _res: Response, next: NextFunction ) => {

    //Lee los errores
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(e => e.msg);
        return next(new AppError(errorMessages.join(', '), 400));
    }

    //Continua con el sig. middleware
    next();
};
