import { Calificacion } from '../models/calificacion.model.js';
import { Alumno } from '../models/alumno.model.js';
import { Materia } from '../models/materia.model.js';
import { AppError } from '../utils/AppError.js';

//Obtiene alumnos relacionados a las calificaciones del maestro 
export const getAlumnosMaestroService = async (maestroId: number) => {
  const alumnos = await Alumno.findAll({
    include: [
      {
        model: Calificacion,
        as: 'calificaciones',
        where: { maestro_id: maestroId },
        required: true,
      },
    ],
  });

  return {
    count: alumnos.length,
    alumnos: alumnos,
  };
};

//Crea o actualiza calificaciones
export const postCalificacionService = async (
  maestroId: number,
  data: {
    alumno_id: number;
    materia_id: number;
    nota: number;
    observaciones?: string;
  }
) => {

  const alumno = await Alumno.findByPk(data.alumno_id);
  if (!alumno) {
    throw new AppError('El alumno no existe en la BD', 404);
  }

  const materia = await Materia.findByPk(data.materia_id);
  if (!materia) {
    throw new AppError('La materia no existe en la BD', 404);
  }

  //Si no existe la crea
  const [calificacion, created] = await Calificacion.findOrCreate({
    where: {
      alumno_id: data.alumno_id,
      materia_id: data.materia_id,
      maestro_id: maestroId,
    },
    defaults: {
      ...data,
      maestro_id: maestroId,
      fecha_registro: new Date(),
    },
  });

  //Si ya existe la actualiza
  if (!created) {
    await calificacion.update({
      nota: data.nota,
      observaciones: data.observaciones,
    });
  }

  return { calificacion, created };
};