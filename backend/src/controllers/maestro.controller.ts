import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/express.js';

import { getAlumnosMaestroService } from '../services/maestro.service.js';

let self: any = {};

self.getAlumnosMaestro = async (req: AuthRequest, res: Response, next:NextFunction) => {
  try{
    const alumnos = await getAlumnosMaestroService(req.user!.id);
    res.json(alumnos);
  } catch (error){
    next(error);
  }
};

export default self;