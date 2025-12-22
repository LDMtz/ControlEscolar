import { Alumno } from './alumno.model.js';
import { Calificacion } from './calificacion.model.js';
import { Materia } from './materia.model.js';
import { Usuario } from './usuario.model.js';
import { Rol } from './rol.model.js';

/* =========================
   RELACIONES
========================= */

// ROL <-> USUARIO
Rol.hasMany(Usuario, { foreignKey: 'rol_id' });
Usuario.belongsTo(Rol, { foreignKey: 'rol_id' });

// ALUMNO <-> CALIFICACIÓN
Alumno.hasMany(Calificacion, {
  foreignKey: 'alumno_id',
  as: 'calificaciones',
});
Calificacion.belongsTo(Alumno, {
  foreignKey: 'alumno_id',
});

// MATERIA <-> CALIFICACIÓN
Materia.hasMany(Calificacion, {
  foreignKey: 'materia_id',
  as: 'calificaciones',
});
Calificacion.belongsTo(Materia, {
  foreignKey: 'materia_id',
  as: 'materia',
});

// USUARIO (MAESTRO) <-> CALIFICACIÓN
Usuario.hasMany(Calificacion, {
  foreignKey: 'maestro_id',
  as: 'calificaciones_otorgadas',
});
Calificacion.belongsTo(Usuario, {
  foreignKey: 'maestro_id',
  as: 'maestro',
});
