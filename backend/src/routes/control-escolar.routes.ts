import { Router } from 'express';

import ctrl_esc from '../controllers/control-escolar.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

import {
  getReporteValidation,
  deleteCalificacionValidation,
  patchCalificacionValidation,
} from '../validations/control-escolar.validate.js';

const router = Router();

// ID del rol CONTROL_ESCOLAR
const ROL_CONTROL_ESCOLAR = 2;

router.use(authMiddleware);
router.use(requireRole(ROL_CONTROL_ESCOLAR));

router.get('/reporte', getReporteValidation, validate, ctrl_esc.getReporte);
router.delete('/calificaciones/:id', deleteCalificacionValidation, validate, ctrl_esc.deleteCalificacion);
router.patch('/calificaciones/:id', authMiddleware, patchCalificacionValidation, validate, ctrl_esc.patchCalificacion);

export default router;
