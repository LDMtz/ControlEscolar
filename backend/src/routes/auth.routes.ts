import { Router } from 'express';
import auth from '../controllers/auth.controller.js';
import { loginValidation } from '../validations/auth.validate.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.post(
    '/login', 
    loginValidation, 
    validate, 
    auth.login
);

export default router;