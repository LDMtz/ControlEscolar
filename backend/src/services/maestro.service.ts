import { Calificacion } from '../models/calificacion.model.js';
import { Alumno } from '../models/alumno.model.js';

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