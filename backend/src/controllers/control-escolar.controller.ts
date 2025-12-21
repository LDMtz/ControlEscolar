import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/express.js';

import { getReporteService, deleteCalificacionService } from '../services/control-escolar.service.js';

let self: any = {};

self.getReporte = async (req: AuthRequest, res: Response, next:NextFunction) => {
  try{
    const reporte = await getReporteService(req.query);
    return res.status(200).json(reporte);
  } catch (error){
    next(error);
  }
};

self.deleteCalificacion = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const calificacion = await deleteCalificacionService(id);
    return res.status(200).json({message: 'Calificación eliminada correctamente', calificacion});
  } catch (error) {
    next(error);
  }
};

export default self;