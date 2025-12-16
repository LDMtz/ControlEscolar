import pkg from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = pkg;
import type { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';

import { AppError } from '../utils/AppError.js';

export const errorHandler = (err: any, _req: Request, res: Response,_next: NextFunction) => {
    // JWT inválido
    if (err instanceof JsonWebTokenError) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    // JWT expirado
    if (err instanceof TokenExpiredError) {
        return res.status(401).json({ message: 'Token expirado' });
    }

    // Errores de Sequelize (validación)
    if (err instanceof ValidationError) {
        return res.status(400).json({
            message: 'Error de validación',
            errors: err.errors.map(e => e.message),
        });
    }

    //Error propio
    if (err instanceof AppError) {
        return res.status(err.status).json({ message: err.message });
    }

    // Error que no conocemos
    res.status(500).json({
        message: err.message || 'Error interno del servidor',
    });
};