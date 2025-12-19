'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('calificaciones', [

        // maestro_id: 1 -> Juan
        // maestro_id: 2 -> Ana

        // Alumno 1 - Pedro
        { alumno_id: 1, materia_id: 1, maestro_id: 1, nota: 85, fecha_registro: new Date() },
        { alumno_id: 1, materia_id: 2, maestro_id: 1, nota: 88, fecha_registro: new Date() },
        { alumno_id: 1, materia_id: 3, maestro_id: 2, nota: 90, fecha_registro: new Date() },
        { alumno_id: 1, materia_id: 4, maestro_id: 2, nota: 87, fecha_registro: new Date() },
        { alumno_id: 1, materia_id: 5, maestro_id: 1, nota: 92, fecha_registro: new Date() },

        // Alumno 2 - María
        { alumno_id: 2, materia_id: 1, maestro_id: 1, nota: 80, fecha_registro: new Date() },
        { alumno_id: 2, materia_id: 2, maestro_id: 2, nota: 82, fecha_registro: new Date() },
        { alumno_id: 2, materia_id: 3, maestro_id: 1, nota: 84, fecha_registro: new Date() },
        { alumno_id: 2, materia_id: 4, maestro_id: 2, nota: 86, fecha_registro: new Date() },
        { alumno_id: 2, materia_id: 5, maestro_id: 1, nota: 88, fecha_registro: new Date() },

        // Alumno 3 - Juan
        { alumno_id: 3, materia_id: 1, maestro_id: 2, nota: 78, fecha_registro: new Date() },
        { alumno_id: 3, materia_id: 2, maestro_id: 1, nota: 75, fecha_registro: new Date() },
        { alumno_id: 3, materia_id: 3, maestro_id: 2, nota: 80, fecha_registro: new Date() },
        { alumno_id: 3, materia_id: 4, maestro_id: 1, nota: 82, fecha_registro: new Date() },
        { alumno_id: 3, materia_id: 5, maestro_id: 2, nota: 79, fecha_registro: new Date() },

        // Alumno 4 - Lucía
        { alumno_id: 4, materia_id: 1, maestro_id: 1, nota: 90, fecha_registro: new Date() },
        { alumno_id: 4, materia_id: 2, maestro_id: 2, nota: 92, fecha_registro: new Date() },
        { alumno_id: 4, materia_id: 3, maestro_id: 1, nota: 94, fecha_registro: new Date() },
        { alumno_id: 4, materia_id: 4, maestro_id: 2, nota: 91, fecha_registro: new Date() },
        { alumno_id: 4, materia_id: 5, maestro_id: 1, nota: 93, fecha_registro: new Date() },

        // Alumno 5 - Carlos
        { alumno_id: 5, materia_id: 1, maestro_id: 2, nota: 70, fecha_registro: new Date() },
        { alumno_id: 5, materia_id: 2, maestro_id: 1, nota: 72, fecha_registro: new Date() },
        { alumno_id: 5, materia_id: 3, maestro_id: 2, nota: 75, fecha_registro: new Date() },
        { alumno_id: 5, materia_id: 4, maestro_id: 1, nota: 78, fecha_registro: new Date() },
        { alumno_id: 5, materia_id: 5, maestro_id: 2, nota: 74, fecha_registro: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('calificaciones', {});
  }
};
