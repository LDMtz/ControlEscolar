'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('alumnos', [
        { nombre: 'Pedro Pérez', matricula: 'A001', fecha_nacimiento: '2005-05-15', grupo: 'A' },
        { nombre: 'María López', matricula: 'A002', fecha_nacimiento: '2005-07-20', grupo: 'A' },
        { nombre: 'Juan Gómez', matricula: 'A003', fecha_nacimiento: '2005-09-10', grupo: 'B' },
        { nombre: 'Lucía Hernández', matricula: 'A004', fecha_nacimiento: '2005-11-02', grupo: 'B' },
        { nombre: 'Carlos Ramírez', matricula: 'A005', fecha_nacimiento: '2005-02-28', grupo: 'C' },
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alumnos', {});
  }
};
