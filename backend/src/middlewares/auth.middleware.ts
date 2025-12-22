import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest } from '../types/express.js';
import type { JwtPayload } from '../types/jwtPayload.js';
import { AppError } from '../utils/AppError.js';

//Protege rutas verificando el JWT.
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  //Obtiene el header Authorization
  const auth = req.headers.authorization;
  if (!auth) return next(new AppError('Token requerido', 401));

  // Divide el header por espacios: ["Bearer", "<token>"] y toma la el token)
  const token = auth.split(' ')[1];
  if (!token) return next(new AppError('Token requerido', 401));

  // Obtiene la clave secreta para verificar el JWT
  const secret = process.env.JWT_SECRET;
  if (!secret) return next(new AppError('JWT_SECRET no definido', 500));

  try {
    // Verifica el token
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
