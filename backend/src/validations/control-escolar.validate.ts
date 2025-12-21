import { query } from 'express-validator';


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
