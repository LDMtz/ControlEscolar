import { body } from 'express-validator';

export const postCalificacionValidation = [
  body('alumno_id')
    .notEmpty()
    .withMessage('alumno_id es obligatorio')
    .bail()
    .isInt({ min: 1 })
    .withMessage('alumno_id debe ser un entero válido'),

  body('materia_id')
    .notEmpty()
    .withMessage('materia_id es obligatorio')
    .bail()
    .isInt({ min: 1 })
    .withMessage('materia_id debe ser un entero válido'),

  body('nota')
    .notEmpty()
    .withMessage('La nota es obligatoria')
    .bail()
    .isDecimal({ decimal_digits: '1,2' })
    .withMessage('La nota debe ser un número con hasta 2 decimales')
    .bail()
    .isFloat({ min: 0, max: 100 })
    .withMessage('La nota debe estar entre 0 y 100'),

  body('observaciones').optional({ nullable: true }).isString().withMessage('Las observaciones deben ser texto'),
];
