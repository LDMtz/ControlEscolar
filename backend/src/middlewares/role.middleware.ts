import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/express';
import { AppError } from '../utils/AppError.js';

// Middleware de autorización por rol
export const requireRole = (rol: number) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {

        //Valida el rol del usuario autenticado con el requerido por la ruta
        if (req.user!.rol_id !== rol) {
            return next(new AppError('Acceso denegado, rol no autorizado', 403));
        }
        
        //Continua al siguiente middleware
        next();
    };
};