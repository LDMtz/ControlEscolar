import { query, param, body } from 'express-validator';


export const getReporteValidation = [
  query('tipo')
    .optional()
    .isIn(['alumnos', 'materias', 'general'])
    .withMessage('Tipo de reporte inválido'),

  query('id')
    .optional()
    .isInt()
    .withMessage('El id debe ser numérico'),

  // Filtros alumno
  query('matricula')
    .optional()
    .isString()
    .withMessage('La matricula debe ser string'),

  query('grupo')
    .optional()
    .isString()
    .withMessage('El grupo debe ser string'),

  // Filtros materia
  query('codigo')
    .optional()
    .isString()
    .withMessage('El codigo debe ser string'),
];


export const deleteCalificacionValidation = [
  param('id')
    .notEmpty().withMessage('El id de la calificación es obligatorio')
    .bail()
    .isInt({ min: 1 }).withMessage('El id debe ser un número entero positivo')
];


export const patchCalificacionValidation = [
  param('id')
    .notEmpty()
    .withMessage('El id de la calificación es obligatorio')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El id debe ser un número entero positivo'),

  body('nota')
    .optional()
    .isDecimal({ decimal_digits: '1,2' })
    .withMessage('La nota debe ser un número con hasta 2 decimales')
    .bail()
    .isFloat({ min: 0, max: 100 })
    .withMessage('La nota debe estar entre 0 y 100'),

  body('observaciones')
    .optional({ nullable: true })
    .isString()
    .withMessage('Las observaciones deben ser texto'),
    
];