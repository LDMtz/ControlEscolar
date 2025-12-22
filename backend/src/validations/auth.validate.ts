import { body } from 'express-validator';

// Validaciones para el endpoint de login
export const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email debe tener un formato válido'),

  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];
