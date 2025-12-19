import { Router } from 'express';

import maestro from '../controllers/maestro.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = Router();

// ID del rol MAESTRO
const ROL_MAESTRO = 1;

router.use(authMiddleware);
router.use(requireRole(ROL_MAESTRO));

router.get(
    '/alumnos', 
    maestro.getAlumnosMaestro
);

export default router;