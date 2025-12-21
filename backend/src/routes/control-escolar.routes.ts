import { Router } from 'express';

import control_escolar from '../controllers/control-escolar.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

import { getReporteValidation, deleteCalificacionValidation } from '../validations/control-escolar.validate.js';

const router = Router();

// ID del rol CONTROL_ESCOLAR
const ROL_CONTROL_ESCOLAR = 2;

router.use(authMiddleware);
router.use(requireRole(ROL_CONTROL_ESCOLAR));

router.get(
    '/reporte', 
    getReporteValidation, 
    validate, 
    control_escolar.getReporte
);

router.delete(
    '/calificaciones/:id',
    deleteCalificacionValidation,
    validate,
    control_escolar.deleteCalificacion
);

export default router;