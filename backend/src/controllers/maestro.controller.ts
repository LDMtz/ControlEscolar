import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/express.js';

import { getAlumnosMaestroService, postCalificacionService } from '../services/maestro.service.js';

let self: any = {};

self.getAlumnosMaestro = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const alumnos = await getAlumnosMaestroService(req.user!.id);
    return res.status(200).json(alumnos);
  } catch (error) {
    next(error);
  }
};

self.postCalificacion = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    //Si created es true es porque se creó una nueva calif, si es false es porque se actualizó.
    const { calificacion, created } = await postCalificacionService(req.user!.id, req.body);
    return res.status(created ? 201 : 200).json(calificacion);
  } catch (error) {
    next(error);
  }
};

export default self;
